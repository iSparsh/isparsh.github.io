import React, { useEffect, useRef } from 'react';

const FuzzyText = ({
  children,
  fontSize = 'clamp(2rem, 10vw, 10rem)',
  fontWeight = 900,
  fontFamily = 'inherit',
  color = '#fff',
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let isCancelled = false;
    let resizeTimeout;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const init = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (isCancelled) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const computedFontFamily =
        fontFamily === 'inherit' ? window.getComputedStyle(canvas).fontFamily || 'sans-serif' : fontFamily;

      const fontSizeStr = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
      let numericFontSize;
      if (typeof fontSize === 'number') {
        numericFontSize = fontSize;
      } else {
        // Create a temporary element to measure the actual rendered font size
        const temp = document.createElement('span');
        temp.style.fontSize = fontSize;
        temp.style.fontFamily = computedFontFamily;
        temp.style.fontWeight = fontWeight;
        temp.style.position = 'absolute';
        temp.style.visibility = 'hidden';
        temp.style.whiteSpace = 'nowrap';
        temp.textContent = React.Children.toArray(children).join('');
        document.body.appendChild(temp);
        const computedSize = window.getComputedStyle(temp).fontSize;
        numericFontSize = parseFloat(computedSize);
        document.body.removeChild(temp);
        
        // Ensure minimum readable size on mobile (at least 48px on small screens)
        if (window.innerWidth < 640 && numericFontSize < 48) {
          numericFontSize = 48;
        }
      }

      const text = React.Children.toArray(children).join('');

      // Use the numeric font size for rendering (ensures accurate sizing)
      const renderFontSize = numericFontSize;
      const renderFontSizeStr = `${renderFontSize}px`;

      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      // Measure text with the correct font size
      offCtx.font = `${fontWeight} ${renderFontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';
      const metrics = offCtx.measureText(text);

      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
      const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
      const actualAscent = metrics.actualBoundingBoxAscent ?? renderFontSize;
      const actualDescent = metrics.actualBoundingBoxDescent ?? renderFontSize * 0.2;

      // Use metrics.width for more accurate text width, especially for the last character
      const textWidth = metrics.width;
      const textBoundingWidth = Math.ceil(Math.max(actualLeft + actualRight, textWidth));
      const tightHeight = Math.ceil(actualAscent + actualDescent);

      // Increased buffer to account for fuzzy effect and ensure last character isn't cut off
      // Add extra padding on the right side for the fuzzy effect
      const extraWidthBuffer = 30;
      const rightPadding = 20; // Extra padding for the right side (where last character is)
      const offscreenWidth = textBoundingWidth + extraWidthBuffer + rightPadding;

      offscreen.width = offscreenWidth;
      offscreen.height = tightHeight;

      const xOffset = extraWidthBuffer / 2;
      // Render text with the correct font size
      offCtx.font = `${fontWeight} ${renderFontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';
      offCtx.fillStyle = color;
      offCtx.fillText(text, xOffset - actualLeft, actualAscent);

      // Handle device pixel ratio for high-DPI displays
      const dpr = window.devicePixelRatio || 1;
      
      // Increased horizontal margins to ensure text isn't clipped
      const horizontalMargin = 50;
      const rightMargin = 60; // Extra margin on right side for last character
      const verticalMargin = 0;
      
      const totalWidth = offscreenWidth + horizontalMargin + rightMargin;
      
      // Set canvas size in CSS pixels
      canvas.style.width = `${totalWidth}px`;
      canvas.style.height = `${tightHeight + verticalMargin * 2}px`;
      
      // Set canvas size in actual pixels (accounting for DPR)
      canvas.width = totalWidth * dpr;
      canvas.height = (tightHeight + verticalMargin * 2) * dpr;
      
      // Scale context to account for DPR
      ctx.scale(dpr, dpr);
      ctx.translate(horizontalMargin, verticalMargin);

      const interactiveLeft = horizontalMargin + xOffset;
      const interactiveTop = verticalMargin;
      const interactiveRight = interactiveLeft + textBoundingWidth + rightPadding;
      const interactiveBottom = interactiveTop + tightHeight;

      let isHovering = false;
      const fuzzRange = 30;

      const run = () => {
        if (isCancelled) return;
        // Clear the entire canvas area, accounting for fuzzy effect extension
        ctx.clearRect(
          -fuzzRange - 10,
          -fuzzRange,
          offscreenWidth + 2 * fuzzRange + 20,
          tightHeight + 2 * fuzzRange
        );
        const intensity = isHovering ? hoverIntensity : baseIntensity;
        for (let j = 0; j < tightHeight; j++) {
          const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
          // Draw the offscreen canvas, ensuring we don't clip the last character
          ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
        }
        animationFrameId = window.requestAnimationFrame(run);
      };

      run();

      const isInsideTextArea = (x, y) => {
        return x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom;
      };

      const handleMouseMove = e => {
        if (!enableHover) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        isHovering = isInsideTextArea(x, y);
      };

      const handleMouseLeave = () => {
        isHovering = false;
      };

      const handleTouchMove = e => {
        if (!enableHover) return;
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        isHovering = isInsideTextArea(x, y);
      };

      const handleTouchEnd = () => {
        isHovering = false;
      };

      if (enableHover) {
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd);
      }

      const cleanup = () => {
        window.cancelAnimationFrame(animationFrameId);
        if (enableHover) {
          canvas.removeEventListener('mousemove', handleMouseMove);
          canvas.removeEventListener('mouseleave', handleMouseLeave);
          canvas.removeEventListener('touchmove', handleTouchMove);
          canvas.removeEventListener('touchend', handleTouchEnd);
        }
      };

      canvas.cleanupFuzzyText = cleanup;
    };

    init();

    // Handle window resize
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!isCancelled && canvas) {
          window.cancelAnimationFrame(animationFrameId);
          if (canvas.cleanupFuzzyText) {
            canvas.cleanupFuzzyText();
          }
          init();
        }
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      isCancelled = true;
      clearTimeout(resizeTimeout);
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (canvas && canvas.cleanupFuzzyText) {
        canvas.cleanupFuzzyText();
      }
    };
  }, [children, fontSize, fontWeight, fontFamily, color, enableHover, baseIntensity, hoverIntensity]);

  return <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%', overflow: 'visible' }} />;
};

export default FuzzyText;

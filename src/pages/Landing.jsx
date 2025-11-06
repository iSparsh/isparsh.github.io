import { Link } from "react-router-dom";
import { useRef } from "react";
import LetterGlitch from "../components/LetterGlitch.jsx";
import TextType from "../components/TextType.jsx";
import FuzzyText from "../components/FuzzyText.jsx";
import morpheusImg from "../assets/morpheus_pixel_art.png";
import redPillImg from "../assets/red pill.png";
import bluePillImg from "../assets/blue pill.png";

function Landing() {
  const redPillImageRef = useRef(null);
  const bluePillImageRef = useRef(null);
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <LetterGlitch outerVignette={true} />

      {/* Personal Website Title - Fuzzy Text Effect */}
      <header className="absolute top-[4vh] inset-x-0 z-10 pointer-events-auto overflow-visible flex items-center justify-center">
        <h1 className="sr-only">Personal Website - Sparsh</h1>
        <div aria-label="Personal website title: ./sparsh." role="img" className="overflow-visible">
          <FuzzyText
            fontSize="clamp(3rem, 12vw, 6rem)"
            fontWeight={900}
            fontFamily="monospace"
            color="#61dca3"
            enableHover={true}
            baseIntensity={0.18}
            hoverIntensity={0.5}
          >
            ./sparsh
          </FuzzyText>
        </div>
      </header>

      <main
        className="absolute inset-0 flex items-center justify-center"
        style={{
          // You can tweak positions using these CSS variables (percentages)
          // Example: style={{"--red-x":"-18%","--red-y":"8%","--blue-x":"18%","--blue-y":"6%"}}
          "--red-x": "25%",
          "--red-y": "77%",
          "--blue-x": "74%",
          "--blue-y": "77%",
          // You can also tweak pill image size here
          // Since the red pill hand appears larger visually, we scale it down slightly
          // Using clamp to ensure minimum size on phones
          "--red-pill-size": "clamp(120px, 13vw, 150px)",   // Red pill with min 90px for phones
          "--blue-pill-size": "clamp(120px, 13vw, 150px)",  // Blue pill with min 90px for phones
        }}
      >
        <div className="relative select-none">
          {/* Stronger permanent vignette behind Morpheus to separate from background */}
          <div className="pointer-events-none absolute -inset-10 rounded-full opacity-80" style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0) 72%)"
          }} aria-hidden="true" />
          <img
            src={morpheusImg}
            alt="Morpheus offering a choice between two pills: a red pill on the left and a blue pill on the right"
            className="block h-auto mx-auto"
            style={{ width: "clamp(450px, 55vw, 580px)" }}
          />

          {/* Red pill (left) */}
          <Link
            to="/retro/"
            className="group absolute focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black rounded-full"
            style={{
              left: "var(--red-x)",
              top: "var(--red-y)",
              transform: "translate(-50%, -50%)",
            }}
            aria-label="Take the red pill to enter retro mode - a nostalgic, classic website design experience"
            onFocus={() => {
              if (redPillImageRef.current) {
                redPillImageRef.current.style.animation = 'none';
                redPillImageRef.current.style.filter = 'drop-shadow(0 0 22px rgba(255, 0, 0, 0.8)) drop-shadow(0 0 30px rgba(255, 0, 0, 0.6))';
              }
            }}
            onBlur={() => {
              if (redPillImageRef.current) {
                redPillImageRef.current.style.animation = 'glow-red 3s ease-in-out infinite';
                redPillImageRef.current.style.filter = 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.4)) drop-shadow(0 0 16px rgba(255, 0, 0, 0.3))';
              }
            }}
          >
            <div className="relative">
              <img
                ref={redPillImageRef}
                src={redPillImg}
                alt=""
                className="pointer-events-auto group-hover:scale-125 group-hover:-translate-y-2 group-focus:scale-125 group-focus:-translate-y-2"
                style={{ 
                  width: "var(--red-pill-size)", 
                  height: "auto",
                  animation: "glow-red 3s ease-in-out infinite",
                  filter: "drop-shadow(0 0 8px rgba(255, 0, 0, 0.4)) drop-shadow(0 0 16px rgba(255, 0, 0, 0.3))",
                  transition: "transform 0.1s linear"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.animation = 'none';
                  e.currentTarget.style.filter = 'drop-shadow(0 0 22px rgba(255, 0, 0, 0.8)) drop-shadow(0 0 30px rgba(255, 0, 0, 0.6))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.animation = 'glow-red 3s ease-in-out infinite';
                  e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.4)) drop-shadow(0 0 16px rgba(255, 0, 0, 0.3))';
                }}
                aria-hidden="true"
              />
              {/* Hover/focus text on the opposite side (left of red pill) */}
              <span
                className="pointer-events-none absolute right-[calc(100%+0.5rem)] top-1/2 hidden -translate-y-1/2 rounded bg-black/80 px-2 py-1 font-mono text-sm text-red-300 opacity-0 transition-all duration-200 group-hover:block group-hover:opacity-100 group-focus:block group-focus:opacity-100"
                aria-hidden="true"
              >
                Excellent choice picking retro.
              </span>
            </div>
          </Link>

          {/* Blue pill (right) */}
          <Link
            to="/modern/"
            className="group absolute focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black rounded-full"
            style={{
              left: "var(--blue-x)",
              top: "var(--blue-y)",
              transform: "translate(-50%, -50%)",
            }}
            aria-label="Take the blue pill to enter modern mode - a contemporary, sleek website design experience"
            onFocus={() => {
              if (bluePillImageRef.current) {
                bluePillImageRef.current.style.animation = 'none';
                bluePillImageRef.current.style.filter = 'drop-shadow(0 0 22px rgba(0, 128, 255, 0.8)) drop-shadow(0 0 30px rgba(0, 128, 255, 0.6))';
              }
            }}
            onBlur={() => {
              if (bluePillImageRef.current) {
                bluePillImageRef.current.style.animation = 'glow-blue 3s ease-in-out infinite';
                bluePillImageRef.current.style.filter = 'drop-shadow(0 0 8px rgba(0, 128, 255, 0.4)) drop-shadow(0 0 16px rgba(0, 128, 255, 0.3))';
              }
            }}
          >
            <div className="relative">
              {/* Hover/focus text on the opposite side (right of blue pill) */}
              <span
                className="pointer-events-none absolute left-[calc(100%+0.5rem)] top-1/2 hidden -translate-y-1/2 rounded bg-black/80 px-2 py-1 font-mono text-sm text-sky-300 opacity-0 transition-all duration-200 group-hover:block group-hover:opacity-100 group-focus:block group-focus:opacity-100"
                aria-hidden="true"
              >
                I see you've chosen modern.
              </span>
              <img
                ref={bluePillImageRef}
                src={bluePillImg}
                alt=""
                className="pointer-events-auto group-hover:scale-125 group-hover:-translate-y-2 group-focus:scale-125 group-focus:-translate-y-2"
                style={{ 
                  width: "var(--blue-pill-size)", 
                  height: "auto",
                  animation: "glow-blue 3s ease-in-out infinite",
                  filter: "drop-shadow(0 0 8px rgba(0, 128, 255, 0.4)) drop-shadow(0 0 16px rgba(0, 128, 255, 0.3))",
                  transition: "transform 0.1s linear"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.animation = 'none';
                  e.currentTarget.style.filter = 'drop-shadow(0 0 22px rgba(0, 128, 255, 0.8)) drop-shadow(0 0 30px rgba(0, 128, 255, 0.6))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.animation = 'glow-blue 3s ease-in-out infinite';
                  e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(0, 128, 255, 0.4)) drop-shadow(0 0 16px rgba(0, 128, 255, 0.3))';
                }}
                aria-hidden="true"
              />
            </div>
          </Link>
        </div>
      </main>

      {/* Quote under Morpheus with type animation in a black box */}
      <div className="absolute inset-x-0 bottom-[6vh] flex justify-center px-6 text-center">
        <div className="mx-auto max-w-4xl rounded-md bg-black/85 px-4 py-3">
          <TextType
            as="p"
            className="mx-auto max-w-3xl font-mono text-base text-neutral-200 md:text-lg font-bold"
            typingSpeed={35}
            pauseDuration={2000}
            cursorCharacter="█"
            loop={true}
            text={[
              "This is your last chance. After this, there is no turning back.",
              "You take the blue pill - the story ends, you wake up in your bed and believe whatever you want to believe.",
              "You take the red pill - you stay in Wonderland and I show you how deep the rabbit hole goes.",
            ]}
          />
          <p className="sr-only">
            This is your last chance. After this, there is no turning back. You take the blue pill - the story ends, you wake up in your bed and believe whatever you want to believe. You take the red pill - you stay in Wonderland and I show you how deep the rabbit hole goes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Landing;



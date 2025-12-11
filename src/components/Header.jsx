import { Button } from "@/components/ui/button";
import { Mail, ExternalLink, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import myPicture from "../assets/my_picture.jpg";
import SplitText from "./SplitText";
import Iridescence from "./Iridescence";
import { useTheme } from "@/contexts/ThemeContext";

function Header() {
  const { theme } = useTheme();
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [indicatorOpacity, setIndicatorOpacity] = useState(0);

  useEffect(() => {
    // Show indicator after 2 seconds if user hasn't scrolled
    const timer = setTimeout(() => {
      if (!hasScrolled) {
        setShowScrollIndicator(true);
        // Fade in slowly over 1 second
        setTimeout(() => setIndicatorOpacity(1), 50);
      }
    }, 2000);

    const handleScroll = () => {
      setHasScrolled(true);
      setIndicatorOpacity(0);
      setTimeout(() => setShowScrollIndicator(false), 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled]);
  
  return (
    <section className="relative pt-20 pb-16 min-h-screen">
      {/* Iridescence Background */}
      <div className="absolute inset-0">
        <Iridescence
          color={[0.38, 0.86, 0.64]}
          speed={1.0}
          amplitude={0.1}
          mouseReact={false}
        />
      </div>

      {/* Header Content - Center Aligned */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 flex flex-col items-center justify-center min-h-[70vh] gap-8">
        {/* Circular Profile Image */}
        <div className="w-48 h-48 flex-shrink-0">
          <img
            src={myPicture}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-border shadow-[0_0_20px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* Name Below Image */}
        <div className="text-center">
          <SplitText
            text="Hi, I'm Sparsh"
            tag="h1"
            className="text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]"
            splitType="chars"
            delay={25}
            duration={1.0}
            ease="back.out(1.7)"
            from={{ opacity: 0, y: 60, rotationX: -90 }}
            to={{ opacity: 1, y: 0, rotationX: 0 }}
          />
        </div>

        {/* Buttons in a Row */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            asChild 
            variant="outline"
            className="shadow-[0_0_15px_rgba(0,0,0,0.8)] py-5 md:py-2 text-base md:text-sm"
          >
            <a href="mailto:spmishra@wisc.edu">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </a>
          </Button>

          <Button asChild variant="outline" className="shadow-[0_0_15px_rgba(0,0,0,0.8)] py-5 md:py-2 text-base md:text-sm">
            <a href="https://github.com/iSparsh/waybar-themes/tree/main" target="_blank" rel="noopener noreferrer">
              What I'm Working On
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Scroll Indicator - appears at the bottom */}
        {showScrollIndicator && (
          <div 
            className="absolute bottom-[2vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce transition-opacity duration-1000 ease-in z-20"
            style={{ opacity: indicatorOpacity }}
          >
            <span className="text-white/80 text-sm font-medium drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]">Scroll to explore</span>
            <ChevronDown className="h-6 w-6 text-white/80 drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]" />
          </div>
        )}
      </div>
    </section>
  );
}

export default Header;

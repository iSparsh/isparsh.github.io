import { useEffect } from "react";
import LetterGlitch from "../components/LetterGlitch.jsx";
import Terminal from "../components/Terminal.jsx";

function Retro() {
  // Prevent body scroll when terminal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Faulty Terminal Background */}
      <div className="absolute inset-0">
        <LetterGlitch
          glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={true}
          smooth={true}
        />
      </div>

      {/* Terminal Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full w-full p-4">
        <Terminal />
      </div>
    </div>
  );
}

export default Retro;



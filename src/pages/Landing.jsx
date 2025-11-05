import { Link } from "react-router-dom";
import LetterGlitch from "../components/LetterGlitch.jsx";
import TextType from "../components/TextType.jsx";
import FuzzyText from "../components/FuzzyText.jsx";
import morpheusImg from "../assets/morpheus_pixel_art.png";
import redPillImg from "../assets/red pill.png";
import bluePillImg from "../assets/blue pill.png";

function Landing() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <LetterGlitch outerVignette={true} />

      {/* Personal Website Title - Fuzzy Text Effect */}
      <div className="absolute top-[4vh] inset-x-0 z-10 pointer-events-auto overflow-visible flex items-center justify-center">
        <FuzzyText
          fontSize="clamp(2rem, 8vw, 6rem)"
          fontWeight={900}
          fontFamily="monospace"
          color="#61dca3"
          enableHover={true}
          baseIntensity={0.18}
          hoverIntensity={0.5}
        >
          ./sparsh.
        </FuzzyText>
      </div>

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          // You can tweak positions using these CSS variables (percentages)
          // Example: style={{"--red-x":"-18%","--red-y":"8%","--blue-x":"18%","--blue-y":"6%"}}
          "--red-x": "25%",
          "--red-y": "77%",
          "--blue-x": "75%",
          "--blue-y": "77%",
          // You can also tweak pill image size here
          // Since the red pill hand appears larger visually, we scale it down slightly
          // Using clamp to ensure minimum size on phones
          "--red-pill-size": "clamp(90px, 12vw, 150px)",   // Red pill with min 90px for phones
          "--blue-pill-size": "clamp(90px, 12vw, 150px)",  // Blue pill with min 90px for phones
        }}
      >
        <div className="relative select-none">
          {/* Stronger permanent vignette behind Morpheus to separate from background */}
          <div className="pointer-events-none absolute -inset-10 rounded-full opacity-80" style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0) 72%)"
          }} />
          <img
            src={morpheusImg}
            alt="Morpheus silhouette"
            className="block h-auto mx-auto"
            style={{ width: "clamp(450px, 55vw, 580px)" }}
          />

          {/* Red pill (left) */}
          <Link
            to="/retro/"
            className="group absolute"
            style={{
              left: "var(--red-x)",
              top: "var(--red-y)",
              transform: "translate(-50%, -50%)",
            }}
            aria-label="Enter retro mode"
          >
            <div className="relative">
              <img
                src={redPillImg}
                alt="Red pill"
                className="pointer-events-auto group-hover:scale-125 group-hover:-translate-y-2"
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
              />
              {/* Hover text on the opposite side (left of red pill) */}
              <span
                className="pointer-events-none absolute right-[calc(100%+0.5rem)] top-1/2 hidden -translate-y-1/2 rounded bg-black/80 px-2 py-1 font-mono text-sm text-red-300 opacity-0 transition-all duration-200 group-hover:block group-hover:opacity-100"
              >
                Excellent choice picking retro.
              </span>
            </div>
          </Link>

          {/* Blue pill (right) */}
          <Link
            to="/modern/"
            className="group absolute"
            style={{
              left: "var(--blue-x)",
              top: "var(--blue-y)",
              transform: "translate(-50%, -50%)",
            }}
            aria-label="Enter modern mode"
          >
            <div className="relative">
              {/* Hover text on the opposite side (right of blue pill) */}
              <span
                className="pointer-events-none absolute left-[calc(100%+0.5rem)] top-1/2 hidden -translate-y-1/2 rounded bg-black/80 px-2 py-1 font-mono text-sm text-sky-300 opacity-0 transition-all duration-200 group-hover:block group-hover:opacity-100"
              >
                I see you've chosen modern.
              </span>
              <img
                src={bluePillImg}
                alt="Blue pill"
                className="pointer-events-auto group-hover:scale-125 group-hover:-translate-y-2"
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
              />
            </div>
          </Link>
        </div>
      </div>

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
        </div>
      </div>
    </div>
  );
}

export default Landing;



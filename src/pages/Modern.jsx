import { useEffect, useRef } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";

function Section({ id, title, children }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("float-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="py-16 px-6 scroll-float-section"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
        <Separator className="mb-8" />
        {children}
      </div>
    </section>
  );
}

function Modern() {
  return (
    <div className="min-h-screen text-foreground">
      <TopBar />
      
      <main>
        <Header />
        
        {/* Main content sections with theme-aware background */}
        <div className="bg-background">
          {/* About Section */}
          <Section id="about" title="About Me">
            <p className="text-lg text-foreground/90 mb-4">
              Welcome to my digital space. I'm a developer passionate about creating meaningful experiences through code.
            </p>
            <p className="text-foreground/80">
              I enjoy building web applications, exploring new technologies, and contributing to open-source projects.
            </p>
          </Section>

          {/* Placeholder sections - will be built incrementally */}
          <Section id="projects" title="Projects">
            <p className="text-muted-foreground">Projects section coming soon...</p>
          </Section>

          <Section id="research" title="Research">
            <p className="text-muted-foreground">Research section coming soon...</p>
          </Section>

          <Section id="resume" title="Resume">
            <p className="text-muted-foreground">Resume section coming soon...</p>
          </Section>

          <Section id="contact" title="Contact Me">
            <p className="text-muted-foreground">Contact section coming soon...</p>
          </Section>

          <Section id="linux" title="Linux">
            <p className="text-muted-foreground">Linux section coming soon...</p>
          </Section>
        </div>
      </main>
    </div>
  );
}

export default Modern;



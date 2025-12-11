import { useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import resumePdf from "@/assets/Sparsh_Mishra_Resume.pdf";

function ResumePage() {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;
    
    // Immediately show content, then add animation
    const element = contentRef.current;
    element.classList.add("float-in");
    
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

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-16 px-6 page-enter">
      <div className="mx-auto max-w-4xl">
        <div ref={contentRef} className="scroll-float-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Resume</h1>
          <Separator className="mb-8" />
          <p className="text-lg text-foreground/90 mb-8 leading-relaxed">
            Below is my resume in PDF format. You can view it directly in your browser or download it for your records.
          </p>
          <div className="w-full h-[800px] md:h-[1000px] border border-border rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={resumePdf}
              className="w-full h-full"
              title="Resume PDF"
              aria-label="Resume PDF viewer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumePage;


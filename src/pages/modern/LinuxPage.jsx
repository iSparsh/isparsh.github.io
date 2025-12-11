import { useEffect, useRef, useState } from "react";
import { loadContent } from "@/utils/loadContent";
import { Separator } from "@/components/ui/separator";

function LinuxPage() {
  const contentRef = useRef(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    loadContent('linux').then(setContent);
  }, []);

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
  }, [content]);

  if (!content) {
    return (
      <div className="min-h-screen pt-20 pb-16 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  const paragraphs = content.filter(item => item.type === 'paragraph');

  return (
    <div className="min-h-screen pt-20 pb-16 px-6 page-enter">
      <div className="mx-auto max-w-4xl">
        <div ref={contentRef} className="scroll-float-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Linux</h1>
          <Separator className="mb-8" />
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {paragraphs.map((item, index) => (
              <p key={index} className="text-lg text-foreground/90 mb-6 leading-relaxed">
                {item.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinuxPage;


import { useEffect, useRef, useState } from "react";
import { loadContent } from "@/utils/loadContent";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ResearchPage() {
  const contentRef = useRef(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    loadContent('research').then(setContent);
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

  const intro = content.find(item => item.type === 'paragraph');
  const researchEntries = content.filter(item => item.type === 'research');

  return (
    <div className="min-h-screen pt-20 pb-16 px-6 page-enter">
      <div className="mx-auto max-w-4xl">
        <div ref={contentRef} className="scroll-float-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Research</h1>
          <Separator className="mb-8" />
          {intro && (
            <p className="text-lg text-foreground/90 mb-8 leading-relaxed">
              {intro.text}
            </p>
          )}
          <div className="space-y-8">
            {researchEntries.map((entry, index) => (
              <Card key={index} className="backdrop-blur-sm bg-card/80">
                <CardHeader>
                  <CardTitle className="text-2xl">{entry.title}</CardTitle>
                  <div className="text-sm text-muted-foreground mt-2">
                    {entry.period} • {entry.role}
                    {entry.mentor && ` • Mentor: ${entry.mentor}`}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {entry.paper && (
                      <p className="text-foreground/90 mb-4 leading-relaxed font-semibold">
                        <strong>Paper:</strong> {entry.paper}
                      </p>
                    )}
                    <p className="text-foreground/90 mb-4 leading-relaxed">
                      {entry.description}
                    </p>
                    {entry.achievement && (
                      <p className="text-foreground/90 mb-4 leading-relaxed italic">
                        {entry.achievement}
                      </p>
                    )}
                    {entry.status && (
                      <p className="text-foreground/90 mb-4 leading-relaxed italic">
                        {entry.status}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResearchPage;


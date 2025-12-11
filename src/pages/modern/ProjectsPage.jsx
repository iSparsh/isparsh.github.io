import { useEffect, useRef, useState } from "react";
import { loadContent } from "@/utils/loadContent";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ProjectsPage() {
  const contentRef = useRef(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    loadContent('projects').then(setContent);
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

  const projects = content.filter(item => item.type === 'project');

  return (
    <div className="min-h-screen pt-20 pb-16 px-6 page-enter">
      <div className="mx-auto max-w-4xl">
        <div ref={contentRef} className="scroll-float-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Projects</h1>
          <Separator className="mb-8" />
          <div className="space-y-8">
            {projects.map((project, index) => (
              <Card key={index} className="backdrop-blur-sm bg-card/80">
                <CardHeader>
                  <CardTitle className="text-2xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-foreground/90 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    {project.results && (
                      <p className="text-foreground/90 mb-4 leading-relaxed font-semibold">
                        {project.results}
                      </p>
                    )}
                    {project.features && project.features.length > 0 && (
                      <ul className="list-disc list-inside space-y-2 text-foreground/90 mb-4">
                        {project.features.map((feature, fIndex) => (
                          <li key={fIndex}>{feature}</li>
                        ))}
                      </ul>
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

export default ProjectsPage;


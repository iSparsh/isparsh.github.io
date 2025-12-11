import { useEffect, useRef, useState } from "react";
import { loadContent } from "@/utils/loadContent";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Linkedin, Github, ExternalLink } from "lucide-react";

function ContactPage() {
  const contentRef = useRef(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    loadContent('contact').then(setContent);
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
  const contacts = content.filter(item => item.type === 'contact');
  
  // Get email and LinkedIn from contacts
  const emailContact = contacts.find(c => c.type === 'email');
  const linkedInContact = contacts.find(c => c.type === 'linkedin');
  const locationContact = contacts.find(c => c.type === 'location');
  
  // Social links
  const githubUrl = "https://github.com/iSparsh";
  const linkedInUrl = linkedInContact?.href || "https://www.linkedin.com/in/sparsh-mishra-24b946241/";
  const emailHref = emailContact?.href || `mailto:${emailContact?.value || 'spmishra@wisc.edu'}`;

  return (
    <div className="min-h-screen pt-20 pb-16 px-6 page-enter">
      <div className="mx-auto max-w-4xl">
        <div ref={contentRef} className="scroll-float-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Contact</h1>
          <Separator className="mb-8" />
          {intro && (
            <p className="text-lg text-foreground/90 mb-12 leading-relaxed">
              {intro.text}
            </p>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              size="lg"
              className="flex-1 py-5 md:py-3 text-base md:text-sm"
              onClick={() => window.location.href = emailHref}
            >
              <Mail className="mr-2 h-5 w-5" />
              Send Email
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 py-5 md:py-3 text-base md:text-sm"
              onClick={() => window.open(githubUrl, '_blank', 'noopener,noreferrer')}
            >
              <Github className="mr-2 h-5 w-5" />
              GitHub
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 py-5 md:py-3 text-base md:text-sm"
              onClick={() => window.open(linkedInUrl, '_blank', 'noopener,noreferrer')}
            >
              <Linkedin className="mr-2 h-5 w-5" />
              LinkedIn
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          {/* Contact Information Cards */}
          <div className="space-y-4">
            {emailContact && (
              <Card className="backdrop-blur-sm bg-card/80 hover:bg-card/90 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-foreground/80" />
                    <div>
                      <div className="font-semibold text-foreground mb-1">{emailContact.label}</div>
                      <a 
                        href={emailHref}
                        className="text-foreground/80 hover:text-foreground hover:underline transition-colors"
                      >
                        {emailContact.value}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {linkedInContact && (
              <Card className="backdrop-blur-sm bg-card/80 hover:bg-card/90 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Linkedin className="h-5 w-5 text-foreground/80" />
                    <div>
                      <div className="font-semibold text-foreground mb-1">{linkedInContact.label}</div>
                      <a 
                        href={linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/80 hover:text-foreground hover:underline transition-colors"
                      >
                        {linkedInContact.value}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {locationContact && (
              <Card className="backdrop-blur-sm bg-card/80 hover:bg-card/90 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <MapPin className="h-5 w-5 text-foreground/80" />
                    <div>
                      <div className="font-semibold text-foreground mb-1">{locationContact.label}</div>
                      <div className="text-foreground/80">{locationContact.value}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;


import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import SpotlightCard from "@/components/SpotlightCard";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { loadContent } from "@/utils/loadContent";
import { 
  User, 
  FolderKanban, 
  Microscope, 
  FileText, 
  Mail, 
  Terminal 
} from "lucide-react";

function Modern() {
  const navigate = useNavigate();
  const location = useLocation();
  const cardsRef = useRef(null);
  const aboutRef = useRef(null);
  const [aboutContent, setAboutContent] = useState(null);

  useEffect(() => {
    loadContent('about').then(setAboutContent);
  }, []);

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

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.nav-card');
      cards.forEach(card => observer.observe(card));
    }

    if (aboutRef.current) {
      aboutRef.current.classList.add("float-in");
      observer.observe(aboutRef.current);
    }

    return () => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.nav-card');
        cards.forEach(card => observer.unobserve(card));
      }
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, [aboutContent]);

  const sections = [
    {
      id: 'projects',
      title: 'Projects',
      description: 'Explore my software projects and technical implementations',
      icon: FolderKanban,
      path: '/modern/projects',
      buttonText: 'Dive into projects →'
    },
    {
      id: 'research',
      title: 'Research',
      description: 'Discover my academic research and publications',
      icon: Microscope,
      path: '/modern/research',
      buttonText: 'Explore research →'
    },
    {
      id: 'resume',
      title: 'Resume',
      description: 'View and download my resume in PDF format',
      icon: FileText,
      path: '/modern/resume',
      buttonText: 'View resume →'
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Get in touch with me for collaborations and opportunities',
      icon: Mail,
      path: '/modern/contact',
      buttonText: 'Get in touch →'
    },
    {
      id: 'linux',
      title: 'Linux',
      description: 'My passion for Linux systems and open-source contributions',
      icon: Terminal,
      path: '/modern/linux',
      buttonText: 'Discover more →'
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  // If we're on a sub-page, show the page content
  // Otherwise show the card grid
  const isSubPage = location.pathname !== '/modern/' && location.pathname.startsWith('/modern/');

  if (isSubPage) {
    return null; // Sub-pages will be rendered by routing
  }

  return (
    <div className="min-h-screen text-foreground">
      <TopBar />
      
      <main>
        <Header />
        
        {/* About Section */}
        {aboutContent && (
          <div className="bg-background py-16 px-6 pb-8">
            <div className="mx-auto max-w-4xl">
              <div ref={aboutRef} className="scroll-float-section">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">About</h1>
                <Separator className="mb-8" />
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {aboutContent.filter(item => item.type === 'paragraph').map((item, index) => (
                    <p key={index} className="text-lg text-foreground/90 mb-6 leading-relaxed">
                      {item.text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Card Navigation Section - Spotlight Cards Carousel */}
        <div className="bg-background pt-4 pb-16 px-6">
          <div className="mx-auto max-w-6xl">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent ref={cardsRef} className="-ml-2 md:-ml-4">
                {sections.map((section, index) => {
                  const Icon = section.icon;
                  const spotlightColors = [
                    'rgba(6, 182, 212, 0.3)', // cyan
                    'rgba(168, 85, 247, 0.3)', // purple
                    'rgba(236, 72, 153, 0.3)', // pink
                    'rgba(59, 130, 246, 0.3)', // blue
                    'rgba(16, 185, 129, 0.3)', // emerald
                  ];
                  
                  return (
                    <CarouselItem key={section.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <div className="nav-card scroll-float-section">
                        <SpotlightCard
                          className={`cursor-pointer w-full h-[400px] border-border bg-card/80 backdrop-blur-sm hover:border-[#00ff41]/50 transition-all duration-300`}
                          spotlightColor={spotlightColors[index % spotlightColors.length]}
                          onClick={() => handleCardClick(section.path)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleCardClick(section.path);
                            }
                          }}
                          aria-label={`Navigate to ${section.title} page`}
                        >
                          <div className="flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="p-3 rounded-lg bg-accent/50 text-accent-foreground transition-colors">
                                <Icon className="h-6 w-6" />
                              </div>
                              <h3 className="text-2xl font-bold text-foreground">{section.title}</h3>
                            </div>
                            <p className="text-base text-muted-foreground mb-6 flex-grow">
                              {section.description}
                            </p>
                            <Button 
                              className="w-full mt-auto"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCardClick(section.path);
                              }}
                            >
                              {section.buttonText}
                            </Button>
                          </div>
                        </SpotlightCard>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="left-2 md:-left-12" />
              <CarouselNext className="right-2 md:-right-12" />
            </Carousel>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Modern;



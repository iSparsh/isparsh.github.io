import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Home, Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function TopBar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { name: "About", id: "about" },
        { name: "Projects", id: "projects" },
        { name: "Research", id: "research" },
        { name: "Resume", id: "resume" },
        { name: "Contact", id: "contact" },
        { name: "Linux", id: "linux" },
      ];

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatTime = (date) => {
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    return `${day} ${hour}:${minute}`;
  };

  const sections = [
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Research", id: "research" },
    { name: "Resume", id: "resume" },
    { name: "Contact", id: "contact" },
    { name: "Linux", id: "linux" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-2">
      <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-4">
        {/* Left: Home Icon + Desktop Navigation / Mobile Hamburger */}
        <div className="flex items-center gap-2 rounded-md border border-border backdrop-blur-xl px-2 md:px-4 py-2.5 h-10 shadow-lg bg-background/20">
          <Link
            to="/"
            className="text-[#00ff41] transition-colors hover:text-[#00ff41]/80 focus:outline-none focus-visible:text-[#00ff41]/80"
            aria-label="Home"
          >
            <Home className="h-4 w-4" />
          </Link>
          
          {/* Desktop: Section Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <div className="h-4 w-px bg-border mx-2" />
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm font-medium transition-colors focus:outline-none focus-visible:text-cyan-400 ${
                  activeSection === section.id
                    ? "text-cyan-400"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {section.name}
              </button>
            ))}
          </div>

          {/* Mobile: Hamburger Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button
                className="ml-2 text-foreground/80 hover:text-foreground focus:outline-none"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] px-6">
              <SheetHeader className="px-0">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-6 px-0">
                {/* Navigation Sections */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-semibold text-foreground/60 mb-2">Navigation</h3>
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`text-left text-base font-medium transition-colors py-2 px-4 rounded-md ${
                        activeSection === section.id
                          ? "text-cyan-400 bg-cyan-400/10"
                          : "text-foreground/80 hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      {section.name}
                    </button>
                  ))}
                </div>

                {/* Separator */}
                <div className="h-px bg-border" />

                {/* Theme Toggle */}
                <div className="flex items-center justify-between px-4">
                  <span className="text-sm font-semibold text-foreground/60">Theme</span>
                  <ThemeToggle />
                </div>

                {/* Separator */}
                <div className="h-px bg-border" />

                {/* Social Links */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-semibold text-foreground/60 mb-2 px-4">Connect</h3>
                  <a
                    href="mailto:spmishra@wisc.edu"
                    className="flex items-center gap-3 text-foreground/80 hover:text-foreground py-2 px-4 rounded-md hover:bg-accent transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Email</span>
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-foreground/80 hover:text-foreground py-2 px-4 rounded-md hover:bg-accent transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-foreground/80 hover:text-foreground py-2 px-4 rounded-md hover:bg-accent transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Center: System Time - Desktop Only */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 rounded-md border border-border backdrop-blur-xl px-4 py-2.5 h-10 shadow-lg bg-background/20">
          <div className="text-xs font-mono text-foreground/90">
            {formatTime(currentTime)}
          </div>
        </div>

        {/* Right: Utilities (Social Links + Theme Toggle) - Desktop Only */}
        <div className="hidden md:flex items-center gap-2 rounded-md border border-border backdrop-blur-xl px-4 py-2.5 h-10 shadow-lg bg-background/20">
          <ThemeToggle />
          <div className="h-4 w-px bg-border mx-2" />
          <a
            href="mailto:spmishra@wisc.edu"
            className="text-foreground/80 transition-colors hover:text-foreground focus:outline-none focus-visible:text-foreground"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          {/* Social links - can be updated from contact.json later */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/80 transition-colors hover:text-foreground focus:outline-none focus-visible:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/80 transition-colors hover:text-foreground focus:outline-none focus-visible:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default TopBar;

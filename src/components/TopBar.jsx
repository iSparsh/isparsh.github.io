import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Home, Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function TopBar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Determine active section based on current route
    const path = location.pathname;
    if (path.startsWith('/modern/')) {
      const section = path.split('/modern/')[1] || '';
      // If on /modern/ or /modern, it's the about/home page
      setActiveSection(section === '' ? 'about' : section);
    } else {
      setActiveSection('');
    }
  }, [location]);

  const formatTime = (date) => {
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    return `${day} ${hour}:${minute}`;
  };

  const sections = [
    { name: "About", id: "about", path: "/modern/" },
    { name: "Projects", id: "projects", path: "/modern/projects" },
    { name: "Research", id: "research", path: "/modern/research" },
    { name: "Resume", id: "resume", path: "/modern/resume" },
    { name: "Contact", id: "contact", path: "/modern/contact" },
    { name: "Linux", id: "linux", path: "/modern/linux" },
  ];

  const navigateToSection = (path) => {
    navigate(path);
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-2">
      <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-4">
        {/* Left: Home Icon + Desktop Navigation / Mobile Hamburger */}
        <div className="flex items-center gap-2 rounded-md border border-border backdrop-blur-xl px-2 md:px-4 py-2.5 h-10 shadow-lg bg-background/20">
          <Link
            to="/"
            className={`transition-colors focus:outline-none focus-visible:text-[#00ff41]/80 ${
              theme === 'light' 
                ? 'text-green-600 hover:text-green-700' 
                : 'text-[#00ff41] hover:text-[#00ff41]/80'
            }`}
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
                onClick={() => navigateToSection(section.path)}
                className={`text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:text-cyan-400 ${
                  activeSection === section.id
                    ? "text-cyan-400 scale-110"
                    : "text-foreground/80 hover:text-foreground hover:text-[#00ff41] hover:scale-110"
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
                      onClick={() => navigateToSection(section.path)}
                      className={`text-left text-base font-medium transition-all duration-300 py-2 px-4 rounded-md ${
                        activeSection === section.id
                          ? "text-cyan-400 bg-cyan-400/10"
                          : "text-foreground/80 hover:text-foreground hover:text-[#00ff41] hover:bg-accent hover:scale-105"
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
          <a
            href="https://github.com/iSparsh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/80 transition-colors hover:text-foreground focus:outline-none focus-visible:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/sparsh-mishra-24b946241/"
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

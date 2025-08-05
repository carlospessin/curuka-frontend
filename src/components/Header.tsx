import { Button } from "@/components/ui/button";
import { Menu, X, TabletSmartphone } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      {/* <div className="border-b border-gray-100" style={{ backgroundColor: '#c9dde2' }}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <span>📍</span>
                <span>Paiçandu, PR - Brasil</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <span>✉️</span>
                <span>info@curuka.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Siga-nos:</span>
              <div className="flex space-x-2">
                <a href="#" className="text-gray-600 hover:text-primary">📘</a>
                <a href="#" className="text-gray-600 hover:text-primary">🐦</a>
                <a href="#" className="text-gray-600 hover:text-primary">💼</a>
                <a href="#" className="text-gray-600 hover:text-primary">📺</a>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">🌟</span>
            </div>
            <span className="text-2xl font-bold text-foreground">Curuka Kid's</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#testimonials" className="text-foreground hover:text-primary transition-colors font-medium">
              Depoimentos
            </a>
             <a href="#newsletter" className="text-foreground hover:text-primary transition-colors font-medium">
              Newsletter
            </a>
            {/* <div className="flex items-center space-x-1">
              <span className="text-accent-orange">📁</span>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
                Category
              </a>
              <span className="text-gray-400">▼</span>
            </div>
            <div className="flex items-center space-x-1">
              <a href="#home" className="text-foreground hover:text-primary transition-colors font-medium">
                Home
              </a>
              <span className="text-gray-400">▼</span>
            </div>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
              About Us
            </a>
            <div className="flex items-center space-x-1">
              <a href="#programs" className="text-foreground hover:text-primary transition-colors font-medium">
                Programs
              </a>
              <span className="text-gray-400">▼</span>
            </div>
            <div className="flex items-center space-x-1">
              <a href="#pages" className="text-foreground hover:text-primary transition-colors font-medium">
                Pages
              </a>
              <span className="text-gray-400">▼</span>
            </div>
            <div className="flex items-center space-x-1">
              <a href="#blog" className="text-foreground hover:text-primary transition-colors font-medium">
                Blog
              </a>
              <span className="text-gray-400">▼</span>
            </div> */}
            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contato
            </a>
          </nav>

          {/* Right section */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="hero" size="sm" className="bg-accent-orange hover:bg-accent-orange/90">
              Baixe o App
              <TabletSmartphone className="w-4 h-4 text-white" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <a
                href="#category"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Category
              </a>
              <a
                href="#home"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#about"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </a>
              <a
                href="#programs"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Programs
              </a>
              <a
                href="#pages"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Pages
              </a>
              <a
                href="#blog"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="hero" size="sm" className="bg-accent-orange hover:bg-accent-orange/90">
                  Get A Quote →
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
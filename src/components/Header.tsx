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
                href="#testmonials"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Depoimentos
              </a>
              <a
                href="#newsletter"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Newsletter
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="hero" size="sm" className="bg-accent-orange hover:bg-accent-orange/90">
                  Baixe o App
                  <TabletSmartphone className="w-4 h-4 text-white" />
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
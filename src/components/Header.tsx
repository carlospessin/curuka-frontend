import { Button } from "@/components/ui/button";
import { Menu, X, TabletSmartphone } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between overflow-x-hidden">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">🌟</span>
            </div>
            <span className="text-2xl font-bold text-foreground">Curuka Kid's</span>
          </div>

          {/* Menu Desktop */}
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

          {/* Botão Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="hero" size="sm" className="bg-accent-orange hover:bg-accent-orange/90">
              Baixe o App
              <TabletSmartphone className="w-4 h-4 text-white" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <a href="#testimonials" className="text-foreground hover:text-primary transition-colors font-medium">
                Depoimentos
              </a>
              <a href="#newsletter" className="text-foreground hover:text-primary transition-colors font-medium">
                Newsletter
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
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
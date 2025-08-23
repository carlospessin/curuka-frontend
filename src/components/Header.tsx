import { Button } from "@/components/ui/button";
import { Menu, X, TabletSmartphone, LogOut } from "lucide-react";
import { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import axios from "axios";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = localStorage.getItem("auth_token");

  const handleLogout = async () => {
    try {
      if (!token) return;

      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      localStorage.removeItem("auth_token");
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">🌟</span>
            </div>
            <span className="text-2xl font-bold text-foreground text-gray-600">
              Curuka <span className="text-orange-400">Kid's</span>
            </span>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {token && (
              <Link
                to="/dashboard"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Dashboard
              </Link>
            )}
            <Link
              to="#testimonials"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Depoimentos
            </Link>
            <Link
              to="#newsletter"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Newsletter
            </Link>
            <Link
              to="#contact"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Contato
            </Link>
          </nav>

          {/* Botões Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="loja">
              <Button
                variant="hero"
                size="sm"
                className="bg-accent-orange hover:bg-accent-orange/90"
              >
                Baixe o App
                <TabletSmartphone className="w-4 h-4 text-white" />
              </Button>
            </Link>

            {/* Se NÃO está logado → mostra Entrar */}
            {!token && (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Entrar
                </Button>
              </Link>
            )}

            {/* Se está logado → mostra Sair */}
            {token && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            )}
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
              {token && (
                <Link
                  to="/dashboard"
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <a
                href="#testimonials"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Depoimentos
              </a>
              <a
                href="#newsletter"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Newsletter
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Contato
              </a>

              <div className="flex flex-col space-y-2 pt-4">
                <Link to="loja">
                  <Button
                    variant="hero"
                    size="sm"
                    className="bg-accent-orange hover:bg-accent-orange/90"
                  >
                    Baixe o App
                    <TabletSmartphone className="w-4 h-4 text-white" />
                  </Button>
                </Link>

                {/* Se NÃO está logado → Entrar */}
                {!token && (
                  <Link to="/login">
                    <Button variant="outline" size="sm">
                      Entrar
                    </Button>
                  </Link>
                )}

                {/* Se está logado → Sair */}
                {token && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import { Button } from "@/components/ui/button";
import { Play, Star, Users, BookOpen, MapPin, Mail, MapPinCheck } from "lucide-react";
import heroKids from "@/assets/hero-girl-2.png";
import rightShape from "@/assets/right-shape.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
<section
  id="home"
  className="relative min-h-[50vh] sm:min-h-screen flex items-center bg-[#f5ede0] font-quicksand px-6 lg:px-24"
>
      {/* Lado esquerdo */}
        <div className="max-w-xl space-y-8 z-10 relative mx-auto text-center md:text-left flex flex-col items-center md:items-start">
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent-green rounded-full opacity-20 float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent-pink rounded-full opacity-30 bounce-gentle"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-accent-yellow rounded-full opacity-25 float"></div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-600 leading-tight">
          Curuka <span className="text-orange-400">Kid's</span> <br />
        </h1>
        <p className="text-4xl text-gray-600 max-w-md leading-relaxed !m-0">
          Segurança Infantil
        </p>
        <p className="text-gray-600 max-w-md leading-relaxed">
          Um sistema moderno que utiliza NFC para proteger crianças em tempo real.
          Segurança e tranquilidade na palma da sua mão.
        </p>

        <div className="flex space-x-6">
          <Link to="/register">
            <Button className="bg-orange-400 hover:bg-orange-500 text-white rounded-full px-6 py-3 font-semibold shadow-md transition">
              Criar Conta
            </Button>
          </Link>

          <Link to="/login">
            <Button className="bg-white hover:bg-black/10 text-gray-700 rounded-full px-6 py-3 font-semibold shadow-md transition">
              Já tenho conta
            </Button>
          </Link>
        </div>
      </div>

      {/* rightShape: ajustar largura no mobile e ocultar */}
      <div className="absolute top-0 right-0 bottom-0 z-5 pointer-events-none
                      w-40 md:w-80 lg:w-[500px] 
                      hidden sm:block">
        <img
          src={rightShape}
          alt="shape-img"
          className="h-full w-auto object-contain"
        />
      </div>

      {/* Lado direito: imagem circular e elementos flutuantes */}
      <div className="hidden lg:flex relative flex-1 justify-center z-10 overflow-visible">
        <div className="relative w-64 md:w-[500px] h-64 md:h-[500px] mt-6">
          <img
            src={heroKids}
            alt="Crianças sorrindo"
            className="object-cover w-full h-full rounded-full"
          />
        </div>

        {/* Floating Icons */}
        <div className="absolute top-16 left-8 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center shadow-lg float">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <MapPinCheck className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="absolute top-40 right-20 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center shadow-lg float">
          <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center">
            <MapPinCheck className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="absolute bottom-32 left-20 w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center shadow-lg float">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
            <MapPinCheck className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Floating Cards */}
        <div className="absolute top-6 left-40 bg-white rounded-2xl p-4 shadow-card bounce-gentle">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent-green rounded-full flex items-center justify-center">
              <MapPinCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold">Maria Eduarda</div>
              <div className="text-xs text-muted-foreground">Localizada</div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-card bounce-gentle">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent-yellow rounded-full flex items-center justify-center">
              <MapPinCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold">João Pedro</div>
              <div className="text-xs text-muted-foreground">Localizado</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

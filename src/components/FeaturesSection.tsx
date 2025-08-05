import { Brain, Heart, Trophy, Users, BookOpen, Palette, SmartphoneNfc, Shirt, TreePalm } from "lucide-react";
import kidsLearning from "@/assets/kids-learning.jpg";

const FeaturesSection = () => {
  const features = [
    {
      icon: SmartphoneNfc,
      title: "Tecnologia NFC",
      description: "É uma tecnologia que facilita transferência de dados e outras interações rápidas e seguras entre dispositivos compatíveis. ",
      color: "bg-accent-purple"
    },
    {
      icon: Shirt,
      title: "Roupas",
      description: "Nossas peças são fabricadas com a mais alta qualidade, mantendo o conforto e personalidade.",
      color: "bg-accent-pink"
    },
    {
      icon: TreePalm,
      title: "Ambientes",
      description: "Seja praia, shoppings, eventos... a Curuka está presente em todos os lugares. ",
      color: "bg-accent-yellow"
    }
  ];

  const stats = [
    { number: "95%", label: "Satisfação dos Pais", color: "text-accent-green" },
    { number: "500+", label: "Crianças Felizes", color: "text-accent-pink" },
    { number: "50+", label: "Atividades Diferentes", color: "text-accent-purple" },
    { number: "24/7", label: "Suporte Online", color: "text-primary" }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Top Choice Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent-yellow/20 rounded-full px-6 py-3 mb-6">
            <Trophy className="w-5 h-5 text-accent-yellow" />
            <span className="font-medium text-foreground">Top escolha para crianças</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Encontramos sua pessoa com
            <span className="text-gradient block leading-snug">tecnologia NFC</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nossa tecnologia adapta-se ao ritmo de cada criança, 
            respeitando suas individualidades e trazendo mais segurança aos pais.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Image Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src={kidsLearning}
              alt="Crianças aprendendo juntas"
              className="w-full rounded-3xl shadow-card"
            />
            
            {/* Floating achievement badges */}
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-card">
              <div className="flex items-center space-x-2">
                <Palette className="w-6 h-6 text-accent-pink" />
                <div>
                  <div className="text-sm font-bold">Arte & Criatividade</div>
                  <div className="text-xs text-muted-foreground">Desenvolvimento criativo</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-card">
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-accent-green" />
                <div>
                  <div className="text-sm font-bold">Trabalho em Equipe</div>
                  <div className="text-xs text-muted-foreground">Habilidades sociais</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">
              Conte-nos Sobre Nossa
              <span className="text-gradient block">Leitura e Cultural</span>
            </h3>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              Acreditamos que a educação vai além dos livros didáticos. Nossa abordagem cultural 
              enriquece o aprendizado através de histórias, artes e tradições que conectam as 
              crianças com o mundo ao seu redor.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-accent-green rounded-full flex items-center justify-center mt-1">
                  <BookOpen className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Biblioteca Digital Interativa</h4>
                  <p className="text-muted-foreground text-sm">Acesso a milhares de livros digitais com recursos interativos</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-accent-pink rounded-full flex items-center justify-center mt-1">
                  <Palette className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Atividades Culturais</h4>
                  <p className="text-muted-foreground text-sm">Exposição a diferentes culturas através de música, arte e tradições</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-accent-yellow rounded-full flex items-center justify-center mt-1">
                  <Heart className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Desenvolvimento de Valores</h4>
                  <p className="text-muted-foreground text-sm">Formação de caráter através de histórias inspiradoras</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
import { Star, Award, Heart, Users } from "lucide-react";
import instructor1 from "@/assets/instructor-1.jpg";
import instructor2 from "@/assets/instructor-2.jpg";

const InstructorsSection = () => {
  const instructors = [
    {
      name: "Dra. Maria Silva",
      role: "Especialista em Educação Infantil",
      image: instructor1,
      rating: 4.9,
      students: 150,
      experience: "8 anos",
      specialties: ["Pedagogia Lúdica", "Desenvolvimento Cognitivo"],
      color: "accent-pink"
    },
    {
      name: "Prof. João Santos",
      role: "Especialista em Matemática Divertida",
      image: instructor2,
      rating: 4.8,
      students: 120,
      experience: "6 anos",
      specialties: ["Matemática Criativa", "Resolução de Problemas"],
      color: "accent-green"
    },
    {
      name: "Ana Costa",
      role: "Arte e Criatividade",
      image: instructor1,
      rating: 5.0,
      students: 200,
      experience: "10 anos",
      specialties: ["Artes Visuais", "Expressão Criativa"],
      color: "accent-yellow"
    },
    {
      name: "Carlos Mendes",
      role: "Educação Física Adaptada",
      image: instructor2,
      rating: 4.7,
      students: 180,
      experience: "7 anos",
      specialties: ["Psicomotricidade", "Esportes Infantis"],
      color: "accent-purple"
    }
  ];

  return (
    <section id="instructors" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3 mb-6">
            <Award className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">Nossos Especialistas</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Instrutores
            <span className="text-gradient block">Especialistas</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nossa equipe é formada por educadores apaixonados e altamente qualificados, 
            dedicados ao desenvolvimento integral de cada criança.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group border border-border/50"
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-20 h-20 rounded-2xl mx-auto object-cover group-hover:scale-105 transition-transform"
                />
              <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${
                instructor.color === 'accent-pink' ? 'bg-accent-pink' :
                instructor.color === 'accent-green' ? 'bg-accent-green' :
                instructor.color === 'accent-yellow' ? 'bg-accent-yellow' :
                'bg-accent-purple'
              }`}>
                <Heart className="w-4 h-4 text-white" />
              </div>
              </div>

              {/* Instructor Info */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-foreground mb-1">{instructor.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{instructor.role}</p>
                
                {/* Rating */}
                <div className="flex items-center justify-center space-x-1 mb-3">
                  <Star className="w-4 h-4 text-accent-yellow fill-current" />
                  <span className="text-sm font-semibold text-foreground">{instructor.rating}</span>
                  <span className="text-xs text-muted-foreground">({instructor.students} alunos)</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-sm font-bold text-foreground">{instructor.experience}</div>
                  <div className="text-xs text-muted-foreground">Experiência</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-foreground">{instructor.students}</div>
                  <div className="text-xs text-muted-foreground">Alunos</div>
                </div>
              </div>

              {/* Specialties */}
              <div className="space-y-2">
                {instructor.specialties.map((specialty, idx) => (
                  <div
                    key={idx}
                    className={`text-xs px-3 py-1 rounded-full text-center font-medium ${
                      instructor.color === 'accent-pink' ? 'bg-accent-pink/10 text-accent-pink' :
                      instructor.color === 'accent-green' ? 'bg-accent-green/10 text-accent-green' :
                      instructor.color === 'accent-yellow' ? 'bg-accent-yellow/10 text-accent-yellow' :
                      'bg-accent-purple/10 text-accent-purple'
                    }`}
                  >
                    {specialty}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-accent-pink/10 via-accent-yellow/10 to-accent-green/10 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Quer fazer parte da nossa equipe?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Estamos sempre em busca de educadores apaixonados que compartilhem 
              nossa visão de transformar a educação infantil.
            </p>
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
              Candidatar-se Agora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
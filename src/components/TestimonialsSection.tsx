import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Foi um momento de descuido e minha filha parecia ter desaparecido. Recebi a notificação no app que ela estava próximo ao salva vidas. Que susto!",
      author: "Marina Oliveira",
      role: "Mãe da Sofia (6 anos)",
      rating: 5,
      color: "bg-accent-pink"
    },
    {
      quote: "Fui no banheiro do shopping com o Miguel mas ele saiu antes de mim com um amiguinho e se perdeu.",
      author: "Roberto Costa",
      role: "Pai do Miguel (8 anos)", 
      rating: 5,
      color: "bg-accent-green"
    },
    {
      quote: "A plataforma é muito intuitiva. Recomendo para todos os pais!",
      author: "Juliana Santos",
      role: "Mãe da Isabella (7 anos)",
      rating: 5,
      color: "bg-accent-yellow"
    }
  ];

  return (
    <section className="py-20 bg-muted/30" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-soft">
            <Quote className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">Depoimentos</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            As palavras dos pais é o que
            <span className="text-gradient block">move a Curuka Kid's</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nada nos deixa mais felizes do que ver o impacto positivo  
            através dos olhos e palavras de seus pais.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-2 relative group"
            >
              {/* Quote Icon */}
              <div className={`absolute -top-4 -left-4 w-12 h-12 ${testimonial.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4 pt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent-yellow fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <h4 className="font-bold text-foreground">{testimonial.author}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-3xl p-12 shadow-card">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent-green mb-2">98%</div>
              <div className="text-muted-foreground">Satisfação dos Pais</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-pink mb-2">500+</div>
              <div className="text-muted-foreground">Famílias Felizes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-yellow mb-2">4.9</div>
              <div className="text-muted-foreground">Avaliação Média</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-purple mb-2">95%</div>
              <div className="text-muted-foreground">Renovam Anuidade</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
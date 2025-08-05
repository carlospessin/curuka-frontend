import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogSection = () => {
  const blogPosts = [
    {
      title: "5 Dicas para Tornar o Aprendizado Mais Divertido em Casa",
      excerpt: "Descubra métodos simples e eficazes para engajar seu filho nos estudos através de atividades lúdicas e educativas.",
      author: "Dra. Maria Silva",
      date: "15 Nov 2024",
      category: "Educação",
      readTime: "5 min",
      color: "accent-pink"
    },
    {
      title: "Como Desenvolver a Criatividade das Crianças",
      excerpt: "Estratégias práticas para estimular a imaginação e criatividade dos pequenos no dia a dia.",
      author: "Ana Costa",
      date: "12 Nov 2024", 
      category: "Criatividade",
      readTime: "7 min",
      color: "accent-green"
    },
    {
      title: "A Importância do Brincar no Desenvolvimento Infantil",
      excerpt: "Entenda como as brincadeiras contribuem para o desenvolvimento cognitivo, social e emocional das crianças.",
      author: "Prof. João Santos",
      date: "10 Nov 2024",
      category: "Desenvolvimento",
      readTime: "6 min",
      color: "accent-yellow"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3 mb-6">
            <Tag className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">Blog & Notícias</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Explore Blogs e
            <span className="text-gradient block">Notícias</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mantenha-se atualizado com as últimas tendências em educação infantil, 
            dicas práticas para pais e insights de nossos especialistas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-3xl shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group overflow-hidden border border-border/50"
            >
              {/* Header */}
              <div className={`h-2 ${
                post.color === 'accent-pink' ? 'bg-accent-pink' :
                post.color === 'accent-green' ? 'bg-accent-green' :
                'bg-accent-yellow'
              }`}></div>
              
              <div className="p-6">
                {/* Category & Read Time */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    post.color === 'accent-pink' ? 'bg-accent-pink/10 text-accent-pink' :
                    post.color === 'accent-green' ? 'bg-accent-green/10 text-accent-green' :
                    'bg-accent-yellow/10 text-accent-yellow'
                  }`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.readTime} leitura</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <button className="text-primary hover:text-primary/80 transition-colors group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="group">
            Ver Todos os Posts
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
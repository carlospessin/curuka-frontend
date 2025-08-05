import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Gift, Bell } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Inscrição realizada!",
        description: "Você receberá nossas novidades em breve.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-20 relative overflow-hidden" id="newsletter">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero opacity-90"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-accent-pink/20 via-transparent to-accent-yellow/20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-white/20 rounded-full float"></div>
      <div className="absolute bottom-10 right-10 w-12 h-12 bg-white/30 rounded-full bounce-gentle"></div>
      <div className="absolute top-1/2 left-20 w-8 h-8 bg-white/25 rounded-full float"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <Gift className="w-5 h-5 text-white" />
            <span className="font-medium text-white">Newsletter Gratuita</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Inscreva-se em Nossa Newsletter
            <span className="block">e fique por dentro das nossas atualizações</span>
          </h2>

          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Receba informações sobre nossas atualizações
            e as últimas novidades sobre segurança infantil diretamente no seu e-mail.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubscribe} className="max-w-lg mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Digite seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 bg-white/90 backdrop-blur-sm border-0 text-foreground placeholder:text-muted-foreground rounded-xl"
                  required
                />
              </div>
              <Button 
                type="submit"
                variant="secondary" 
                size="lg"
                className="h-14 px-8 bg-white text-primary hover:bg-white/90 font-semibold rounded-xl"
              >
                Inscrever-se
              </Button>
            </div>
          </form>

          {/* Benefits */}
          <div className="grid sm:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Dicas Semanais</h3>
              <p className="text-white/80 text-sm">Atividades e estratégias de segurança toda semana</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Conteúdo Exclusivo</h3>
              <p className="text-white/80 text-sm">Materiais gratuitos só para assinantes</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Sem Spam</h3>
              <p className="text-white/80 text-sm">Apenas conteúdo de qualidade, cancelamento fácil</p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/70 text-sm">
            <span>✨ Mais de 5.000 pais inscritos</span>
            <span>📧 Enviado toda terça-feira</span>
            <span>🔒 Seus dados estão seguros</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
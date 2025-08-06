import { Heart, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { HashLink as Link } from 'react-router-hash-link';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "Sobre Nós", href: "about" },
      { name: "Newsletter", href: "#newsletter" },
      { name: "Depoimentos", href: "#testimonials" }
    ],
    tecnologic: [
      { name: "NFC", href: "nfc" },
    ],
    support: [
      { name: "Central de Ajuda", href: "help" },
      { name: "FAQ", href: "faq" },
      { name: "Suporte Técnico", href: "support" }
    ],
    legal: [
      { name: "Política de Privacidade", href: "privacy" },
      { name: "Termos de Uso", href: "terms" },
      { name: "Cookies", href: "cookies" },
      { name: "LGPD", href: "lgpd" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-500" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-blue-400" },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-500" }
  ];

  return (
    <footer className="bg-gradient-to-br from-foreground via-foreground to-foreground/95 text-gray" id="contact">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <span className="text-3xl font-bold">Curuka</span>
            </div>
            
            <p className="text-gray/80 text-lg leading-relaxed max-w-md">
              Segurança e tranquilidade na palma da sua mão.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-gray/90">(11) 99999-9999</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-gray/90">contato@curuka.com.br</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-gray/90">Paiçandu, PR - Brasil</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  to={social.href}
                  aria-label={social.label}
                  className={`w-10 h-10 bg-gray/10 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-gray/20 hover:scale-110 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray/70 hover:text-orange-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold">Tecnologia</h3>
            <ul className="space-y-3">
              {footerLinks.tecnologic.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray/70 hover:text-gray hover:text-orange-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold">Suporte</h3>
            <ul className="space-y-3 mb-8">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray/70 hover:text-gray hover:text-orange-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="text-xl font-bold">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray/70 hover:text-gray hover:text-orange-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray/70 text-center md:text-left">
              © {currentYear} Curuka. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center space-x-2 text-gray/70">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
              <span>para crianças felizes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-r from-accent-pink/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-r from-accent-yellow/10 to-transparent rounded-full blur-2xl"></div>
    </footer>
  );
};

export default Footer;
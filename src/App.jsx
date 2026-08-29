import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Smartphone, Laptop, Monitor, Tablet, Gamepad2, Wrench, 
  CheckCircle2, Clock, ShieldCheck, Cpu, ChevronDown, MapPin, 
  Phone, Mail, MessageCircle, Star, ArrowRight, Activity, 
  Lock, Zap, Send
} from 'lucide-react';

// --- CONFIGURAÇÕES GERAIS ---
// Centralizamos os dados fictícios aqui para fácil manutenção
const CONFIG = {
  companyName: "RepairXpert",
  address: "Rua das Tecnologias, 250 — Centro, Atibaia/SP",
  whatsapp: "(11) 99999-0000",
  whatsappRaw: "5511999990000", // Para o link
  phone: "(11) 4000-2026",
  email: "contato@repairxpert.com.br",
  hours: "Segunda a sexta, das 9h às 18h; sábado, das 9h às 13h",
  wppMessage: "Olá! Encontrei a RepairXpert pelo site e gostaria de solicitar uma avaliação para meu equipamento."
};

const WHATSAPP_LINK = `https://wa.me/${CONFIG.whatsappRaw}?text=${encodeURIComponent(CONFIG.wppMessage)}`;

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // SEO & Head Setup
  useEffect(() => {
    document.title = "RepairXpert | Assistência Técnica Especializada em Atibaia";
    document.documentElement.lang = "pt-BR";
    document.documentElement.style.scrollBehavior = "smooth";
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-[#7209B7] selection:text-white">
      {/* Importando Fontes Necessárias */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, .font-heading { font-family: 'Space Grotesk', sans-serif; }
        
        /* Ocultar barra de rolagem no carrossel mas manter a funcionalidade */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Pattern sutil para o fundo */
        .bg-pattern {
          background-image: radial-gradient(rgba(72, 149, 239, 0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        /* Estilo para imagem do logotipo com fundo transparente (blend mode) se necessário */
        .logo-img {
           mix-blend-mode: screen; /* Ajuda a remover fundos escuros de imagens jpeg em fundos escuros, se necessário */
           filter: drop-shadow(0 0 8px rgba(72, 149, 239, 0.3));
        }
      `}} />

      <Header isScrolled={isScrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <main>
        <HeroSection />
        <CredibilityStrip />
        <ServicesSection />
        <HowItWorksSection />
        <DifferentiatorsSection />
        <AboutSection />
        <TestimonialsSection />
        <CTASection />
        <FAQSection />
        <ContactFormSection />
        <LocationSection />
      </main>

      <Footer />
      
      {/* Botão Flutuante WhatsApp */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/20 hover:scale-110 transition-transform duration-300 flex items-center justify-center"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}

// --- COMPONENTES DA INTERFACE ---

function Header({ isScrolled, mobileMenuOpen, setMobileMenuOpen }) {
  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Como funciona', href: '#como-funciona' },
    { name: 'Sobre nós', href: '#sobre' },
    { name: 'Avaliações', href: '#avaliacoes' },
    { name: 'Dúvidas', href: '#faq' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl">
        {/* Logo Atualizado com a imagem fornecida */}
        <a href="#inicio" className="flex items-center gap-2 group shrink-0">
          <img 
            src="https://i.imgur.com/oYCzNWE.png" 
            alt="Logotipo RepairXpert" 
            className="h-10 md:h-12 w-auto object-contain logo-img group-hover:scale-105 transition-transform duration-300" 
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-[#4895EF] transition-colors">{link.name}</a>
              </li>
            ))}
          </ul>
          <a href="#contato" className="px-6 py-2.5 bg-gradient-to-r from-[#4895EF] to-[#7209B7] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#7209B7]/25 hover:opacity-90 transition-all">
            Solicitar orçamento
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-zinc-300 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-zinc-900 border-b border-zinc-800 py-4 px-6 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-zinc-300 hover:text-[#4895EF] py-2 border-b border-zinc-800/50"
            >
              {link.name}
            </a>
          ))}
          <a href="#contato" onClick={() => setMobileMenuOpen(false)} className="mt-4 text-center w-full px-6 py-3 bg-gradient-to-r from-[#4895EF] to-[#7209B7] text-white font-medium rounded-lg">
            Solicitar orçamento
          </a>
        </div>
      )}
    </header>
  );
}

function HeroSection() {
  return (
    <section id="inicio" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background FX */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#3A0CA3]/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#4895EF]/10 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/4 pointer-events-none" />
      <div className="absolute inset-0 bg-pattern -z-20 opacity-50" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <div className="flex flex-col gap-6 items-start z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-[#4895EF] animate-pulse" />
              Assistência Técnica Especializada
            </div>
            
            <h1 className="font-heading text-5xl lg:text-7xl font-bold leading-tight text-white">
              Seu aparelho parou? <br />A <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4895EF] to-[#7209B7]">RepairXpert</span> é a solução.
            </h1>
            
            <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
              Diagnóstico preciso, atendimento transparente e reparos realizados por especialistas. Recupere seu equipamento com segurança, agilidade e garantia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
              <a href="#contato" className="px-8 py-4 bg-gradient-to-r from-[#4895EF] to-[#7209B7] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#4895EF]/25 hover:scale-105 transition-all text-center flex items-center justify-center gap-2">
                Solicitar orçamento <ArrowRight size={18} />
              </a>
              <a href="#servicos" className="px-8 py-4 bg-zinc-900 border border-zinc-700 text-white font-medium rounded-xl hover:bg-zinc-800 hover:border-zinc-600 transition-all text-center">
                Conhecer os serviços
              </a>
            </div>

            <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-zinc-800/50 w-full">
              {[
                { icon: <Activity className="text-[#4895EF]" size={20} />, text: "Diagnóstico especializado" },
                { icon: <ShieldCheck className="text-[#7209B7]" size={20} />, text: "Garantia no serviço" },
                { icon: <Zap className="text-[#4895EF]" size={20} />, text: "Atendimento ágil" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-zinc-300 font-medium">
                  {item.icon} {item.text}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 lg:ml-auto w-full max-w-lg aspect-square lg:aspect-auto lg:h-[600px] rounded-3xl overflow-hidden border border-zinc-800/50 shadow-2xl">
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop" 
              alt="Técnico realizando manutenção em placa de circuito" 
              className="w-full h-full object-cover object-center brightness-75 contrast-125"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

function CredibilityStrip() {
  const stats = [
    { value: "+3.000", label: "Aparelhos reparados" },
    { value: "100%", label: "Técnicos especializados" },
    { value: "Premium", label: "Peças selecionadas" },
    { value: "90 dias", label: "Garantia nos serviços" },
  ];

  return (
    <div className="bg-zinc-900 border-y border-zinc-800 py-10 relative z-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-zinc-800">
          {stats.map((stat, i) => (
            <div key={i} className={`flex flex-col items-center justify-center text-center ${i % 2 !== 0 ? 'border-l border-zinc-800 md:border-none pl-8 md:pl-0' : ''}`}>
              <span className="text-3xl lg:text-4xl font-heading font-bold text-white mb-2">{stat.value}</span>
              <span className="text-sm text-zinc-400 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesSection() {
  const services = [
    {
      icon: <Smartphone className="text-[#4895EF] w-8 h-8" />,
      title: "Smartphones",
      desc: "Troca de tela, bateria, conector de carga, câmera, alto-falante e reparos internos."
    },
    {
      icon: <Laptop className="text-[#7209B7] w-8 h-8" />,
      title: "Notebooks",
      desc: "Manutenção, limpeza, troca de teclado, tela, bateria, armazenamento e reparos de placa."
    },
    {
      icon: <Monitor className="text-[#4895EF] w-8 h-8" />,
      title: "Computadores",
      desc: "Diagnóstico, manutenção, montagem, upgrade, limpeza e solução de falhas de desempenho."
    },
    {
      icon: <Tablet className="text-[#7209B7] w-8 h-8" />,
      title: "Tablets",
      desc: "Troca de tela, bateria, conectores e solução de problemas de funcionamento."
    },
    {
      icon: <Gamepad2 className="text-[#4895EF] w-8 h-8" />,
      title: "Consoles",
      desc: "Limpeza, manutenção preventiva, superaquecimento, conectores e falhas de inicialização."
    },
    {
      icon: <Cpu className="text-[#7209B7] w-8 h-8" />,
      title: "Recuperação e Software",
      desc: "Formatação, instalação de sistemas, remoção de ameaças, backup e recuperação."
    }
  ];

  return (
    <section id="servicos" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Soluções técnicas para seus equipamentos</h2>
          <p className="text-zinc-400">Identificamos a origem do problema e recomendamos apenas o que realmente precisa ser feito, com total transparência.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div key={i} className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:bg-zinc-900 hover:border-[#4895EF]/50 transition-all duration-300 hover:-translate-y-1 cursor-default">
              <div className="w-14 h-14 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">{service.desc}</p>
              <a href="#contato" className="inline-flex items-center text-[#4895EF] text-sm font-medium hover:text-[#7209B7] transition-colors gap-1 group/link">
                Saiba mais <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { num: "01", title: "Solicite o atendimento", desc: "Conte o que aconteceu e informe o modelo do equipamento pelo nosso formulário ou WhatsApp." },
    { num: "02", title: "Receba o diagnóstico", desc: "Nossa equipe avalia o aparelho minuciosamente e identifica a causa raiz do problema." },
    { num: "03", title: "Aprove o orçamento", desc: "Transparência total. O serviço só começa depois da sua autorização e clareza dos valores." },
    { num: "04", title: "Retire seu equipamento", desc: "Após testes finais de qualidade, o aparelho é entregue pronto para voltar à sua rotina." },
  ];

  return (
    <section id="como-funciona" className="py-24 bg-zinc-900 relative overflow-hidden">
      {/* Pattern decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pattern opacity-10 pointer-events-none mix-blend-overlay rounded-full" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/3">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">Seu equipamento em boas mãos, do início ao fim</h2>
            <p className="text-zinc-400 mb-8">Criamos um processo simples e transparente para que você saiba exatamente o que está acontecendo com seu aparelho em cada etapa.</p>
            <a href="#contato" className="inline-flex px-6 py-3 bg-white text-zinc-950 font-bold rounded-lg hover:bg-zinc-200 transition-colors">
              Quero solicitar um diagnóstico
            </a>
          </div>

          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6 w-full">
            {steps.map((step, i) => (
              <div key={i} className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 text-5xl font-heading font-bold text-zinc-800/30 group-hover:text-zinc-800/50 transition-colors pointer-events-none select-none">
                  {step.num}
                </div>
                <div className="relative z-10">
                  <h3 className="font-heading text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#4895EF] to-[#7209B7]" />
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function DifferentiatorsSection() {
  const items = [
    "Diagnóstico técnico preciso",
    "Orçamento claro e sem surpresas",
    "Profissionais especializados",
    "Peças criteriosamente selecionadas",
    "Comunicação durante o atendimento",
    "Testes rigorosos antes da entrega",
    "Garantia sobre os serviços realizados",
    "Proteção e cuidado com os dados do cliente",
  ];

  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[600px] border border-zinc-800">
             <div className="absolute inset-0 bg-[#3A0CA3]/20 mix-blend-color z-10" />
             <img 
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop" 
              alt="Ambiente técnico organizado e profissional" 
              className="w-full h-full object-cover grayscale-[30%] contrast-125"
            />
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-10">Por que escolher a RepairXpert?</h2>
            
            <div className="grid sm:grid-cols-2 gap-y-6 gap-x-4">
              {items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#4895EF] shrink-0 mt-0.5" size={20} />
                  <span className="text-zinc-300 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="sobre" className="py-24 bg-zinc-900 border-y border-zinc-800">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-10">
          Tecnologia reparada. <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4895EF] to-[#7209B7]">Confiança restaurada.</span>
        </h2>
        
        <div className="space-y-6 text-zinc-300 text-lg leading-relaxed">
          <p>
            A tecnologia faz parte de cada momento da nossa rotina. Quando um equipamento apresenta uma falha, não é apenas um aparelho que deixa de funcionar — tarefas, conexões e experiências também ficam interrompidas.
          </p>
          <p>
            A RepairXpert nasceu para transformar esses problemas em soluções. Unimos conhecimento técnico, precisão e atendimento transparente para oferecer uma assistência confiável, desde o diagnóstico até a entrega.
          </p>
          <p>
            Mais do que reparar equipamentos, queremos devolver tranquilidade a quem confia em nosso trabalho.
          </p>
        </div>

        <div className="mt-12 font-heading font-bold text-2xl text-white">
          Repair<span className="text-[#4895EF]">Xpert</span> é a solução.
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      text: "Meu notebook voltou funcionando perfeitamente. Explicaram o problema com clareza e cumpriram o prazo combinado.",
      author: "Mariana S.",
      stars: 5
    },
    {
      text: "Fui muito bem atendido e só realizaram o serviço depois da minha aprovação. Excelente transparência do início ao fim.",
      author: "Rafael M.",
      stars: 5
    },
    {
      text: "Resolveram um problema no meu celular que outra assistência da região não conseguiu identificar. Recomendo muito!",
      author: "Camila R.",
      stars: 5
    },
    {
      text: "Atendimento rápido pelo WhatsApp e preço justo pela complexidade do reparo na minha placa de vídeo.",
      author: "Lucas T.",
      stars: 4
    }
  ];

  return (
    <section id="avaliacoes" className="py-24 bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Quem confia, recomenda</h2>
            <div className="flex items-center gap-3">
              <div className="flex text-[#4895EF]">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
              </div>
              <span className="text-zinc-300 font-medium">Avaliação média de 4,9 estrelas</span>
            </div>
          </div>
        </div>

        {/* Carousel / Scroll container */}
        <div className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x snap-mandatory">
          {testimonials.map((test, i) => (
            <div key={i} className="min-w-[300px] md:min-w-[400px] bg-zinc-900 border border-zinc-800 p-8 rounded-2xl snap-start flex flex-col">
              <div className="flex text-[#7209B7] mb-6">
                {[...Array(5)].map((_, j) => (
                   <Star key={j} fill={j < test.stars ? "currentColor" : "none"} strokeWidth={j < test.stars ? 0 : 1} size={16} />
                ))}
              </div>
              <p className="text-zinc-300 italic mb-8 grow">"{test.text}"</p>
              <span className="font-heading font-bold text-white block">— {test.author}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with Brand Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3A0CA3] via-[#7209B7] to-[#4895EF] opacity-90 z-0" />
      <div className="absolute inset-0 bg-zinc-950/40 z-0" /> {/* Darken slightly for contrast */}
      <div className="absolute inset-0 bg-pattern opacity-20 z-0" />

      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">
          Não deixe um problema técnico interromper sua rotina.
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
          Fale com um especialista, explique o que aconteceu e receba as primeiras orientações sobre o reparo do seu equipamento.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20">
            <MessageCircle size={20} /> Chamar no WhatsApp
          </a>
          <a href="#contato" className="px-8 py-4 bg-zinc-950 text-white font-bold rounded-xl hover:bg-black transition-all flex items-center justify-center border border-zinc-800">
            Solicitar orçamento
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    { q: "O diagnóstico possui algum custo?", a: "Na maioria dos casos, o diagnóstico preliminar é gratuito. Taxas só são aplicadas se houver necessidade de desmontagem complexa ou uso de peças específicas para testes, o que será informado antecipadamente." },
    { q: "Quanto tempo leva para receber o orçamento?", a: "Buscamos enviar o orçamento em até 24h úteis após o recebimento do equipamento na assistência, dependendo da complexidade do problema." },
    { q: "O serviço possui garantia?", a: "Sim! Oferecemos garantia legal de 90 dias sobre o serviço realizado e as peças substituídas, garantindo sua tranquilidade." },
    { q: "Vocês utilizam peças originais?", a: "Trabalhamos com peças originais e também com peças de qualidade premium (1ª linha), oferecendo opções de acordo com o orçamento do cliente, sempre deixando clara a origem de cada componente." },
    { q: "Meus arquivos e dados estarão seguros?", a: "Absolutamente. Seguimos protocolos rigorosos de privacidade (LGPD). Não acessamos arquivos pessoais a menos que seja estritamente necessário para o serviço (como backup) e com sua autorização." },
    { q: "É necessário agendar o atendimento?", a: "Não é obrigatório, mas o pré-agendamento via WhatsApp ou formulário agiliza seu atendimento na recepção." },
    { q: "Posso acompanhar o andamento do reparo?", a: "Sim, nossa equipe mantém contato ativo via WhatsApp para atualizar o status do seu equipamento." },
    { q: "Quais formas de pagamento são aceitas?", a: "Aceitamos Pix, cartões de crédito (com parcelamento) e débito." }
  ];

  const [openIndex, setOpenIndex] = useState(0); // First open by default

  return (
    <section id="faq" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Dúvidas Frequentes</h2>
          <p className="text-zinc-400">Respostas claras e transparentes para suas perguntas.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-zinc-800 rounded-xl bg-zinc-900/50 overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
              >
                <span className="font-medium text-white pr-4">{faq.q}</span>
                <ChevronDown className={`text-zinc-500 shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} size={20} />
              </button>
              <div 
                className={`px-6 text-zinc-400 text-sm leading-relaxed transition-all duration-300 ease-in-out overflow-hidden ${openIndex === i ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactFormSection() {
  const [formData, setFormData] = useState({
    nome: '', whatsapp: '', email: '', tipo: '', modelo: '', problema: '', lgpd: false
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success

  // Máscara de Telefone simples
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
      value = value.replace(/(\d)(\d{4})$/, '$1-$2');
      setFormData({ ...formData, whatsapp: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simular envio de formulário
    setTimeout(() => {
      setStatus('success');
      setFormData({ nome: '', whatsapp: '', email: '', tipo: '', modelo: '', problema: '', lgpd: false });
      
      // Voltar para idle após alguns segundos
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contato" className="py-24 bg-zinc-900 border-y border-zinc-800 relative">
      <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-16 items-start">
        
        {/* Lado Esquerdo - Info */}
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">Conte o que aconteceu com seu equipamento</h2>
          <p className="text-zinc-400 mb-8 leading-relaxed">
            Preencha os dados ao lado para solicitar uma avaliação. Nossa equipe técnica analisará as informações e entrará em contato o mais rápido possível para orientar os próximos passos.
          </p>
          
          <div className="hidden lg:block p-8 bg-zinc-950 rounded-2xl border border-zinc-800 shadow-xl">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4895EF]/10 to-[#7209B7]/10 rounded-full flex items-center justify-center border border-[#7209B7]/20">
                  <ShieldCheck className="text-[#4895EF]" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Privacidade Garantida</h4>
                  <p className="text-xs text-zinc-400">Seus dados estão seguros conosco.</p>
                </div>
             </div>
             <p className="text-sm text-zinc-500 italic">
               "Recomendamos informar o máximo de detalhes possível sobre o defeito para agilizar o pré-diagnóstico."
             </p>
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <div className="bg-zinc-950 p-8 md:p-10 rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden">
          {/* Success Overlay */}
          {status === 'success' && (
            <div className="absolute inset-0 bg-zinc-950/95 z-20 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-2">Solicitação Enviada!</h3>
              <p className="text-zinc-400 mb-8">Nossa equipe recebeu seus dados e entrará em contato em breve.</p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#25D366] text-white font-medium rounded-lg hover:bg-[#20bd5a] transition-colors flex items-center gap-2">
                Continuar pelo WhatsApp <ArrowRight size={16} />
              </a>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-400 ml-1">Nome completo *</label>
                <input required type="text" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4895EF] focus:ring-1 focus:ring-[#4895EF] transition-all" placeholder="Ex: João da Silva" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-400 ml-1">WhatsApp *</label>
                <input required type="tel" value={formData.whatsapp} onChange={handlePhoneChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4895EF] focus:ring-1 focus:ring-[#4895EF] transition-all" placeholder="(00) 00000-0000" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-400 ml-1">E-mail *</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4895EF] focus:ring-1 focus:ring-[#4895EF] transition-all" placeholder="seu@email.com" />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-400 ml-1">Tipo de equipamento *</label>
                <select required value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4895EF] focus:ring-1 focus:ring-[#4895EF] transition-all appearance-none">
                  <option value="" disabled>Selecione...</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="Notebook">Notebook</option>
                  <option value="Computador">Computador / Desktop</option>
                  <option value="Tablet">Tablet</option>
                  <option value="Console">Console / Videogame</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-400 ml-1">Marca e modelo *</label>
                <input required type="text" value={formData.modelo} onChange={e => setFormData({...formData, modelo: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4895EF] focus:ring-1 focus:ring-[#4895EF] transition-all" placeholder="Ex: iPhone 13, Dell Inspiron..." />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-400 ml-1">Descrição do problema *</label>
              <textarea required rows={4} value={formData.problema} onChange={e => setFormData({...formData, problema: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4895EF] focus:ring-1 focus:ring-[#4895EF] transition-all resize-none" placeholder="Conte detalhes do que aconteceu e dos sintomas que o aparelho apresenta..."></textarea>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-start pt-1">
                <input required type="checkbox" checked={formData.lgpd} onChange={e => setFormData({...formData, lgpd: e.target.checked})} className="peer sr-only" />
                <div className="w-5 h-5 border-2 border-zinc-700 rounded bg-zinc-900 peer-checked:bg-[#4895EF] peer-checked:border-[#4895EF] transition-all flex items-center justify-center">
                  <CheckCircle2 size={14} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
              </div>
              <span className="text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                Autorizo a coleta e tratamento dos meus dados para fins de contato e formulação de orçamento, conforme a Lei Geral de Proteção de Dados (LGPD).
              </span>
            </label>

            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full py-4 bg-gradient-to-r from-[#4895EF] to-[#7209B7] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#4895EF]/25 hover:opacity-90 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {status === 'loading' ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Solicitar avaliação <Send size={18} /></>
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Onde estamos</h2>
              <p className="text-zinc-400">Venha tomar um café com nossa equipe e conhecer nosso laboratório.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="text-[#4895EF]" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Endereço</h4>
                  <p className="text-zinc-400 text-sm">{CONFIG.address}</p>
                  <p className="text-zinc-500 text-xs mt-1 italic">Estacionamento conveniado ao lado.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="text-[#7209B7]" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Horário de Atendimento</h4>
                  <p className="text-zinc-400 text-sm">{CONFIG.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="text-[#4895EF]" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Contato Rápido</h4>
                  <p className="text-zinc-400 text-sm">WhatsApp: {CONFIG.whatsapp}</p>
                  <p className="text-zinc-400 text-sm">Fixo: {CONFIG.phone}</p>
                  <p className="text-zinc-400 text-sm">E-mail: {CONFIG.email}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
               {/* Fictitious Maps Link */}
              <a href="#" className="px-6 py-3 bg-zinc-900 border border-zinc-700 text-white font-medium rounded-lg hover:bg-zinc-800 transition-colors flex items-center gap-2">
                <MapPin size={18} /> Abrir Rota
              </a>
            </div>
          </div>

          <div className="h-[400px] lg:h-[500px] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 grayscale-[40%] contrast-125 invert-[5%] hover:grayscale-0 transition-all duration-700">
             {/* Mapa Iframe - Usando um mapa genérico centrado em Atibaia para o mockup */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d117498.4485741852!2d-46.634623129845014!3d-23.120512803140523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ceb7095166f097%3A0xe5a31a57e3240e8a!2sAtibaia%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1716382000000!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Localização"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="lg:col-span-1">
            <a href="#inicio" className="flex items-center gap-2 mb-6 inline-block">
              <img 
                src="https://i.imgur.com/oYCzNWE.png" 
                alt="Logotipo RepairXpert" 
                className="h-10 w-auto object-contain logo-img" 
              />
            </a>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Assistência técnica especializada em recuperar seus equipamentos com precisão, agilidade e total transparência.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-[#7209B7] hover:text-white transition-colors">
                {/* SVG for Instagram */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-[#4895EF] hover:text-white transition-colors">
                {/* SVG for Facebook */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-heading">Navegação</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><a href="#inicio" className="hover:text-[#4895EF] transition-colors">Início</a></li>
              <li><a href="#sobre" className="hover:text-[#4895EF] transition-colors">Sobre Nós</a></li>
              <li><a href="#como-funciona" className="hover:text-[#4895EF] transition-colors">Como Funciona</a></li>
              <li><a href="#faq" className="hover:text-[#4895EF] transition-colors">Dúvidas Frequentes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-heading">Serviços</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><a href="#servicos" className="hover:text-[#4895EF] transition-colors">Smartphones</a></li>
              <li><a href="#servicos" className="hover:text-[#4895EF] transition-colors">Notebooks e PCs</a></li>
              <li><a href="#servicos" className="hover:text-[#4895EF] transition-colors">Tablets e Consoles</a></li>
              <li><a href="#servicos" className="hover:text-[#4895EF] transition-colors">Recuperação de Software</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-heading">Legal</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><a href="#" className="hover:text-[#4895EF] transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-[#4895EF] transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-[#4895EF] transition-colors">Garantia e Condições</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <p>© 2026 RepairXpert. Todos os direitos reservados.</p>
          <p>Desenvolvido com foco em performance e conversão.</p>
        </div>
      </div>
    </footer>
  );
}
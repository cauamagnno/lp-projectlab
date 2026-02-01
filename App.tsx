
import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, 
  Ruler, 
  Zap, 
  Droplets, 
  Flame, 
  CloudLightning, 
  CheckCircle2, 
  AlertTriangle, 
  MessageCircle,
  Clock,
  Send,
  PlusCircle,
  Layers,
  BarChart3,
  X,
  Bot,
  Home,
  Eye,
  ChevronRight
} from 'lucide-react';
import { getBIMConsultantResponse } from './services/geminiService';
import { ChatMessage } from './types';

const ServiceCard = ({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) => (
  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full flex flex-col group">
    <div className="bg-blue-50 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
      {icon}
    </div>
    <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 text-slate-800 leading-tight">{title}</h3>
    <p className="text-slate-500 text-[11px] md:text-sm leading-relaxed line-clamp-3 md:line-clamp-none">{description}</p>
  </div>
);

const DifferentialItem = ({ title, subtitle, description, result, icon }: { title: string, subtitle: string, description: string, result: string, icon: React.ReactNode }) => (
  <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-5 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-full -mr-8 -mt-8 pointer-events-none md:hidden"></div>
    <div className="flex-shrink-0 relative z-10">
      <div className="bg-orange-50 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-orange-600">
        {icon}
      </div>
    </div>
    <div className="relative z-10">
      <h4 className="text-orange-600 font-bold text-[9px] md:text-sm uppercase tracking-widest mb-1">{title}</h4>
      <h3 className="text-lg md:text-2xl font-bold mb-3 text-slate-900 leading-tight">{subtitle}</h3>
      <p className="text-slate-600 text-xs md:text-base mb-4 leading-relaxed">{description}</p>
      <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-blue-600 flex items-start gap-3">
        <div className="mt-1 hidden md:block"><CheckCircle2 size={16} className="text-blue-600" /></div>
        <div>
          <span className="font-bold text-blue-800 block text-[10px] md:text-sm mb-1">Impacto Financeiro:</span>
          <p className="text-slate-700 text-[11px] md:text-sm italic">{result}</p>
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá! Sou o consultor da Project Lab. Como posso ajudar com seu projeto hoje?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const portfolioImages = [
    { url: "https://dahowkkondmftlsolutp.supabase.co/storage/v1/object/public/carolvaz/obra1.jpeg", title: "Residencial de Alto Padrão" },
    { url: "https://dahowkkondmftlsolutp.supabase.co/storage/v1/object/public/carolvaz/obra2.jpeg", title: "Estrutura e Compatibilização" },
    { url: "https://dahowkkondmftlsolutp.supabase.co/storage/v1/object/public/carolvaz/obra3.jpeg", title: "Projeto Executivo em Andamento" },
    { url: "https://dahowkkondmftlsolutp.supabase.co/storage/v1/object/public/carolvaz/obra4.jpeg", title: "Detalhamento de Instalações" },
    { url: "https://dahowkkondmftlsolutp.supabase.co/storage/v1/object/public/carolvaz/obra5.jpeg", title: "Conformidade Técnica BIM" },
    { url: "https://dahowkkondmftlsolutp.supabase.co/storage/v1/object/public/carolvaz/obra6.jpeg", title: "Finalização e Acabamentos" },
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);
    const botResponse = await getBIMConsultantResponse(userMsg);
    setMessages(prev => [...prev, { role: 'model', text: botResponse || "Ocorreu um erro." }]);
    setIsTyping(false);
    setTimeout(() => { scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-inter text-slate-900 overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-blue-600 w-6 h-6 md:w-8 md:h-8" />
            <span className="font-bold text-lg md:text-xl tracking-tight">Project<span className="text-blue-600">Lab</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#servicos" className="hover:text-blue-600 transition-colors">Serviços</a>
            <a href="#diferenciais" className="hover:text-blue-600 transition-colors">Diferenciais</a>
            <a href="#portfolio" className="hover:text-blue-600 transition-colors">Portfólio</a>
          </div>
          <a href="#contato" className="bg-blue-600 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            Orçamento
          </a>
        </div>
      </nav>

      <section className="pt-24 pb-8 md:pt-48 md:pb-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.1),transparent)] pointer-events-none"></div>
        <div className="container mx-auto px-5 flex flex-col items-center gap-8 md:flex-row md:gap-12 relative z-10 text-center md:text-left">
          <div className="w-full md:flex-1">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-blue-400 px-3 py-1.5 rounded-full text-[9px] md:text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Inteligência BIM + Engenharia Sênior
            </div>
            <h1 className="text-[2.2rem] md:text-6xl font-black leading-[1.1] mb-6 tracking-tight">
              Projetos Inteligentes, Obras Sem Desperdício. <span className="text-blue-500 block mt-1 md:inline">Economize de Verdade.</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-xl mb-8 max-w-2xl leading-relaxed font-medium">
              A Project Lab une Arquitetura de elite e Engenharia de precisão em modelos BIM 100% integrados. Elimine erros de obra antes de começar a construir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <a href="#contato" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-2xl font-black text-sm md:text-lg transition-all shadow-2xl shadow-blue-600/30 active:scale-[0.98] flex items-center justify-center gap-2">
                REDUZIR CUSTOS DA MINHA OBRA
                <ChevronRight size={20} className="hidden md:block" />
              </a>
            </div>
          </div>
          <div className="w-full max-w-sm md:max-w-none md:flex-1 relative">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-slate-800 aspect-[4/5] md:aspect-auto">
              <img src="https://dahowkkondmftlsolutp.supabase.co/storage/v1/object/public/carolvaz/fotoed.jpeg" alt="Eng. Edmilson" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-lg md:text-xl font-black">Eng. Edmilson Almeida</p>
                <p className="text-[10px] md:text-xs text-blue-400 font-bold uppercase tracking-widest mt-1">Project Lab Engineering</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-5 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 text-red-600 rounded-2xl mb-6"><AlertTriangle size={24} /></div>
          <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">Projetos sem compatibilização são <span className="text-red-600">prejuízo certo.</span></h2>
          <p className="text-slate-600 text-sm md:text-xl font-medium mb-10 leading-relaxed">Na Project Lab, eliminamos o retrabalho. Nossos modelos BIM garantem que cada viga, cano e tomada esteja no lugar exato, evitando surpresas caras na obra.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-left">
              <h4 className="font-black text-slate-800 mb-4 flex items-center gap-2 text-xs uppercase tracking-wider"><X className="text-red-500" size={18} /> O Risco do Comum</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Retrabalho constante por falta de diálogo entre arquitetura e engenharia.</p>
            </div>
            <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 text-left relative overflow-hidden">
              <h4 className="font-black text-blue-900 mb-4 flex items-center gap-2 text-xs uppercase tracking-wider"><CheckCircle2 className="text-blue-600" size={18} /> A Vantagem Lab</h4>
              <p className="text-blue-800/70 text-sm leading-relaxed">Integração total e digital de todas as disciplinas antes da execução.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" className="py-20 px-5 bg-slate-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-left md:text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">Especialidades Integradas</h2>
            <p className="text-slate-500 text-sm md:text-lg font-medium">Tudo o que sua obra precisa com o rigor técnico de quem entende de BIM.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <ServiceCard title="Arquitetura" description="Design autoral e funcional focado em estética e viabilidade." icon={<Home size={20} />} />
            <ServiceCard title="Estrutural" description="Dimensionamento preciso com economia real de aço e concreto." icon={<Ruler size={20} />} />
            <ServiceCard title="Elétrico" description="Projetos modernos de energia e automação residencial." icon={<Zap size={20} />} />
            <ServiceCard title="Hidráulico" description="Instalações otimizadas para evitar vazamentos e ruídos." icon={<Droplets size={20} />} />
            <ServiceCard title="Incêndio" description="Proteção integrada ao design, cumprindo normas técnicas." icon={<Flame size={20} />} />
            <ServiceCard title="Para-raios" description="Segurança discreta para fachadas de alto padrão." icon={<CloudLightning size={20} />} />
            <ServiceCard title="Reforço" description="Segurança para reformas complexas e ampliações." icon={<PlusCircle size={20} />} />
            <ServiceCard title="BIM 4D/5D" description="Coordenação 100% livre de conflitos entre projetos." icon={<Layers size={20} />} />
          </div>
        </div>
      </section>

      <section id="contato" className="py-20 px-5 bg-slate-950">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-10 md:p-16 bg-blue-600 text-white flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase leading-tight italic">Sua obra merece precisão.</h2>
              <p className="text-blue-100 text-sm md:text-xl font-medium mb-10">Deixe seus dados para uma análise técnica de viabilidade do seu projeto.</p>
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
                  <Clock size={24} />
                  <div><span className="font-black text-sm block">Resposta Rápida</span><span className="text-[10px] text-blue-200">Em até 24h úteis</span></div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 p-8 md:p-16 bg-white">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <input type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none text-sm font-medium" placeholder="Nome Completo" />
                <input type="tel" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none text-sm font-medium" placeholder="WhatsApp (com DDD)" />
                <select className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none text-sm font-medium">
                  <option>Residencial Alto Padrão</option>
                  <option>Comercial/Prédio</option>
                  <option>Industrial/Galpão</option>
                  <option>Reforço Estrutural</option>
                </select>
                <button className="w-full bg-slate-950 hover:bg-blue-600 text-white font-black py-5 rounded-2xl text-base shadow-xl transition-all active:scale-[0.98]">
                  SOLICITAR ORÇAMENTO BIM
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-slate-950 text-slate-500 border-t border-slate-900 px-5 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <ShieldCheck className="text-blue-600 w-6 h-6" />
          <span className="font-black text-xl text-white tracking-tighter">Project<span className="text-blue-600">Lab</span></span>
        </div>
        <p className="text-[10px] uppercase font-black tracking-widest">&copy; {new Date().getFullYear()} Project Lab BIM & Engineering. Brasil.</p>
      </footer>

      {/* Chat Bot UI */}
      <div className="fixed bottom-5 right-5 z-[60]">
        {!isChatOpen ? (
          <button onClick={() => setIsChatOpen(true)} className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-2xl hover:bg-blue-700 transition-all active:scale-90">
            <Bot size={24} />
          </button>
        ) : (
          <div className="w-[calc(100vw-2.5rem)] sm:w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
            <div className="bg-slate-900 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot size={20} className="text-blue-400" />
                <span className="font-black text-xs uppercase tracking-widest">Consultor Lab</span>
              </div>
              <button onClick={() => setIsChatOpen(false)}><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-xs font-medium leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-[10px] text-slate-400 animate-pulse font-bold px-2">Analisando dados técnicos...</div>}
              <div ref={scrollRef} />
            </div>
            <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Tire sua dúvida técnica..." className="flex-1 bg-slate-50 px-3 py-2 text-xs outline-none rounded-xl font-medium" />
              <button onClick={handleSendMessage} className="bg-slate-900 text-white p-2 rounded-xl"><Send size={16} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

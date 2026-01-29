
import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  MessageCircle, 
  BookOpen, 
  Lock, 
  AlertCircle, 
  Smile, 
  ArrowRight,
  MousePointer2,
  CalendarDays,
  Sparkles,
  Loader2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [productImage, setProductImage] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const checkoutLink = "https://pay.cakto.com.br/xv3juie";

  const scrollToOffer = () => {
    const element = document.getElementById('oferta');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const generateImage = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              {
                text: 'A high-end 3D mockup of a digital ebook titled "Detox Bucal". Elegant, modern cover with teal and white accents. Minimalist design representing oral fresh health. Studio quality, 3D perspective.',
              },
            ],
          },
          config: {
            imageConfig: {
              aspectRatio: "3:4"
            }
          }
        });

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            setProductImage(`data:image/png;base64,${base64EncodeString}`);
            break;
          }
        }
      } catch (error) {
        console.error("Erro ao gerar imagem:", error);
      } finally {
        setIsLoadingImage(false);
      }
    };

    generateImage();
  }, []);

  return (
    <div className="min-h-screen selection:bg-teal-100 selection:text-teal-900">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden gradient-bg">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-sm font-bold mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>Conteúdo Prático e Educativo</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Sinta-se seguro para falar de perto, <span className="text-teal-600 italic">sem medo.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
              Descubra como pequenos ajustes na sua rotina diária podem ajudar a reduzir o mau hálito de forma simples e natural.
            </p>
            <button 
              onClick={scrollToOffer}
              className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-xl shadow-teal-200 transition-all transform hover:-translate-y-1 active:scale-95 inline-flex items-center space-x-3"
            >
              <span>Quero entender melhor</span>
              <ArrowRight className="w-6 h-6" />
            </button>
            <div className="mt-8 flex items-center justify-center space-x-4 text-slate-400 text-sm">
              <span className="flex items-center"><MousePointer2 className="w-4 h-4 mr-1.5" /> Leitura rápida de 3 min</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1.5" /> Acesso Instantâneo</span>
            </div>
          </div>
        </div>
        
        {/* Background Decorative Orbs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </section>

      {/* 2. SEÇÃO DE IDENTIFICAÇÃO */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-tight">Você já sentiu aquela <span className="text-red-500 underline decoration-wavy decoration-1 underline-offset-8">vergonha silenciosa</span>?</h2>
            <div className="grid gap-6">
              {[
                { icon: MessageCircle, text: "Aquele receio de falar muito perto de alguém e a pessoa dar um passo para trás." },
                { icon: Smile, text: "Colocar a mão na frente da boca ao rir ou ao conversar em ambientes fechados." },
                { icon: CalendarDays, text: "A sensação de que, não importa quantas balas você use, o frescor dura apenas alguns minutos." }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-100 transition-colors">
                  <div className="bg-white p-3 rounded-xl shadow-sm ring-1 ring-slate-100">
                    <item.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <p className="text-lg text-slate-700 leading-relaxed font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEÇÃO “POR QUE ISSO ACONTECE” */}
      <section className="py-24 bg-slate-900 text-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <span className="text-teal-400 font-bold tracking-widest uppercase text-xs">A Ciência por trás do hábito</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-12 tracking-tight">Por que as soluções comuns falham?</h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-slate-300 text-lg leading-relaxed">
                  Muitas vezes, acreditamos que o hálito é um sinal de algo grave, quando na verdade é apenas uma <strong>rotina incompleta</strong>.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Balas e chicletes apenas "mascaram" o odor, mas não removem a causa. O Detox Bucal foca no que realmente importa.
                </p>
              </div>
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
                <h3 className="text-xl font-bold mb-6 text-teal-300">Principais causas comuns:</h3>
                <ul className="space-y-4">
                  {["Biofilme lingual (saburra)", "Desidratação bucal", "Produtos com álcool", "Longos jejuns"].map((txt, i) => (
                    <li key={i} className="flex items-center space-x-3 text-slate-200">
                      <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                      <span className="font-medium">{txt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. APRESENTAÇÃO DO PRODUTO */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">
            <div className="w-full md:w-1/2">
              <div className="relative group">
                <div className="absolute inset-0 bg-teal-200 rounded-3xl blur-2xl opacity-30 transform rotate-3 group-hover:rotate-6 transition-transform"></div>
                <div className="relative bg-white p-4 rounded-3xl shadow-2xl border border-slate-100 overflow-hidden aspect-[4/5] flex items-center justify-center">
                   {isLoadingImage ? (
                     <div className="flex flex-col items-center space-y-4 text-slate-400">
                       <Loader2 className="w-12 h-12 animate-spin" />
                       <p className="text-sm font-bold">Gerando mockup exclusivo...</p>
                     </div>
                   ) : productImage ? (
                     <img src={productImage} alt="Guia Detox Bucal Mockup" className="w-full h-full object-cover rounded-2xl" />
                   ) : (
                     <div className="w-full h-full bg-teal-50 flex items-center justify-center">
                        <BookOpen className="w-20 h-20 text-teal-200" />
                     </div>
                   )}
                   
                   <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 flex items-center space-x-3">
                      <div className="bg-teal-600 p-2 rounded-lg">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div className="leading-tight">
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">PDF Educativo</p>
                        <p className="text-sm font-bold text-slate-800 tracking-tight">Leitura em 3 min</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-teal-600 font-black uppercase tracking-widest text-xs">O Método Prático</span>
              <h2 className="text-4xl font-extrabold text-slate-900 mt-4 mb-6 leading-tight tracking-tight">Detox Bucal: Guia Prático para Reduzir o Mau Hálito</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                Um guia direto ao ponto, criado para quem não tem tempo a perder e quer resultados imediatos na confiança.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Linguagem 100% clara e acessível",
                  "Hábitos que você aplica em casa hoje",
                  "Foco total em higienização eficiente",
                  "Material digital para ler no celular"
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    <span className="text-slate-700 font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={scrollToOffer} className="text-teal-600 font-bold flex items-center space-x-2 hover:underline">
                <span>Ver condições exclusivas</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. OFERTA */}
      <section id="oferta" className="py-24 bg-teal-50 border-t border-teal-100">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-teal-100 transform transition-all hover:translate-y-[-4px]">
            <div className="bg-teal-600 py-5 px-6 text-center">
              <span className="text-white text-xs font-black tracking-[0.2em] uppercase">Oferta por Tempo Limitado</span>
            </div>
            <div className="p-10 md:p-14 text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Guia Detox Bucal (PDF)</h3>
              <p className="text-slate-500 mb-10 font-medium">Acesso imediato e vitalício</p>
              
              <div className="mb-12">
                <span className="text-slate-300 line-through text-lg font-bold block mb-1">De R$ 297,00</span>
                <div className="flex items-baseline justify-center space-x-2">
                  <span className="text-2xl font-bold text-slate-400">Por</span>
                  <span className="text-6xl font-black text-teal-600 tracking-tighter">R$ 10</span>
                </div>
                <p className="text-xs text-teal-600 font-bold mt-3 uppercase tracking-widest">Pagamento Único</p>
              </div>

              <a 
                href={checkoutLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-teal-600 hover:bg-teal-700 text-white text-xl font-bold py-6 rounded-[1.25rem] shadow-xl shadow-teal-100 transition-all mb-8 active:scale-[0.98]"
              >
                Comprar Agora por R$ 10
              </a>

              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-slate-400 text-xs font-bold">
                  <Lock className="w-3.5 h-3.5" />
                  <span className="uppercase tracking-widest">Checkout Seguro Cakto</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-slate-400 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="uppercase tracking-widest">Entrega Imediata no E-mail</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. AVISO LEGAL */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center space-y-4 bg-slate-50 p-8 rounded-3xl border border-slate-200">
            <AlertCircle className="w-6 h-6 text-slate-400" />
            <p className="text-xs text-slate-500 leading-relaxed font-medium uppercase tracking-wider">
              <strong>AVISO:</strong> Este material tem caráter educativo sobre higiene bucal e não substitui avaliação odontológica ou médica profissional. Resultados podem variar de acordo com o metabolismo e rotina individual.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 bg-slate-900 text-white/40 text-center text-sm font-medium uppercase tracking-[0.2em]">
        <div className="container mx-auto px-6">
          <p>&copy; {new Date().getFullYear()} Detox Bucal. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

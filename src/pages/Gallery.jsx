import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

const galleryImages = [
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/287fd6130_13.jpg?w=1200&q=90",
    title: "Reception Area",
    category: "Reception"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/831601306_14.jpg?w=1200&q=90",
    title: "Main Salon Floor",
    category: "Salon"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/7b593983f_15.jpg?w=1200&q=90",
    title: "Styling Stations", 
    category: "Salon"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/572e1afba_16.jpg?w=1200&q=90",
    title: "Private Lounge",
    category: "Interior"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/5e03cef8d_17.jpg?w=1200&q=90",
    title: "Reception",
    category: "Reception"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/1d99ea153_24.jpg?w=1200&q=90",
    title: "Treatment Corridor",
    category: "Interior"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/601ccd748_1.jpg?w=1200&q=90",
    title: "Massage Room",
    category: "Treatment"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/0d0096c79_2.jpg?w=1200&q=90",
    title: "Spa Suite",
    category: "Treatment"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/664dc3f67_15.jpg?w=1200&q=90",
    title: "Relaxation Room",
    category: "Treatment"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/e1eafc55a_ScreenShotTool-20251222115010.png",
    title: "Cachos Perfeitos",
    category: "Cabelo"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/b999d48cc_ScreenShotTool-20251222114951.png",
    title: "Ondas Glamourosas",
    category: "Cabelo"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/dc7826a03_ScreenShotTool-20251222113445.png",
    title: "Loiro Platinado",
    category: "Coloração"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/0fc505d2c_ScreenShotTool-20251222112128.png",
    title: "Balayage Loiro",
    category: "Coloração"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/f498fdcd3_ScreenShotTool-20251222112029.png",
    title: "Ondas Naturais",
    category: "Cabelo"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/fdb8e4347_ScreenShotTool-20251222112008.png",
    title: "Ruivo Cobre",
    category: "Coloração"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/e2dcf0106_ScreenShotTool-20251222111927.png",
    title: "Penteado Elegante",
    category: "Penteados"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/1be8a3068_ScreenShotTool-20251222111911.png",
    title: "Semi Preso",
    category: "Penteados"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/6fc9d8c99_ScreenShotTool-20251222111837.png",
    title: "Loiro Ondulado",
    category: "Coloração"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/df83737a7_ScreenShotTool-20251222111821.png",
    title: "Mega Volume",
    category: "Cabelo"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/5b1ae7a38_ScreenShotTool-20251222111754.png",
    title: "Dourado Perfeito",
    category: "Coloração"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/4a0672edd_WhatsAppImage2025-12-21at84637PM1.jpg",
    title: "Dia da Noiva",
    category: "Noivas"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/1fcd6a528_WhatsAppImage2025-12-21at84637PM.jpg",
    title: "Noiva Preparação",
    category: "Noivas"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/481497662_WhatsAppImage2025-12-21at84638PM2.jpg",
    title: "Noiva Elegância",
    category: "Noivas"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/6d7366577_WhatsAppImage2025-12-21at84638PM1.jpg",
    title: "Madrinhas",
    category: "Noivas"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/49e6339eb_WhatsAppImage2025-12-21at84638PM.jpg",
    title: "Noiva na Recepção",
    category: "Noivas"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/93a17ff64_WhatsAppImage2025-12-21at84454PM.jpeg",
    title: "Chanel Hair",
    category: "Corte"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/cbe43299b_WhatsAppImage2025-12-21at84340PM.jpg",
    title: "Noiva com Buquê",
    category: "Noivas"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/caa34eaaa_ScreenShotTool-20251221200807.png",
    title: "Noiva Renda",
    category: "Noivas"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/595f7fc0f_ScreenShotTool-20251221200747.png",
    title: "Noiva Coroa",
    category: "Noivas"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/2b40bee66_ScreenShotTool-20251221200723.png",
    title: "Casal de Noivos",
    category: "Noivas"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/cc7403ac3_ScreenShotTool-20251221200707.png",
    title: "Maquiagem Sofisticada",
    category: "Maquiagem"
  }
];

export default function Gallery() {
  return (
    <div className="pt-32 pb-24 bg-gradient-to-b from-[#F8F2EC] to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#C8A882]/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#C8A882]" />
            <span className="text-sm font-medium">Visual Journey</span>
          </div>
          
          <h1 className="font-serif font-medium text-[length:var(--font-h1)] text-[#0F0F0F] mb-6 leading-tight">
            Nossa Galeria de Transformações
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-[1.618]">
            Conheça nosso trabalho e os resultados incríveis que conquistamos. Cada imagem conta uma história de beleza e transformação.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-[clamp(1rem,2vw,2.5rem)]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={image.src}
                    alt={`${image.title} at SERENITY, the premier luxury spa and salon in Tangra, Kolkata.`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex items-end justify-start p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="text-white">
                      <span className="inline-block bg-[#C8A882] text-white px-3 py-1 rounded-full text-xs font-medium mb-2">
                        {image.category}
                      </span>
                      <h3 className="font-serif text-xl font-bold">
                        {image.title}
                      </h3>
                    </div>
                  </div>

                  {/* Hover Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <ArrowRight className="w-5 h-5 text-[#C8A882]" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-3xl p-12 shadow-lg border border-[#C8A882]/20">
            <h2 className="font-serif text-[length:var(--font-h2)] font-bold text-[#0F0F0F] mb-4">
              Pronta para Sua Transformação?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-[1.618]">
              Agende seu horário hoje e venha descobrir a experiência completa de beleza e bem-estar que o La Bonita oferece.
            </p>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
              className="bg-[#C8A882] text-white px-8 py-4 rounded-full font-medium hover:bg-[#FF5C8D] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Agendar Horário
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
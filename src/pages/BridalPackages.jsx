import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";

const packages = [
  {
    name: "Essencial",
    price: 400,
    duration: "2h",
    description: "Para cerimônias intimistas e noivas práticas",
    features: [
      "Maquiagem profissional longa duração",
      "Penteado clássico (coque, semi-preso ou ondas)",
      "Preparação de pele",
      "Colocação de véu ou acessórios",
      "Kit retoque básico"
    ],
    recommended: false
  },
  {
    name: "Premium",
    price: 700,
    duration: "3h30",
    description: "Para noivas que querem dedicação total no grande dia",
    features: [
      "Teste de maquiagem e penteado (sessão prévia)",
      "Maquiagem HD longa duração",
      "Penteado elaborado com técnicas avançadas",
      "Preparação de pele com primer profissional",
      "Colocação de véu, grinalda e acessórios",
      "Retoque após cerimônia",
      "Kit retoque completo",
      "Registro fotográfico do making of"
    ],
    recommended: true
  },
  {
    name: "Luxo - Dia da Noiva Completo",
    price: 1200,
    duration: "5h",
    description: "Para noivas que desejam experiência completa e exclusiva",
    features: [
      "2 sessões de teste (maquiagem + penteado)",
      "Maquiagem HD + aerografia",
      "Penteado de alta complexidade",
      "Skincare pré-evento completo",
      "Spa das mãos + manicure",
      "Colocação de véu, grinalda e acessórios",
      "Acompanhamento durante todo o dia",
      "Retoque ilimitado",
      "Kit retoque de luxo personalizado",
      "Espaço VIP reservado",
      "Champagne + amenities",
      "Fotógrafa de making of inclusa"
    ],
    recommended: false
  }
];

export default function BridalPackages() {
  const handleBooking = (packageName) => {
    window.dispatchEvent(new CustomEvent('open-booking-modal-with-service', { 
      detail: { service: { name: `Pacote ${packageName}` } } 
    }));
  };

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
            <span className="text-sm font-medium">Dia das Noivas</span>
          </div>
          
          <h1 className="font-serif font-medium text-[length:var(--font-h1)] text-[#0F0F0F] mb-6 leading-tight">
            Pacotes Dia da Noiva
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-[1.618]">
            Deixe seu grande dia ainda mais especial com nossos pacotes exclusivos. 
            Da preparação ao retoque, cuidamos de cada detalhe para você brilhar.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden shadow-xl ${
                pkg.recommended ? 'ring-4 ring-[#C8A882] scale-105' : ''
              }`}
            >
              {pkg.recommended && (
                <div className="absolute top-4 right-4 bg-[#C8A882] text-white px-4 py-1 rounded-full text-xs font-bold">
                  % Mais escolhido
                </div>
              )}

              <div className="p-8">
                {/* Package Header */}
                <div className="text-center mb-6">
                  <h3 className="font-serif text-2xl font-bold text-[#0F0F0F] mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">a partir de</p>
                  <div className="font-serif text-5xl font-bold text-[#C8A882] mb-2">
                    R$ {pkg.price}
                  </div>
                  <p className="text-sm text-gray-600">Duração: {pkg.duration}</p>
                </div>

                {/* Description */}
                <p className="text-center text-gray-600 text-sm italic mb-6 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#C8A882] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleBooking(pkg.name)}
                  className={`w-full py-4 rounded-xl font-medium transition-all duration-300 ${
                    pkg.recommended
                      ? 'bg-[#C8A882] text-white hover:bg-[#FF5C8D] shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-[#C8A882] hover:text-white'
                  }`}
                >
                  Quero esse pacote
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery Section - Emotional Journey */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-[#0F0F0F] mb-4">
              Momentos Inesquecíveis
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Cada noiva tem uma história única. Veja como tornamos esses momentos especiais ainda mais mágicos.
            </p>
          </div>

          {/* Hero Image - Couple */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mb-8 rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/086be425f_ScreenShotTool-20251221200807.png"
              alt="Casal de noivos - Dia da Noiva La Bonita"
              className="w-full h-[500px] object-cover"
            />
          </motion.div>

          {/* Grid Gallery */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/709202390_WhatsAppImage2025-12-21at84638PM2.jpg"
                alt="Noiva com buquê - Preparação no La Bonita"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/6445c3413_WhatsAppImage2025-12-21at84637PM1.jpg"
                alt="Noiva admirando vestido - Espaço exclusivo La Bonita"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/73ffaca7c_WhatsAppImage2025-12-21at84638PM1.jpg"
                alt="Noiva com buquê ao ar livre - Dia da Noiva completo"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/6ab9cf72e_ScreenShotTool-20251221200747.png"
                alt="Maquiagem profissional de noiva - La Bonita"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/7544b8d0d_ScreenShotTool-20251221200723.png"
                alt="Madrinhas e noiva - Preparação em grupo"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/059eddc24_ScreenShotTool-20251229144553.png"
                alt="Vestido de noiva no espaço La Bonita"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>

          {/* Emotional Quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="mt-12 text-center bg-gradient-to-r from-pink-50 to-rose-50 rounded-3xl p-12"
          >
            <p className="font-serif text-2xl md:text-3xl text-gray-700 italic mb-4">
              "Seu dia especial merece cuidados especiais"
            </p>
            <p className="text-gray-600 text-lg">
              No La Bonita, cada detalhe é pensado para fazer você se sentir única e radiante
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#C8A882]/20 max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl font-bold text-[#0F0F0F] mb-4">
              Dúvidas sobre os pacotes?
            </h2>
            <p className="text-gray-600 mb-6 leading-[1.618]">
              Entre em contato conosco pelo WhatsApp (62) 98278-0894 para personalizar 
              seu pacote ou tirar dúvidas. Estamos aqui para tornar seu dia inesquecível!
            </p>
            <a
              href="https://linktr.ee/labonitaspa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-all duration-300"
            >
              Falar no WhatsApp
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
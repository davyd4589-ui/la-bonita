import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

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
    ]
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
    ]
  }
];

export default function BridalPackagesHome() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-[#F8F2EC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-pink-100 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-pink-600">Pacotes Especiais</span>
          </div>
          
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-[#0F0F0F] mb-4">
            Dia das Noivas
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Deixe seu grande dia ainda mais especial com nossos pacotes exclusivos
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              className={`relative bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg ${
                pkg.recommended ? 'ring-2 ring-[#C8A882]' : ''
              }`}
            >
              {pkg.recommended && (
                <div className="absolute top-4 right-4 bg-[#C8A882] text-white px-3 py-1 rounded-full text-xs font-bold">
                  % Mais escolhido
                </div>
              )}

              <div className="p-6">
                {/* Package Header */}
                <h3 className="font-serif text-2xl font-bold text-[#0F0F0F] mb-2">
                  {pkg.name}
                </h3>
                <p className="text-xs text-gray-500 mb-3">a partir de</p>
                <div className="font-serif text-4xl font-bold text-[#C8A882] mb-1">
                  R$ {pkg.price}
                </div>
                <p className="text-sm text-gray-600 mb-4">Duração: {pkg.duration}</p>

                {/* Description */}
                <p className="text-gray-600 text-sm italic mb-4 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#C8A882] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-700 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal-with-service', { 
                    detail: { service: { name: `Pacote ${pkg.name}` } } 
                  }))}
                  className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                    pkg.recommended
                      ? 'bg-[#C8A882] text-white hover:bg-[#FF5C8D]'
                      : 'bg-gray-100 text-gray-700 hover:bg-[#C8A882] hover:text-white'
                  }`}
                >
                  Quero esse pacote
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to={createPageUrl("BridalPackages")}
            className="inline-flex items-center gap-2 bg-[#C8A882] text-white px-6 py-3 rounded-full font-medium hover:bg-[#FF5C8D] transition-all duration-300 shadow-lg"
          >
            Ver todos os detalhes
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
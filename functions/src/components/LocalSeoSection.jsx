import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Award } from "lucide-react";

export default function LocalSeoSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#F8F2EC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* SEO-Optimized Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F0F0F] mb-4">
            Salão de Beleza Premium em Goiânia
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            <strong>La Bonita Spa Beauty</strong> é o salão de beleza mais completo de <strong>Goiânia, Goiás</strong>. 
            Localizado no Residencial Solar Bougainville, oferecemos serviços de estética facial e corporal, 
            tratamentos capilares profissionais, manicure e pedicure, design de sobrancelhas, maquiagem, 
            massagens relaxantes e muito mais. Nossa equipe de profissionais especializadas utiliza 
            produtos premium e técnicas avançadas para garantir resultados excepcionais.
          </p>
        </motion.div>

        {/* Local Business Info Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-[#C8A882]/20"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#C8A882]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#C8A882]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#0F0F0F] mb-2">
                  Localização em Goiânia
                </h3>
                <address className="not-italic text-gray-600 leading-relaxed">
                  R. SB 7, Qd.13 - Lt. 01<br />
                  Res. Solar Bougainville<br />
                  Goiânia - GO, 74393-385<br />
                  Brasil
                </address>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-[#C8A882]/20"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FF5C8D]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-[#FF5C8D]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#0F0F0F] mb-2">
                  Horário de Funcionamento
                </h3>
                <div className="text-gray-600 space-y-1 text-sm leading-relaxed">
                  <p><strong>Segunda:</strong> Fechado</p>
                  <p><strong>Terça a Sexta:</strong> 9:00 - 19:00</p>
                  <p><strong>Sábado:</strong> 8:00 - 13:00</p>
                  <p><strong>Domingo:</strong> 8:00 - 13:00</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-[#C8A882]/20"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#C8A882]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-[#C8A882]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#0F0F0F] mb-2">
                  Contato e Agendamento
                </h3>
                <div className="space-y-2">
                  <a 
                    href="https://wa.me/5562999130894?text=Olá,%20gostaria%20de%20agendar%20um%20horário" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-[#C8A882] hover:text-[#FF5C8D] font-medium transition-colors"
                  >
                    WhatsApp: (62) 99913-0894
                  </a>
                  <p className="text-gray-600 text-sm">
                    Atendimento rápido via WhatsApp para agendamentos
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Service Categories SEO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h3 className="font-serif text-2xl font-bold text-[#0F0F0F] mb-6 text-center">
            Serviços de Beleza e Estética em Goiânia
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
            <div>
              <h4 className="font-semibold text-[#C8A882] mb-2">Cabelo</h4>
              <p className="text-sm leading-relaxed">
                Corte feminino e masculino, escova modeladora, progressiva, realinhamento capilar, 
                coloração global, mechas, banho de brilho, hidratação, nutrição, reconstrução capilar
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#C8A882] mb-2">Estética Facial</h4>
              <p className="text-sm leading-relaxed">
                Design de sobrancelhas, tonalização, henna, buço, maquiagem profissional, 
                cílios brasileiro e mega brasileiro, limpeza de pele
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#C8A882] mb-2">Unhas</h4>
              <p className="text-sm leading-relaxed">
                Manicure, pedicure, esmaltação em gel, alongamento de unhas, 
                nail art, tratamento de cutículas
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#C8A882] mb-2">Bronzeamento</h4>
              <p className="text-sm leading-relaxed">
                Bronzeamento natural, bronze na máquina, banho de lua, 
                técnicas profissionais para tom perfeito
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#C8A882] mb-2">Spa & Relaxamento</h4>
              <p className="text-sm leading-relaxed">
                Massagem relaxante, tratamentos corporais, day spa, 
                espaço de bem-estar e descontração
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#C8A882] mb-2">Pacotes Noivas</h4>
              <p className="text-sm leading-relaxed">
                Pacotes completos para dia da noiva: Essencial R$ 400, 
                Premium R$ 700, Luxo R$ 1200 com acompanhamento exclusivo
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
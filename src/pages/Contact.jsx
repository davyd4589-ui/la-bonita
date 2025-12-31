import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Sparkles } from "lucide-react";

export default function Contact() {
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
            <span className="text-sm font-medium">Get In Touch</span>
          </div>
          
          <h1 className="font-serif font-medium text-[length:var(--font-h1)] text-[#0F0F0F] mb-6 leading-tight">
            Entre em Contato - La Bonita Salão de Beleza
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-[1.618]">
            Experimente beleza e bem-estar na La Bonita, onde profissionais qualificados 
            usam produtos premium para transformar seu visual em Goiânia.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-[clamp(1rem,2vw,2.5rem)]">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-[1.2em]"
          >
            {/* Address */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#C8A882]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C8A882]/10 rounded-2xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#C8A882]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0F0F0F] mb-2">Visite Nosso Salão</h3>
                  <p className="leading-[1.618] text-gray-600">
                    R. SB 7, Qd.13 - Lt. 01<br />
                    Res. Solar Bougainville<br />
                    Goiânia - GO, 74393-385
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#C8A882]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C8A882]/10 rounded-2xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#C8A882]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0F0F0F] mb-2">Telefone e WhatsApp</h3>
                  <a 
                    href="https://wa.me/5562999130894?text=Olá,%20gostaria%20de%20mais%20informações" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="leading-[1.618] text-gray-600 hover:text-[#C8A882] transition-colors"
                  >
                    (62) 99913-0894<br />
                    <span className="text-sm">Clique para falar no WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#C8A882]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C8A882]/10 rounded-2xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#C8A882]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0F0F0F] mb-2">Redes Sociais</h3>
                  <p className="leading-[1.618] text-gray-600">
                    linktr.ee/labonitaspa<br />
                    <span className="text-sm">Siga-nos nas redes sociais</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#C8A882]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C8A882]/10 rounded-2xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#C8A882]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0F0F0F] mb-2">Horário de Funcionamento</h3>
                  <div className="text-gray-600 space-y-1 leading-[1.618]">
                    <p>Segunda: Fechado</p>
                    <p>Terça a Sexta: 9:00 - 19:00</p>
                    <p>Sábado: 8:00 - 13:00</p>
                    <p>Domingo: 8:00 - 13:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#C8A882]/20">
              <h3 className="font-serif text-xl font-bold text-[#0F0F0F] mb-4">Siga-nos</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-[#C8A882] rounded-2xl flex items-center justify-center hover:bg-[#FF5C8D] transition-colors duration-300 text-white">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 bg-[#C8A882] rounded-2xl flex items-center justify-center hover:bg-[#FF5C8D] transition-colors duration-300 text-white">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-[#C8A882]/20"
          >
            <h2 className="font-serif text-[length:var(--font-h2)] font-bold text-[#0F0F0F] mb-6">Fale Conosco</h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Sobrenome
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                    placeholder="Seu sobrenome"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                  placeholder="(62) 99913-0894"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  Serviço de Interesse
                </label>
                <select
                  id="service"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                >
                  <option value="">Selecione um serviço</option>
                  <option value="hair">Cabelo (Corte, Coloração, Mechas)</option>
                  <option value="nails">Unhas (Manicure e Pedicure)</option>
                  <option value="makeup">Maquiagem</option>
                  <option value="eyebrows">Sobrancelha</option>
                  <option value="packages">Pacotes Especiais</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300 resize-none"
                  placeholder="Conte-nos o que você precisa..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#C8A882] text-white py-4 rounded-xl font-medium hover:bg-[#FF5C8D] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Enviar Mensagem
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
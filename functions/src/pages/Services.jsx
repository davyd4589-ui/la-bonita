import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Clock, Star, ArrowRight, Sparkles } from "lucide-react";
import { useLocation } from "react-router-dom";

// Menu de Serviços La Bonita
const servicesData = [
  {
    id: 1,
    name: "Cílios Brasileiro",
    category: "beauty",
    description: "Aplicação de cílios fio a fio técnica brasileira",
    price: 160,
    duration: "2h",
    image_url: "https://images.pexels.com/photos/5128268/pexels-photo-5128268.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Extensão de cílios brasileiro no La Bonita Salão de Beleza"
  },
  {
    id: 2,
    name: "Mega Brasileiro",
    category: "beauty",
    description: "Volume extra com técnica brasileira",
    price: 200,
    duration: "2h30",
    badge: "Premium",
    image_url: "https://images.pexels.com/photos/7755520/pexels-photo-7755520.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Mega volume brasileiro de cílios no La Bonita"
  },
  {
    id: 3,
    name: "Manutenção",
    category: "beauty",
    description: "Manutenção de cílios fio a fio",
    price: 110,
    duration: "1h - 1h30",
    image_url: "https://images.pexels.com/photos/5128220/pexels-photo-5128220.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Manutenção de extensão de cílios no La Bonita"
  },
  {
    id: 4,
    name: "Design de Sobrancelha",
    category: "beauty",
    description: "Modelagem e design profissional de sobrancelhas",
    price: 40,
    duration: "30min",
    badge: "Mais pedido",
    image_url: "https://images.pexels.com/photos/5128231/pexels-photo-5128231.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Design de sobrancelha no La Bonita"
  },
  {
    id: 5,
    name: "Buço",
    category: "beauty",
    description: "Depilação de buço",
    price: 22,
    duration: "15min",
    image_url: "https://images.pexels.com/photos/5128180/pexels-photo-5128180.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Depilação de buço no La Bonita"
  },
  {
    id: 6,
    name: "Henna",
    category: "beauty",
    description: "Coloração de sobrancelhas com henna",
    price: 20,
    duration: "30min",
    image_url: "https://images.pexels.com/photos/5128259/pexels-photo-5128259.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Henna para sobrancelhas no La Bonita"
  },
  {
    id: 7,
    name: "Tonalização de Sobrancelha",
    category: "beauty",
    description: "Coloração profissional de sobrancelhas",
    price: 35,
    duration: "30min",
    image_url: "https://images.pexels.com/photos/5128259/pexels-photo-5128259.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Tonalização de sobrancelha no La Bonita"
  },
  {
    id: 8,
    name: "Bronzeamento Natural",
    category: "skin",
    description: "Bronze natural com produtos de alta qualidade",
    price: 80,
    duration: "1h",
    image_url: "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Bronzeamento natural no La Bonita"
  },
  {
    id: 9,
    name: "Bronze na Máquina",
    category: "skin",
    description: "Bronzeamento com máquina profissional",
    price: 120,
    duration: "30min",
    image_url: "https://images.pexels.com/photos/4041391/pexels-photo-4041391.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Bronze na máquina no La Bonita"
  },
  {
    id: 10,
    name: "Banho de Lua",
    category: "skin",
    description: "Iluminador corporal para pele radiante",
    price: 65,
    duration: "45min",
    image_url: "https://images.pexels.com/photos/3738349/pexels-photo-3738349.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Banho de lua no La Bonita"
  },
  {
    id: 11,
    name: "Massagem Relaxante",
    category: "massage",
    description: "Massagem terapêutica para relaxamento completo",
    price: 100,
    duration: "1h",
    image_url: "https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Massagem relaxante no La Bonita"
  },
  {
    id: 12,
    name: "Pacote Essencial",
    category: "beauty",
    description: "Dia da noiva com serviços essenciais",
    price: 400,
    duration: "Variável",
    badge: "Noivas",
    secondBadge: "Pacote",
    image_url: "https://images.pexels.com/photos/3762465/pexels-photo-3762465.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Pacote essencial para noivas no La Bonita"
  },
  {
    id: 13,
    name: "Combo Mechas",
    category: "hair",
    description: "Pacote completo de mechas com tratamento e finalização",
    price: 780,
    duration: "4h - 6h",
    badge: "Pacote",
    image_url: "https://images.pexels.com/photos/8468126/pexels-photo-8468126.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Combo mechas no La Bonita"
  },
  {
    id: 14,
    name: "Reconstrução + Escova",
    category: "hair",
    description: "Tratamento de reconstrução profunda com finalização em escova",
    price: 180,
    duration: "2h - 2h30",
    badge: "Mais pedido",
    image_url: "https://images.pexels.com/photos/8467970/pexels-photo-8467970.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Reconstrução e escova no La Bonita"
  },
  {
    id: 15,
    name: "Nutrição + Escova",
    category: "hair",
    description: "Tratamento nutritivo intenso com finalização em escova",
    price: 160,
    duration: "2h - 2h30",
    image_url: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Nutrição e escova no La Bonita"
  },
  {
    id: 16,
    name: "Hidratação + Escova",
    category: "hair",
    description: "Hidratação profunda com finalização em escova",
    price: 120,
    duration: "1h30 - 2h",
    badge: "Mais pedido",
    image_url: "https://images.pexels.com/photos/5241044/pexels-photo-5241044.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Hidratação e escova no La Bonita"
  },
  {
    id: 17,
    name: "Cronograma Capilar Premium",
    category: "hair",
    description: "Programa completo de 4 sessões para recuperação dos fios",
    price: 420,
    duration: "4 sessões",
    badge: "Pacote",
    image_url: "https://images.pexels.com/photos/8467970/pexels-photo-8467970.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Cronograma capilar premium no La Bonita"
  },
  {
    id: 18,
    name: "Cronograma Capilar Luxury",
    category: "hair",
    description: "Programa premium com tratamentos avançados",
    price: 720,
    duration: "4 sessões",
    badge: "Pacote",
    secondBadge: "Premium",
    image_url: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Cronograma capilar luxury no La Bonita"
  },
  {
    id: 19,
    name: "Pé + Mão",
    category: "nails",
    description: "Manicure e pedicure completos",
    price: 63,
    duration: "1h30",
    badge: "Mais pedido",
    image_url: "https://images.pexels.com/photos/6724306/pexels-photo-6724306.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Manicure e pedicure no La Bonita"
  },
  {
    id: 20,
    name: "Mão",
    category: "nails",
    description: "Manicure completa",
    price: 35,
    duration: "45min",
    image_url: "https://images.pexels.com/photos/6724448/pexels-photo-6724448.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Manicure no La Bonita"
  },
  {
    id: 21,
    name: "Pé",
    category: "nails",
    description: "Pedicure completa",
    price: 35,
    duration: "45min",
    image_url: "https://images.pexels.com/photos/6724446/pexels-photo-6724446.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Pedicure no La Bonita"
  },
  {
    id: 22,
    name: "Corte",
    category: "hair",
    description: "Corte feminino com acabamento profissional",
    price: 100,
    duration: "45min",
    badge: "Mais pedido",
    image_url: "https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Corte feminino no La Bonita"
  },
  {
    id: 23,
    name: "Escova",
    category: "hair",
    description: "Escova modeladora com finalização impecável. Selecione: Curto, Médio, Grande, Mega Hair",
    price: 60,
    duration: "40min - 1h30",
    badge: "Mais pedida",
    priceNote: "a partir de",
    image_url: "https://images.pexels.com/photos/3065170/pexels-photo-3065170.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Escova modeladora no La Bonita"
  },
  {
    id: 24,
    name: "Penteado",
    category: "hair",
    description: "Penteado sofisticado para eventos especiais",
    price: 200,
    duration: "1h - 2h",
    badge: "Noivas",
    secondBadge: "Eventos",
    image_url: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Penteado para noivas e eventos no La Bonita"
  },
  {
    id: 25,
    name: "Maquiagem",
    category: "beauty",
    description: "Maquiagem profissional para todas as ocasiões",
    price: 180,
    duration: "1h - 1h30",
    badge: "Noivas",
    secondBadge: "Eventos",
    image_url: "https://images.pexels.com/photos/3762465/pexels-photo-3762465.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Maquiagem profissional no La Bonita"
  },
  {
    id: 26,
    name: "Progressiva",
    category: "hair",
    description: "Alisamento progressivo com produtos de alta qualidade",
    price: 190,
    duration: "3h - 5h",
    priceNote: "a partir de",
    image_url: "https://images.pexels.com/photos/973401/pexels-photo-973401.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Progressiva no La Bonita"
  },
  {
    id: 27,
    name: "Realinhamento Capilar",
    category: "hair",
    description: "Manutenção do alisamento progressivo",
    price: 240,
    duration: "2h - 3h",
    image_url: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Realinhamento capilar no La Bonita"
  },
  {
    id: 28,
    name: "Esfumado de Raiz",
    category: "hair",
    description: "Técnica para disfarçar a raiz e transição de cores",
    price: 180,
    duration: "2h - 3h",
    image_url: "https://images.pexels.com/photos/8468125/pexels-photo-8468125.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Esfumado de raiz no La Bonita"
  },
  {
    id: 29,
    name: "Coloração Global",
    category: "hair",
    description: "Coloração completa dos fios",
    price: 140,
    duration: "2h - 3h",
    image_url: "https://images.pexels.com/photos/3993297/pexels-photo-3993297.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Coloração global no La Bonita"
  },
  {
    id: 30,
    name: "Banho de Brilho",
    category: "hair",
    description: "Tratamento para realçar o brilho e a cor",
    price: 150,
    duration: "1h30 - 2h",
    image_url: "https://images.pexels.com/photos/7440057/pexels-photo-7440057.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
    alt_text: "Banho de brilho no La Bonita"
  }
];

const categories = [
  { key: "all", name: "Todos os Serviços" },
  { key: "beauty", name: "Beleza & Estética" },
  { key: "skin", name: "Tratamentos de Pele" },
  { key: "massage", name: "Massagem" },
  { key: "nails", name: "Unhas" },
  { key: "hair", name: "Cabelo" }
];

export default function Services() {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState("all");

  const urlParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  
  useEffect(() => {
    const categoryFromUrl = urlParams.get('category');
    if (categoryFromUrl && categories.some(cat => cat.key === categoryFromUrl)) {
      setActiveFilter(categoryFromUrl);
    }
  }, [urlParams]);

  const filteredServices = useMemo(() => {
    return activeFilter === "all" 
      ? servicesData 
      : servicesData.filter(service => service.category === activeFilter);
  }, [activeFilter]);

  const handleServiceBooking = useCallback((service) => {
    window.dispatchEvent(new CustomEvent('open-booking-modal-with-service', { 
      detail: { service } 
    }));
  }, []);

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
            <span className="text-sm font-medium">Nossos Serviços</span>
          </div>
          
          <h1 className="font-serif font-medium text-[length:var(--font-h1)] text-[#0F0F0F] mb-6 leading-tight">
            La Bonita
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-[1.618]">
            Descubra nosso menu completo de tratamentos de beleza, realizados por profissionais 
            certificados com produtos de alta qualidade.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveFilter(category.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category.key
                  ? 'bg-[#C8A882] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-[#C8A882]/10 hover:text-[#C8A882] border border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-[clamp(1rem,2vw,2.5rem)]">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.03, y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg will-change-transform"
            >
              {/* Service Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image_url}
                  alt={service.alt_text}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-[#C8A882] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {service.priceNote && <span className="text-xs mr-1">{service.priceNote}</span>}
                  R$ {service.price.toLocaleString('pt-BR')}
                </div>

                {/* Badge Tags */}
                {(service.badge || service.secondBadge) && (
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {service.badge && (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        service.badge === 'Premium' ? 'bg-yellow-400 text-black' :
                        service.badge === 'Mais pedido' ? 'bg-orange-500 text-white' :
                        service.badge === 'Noivas' ? 'bg-pink-500 text-white' :
                        service.badge === 'Eventos' ? 'bg-blue-500 text-white' :
                        service.badge === 'Pacote' ? 'bg-blue-600 text-white' :
                        'bg-gray-700 text-white'
                      }`}>
                        {service.badge}
                      </span>
                    )}
                    {service.secondBadge && (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        service.secondBadge === 'Premium' ? 'bg-yellow-400 text-black' :
                        service.secondBadge === 'Noivas' ? 'bg-pink-500 text-white' :
                        service.secondBadge === 'Eventos' ? 'bg-blue-500 text-white' :
                        service.secondBadge === 'Pacote' ? 'bg-blue-600 text-white' :
                        'bg-gray-700 text-white'
                      }`}>
                        {service.secondBadge}
                      </span>
                    )}
                  </div>
                )}

                {/* Duration Badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {service.duration}
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-[#0F0F0F] mb-3 group-hover:text-[#C8A882] transition-colors duration-300">
                  {service.name}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {service.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#C8A882] fill-current" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">(4.9)</span>
                </div>
                
                <button 
                  onClick={() => handleServiceBooking(service)}
                  className="w-full bg-green-600 text-white py-3 rounded-full font-medium hover:bg-green-700 transition-all duration-300 group-hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Agendar Agora
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-3xl p-12 shadow-lg border border-[#C8A882]/20">
            <h2 className="font-serif text-[length:var(--font-h2)] font-bold text-[#0F0F0F] mb-4">
              Pronta para Sua Transformação?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-[1.618]">
              Agende seu horário hoje e venha descobrir a experiência completa de beleza 
              que o La Bonita oferece.
            </p>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
              className="bg-[#C8A882] text-white px-8 py-4 rounded-full font-medium hover:bg-[#FF5C8D] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Agendar Horário
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
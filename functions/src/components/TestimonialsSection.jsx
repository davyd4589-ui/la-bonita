import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ana Paula S.",
    role: "Empresária",
    rating: 5,
    text: "Uma experiência verdadeiramente profissional e revigorante. A equipe é atenciosa e o ambiente é perfeito para relaxamento. Saí me sentindo renovada e revigorada. Altamente recomendado para quem busca um serviço premium de beleza.",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8e0908ef4_image.png?w=800&q=90"
  },
  {
    id: 2,
    name: "Juliana Martins",
    role: "Designer de Moda",
    rating: 5,
    text: "O La Bonita transformou completamente minha rotina de beleza. As profissionais altamente qualificadas e os equipamentos premium entregam resultados que superam as expectativas. Cada visita parece um retiro de luxo.",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/845cb87f5_image.png?w=800&q=90"
  },
  {
    id: 3,
    name: "Carla Ribeiro",
    role: "Executiva",
    rating: 5,
    text: "A atenção aos detalhes e a expertise profissional no La Bonita são incomparáveis. Os equipamentos de ponta e a equipe qualificada fazem de cada tratamento uma experiência perfeita. Não confiaria minha pele a mais ninguém.",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/1acf8ba01_image.png?w=800&q=90"
  },
  {
    id: 4,
    name: "Marina Costa",
    role: "Empreendedora",
    rating: 5,
    text: "Desde o momento em que você entra no La Bonita, você sabe que está prestes a viver algo especial. A combinação de ambiente luxuoso, equipe profissional e tratamentos de ponta cria uma experiência verdadeiramente transformadora.",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/088f1f218_image.png?w=800&q=90"
  },
  {
    id: 5,
    name: "Fernanda Lima",
    role: "Médica",
    rating: 5,
    text: "Como profissional da saúde, aprecio o compromisso do La Bonita com o uso de equipamentos premium e manutenção dos mais altos padrões. As terapeutas qualificadas entendem exatamente o que meu corpo precisa para rejuvenescimento completo.",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/7cf2b68ad_image.png?w=800&q=90"
  },
  {
    id: 6,
    name: "Patrícia Santos",
    role: "Empresária",
    rating: 5,
    text: "O La Bonita estabelece o padrão ouro para bem-estar de luxo em Goiânia. A expertise profissional combinada com equipamentos de classe mundial garante que cada tratamento entregue resultados excepcionais. É meu santuário pessoal de beleza.",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2ffc407b6_image.png?w=800&q=90"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState({});
  const intervalRef = useRef(null);

  // Function to start the automatic slideshow
  const startSlideshow = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 2000);
  };

  // Function to reset the slideshow timer (used after manual interaction)
  const resetSlideshow = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    startSlideshow();
  };

  useEffect(() => {
    startSlideshow();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    resetSlideshow();
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    resetSlideshow();
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    resetSlideshow();
  };

  const handleImageError = (testimonialId) => {
    setImageError(prev => ({ ...prev, [testimonialId]: true }));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      className="py-12 relative overflow-hidden"
      onMouseEnter={() => clearInterval(intervalRef.current)}
      onMouseLeave={startSlideshow}
    >
      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <Quote className="absolute -top-2 -right-2 w-16 h-16 text-gray-200/80" />
            
            <h2 className="font-serif text-4xl lg:text-5xl font-light italic text-[#0F0F0F] mb-8 relative z-10">
              Depoimentos
            </h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white bg-gray-200">
                    {imageError[currentTestimonial.id] ? (
                      <div className="w-full h-full bg-gradient-to-br from-[#C8A882] to-[#FF5C8D] flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={currentTestimonial.image_url}
                        alt={`${currentTestimonial.name}, a happy client of SERENITY Spa in Kolkata`}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(currentTestimonial.id)}
                      />
                    )}
                  </div>
                </div>

                <p className="font-sans text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto min-h-[120px]">
                  {currentTestimonial.text}
                </p>

                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 transition-colors duration-300 ${
                        i < currentTestimonial.rating
                          ? 'text-[#C8A882] fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <div>
                  <h4 className="font-serif text-xl font-semibold text-[#0F0F0F]">
                    {currentTestimonial.name}
                  </h4>
                  <p className="font-sans text-sm text-gray-500 uppercase tracking-wider">
                    {currentTestimonial.role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-8 mt-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#C8A882] hover:text-white transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#C8A882] hover:text-white transition-all duration-300"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-[#C8A882] w-6'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
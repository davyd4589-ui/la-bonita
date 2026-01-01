import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Ana Clara M.",
    rating: 5,
    text: "Tratamento facial incrível! Minha pele está maravilhosa.",
    service: "Limpeza de Pele",
    avatar: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8e0908ef4_image.png?w=400&q=90"
  },
  {
    id: 2,
    name: "Juliana S.",
    rating: 5,
    text: "Melhor experiência de massagem em Goiânia. Super recomendo!",
    service: "Massagem Relaxante",
    avatar: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/845cb87f5_image.png?w=400&q=90"
  },
  {
    id: 3,
    name: "Beatriz L.",
    rating: 5,
    text: "Equipe profissional e ambiente luxuoso. Perfeito!",
    service: "Penteado",
    avatar: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/1acf8ba01_image.png?w=400&q=90"
  },
  {
    id: 4,
    name: "Mariana K.",
    rating: 5,
    text: "Serviço excelente e atenção aos detalhes impecável.",
    service: "Manicure",
    avatar: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/088f1f218_image.png?w=400&q=90"
  },
  {
    id: 5,
    name: "Fernanda R.",
    rating: 5,
    text: "La Bonita é meu lugar preferido para todas necessidades de beleza.",
    service: "Pacote Completo",
    avatar: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/7cf2b68ad_image.png?w=400&q=90"
  },
  {
    id: 6,
    name: "Camila P.",
    rating: 5,
    text: "Experiência incrível! Com certeza voltarei.",
    service: "Design de Sobrancelha",
    avatar: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2ffc407b6_image.png?w=400&q=90"
  },
  {
    id: 7,
    name: "Letícia A.",
    rating: 5,
    text: "Os tratamentos faciais aqui são divinos! Minha pele está radiante.",
    service: "Limpeza de Pele",
    avatar: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8e0908ef4_image.png?w=400&q=90"
  },
  {
    id: 8,
    name: "Daniela N.",
    rating: 5,
    text: "Tratamento capilar absolutamente incrível. Adorei!",
    service: "Hidratação Capilar",
    avatar: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/845cb87f5_image.png?w=400&q=90"
  },
  {
    id: 9,
    name: "Carolina B.",
    rating: 5,
    text: "Melhor massagem relaxante de todas! Muito relaxante.",
    service: "Massagem Relaxante",
    avatar: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/1acf8ba01_image.png?w=400&q=90"
  },
  {
    id: 10,
    name: "Patrícia G.",
    rating: 5,
    text: "Pacote de bem-estar completo. Altamente recomendado!",
    service: "Pacote Premium",
    avatar: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/088f1f218_image.png?w=400&q=90"
  }
];

export default function ReviewWidget() {
  const [currentReview, setCurrentReview] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [isManuallyDismissed, setIsManuallyDismissed] = useState(
    () => sessionStorage.getItem('reviewWidgetDismissed') === 'true'
  );

  useEffect(() => {
    if (isManuallyDismissed) return;

    const showWidget = () => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
      showWidget();
    }, 8000);

    const initialTimer = setTimeout(() => {
      showWidget();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, [isManuallyDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsManuallyDismissed(true);
    sessionStorage.setItem('reviewWidgetDismissed', 'true');
  };

  const handleImageError = (reviewId) => {
    setImageErrors(prev => ({ ...prev, [reviewId]: true }));
  };

  const review = reviews[currentReview];

  return (
    <AnimatePresence>
      {!isManuallyDismissed && isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-2 left-2 z-50 w-56 xs:w-60 sm:w-64 md:w-72"
        >
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-3 sm:p-4 relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#C8A882]/5 via-white to-[#FF5C8D]/5" />
            
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-1 right-1 w-5 h-5 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 z-10"
            >
              <X className="w-3 h-3 text-gray-500" />
            </button>

            {/* Content */}
            <div className="relative">
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#C8A882]/20 flex-shrink-0 bg-gray-100">
                  {imageErrors[review.id] ? (
                    <div className="w-full h-full bg-gradient-to-br from-[#C8A882] to-[#FF5C8D] flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">{review.name.charAt(0)}</span>
                    </div>
                  ) : (
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(review.id)}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-sm font-semibold text-[#0F0F0F] truncate">
                    {review.name}
                  </p>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < review.rating
                            ? 'text-[#C8A882] fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="font-sans text-xs sm:text-sm text-gray-600 leading-tight mb-2 line-clamp-2 pr-4">
                "{review.text}"
              </p>

              {/* Service */}
              <div className="inline-block bg-[#C8A882]/10 text-[#C8A882] px-2 py-1 rounded-full text-xs font-medium">
                {review.service}
              </div>
            </div>

            {/* Pulse Animation Border */}
            <div className="absolute inset-0 rounded-xl border-2 border-[#C8A882]/30 animate-pulse pointer-events-none" />
          </div>

          {/* LA BONITA Badge */}
          <div className="absolute -top-1 -right-1 bg-[#C8A882] text-white px-2 py-0.5 rounded-full text-xs font-medium shadow-lg">
            LA BONITA
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
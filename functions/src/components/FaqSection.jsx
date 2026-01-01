import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Onde fica o La Bonita Spa Beauty em Goiânia?",
    answer: "O La Bonita está localizado na R. SB 7, Qd.13 - Lt. 01, Residencial Solar Bougainville, Goiânia - GO, CEP 74393-385. Estamos em uma região de fácil acesso com estacionamento disponível para nossos clientes."
  },
  {
    question: "Como agendar horário no salão La Bonita?",
    answer: "Você pode agendar de 3 formas: (1) Clique no botão 'Agendar Horário' no site e preencha o formulário online, (2) Entre em contato via WhatsApp no (62) 99913-0894, ou (3) Use nosso chatbot inteligente no canto da tela para agendar rapidamente."
  },
  {
    question: "Quais serviços o salão La Bonita oferece?",
    answer: "Oferecemos uma ampla gama de serviços: tratamentos capilares completos (corte, coloração, mechas, progressiva, hidratação), manicure e pedicure profissional, design de sobrancelhas, cílios brasileiro, maquiagem, massagem relaxante, bronzeamento, além de pacotes especiais para noivas. Todos os serviços são realizados por profissionais especializadas com produtos premium."
  },
  {
    question: "Qual o horário de funcionamento do salão?",
    answer: "Funcionamos de terça a sexta-feira das 9h às 19h, sábados das 8h às 13h, e domingos das 8h às 13h. Fechamos às segundas-feiras. Recomendamos agendar com antecedência para garantir o horário de sua preferência."
  },
  {
    question: "O salão atende por WhatsApp?",
    answer: "Sim! Atendemos via WhatsApp no número (62) 99913-0894. É o meio mais rápido para tirar dúvidas, consultar disponibilidade de horários e fazer agendamentos. Nossa equipe responde rapidamente durante o horário de funcionamento."
  },
  {
    question: "Qual o melhor salão de beleza em Goiânia?",
    answer: "O La Bonita Spa Beauty é reconhecido como um dos melhores salões de Goiânia, com avaliação 5.0 estrelas de nossos clientes. Oferecemos infraestrutura moderna, produtos premium, profissionais especializadas e uma experiência completa de beleza e bem-estar. Mais de 1000 clientes já confiaram em nossos serviços."
  },
  {
    question: "Quanto custa os serviços do La Bonita?",
    answer: "Nossos preços variam conforme o serviço: corte feminino R$ 100, escova a partir de R$ 60, progressiva a partir de R$ 190, manicure e pedicure R$ 63 (combo), design de sobrancelhas R$ 40, cílios brasileiro R$ 160, massagem relaxante R$ 100. Pacotes para noivas de R$ 400 a R$ 1200. Entre em contato para valores específicos."
  },
  {
    question: "Preciso agendar com antecedência?",
    answer: "Sim, recomendamos agendar com antecedência para garantir o horário de sua preferência. Você pode verificar disponibilidade e agendar facilmente pelo nosso sistema online, WhatsApp ou chatbot. Para finais de semana e pacotes de noivas, sugerimos agendar com pelo menos uma semana de antecedência."
  },
  {
    question: "Quais produtos são utilizados no salão?",
    answer: "Trabalhamos exclusivamente com produtos profissionais premium e de alta qualidade. Utilizamos marcas reconhecidas no mercado de beleza, muitas com certificação orgânica e livres de substâncias nocivas. Todos os produtos são escolhidos criteriosamente para garantir os melhores resultados com máxima segurança para nossos clientes."
  },
  {
    question: "O salão oferece pacotes para noivas?",
    answer: "Sim! Temos 3 pacotes para noivas: Essencial (R$ 400) com serviços básicos, Premium (R$ 700) com tratamentos avançados e produtos importados, e Luxo (R$ 1200) que inclui spa day completo, produtos exclusivos e acompanhamento durante todo o dia. Todos incluem teste de penteado e maquiagem."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#C8A882]/10 rounded-full px-4 py-2 mb-4">
            <HelpCircle className="w-4 h-4 text-[#C8A882]" />
            <span className="text-sm font-medium text-[#C8A882]">PERGUNTAS FREQUENTES</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F0F0F] mb-4">
            Dúvidas Sobre o La Bonita?
          </h2>
          <p className="text-gray-600 text-lg">
            Respondemos as principais perguntas sobre nossos serviços, localização e agendamentos
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-[#F8F2EC] rounded-2xl overflow-hidden border border-[#C8A882]/20"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#C8A882]/5 transition-colors"
              >
                <h3 className="font-serif text-lg font-semibold text-[#0F0F0F] pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#C8A882] flex-shrink-0" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">Ainda tem dúvidas?</p>
          <button 
            onClick={() => window.open('https://wa.me/5562999130894?text=Olá,%20tenho%20algumas%20dúvidas%20sobre%20os%20serviços', '_blank')}
            className="bg-[#C8A882] text-white px-8 py-4 rounded-full font-sans font-semibold hover:bg-[#FF5C8D] transition-all duration-300 shadow-lg hover:scale-105"
          >
            Fale com a Gente no WhatsApp
          </button>
        </motion.div>
      </div>
    </section>
  );
}
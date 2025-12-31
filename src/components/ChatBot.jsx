import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Bot, User } from "lucide-react";
import { Appointment } from "@/entities/Appointment";
import { InvokeLLM } from "@/integrations/Core";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá! 👋 Bem-vinda ao La Bonita!\n\nSelecione uma opção abaixo ou digite sua dúvida:",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    client_name: "",
    email: "",
    phone: "",
    service: "",
    preferred_date: "",
    preferred_time: "",
    message: ""
  });
  const messagesEndRef = useRef(null);

  const servicesMenu = [
    { name: "Corte Feminino", price: 100, category: "Cabelo" },
    { name: "Escova", price: 60, category: "Cabelo", note: "a partir de" },
    { name: "Hidratação + Escova", price: 120, category: "Cabelo" },
    { name: "Nutrição + Escova", price: 160, category: "Cabelo" },
    { name: "Reconstrução + Escova", price: 180, category: "Cabelo" },
    { name: "Coloração Global", price: 140, category: "Cabelo" },
    { name: "Banho de Brilho", price: 150, category: "Cabelo" },
    { name: "Esfumado de Raiz", price: 180, category: "Cabelo" },
    { name: "Progressiva", price: 190, category: "Cabelo", note: "a partir de" },
    { name: "Realinhamento Capilar", price: 240, category: "Cabelo" },
    { name: "Penteado", price: 200, category: "Cabelo" },
    { name: "Combo Mechas", price: 780, category: "Cabelo" },
    { name: "Cronograma Premium", price: 420, category: "Cabelo" },
    { name: "Cronograma Luxury", price: 720, category: "Cabelo" },
    { name: "Design de Sobrancelha", price: 40, category: "Beleza" },
    { name: "Tonalização de Sobrancelha", price: 35, category: "Beleza" },
    { name: "Henna", price: 20, category: "Beleza" },
    { name: "Buço", price: 22, category: "Beleza" },
    { name: "Cílios Brasileiro", price: 160, category: "Beleza" },
    { name: "Mega Brasileiro", price: 200, category: "Beleza" },
    { name: "Manutenção Cílios", price: 110, category: "Beleza" },
    { name: "Maquiagem", price: 180, category: "Beleza" },
    { name: "Pé + Mão", price: 63, category: "Unhas" },
    { name: "Mão", price: 35, category: "Unhas" },
    { name: "Pé", price: 35, category: "Unhas" },
    { name: "Bronzeamento Natural", price: 80, category: "Pele" },
    { name: "Bronze na Máquina", price: 120, category: "Pele" },
    { name: "Banho de Lua", price: 65, category: "Pele" },
    { name: "Massagem Relaxante", price: 100, category: "Massagem" },
    { name: "Pacote Essencial Noivas", price: 400, category: "Noivas" },
    { name: "Pacote Premium Noivas", price: 700, category: "Noivas" },
    { name: "Pacote Luxo Noivas", price: 1200, category: "Noivas" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getSystemPrompt = async () => {
    // Get current appointments for context
    const recentAppointments = await Appointment.list("-created_date", 50);
    
    return `Você é a assistente virtual do La Bonita - Salão de Beleza, localizado em Goiânia, especializado em tratamentos capilares, manicure, pedicure, maquiagem e sobrancelha. Você é amigável, profissional, conhecedora de beleza e sempre prestativa. SEMPRE responda em Português do Brasil.

Informações do La Bonita:
- Localização: R. SB 7, Qd.13 - Lt. 01, Res. Solar Bougainville, Goiânia - GO, 74393-385
- Telefone/WhatsApp: (62) 98278-0894
- Redes Sociais: linktr.ee/labonitaspa
- Horários: 
  * Segunda: Fechado
  * Terça a Sexta: 9:00 - 19:00
  * Sábado: 8:00 - 13:00
  * Domingo: 8:00 - 13:00
- Especialidades: Tratamentos capilares (cortes, coloração, mechas, balayage), manicure, pedicure, maquiagem profissional, design de sobrancelha

COMPLETE & UPDATED SERVICES MENU:

NAILS PRICE LIST:
- Gel polish: ₹500
- Soft Gel Extension: ₹1500
- Acrylic Extension: ₹1800
- Douyin Nail Extension: ₹2500 (starting)
- Nail Art Add-Ons: French Tip (+₹500), Ombré (+₹500), Chrome (+₹400), Custom Art (from ₹200)
- Gel Remove: ₹200
- Classic Care Manicure: ₹700
- Royal Korean Ritual Manicure: ₹1500
- Classic Care Pedicure: ₹1000
- Royal Korean Ritual Pedicure: ₹2000
- Royal Korean Ritual Duo (Mani + Pedi): ₹3000

LASH EXTENSION PRICE LIST:
- Classic Lash Extension: ₹2000
- Hybrid Lash Extension: ₹2200
- Wispy Lash Extension: ₹2200
- Volume Lashes: ₹2500
- Lash Lift: ₹1500

PERMANENT MAKEUP PRICE LIST:
- Microblading: ₹6000
- Microshading: ₹6000
- Combine Brows: ₹7000
- Brow Touch up: ₹4500
- Lip Neutralisation / Lip Blush: ₹5000
- Lip Touch up: ₹2500
- Permanent Eyeliner (Upper OR Lower): ₹5000
- Eyeliner Touch up (single): ₹2500
- Permanent Eyeliner (Upper & Lower): ₹9000
- Eyeliner Touch up (upper & lower): ₹4500

SKIN TREATMENTS:
- Hydra Facial: ₹2000
- Stayve Korean BBGlow: ₹2500
- Hydra & BBGlow Combo: ₹4000
- Cece’s Signature Facial: ₹3000

MASSAGE THERAPY:
- Swedish Massage: ₹2,500 (60 min)
- Japanese Head Spa: ₹3,500 (90 min)
- Thai Dry Massage: ₹3,000 (75 min)
- Foot Massage: ₹1,500 (45 min)
- Head and Shoulder Massage: ₹1,200 (30 min)
- Deep Tissue Massage: ₹3,500 (60 min)

LASER HAIR REMOVAL:
- Underarm Laser: ₹1,000 (30 min)
- Bikini Laser: ₹2,000 (45 min)
- Full Leg Laser: ₹2,000 (90 min)
- Half Leg Laser: ₹1,500 (60 min)
- Full Arm Laser: ₹1,500 (60 min)
- Full Face Laser: ₹1,500 (45 min)
- Full Body Laser: ₹12,999 (240 min)
...and more. Refer to main list for others like back, stomach, etc.

HAIR SERVICES:
- Women Hair Cut: ₹800 (60 min)
- Men Hair Cut: ₹500 (45 min)
- Hair Wash & Style: ₹700 (60 min)
- Hair Spa: ₹1,500 starting (90 min)
- Keratin Treatment: ₹3,000 starting (240 min)
- Hair Colouring: ₹3,500 starting (180 min)
- Hair Straightening: ₹3,000 starting (240 min)
...and more.

EQUIPE LA BONITA:
1. Juliany Borges - Fundadora (10+ anos experiência)
   - Especialidades: Cortes, Mechas, Coloração, Maquiagem Noivas, Penteados
   - Instagram: @labonitaspabeauty

2. Rafael Lemos - Maquiador e Cabeleireiro (8+ anos experiência)
   - Especialidades: Maquiagem, Penteados
   - Instagram: @rafaellemosmake

3. Geovana - Especialista em Unhas (6+ anos experiência)
   - Especialidades: Extensão de Unhas, Nail Art

FILOSOFIA DO SALÃO:
- Técnicas avançadas de coloração e styling
- Expertise em tratamentos capilares que realçam beleza natural
- Busca constante por certificações e técnicas avançadas
- Atendimento personalizado e profissional

Recent Appointments Context (for reference when clients ask about existing bookings):
${recentAppointments.map(apt => `- ${apt.client_name} (${apt.email}, ${apt.phone}): ${apt.service} on ${apt.preferred_date} at ${apt.preferred_time} - Status: ${apt.status}`).join('\n')}

Suas capacidades:
1. Ajudar clientes a escolher o serviço certo baseado em suas necessidades usando a lista de preços atualizada.
2. Fornecer informações detalhadas sobre tratamentos, benefícios e preços.
3. Orientar clientes no processo de agendamento (explicar que precisarão usar o formulário de reserva para confirmação final).
4. Ajudar clientes a encontrar agendamentos existentes usando e-mail ou telefone.
5. Responder perguntas sobre tratamentos capilares, políticas do salão e cuidados com a beleza.
6. Fornecer direções e informações de contato.
7. Recomendar combinações de serviços para resultados ideais.
8. Discutir cuidados pós-tratamento e manutenção.

Diretrizes IMPORTANTES:
- SEMPRE responda em Português do Brasil.
- Respostas ULTRA-CURTAS: Máximo 2 linhas. Seja direta e objetiva.
- NUNCA repita informações já ditas na conversa. Vá direto ao próximo passo.
- WORKFLOW INTELIGENTE: 
  * Para agendamento: Pergunte 1 coisa por vez (serviço → data → horário → contato)
  * Para serviços: Pergunte a categoria (cabelo/unhas/maquiagem) → mostre só 3-4 opções relevantes
  * Para preços: Mostre só o que foi pedido, não uma lista enorme
- SEJA NATURAL: Fale como uma pessoa, não como robô. Varie as respostas.
- Use 1 emoji por mensagem no máximo.
- Se já deu informação X, vá para próxima pergunta, não repita X.
- Sempre use os preços corretos quando mostrar valores.
- Para agendar: colete info e diga "Vou abrir o formulário para você confirmar"

Data atual: ${new Date().toISOString().split('T')[0]}
Horário atual: ${new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' })}

Lembre-se: Você representa um salão de beleza premium, então mantenha um tom premium, acolhedor e conhecedor em todas as interações.`;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsTyping(true);
      
      const appointment = await Appointment.create(bookingData);
      
      try {
        const { base44 } = await import("@/api/base44Client");
        await Promise.all([
          base44.functions.invoke('syncToGoogleCalendar', { appointment: bookingData }),
          base44.functions.invoke('syncToGoogleSheets', { appointment: bookingData })
        ]);
      } catch (syncError) {
        console.error('Sync failed:', syncError);
      }
      
      const successMessage = {
        id: Date.now(),
        text: "✅ Agendamento confirmado com sucesso!\n\nVocê receberá uma confirmação em breve. Obrigada por escolher o La Bonita! 💖",
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, successMessage]);
      setShowBookingForm(false);
      setBookingData({
        client_name: "",
        email: "",
        phone: "",
        service: "",
        preferred_date: "",
        preferred_time: "",
        message: ""
      });
    } catch (error) {
      console.error('Booking error:', error);
      const errorMessage = {
        id: Date.now(),
        text: "Ops! Houve um erro ao processar seu agendamento. Por favor, ligue para (62) 98278-0894. 😊",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (customText) => {
    const messageText = customText || inputText;
    if (!messageText.trim()) return;

    // Hide quick actions after first interaction
    if (showQuickActions) {
      setShowQuickActions(false);
    }
    
    // Check if user wants to book
    const bookingKeywords = ['agendar', 'marcar', 'horário', 'horario', 'reservar', 'booking'];
    if (bookingKeywords.some(keyword => messageText.toLowerCase().includes(keyword))) {
      const userMessage = {
        id: Date.now(),
        text: messageText,
        sender: "user",
        timestamp: new Date()
      };
      
      const botMessage = {
        id: Date.now() + 1,
        text: "Perfeito! Preencha o formulário abaixo para agendar seu horário:",
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage, botMessage]);
      setInputText("");
      setShowBookingForm(true);
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const systemPrompt = await getSystemPrompt();
      
      const conversationHistory = messages.slice(-6).map(m => 
        `${m.sender === 'user' ? 'Cliente' : 'Você'}: ${m.text}`
      ).join('\n');

      const response = await InvokeLLM({
        prompt: `${systemPrompt}

HISTÓRICO DA CONVERSA (últimas 6 mensagens):
${conversationHistory}

Mensagem atual do cliente: ${messageText}

RESPONDA: Máximo 2 linhas. Vá direto ao ponto. NÃO repita o que já foi dito. Pergunte 1 coisa por vez. Seja humana e natural. SEMPRE em Português do Brasil.`,
        add_context_from_internet: false
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Desculpe, estou com dificuldades técnicas no momento. Por favor, ligue diretamente para (62) 98278-0894 ou envie WhatsApp. Nossa equipe terá prazer em ajudar você! ✨",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-gradient-to-r from-[#C8A882] to-[#FF5C8D] text-white rounded-full shadow-2xl z-40 flex items-center justify-center transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'} w-16 h-16`}
        aria-label="Open AI chat assistant"
      >
        <MessageCircle className="w-6 h-6" />
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 w-[calc(100%-2rem)] max-w-sm h-[75vh] sm:bottom-6 sm:right-6 sm:w-96 sm:h-[600px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-[#C8A882]/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#C8A882] to-[#FF5C8D] text-white p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative p-1">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/84a1bc056_ScreenShotTool-20251221150407.png"
                    alt="La Bonita"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold">La Bonita</h3>
                  <p className="text-xs opacity-90">Assistente Virtual • Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[85%]`}>
                    {message.sender === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 p-1">
                        <img 
                          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/84a1bc056_ScreenShotTool-20251221150407.png"
                          alt="La Bonita"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div className={`p-3 rounded-2xl ${message.sender === 'user' ? 'bg-[#C8A882] text-white ml-2' : 'bg-gray-100 text-gray-800'}`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
                      <p className={`text-xs mt-1 text-right ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-[#C8A882] flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Booking Form */}
              {showBookingForm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-4 shadow-lg border-2 border-[#C8A882]"
                >
                  <form onSubmit={handleBookingSubmit} className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">Nome Completo *</label>
                      <input
                        type="text"
                        value={bookingData.client_name}
                        onChange={(e) => setBookingData({...bookingData, client_name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C8A882]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-medium text-gray-700 mb-1 block">Email *</label>
                        <input
                          type="email"
                          value={bookingData.email}
                          onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C8A882]"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-700 mb-1 block">Telefone *</label>
                        <input
                          type="tel"
                          value={bookingData.phone}
                          onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C8A882]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">Serviço *</label>
                      <select
                        value={bookingData.service}
                        onChange={(e) => setBookingData({...bookingData, service: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C8A882]"
                        required
                      >
                        <option value="">Selecione um serviço</option>
                        {servicesMenu.map((service, idx) => (
                          <option key={idx} value={service.name}>
                            {service.name} - R$ {service.price} {service.note ? `(${service.note})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-medium text-gray-700 mb-1 block">Data *</label>
                        <input
                          type="date"
                          value={bookingData.preferred_date}
                          onChange={(e) => setBookingData({...bookingData, preferred_date: e.target.value})}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C8A882]"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-700 mb-1 block">Horário *</label>
                        <select
                          value={bookingData.preferred_time}
                          onChange={(e) => setBookingData({...bookingData, preferred_time: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C8A882]"
                          required
                        >
                          <option value="">Selecione</option>
                          <option value="09:00">09:00</option>
                          <option value="10:00">10:00</option>
                          <option value="11:00">11:00</option>
                          <option value="12:00">12:00</option>
                          <option value="13:00">13:00</option>
                          <option value="14:00">14:00</option>
                          <option value="15:00">15:00</option>
                          <option value="16:00">16:00</option>
                          <option value="17:00">17:00</option>
                          <option value="18:00">18:00</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">Observações</label>
                      <textarea
                        value={bookingData.message}
                        onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C8A882]"
                        rows="2"
                        placeholder="Alguma preferência especial?"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowBookingForm(false)}
                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-[#C8A882] to-[#FF5C8D] text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                      >
                        Confirmar
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1">
                      <img 
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/84a1bc056_ScreenShotTool-20251221150407.png"
                        alt="La Bonita"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {showQuickActions && (
              <div className="px-4 py-3 border-t border-gray-200 bg-gradient-to-r from-[#F8F2EC] to-white">
                <div className="grid grid-cols-2 gap-2 mb-2">
                <button
                  onClick={() => handleSendMessage("Quero agendar um horário")}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-[#C8A882] to-[#FF5C8D] text-white text-xs font-medium rounded-xl hover:shadow-lg transition-all"
                >
                  <span className="text-base">📅</span> Agendar
                </button>
                <button
                  onClick={() => handleSendMessage("Mostrar todos os serviços")}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-[#C8A882] to-[#FF5C8D] text-white text-xs font-medium rounded-xl hover:shadow-lg transition-all"
                >
                  <span className="text-base">💅</span> Serviços
                </button>
                <button
                  onClick={() => handleSendMessage("Quais são os preços?")}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-[#C8A882] to-[#FF5C8D] text-white text-xs font-medium rounded-xl hover:shadow-lg transition-all"
                >
                  <span className="text-base">💰</span> Preços
                </button>
                <button
                  onClick={() => handleSendMessage("Pacotes para noivas")}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-pink-400 to-pink-600 text-white text-xs font-medium rounded-xl hover:shadow-lg transition-all"
                >
                  <span className="text-base">👰</span> Noivas
                </button>
                <button
                  onClick={() => handleSendMessage("Onde vocês ficam?")}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-[#C8A882] text-white text-xs font-medium rounded-xl hover:bg-[#FF5C8D] transition-all"
                >
                  <span className="text-base">📍</span> Localização
                </button>
                <button
                  onClick={() => handleSendMessage("Horários de atendimento")}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-[#C8A882] text-white text-xs font-medium rounded-xl hover:bg-[#FF5C8D] transition-all"
                >
                  <span className="text-base">🕐</span> Horários
                </button>
              </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Pergunte sobre serviços, agendamento, preços..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-[#C8A882] transition-colors"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="w-10 h-10 bg-gradient-to-r from-[#C8A882] to-[#FF5C8D] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
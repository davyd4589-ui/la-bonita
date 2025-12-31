import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare, Sparkles, Check, Download, Camera } from "lucide-react";
import { base44 } from "@/api/base44Client";

// Serviços La Bonita
const services = [
  { name: "Cílios Brasileiro", price: 160, duration: "2h", category: "Beleza" },
  { name: "Mega Brasileiro", price: 200, duration: "2h30", category: "Beleza" },
  { name: "Manutenção", price: 110, duration: "1h - 1h30", category: "Beleza" },
  { name: "Design de Sobrancelha", price: 40, duration: "30min", category: "Beleza" },
  { name: "Buço", price: 22, duration: "15min", category: "Beleza" },
  { name: "Henna", price: 20, duration: "30min", category: "Beleza" },
  { name: "Tonalização de Sobrancelha", price: 35, duration: "30min", category: "Beleza" },
  { name: "Bronzeamento Natural", price: 80, duration: "1h", category: "Pele" },
  { name: "Bronze na Máquina", price: 120, duration: "30min", category: "Pele" },
  { name: "Banho de Lua", price: 65, duration: "45min", category: "Pele" },
  { name: "Massagem Relaxante", price: 100, duration: "1h", category: "Massagem" },
  { name: "Pacote Essencial", price: 400, duration: "Variável", category: "Beleza" },
  { name: "Combo Mechas", price: 780, duration: "4h - 6h", category: "Cabelo" },
  { name: "Reconstrução + Escova", price: 180, duration: "2h - 2h30", category: "Cabelo" },
  { name: "Nutrição + Escova", price: 160, duration: "2h - 2h30", category: "Cabelo" },
  { name: "Hidratação + Escova", price: 120, duration: "1h30 - 2h", category: "Cabelo" },
  { name: "Cronograma Capilar Premium", price: 420, duration: "4 sessões", category: "Cabelo" },
  { name: "Cronograma Capilar Luxury", price: 720, duration: "4 sessões", category: "Cabelo" },
  { name: "Pé + Mão", price: 63, duration: "1h30", category: "Unhas" },
  { name: "Mão", price: 35, duration: "45min", category: "Unhas" },
  { name: "Pé", price: 35, duration: "45min", category: "Unhas" },
  { name: "Corte", price: 100, duration: "45min", category: "Cabelo" },
  { name: "Escova", price: 60, duration: "40min - 1h30", category: "Cabelo", priceNote: "a partir de" },
  { name: "Penteado", price: 200, duration: "1h - 2h", category: "Cabelo" },
  { name: "Maquiagem", price: 180, duration: "1h - 1h30", category: "Beleza" },
  { name: "Progressiva", price: 190, duration: "3h - 5h", category: "Cabelo", priceNote: "a partir de" },
  { name: "Realinhamento Capilar", price: 240, duration: "2h - 3h", category: "Cabelo" },
  { name: "Esfumado de Raiz", price: 180, duration: "2h - 3h", category: "Cabelo" },
  { name: "Coloração Global", price: 140, duration: "2h - 3h", category: "Cabelo" },
  { name: "Banho de Brilho", price: 150, duration: "1h30 - 2h", category: "Cabelo" }
];

const timeSlots = [
  "9:00", "9:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
];

export default function BookingModal({ isOpen, onClose, initialService }) {
  const [formData, setFormData] = useState({
    client_name: "",
    email: "",
    phone: "",
    service: "",
    preferred_date: "",
    preferred_time: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [createdAppointment, setCreatedAppointment] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (initialService) {
        setFormData(prev => ({ ...prev, service: initialService.name }));
        setStep(2);
      } else {
        resetForm();
      }
      setError("");
    }
  }, [isOpen, initialService]);

  const selectedService = services.find(s => s.name === formData.service);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const validateForm = () => {
    const { client_name, email, phone, service, preferred_date, preferred_time } = formData;
    
    if (!client_name.trim()) return "Por favor, insira seu nome completo";
    if (!email.trim()) return "Por favor, insira seu email";
    if (!email.includes("@")) return "Por favor, insira um email válido";
    if (!phone.trim()) return "Por favor, insira seu telefone";
    if (!service) return "Por favor, selecione um serviço";
    if (!preferred_date) return "Por favor, selecione uma data";
    if (!preferred_time) return "Por favor, selecione um horário";
    
    const selectedDate = new Date(preferred_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return "Por favor, selecione uma data futura";
    }
    
    return null;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const appointmentData = {
        ...formData,
        service_price: selectedService?.price,
        duration: selectedService?.duration,
        status: "confirmed"
      };

      const appointment = await base44.entities.Appointment.create(appointmentData);
      setCreatedAppointment(appointment);

      try {
        await createInternalNotification(appointment, formData, selectedService);
      } catch (notificationError) {
        console.error('Internal notification creation failed:', notificationError);
      }

      try {
        const syncPromises = [
          base44.functions.invoke('syncToGoogleCalendar', { appointment: appointmentData }).catch(err => {
            console.error('Google Calendar sync failed:', err);
            return null;
          }),
          base44.functions.invoke('syncToGoogleSheets', { appointment: appointmentData }).catch(err => {
            console.error('Google Sheets sync failed:', err);
            return null;
          })
        ];
        await Promise.all(syncPromises);
      } catch (syncError) {
        console.error('Sync failed:', syncError);
      }

      setStep(3);
    } catch (error) {
      console.error('Booking submission failed:', error);
      setError('Erro ao enviar agendamento. Por favor, tente novamente ou ligue para (62) 98278-0894.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const createInternalNotification = async (appointment, formData, selectedService) => {
    const notificationData = {
      booking_id: appointment.id,
      client_name: formData.client_name,
      client_email: formData.email,
      client_phone: formData.phone,
      service_name: formData.service,
      service_price: selectedService?.price,
      service_duration: selectedService?.duration,
      appointment_date: formData.preferred_date,
      appointment_time: formData.preferred_time,
      special_requests: formData.message || "",
      notification_status: "pending",
      priority: "normal"
    };

    await base44.entities.BookingNotification.create(notificationData);
  };

  const resetForm = () => {
    setFormData({
      client_name: "",
      email: "",
      phone: "",
      service: "",
      preferred_date: "",
      preferred_time: "",
      message: ""
    });
    setStep(1);
    setCreatedAppointment(null);
    setError("");
  };

  const handleClose = () => {
    if (step === 3) {
      resetForm();
    }
    onClose();
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const downloadBookingDetails = () => {
    const bookingDetails = `
════════════════════════════════════════════════════
           L A   B O N I T A
════════════════════════════════════════════════════

                 ** CONFIRMAÇÃO DE AGENDAMENTO **

         Estamos felizes em confirmar seu agendamento.
         Aguardamos você!

════════════════════════════════════════════════════
Referência: ${createdAppointment?.id}
Data de Confirmação: ${new Date().toLocaleString('pt-BR', { 
  dateStyle: 'full', 
  timeStyle: 'short' 
})}
════════════════════════════════════════════════════

INFORMAÇÕES DO CLIENTE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nome:          ${formData.client_name}
Email:         ${formData.email}
Telefone:      ${formData.phone}

DETALHES DO AGENDAMENTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Serviço:       ${createdAppointment?.service}
Valor:         R$ ${selectedService?.price.toLocaleString('pt-BR')}
Duração:       ${selectedService?.duration}
Data:          ${formatDate(createdAppointment?.preferred_date)}
Horário:       ${createdAppointment?.preferred_time}
Observações:   ${formData.message || 'Nenhuma'}

════════════════════════════════════════════════════
                    INSTRUÇÕES IMPORTANTES
════════════════════════════════════════════════════

✓ Por favor, chegue 10 minutos antes do horário 
  agendado.

✓ Este documento DEVE ser apresentado na recepção
  (pode ser digital).

✓ Para alterações ou cancelamentos, entre em contato
  com pelo menos 24 horas de antecedência.

════════════════════════════════════════════════════
                       ONDE NOS ENCONTRAR:
════════════════════════════════════════════════════
Endereço:  R. SB 7, Qd.13 - Lt. 01
           Res. Solar Bougainville
           Goiânia - GO, 74393-385

Telefone:  (62) 98278-0894
Site:      linktr.ee/labonitaspa

Horário de Atendimento:
Segunda: Fechado
Terça a Sexta: 9:00 - 19:00
Sábado: 8:00 - 13:00
Domingo: 8:00 - 13:00

════════════════════════════════════════════════════
Obrigada por escolher La Bonita. Esperamos você!
════════════════════════════════════════════════════
`;

    const blob = new Blob([bookingDetails], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `La_Bonita_Confirmacao_${createdAppointment?.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-[#C8A882]" />
                <h2 className="font-serif text-2xl font-bold text-[#0F0F0F]">
                  Agendar Horário
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <p className="text-gray-600">Passo 1 de 2: Selecione o Serviço</p>
                  </div>

                  <div className="grid gap-4 max-h-96 overflow-y-auto">
                    {services.map((service) => (
                      <div
                        key={service.name}
                        onClick={() => {
                          handleInputChange('service', service.name);
                          setStep(2);
                        }}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                          formData.service === service.name
                            ? 'border-[#C8A882] bg-[#C8A882]/5'
                            : 'border-gray-200 hover:border-[#C8A882]/50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-serif text-lg font-semibold text-[#0F0F0F]">
                              {service.name}
                            </h3>
                            <p className="text-sm text-gray-500">{service.duration}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-serif text-xl font-bold text-[#C8A882]">
                              {service.priceNote && <span className="text-xs text-gray-600 mr-1">{service.priceNote}</span>}
                              R$ {service.price.toLocaleString('pt-BR')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <p className="text-gray-600">Passo 2 de 2: Seus Dados</p>
                    <div className="mt-4 p-4 bg-[#C8A882]/5 rounded-xl">
                      <p className="font-serif text-lg text-[#0F0F0F]">
                        {formData.service} - R$ {selectedService?.price.toLocaleString('pt-BR')}
                        {selectedService?.priceNote && <span className="text-sm text-gray-600 ml-1">{selectedService.priceNote}</span>}
                      </p>
                      <p className="text-sm text-gray-600">{selectedService?.duration}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.client_name}
                          onChange={(e) => handleInputChange('client_name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                        placeholder="(62) 98278-0894"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Data Preferida *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.preferred_date}
                          onChange={(e) => handleInputChange('preferred_date', e.target.value)}
                          min={getTomorrowDate()}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Clock className="w-4 h-4 inline mr-2" />
                          Horário Preferido *
                        </label>
                        <select
                          required
                          value={formData.preferred_time}
                          onChange={(e) => handleInputChange('preferred_time', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                        >
                          <option value="">Selecione o horário</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MessageSquare className="w-4 h-4 inline mr-2" />
                        Observações (Opcional)
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300 resize-none"
                        placeholder="Alguma observação ou preferência..."
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 py-3 px-6 border border-gray-300 rounded-xl font-sans font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                      >
                        Voltar
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-3 px-6 bg-[#C8A882] text-white rounded-xl font-sans font-medium hover:bg-[#FF5C8D] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Confirmando...
                          </>
                        ) : (
                          'Confirmar Agendamento'
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4 md:space-y-6 py-6 md:py-8 px-4"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
                  </div>
                  
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#0F0F0F] mb-2">
                      Agendamento Confirmado!
                    </h3>
                    <p className="text-gray-600 px-2">
                      Obrigada, {formData.client_name}. Aguardamos você!
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-[#C8A882]/10 to-[#FF5C8D]/10 rounded-2xl p-4 md:p-6 text-left border-2 border-[#C8A882]/30 mx-auto max-w-lg shadow-lg">
                    <div className="text-center mb-4">
                      <h4 className="font-serif text-xl font-bold text-[#0F0F0F] mb-1">
                        📋 CONFIRMAÇÃO DE AGENDAMENTO
                      </h4>
                      <div className="w-16 h-0.5 bg-[#C8A882] mx-auto"></div>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="bg-white/70 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <strong className="text-gray-700">Referência:</strong>
                          <span className="text-[#FF5C8D] font-bold font-mono text-xs bg-[#FF5C8D]/10 px-2 py-1 rounded">
                            #{createdAppointment?.id?.slice(-8)?.toUpperCase()}
                          </span>
                        </div>
                        <div className="w-full h-[1px] bg-[#C8A882]/30 mb-2"></div>
                        
                        <div className="flex justify-between items-start mb-2">
                          <strong className="text-gray-700">Serviço:</strong>
                          <span className="text-right pl-2 font-medium">{createdAppointment?.service}</span>
                        </div>
                        
                        <div className="flex justify-between items-center mb-2">
                          <strong className="text-gray-700">Valor:</strong>
                          <span className="text-[#C8A882] font-bold text-lg">R$ {selectedService?.price.toLocaleString('pt-BR')}</span>
                        </div>
                        
                        <div className="flex justify-between items-center mb-2">
                          <strong className="text-gray-700">Duração:</strong>
                          <span className="font-medium">{selectedService?.duration}</span>
                        </div>
                        
                        <div className="w-full h-[1px] bg-[#C8A882]/30 mb-2"></div>
                        
                        <div className="flex justify-between items-center mb-2">
                          <strong className="text-gray-700">Data:</strong>
                          <span className="text-right pl-2 font-medium">{formatDate(createdAppointment?.preferred_date)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <strong className="text-gray-700">Horário:</strong>
                          <span className="font-bold text-lg">{createdAppointment?.preferred_time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 p-4 rounded-lg mx-auto max-w-lg shadow-sm">
                    <div className="flex items-start gap-3">
                      <Camera className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                      <div className="text-left">
                        <h5 className="font-bold text-orange-800 mb-2 text-base">📱 IMPORTANTE: Salve Esta Confirmação</h5>
                        <p className="text-sm text-orange-700 leading-relaxed">
                          Por favor, <strong>tire um print desta tela</strong> ou baixe o documento de confirmação. 
                          Você <strong>deve apresentar</strong> na recepção quando chegar para seu atendimento.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 px-4">
                    <button
                      onClick={downloadBookingDetails}
                      className="w-full py-3 md:py-4 px-6 bg-[#C8A882] text-white rounded-xl font-sans font-medium hover:bg-[#FF5C8D] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl text-base"
                    >
                      <Download className="w-5 h-5" />
                      Baixar Confirmação
                    </button>

                    <button
                      onClick={handleClose}
                      className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-sans font-medium hover:bg-gray-200 transition-colors duration-300"
                    >
                      Fechar
                    </button>
                  </div>

                  <div className="text-xs text-gray-500 pt-6 border-t border-gray-200 space-y-1">
                    <p className="font-bold text-[#C8A882] text-sm">La Bonita Salão de Beleza</p>
                    <p>R. SB 7, Qd.13 - Lt. 01, Res. Solar Bougainville</p>
                    <p>Goiânia - GO, 74393-385 | (62) 98278-0894</p>
                    <p className="text-[#C8A882] font-medium">Ter-Sex: 9h-19h | Sáb-Dom: 8h-13h</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
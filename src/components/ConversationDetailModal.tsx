import React, { useState } from 'react';
import { Conversation, ConversationMessage } from '../types';
import { GuardrailBanner } from './GuardrailBanner';
import { 
  X, 
  Send, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  User, 
  Building2, 
  FileText,
  AlertCircle
} from 'lucide-react';

interface ConversationDetailModalProps {
  conversation: Conversation | null;
  onClose: () => void;
  onSendMessage: (conversationId: string, content: string) => void;
}

export const ConversationDetailModal: React.FC<ConversationDetailModalProps> = ({
  conversation,
  onClose,
  onSendMessage
}) => {
  const [replyText, setReplyText] = useState('');

  if (!conversation) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onSendMessage(conversation.id, replyText.trim());
    setReplyText('');
  };

  const statusSteps = [
    { key: 'Recebida', label: '1. Recebida' },
    { key: 'Em análise', label: '2. Em análise' },
    { key: 'Respondida', label: '3. Respondida' }
  ];

  const currentStepIndex = 
    conversation.status === 'Recebida' ? 0 : 
    conversation.status === 'Em análise' ? 1 : 2;

  const isQuality = conversation.category === 'Qualidade e segurança';

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
    >
      <div 
        className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50/60">
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-mono font-bold text-slate-800">{conversation.protocolNumber}</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-slate-700">{conversation.category}</span>
              <span aria-hidden="true">·</span>
              <span>{conversation.createdAt}</span>
            </div>
            <h2 id="dialog-title" className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {conversation.subject}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 flex items-center justify-center shrink-0 transition-colors"
            title="Fechar detalhes"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm">
          
          {/* Status Tracker */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Fluxo do Atendimento</span>
              <span className="text-slate-500 font-mono text-[11px]">Urgência: {conversation.urgency.split(' ')[0]}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 pt-1">
              {statusSteps.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div 
                    key={step.key} 
                    className={`p-2 rounded-lg border text-center transition-all ${
                      isCurrent
                        ? idx === 2
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold'
                          : idx === 1
                          ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold'
                          : 'border-blue-500 bg-blue-50 text-blue-900 font-bold'
                        : isPassed
                        ? 'border-slate-200 bg-white text-slate-700 font-medium'
                        : 'border-slate-100 bg-slate-100/60 text-slate-400 font-normal'
                    }`}
                  >
                    <div className="text-[11px] truncate">{step.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quality Metadata if applicable */}
          {conversation.qualityData && (
            <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-3.5 space-y-2 text-xs text-rose-900">
              <div className="flex items-center gap-1.5 font-bold text-rose-900">
                <ShieldAlert className="w-4 h-4 text-rose-700" />
                <span>Dados Oficiais de Rastreabilidade de Lote</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div>
                  <span className="text-rose-700 block">Número do Lote</span>
                  <span className="font-mono font-bold text-slate-900">{conversation.qualityData.batchNumber}</span>
                </div>
                <div>
                  <span className="text-rose-700 block">Produto</span>
                  <span className="font-medium text-slate-900 truncate block">{conversation.qualityData.productLine}</span>
                </div>
                {conversation.qualityData.expiryDate && (
                  <div>
                    <span className="text-rose-700 block">Validade</span>
                    <span className="font-medium text-slate-900">{conversation.qualityData.expiryDate}</span>
                  </div>
                )}
                <div>
                  <span className="text-rose-700 block">Amostra Retida</span>
                  <span className="font-medium text-slate-900">{conversation.qualityData.sampleRetained ? 'Sim' : 'Não'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Message Thread */}
          <div className="space-y-3 pt-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Histórico de Mensagens Técnicas
            </h3>

            <div className="space-y-3">
              {conversation.messages.map((msg) => {
                const isVet = msg.sender === 'veterinario';

                return (
                  <div
                    key={msg.id}
                    className={`rounded-xl p-4 border space-y-2 ${
                      isVet 
                        ? 'bg-blue-50/40 border-blue-100 mr-4 sm:mr-8' 
                        : 'bg-white border-slate-200 ml-4 sm:ml-8 shadow-xs ring-1 ring-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-1.5">
                      <div className="flex items-center gap-1.5 font-medium text-slate-800">
                        {isVet ? (
                          <>
                            <User className="w-3.5 h-3.5 text-blue-600" />
                            <span>{msg.senderName}</span>
                          </>
                        ) : (
                          <>
                            <Building2 className="w-3.5 h-3.5 text-blue-600" />
                            <span className="text-blue-900 font-semibold">{msg.senderName}</span>
                          </>
                        )}
                      </div>
                      <span className="text-[11px] tabular-nums">{msg.timestamp}</span>
                    </div>

                    {msg.senderRole && (
                      <div className="text-[11px] text-blue-700 font-medium">
                        {msg.senderRole}
                      </div>
                    )}

                    <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <GuardrailBanner compact />
        </div>

        {/* Footer / Reply Form */}
        <div className="p-3 sm:p-4 border-t border-slate-200 bg-slate-50/80">
          <form onSubmit={handleSend} className="space-y-2">
            <label htmlFor="replica-input" className="block text-xs font-bold text-slate-700">
              Enviar Complemento Técnico ou Réplica
            </label>
            <div className="flex items-end gap-2">
              <textarea
                id="replica-input"
                rows={2}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Adicione informações adicionais sobre o caso ou dúvidas complementares..."
                className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600 resize-none"
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shrink-0 flex items-center justify-center min-h-[44px]"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline ml-1.5">Enviar</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

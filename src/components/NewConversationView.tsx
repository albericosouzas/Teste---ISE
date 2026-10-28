import React, { useState, useEffect } from 'react';
import { Category, Urgency, Conversation, QualityMetadata } from '../types';
import { GuardrailBanner } from './GuardrailBanner';
import { 
  ShieldAlert, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Layers, 
  Info,
  Calendar,
  Tag
} from 'lucide-react';

interface NewConversationViewProps {
  initialCategory?: Category | null;
  onSubmitConversation: (conversation: Conversation) => void;
  onGoToConversation: (conv: Conversation) => void;
  onCancel: () => void;
}

export const NewConversationView: React.FC<NewConversationViewProps> = ({
  initialCategory,
  onSubmitConversation,
  onGoToConversation,
  onCancel
}) => {
  const [category, setCategory] = useState<Category>(initialCategory || 'Informação técnico-científica');
  const [subject, setSubject] = useState('');
  const [urgency, setUrgency] = useState<Urgency>('Média (orientação técnica para o dia)');
  const [message, setMessage] = useState('');

  // Specialized fields for "Qualidade e segurança" flow
  const [batchNumber, setBatchNumber] = useState('');
  const [productLine, setProductLine] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [sampleRetained, setSampleRetained] = useState(false);

  // Validation state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdConversation, setCreatedConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
      if (initialCategory === 'Qualidade e segurança') {
        setUrgency('Alta (urgência de qualidade ou suporte imediato)');
      }
    }
  }, [initialCategory]);

  const isQualityFlow = category === 'Qualidade e segurança';

  const handleCategoryChange = (newCat: Category) => {
    setCategory(newCat);
    setErrors(prev => ({ ...prev, category: '' }));
    if (newCat === 'Qualidade e segurança') {
      setUrgency('Alta (urgência de qualidade ou suporte imediato)');
    }
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!category) {
      newErrors.category = 'Selecione uma categoria de atendimento.';
    }

    if (!subject.trim()) {
      newErrors.subject = 'O assunto da consulta técnica é obrigatório.';
    } else if (subject.trim().length < 5) {
      newErrors.subject = 'O assunto deve ter pelo menos 5 caracteres.';
    }

    if (!message.trim()) {
      newErrors.message = 'A descrição detalhada da mensagem técnica é obrigatória.';
    } else if (message.trim().length < 15) {
      newErrors.message = 'Forneça mais detalhes técnicos na mensagem (mínimo de 15 caracteres).';
    }

    // Specialized validation for Quality flow
    if (isQualityFlow) {
      if (!batchNumber.trim()) {
        newErrors.batchNumber = 'Para qualidade e segurança, o número do lote do produto é obrigatório.';
      }
      if (!productLine.trim()) {
        newErrors.productLine = 'Informe o nome ou linha do produto examinado.';
      }
    }

    // Guardrail soft check for privacy
    const privacyCheckPattern = /(cpf|rg|telefone|celular|endereço|rua|tutor|prontuário)/i;
    if (privacyCheckPattern.test(message) || privacyCheckPattern.test(subject)) {
      newErrors.privacy = 'Lembrete de conformidade: não inclua dados pessoais de tutores, endereços ou prontuários clínicos.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // scroll to first error
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10);
      const timeStr = now.toTimeString().slice(0, 5);
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const protocol = `VET-2026-${randomCode}`;

      let qualityData: QualityMetadata | undefined = undefined;
      if (isQualityFlow) {
        qualityData = {
          batchNumber: batchNumber.trim(),
          productLine: productLine.trim(),
          expiryDate: expiryDate.trim() || undefined,
          sampleRetained
        };
      }

      const initialMessageFormatted = isQualityFlow
        ? `${message.trim()}\n\n[Dados de Rastreabilidade Registrados: Lote ${batchNumber.trim()} · Produto: ${productLine.trim()} · Amostra Retida: ${sampleRetained ? 'Sim' : 'Não'}]`
        : message.trim();

      const newConv: Conversation = {
        id: `conv-${Date.now()}`,
        protocolNumber: protocol,
        category,
        subject: subject.trim(),
        urgency,
        initialMessage: initialMessageFormatted,
        status: 'Recebida',
        createdAt: `${dateStr} ${timeStr}`,
        updatedAt: `${dateStr} ${timeStr}`,
        qualityData,
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: 'veterinario',
            senderName: 'Dr(a). Veterinário(a)',
            timestamp: `${dateStr} ${timeStr}`,
            content: initialMessageFormatted
          }
        ]
      };

      onSubmitConversation(newConv);
      setIsSubmitting(false);
      setCreatedConversation(newConv);
    }, 600);
  };

  // Success Confirmation Card
  if (createdConversation) {
    return (
      <div className="max-w-2xl mx-auto py-6 space-y-6 pb-24 md:pb-12">
        <div className="bg-white border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
              Protocolo Registrado com Sucesso
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Consulta Enviada à Equipe NUTRIPET
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Sua solicitação foi indexada pelo canal técnico. Você pode acompanhar a análise e a emissão de laudo no painel de conversas.
            </p>
          </div>

          {/* Protocol Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-medium">Número do Protocolo</span>
              <span className="font-mono font-bold text-slate-900 text-sm">
                {createdConversation.protocolNumber}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Categoria</span>
              <span className="font-medium text-slate-900">{createdConversation.category}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Status Inicial</span>
              <span className="font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Recebida
              </span>
            </div>
            {createdConversation.qualityData && (
              <div className="flex items-center justify-between text-rose-700">
                <span>Lote Vinculado</span>
                <span className="font-mono font-bold">{createdConversation.qualityData.batchNumber}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-slate-500 pt-1">
              <span>Previsão de Primeira Análise</span>
              <span>{isQualityFlow ? 'Prioritária (< 24h úteis)' : 'Até 4 horas úteis'}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onGoToConversation(createdConversation)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors min-h-[44px]"
            >
              <span>Acompanhar na Lista de Conversas</span>
            </button>
            <button
              onClick={() => {
                setCreatedConversation(null);
                setSubject('');
                setMessage('');
                setBatchNumber('');
                setProductLine('');
                setExpiryDate('');
                setErrors({});
              }}
              className="w-full sm:w-auto px-5 py-2.5 text-slate-700 hover:bg-slate-100 text-sm font-medium rounded-xl transition-colors min-h-[44px]"
            >
              Abrir Outra Consulta
            </button>
          </div>
        </div>

        <GuardrailBanner compact />
      </div>
    );
  }

  const categoryOptions: { id: Category; label: string; desc: string }[] = [
    {
      id: 'Informação técnico-científica',
      label: 'Informação técnico-científica',
      desc: 'Balanço nutricional, micronutrientes, digestibilidade e evidências científicas'
    },
    {
      id: 'Produto e ingredientes',
      label: 'Produto e ingredientes',
      desc: 'Composição centesimal, fontes proteicas, fibras funcionais e palatabilidade'
    },
    {
      id: 'Parceria ou evento',
      label: 'Parceria ou evento',
      desc: 'Apoio a simpósios acadêmicos, amostras clínicas e palestras técnicas'
    },
    {
      id: 'Qualidade e segurança',
      label: 'Qualidade e segurança (Fluxo Prioritário)',
      desc: 'Rastreabilidade de lote, integridade de embalagem e laudos laboratoriais'
    }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 md:pb-12">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Nova Consulta Técnica
        </h1>
        <p className="text-sm text-slate-600">
          Envie sua dúvida diretamente aos médicos veterinários e nutricionistas clínicos da NUTRIPET.
        </p>
      </div>

      <GuardrailBanner compact />

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
        
        {/* Category Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            1. Categoria do Atendimento <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {categoryOptions.map((opt) => {
              const isSelected = category === opt.id;
              const isQuality = opt.id === 'Qualidade e segurança';

              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => handleCategoryChange(opt.id)}
                  className={`p-3 text-left rounded-xl border transition-all flex flex-col justify-between min-h-[72px] ${
                    isSelected
                      ? isQuality
                        ? 'border-rose-400 bg-rose-50/60 ring-2 ring-rose-200'
                        : 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-100'
                      : isQuality
                      ? 'border-rose-200/80 bg-rose-50/20 hover:border-rose-300'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-xs font-semibold ${isSelected ? (isQuality ? 'text-rose-800' : 'text-blue-900') : 'text-slate-800'}`}>
                      {opt.label}
                    </span>
                    {isQuality && (
                      <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-rose-200 text-rose-800 shrink-0">
                        SLA Rápido
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {opt.desc}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.category && (
            <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.category}
            </p>
          )}
        </div>

        {/* Specialized Flow Alert for "Qualidade e segurança" */}
        {isQualityFlow && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-900 space-y-3 animate-fadeIn">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h2 className="font-bold text-rose-900 text-sm">
                  Fluxo Especial de Rastreabilidade e Garantia de Qualidade
                </h2>
                <p className="text-rose-800 leading-relaxed">
                  Este protocolo é direcionado imediatamente ao Comitê de Boas Práticas de Fabricação (BPF) e Controle de Qualidade NUTRIPET. Preencha os dados da embalagem para rastreamento no laudo de batelada industrial.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-bold uppercase text-rose-900 mb-1">
                  Número do Lote <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={batchNumber}
                    onChange={(e) => {
                      setBatchNumber(e.target.value);
                      setErrors(prev => ({ ...prev, batchNumber: '' }));
                    }}
                    placeholder="Ex: L-2026-X94B"
                    className="w-full text-xs font-mono bg-white border border-rose-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-400 placeholder:text-slate-400 placeholder:font-sans"
                  />
                  {!batchNumber && (
                    <button
                      type="button"
                      onClick={() => setBatchNumber('L-2026-X94B')}
                      className="absolute right-2 top-2 text-[10px] text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded hover:bg-rose-200"
                    >
                      Preencher Exemplo
                    </button>
                  )}
                </div>
                {errors.batchNumber && (
                  <p className="text-[11px] text-rose-700 mt-1 font-medium">{errors.batchNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-rose-900 mb-1">
                  Linha / Apresentação do Produto <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={productLine}
                  onChange={(e) => {
                    setProductLine(e.target.value);
                    setErrors(prev => ({ ...prev, productLine: '' }));
                  }}
                  placeholder="Ex: NUTRIPET Renal Care Canino 2,5kg"
                  className="w-full text-xs bg-white border border-rose-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-400 placeholder:text-slate-400"
                />
                {errors.productLine && (
                  <p className="text-[11px] text-rose-700 mt-1 font-medium">{errors.productLine}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-rose-900 mb-1">
                  Data de Validade (opcional)
                </label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="Ex: 11/2027"
                  className="w-full text-xs bg-white border border-rose-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-400 placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center pt-5 sm:pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sampleRetained}
                    onChange={(e) => setSampleRetained(e.target.checked)}
                    className="w-4 h-4 text-rose-600 border-rose-300 rounded focus:ring-rose-500"
                  />
                  <span className="text-xs text-rose-900 font-medium">
                    Amostra retida sob custódia na clínica
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Subject */}
        <div className="space-y-1.5">
          <label htmlFor="assunto-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            2. Assunto da Consulta <span className="text-rose-500">*</span>
          </label>
          <input
            id="assunto-input"
            type="text"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              setErrors(prev => ({ ...prev, subject: '', privacy: '' }));
            }}
            placeholder={
              isQualityFlow 
                ? "Ex: Divergência de aspecto de kibble no lote L-2026-X94B"
                : "Ex: Teores de fósforo e cálcio na dieta renal para felinos em fase 2"
            }
            className={`w-full text-sm bg-white border rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 transition-all ${
              errors.subject ? 'border-rose-500 focus:ring-rose-200' : 'border-slate-300 focus:ring-blue-200 focus:border-blue-600'
            }`}
          />
          {errors.subject && (
            <p className="text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.subject}
            </p>
          )}
        </div>

        {/* Urgency */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            3. Grau de Urgência Técnica <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              {
                id: 'Baixa (rotina e consultas conceituais)',
                title: 'Baixa (Rotina)',
                desc: 'Dúvidas conceituais ou de prescrição futura'
              },
              {
                id: 'Média (orientação técnica para o dia)',
                title: 'Média (Orientação)',
                desc: 'Definição de dieta coadjuvante da semana'
              },
              {
                id: 'Alta (urgência de qualidade ou suporte imediato)',
                title: 'Alta (Imediata)',
                desc: 'Rastreabilidade de lote ou dúvida urgente'
              }
            ].map((u) => {
              const isSelected = urgency === u.id;
              return (
                <button
                  type="button"
                  key={u.id}
                  onClick={() => setUrgency(u.id as Urgency)}
                  className={`p-3 text-left rounded-xl border transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-100 text-blue-900'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-semibold">{u.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{u.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="mensagem-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              4. Descrição Técnica da Dúvida <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-slate-500 tabular-nums">
              {message.length} caracteres
            </span>
          </div>
          <textarea
            id="mensagem-input"
            rows={5}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setErrors(prev => ({ ...prev, message: '', privacy: '' }));
            }}
            placeholder={
              isQualityFlow
                ? "Descreva a ocorrência técnica observada no produto, condições de armazenamento na clínica, integridade do lacre da embalagem e qualquer alteração sensorial identificada."
                : "Descreva em detalhes a pergunta nutricional, espécie (canino ou felino), idade aproximada ou situação clínica genérica (sem dados pessoais de tutor)."
            }
            className={`w-full text-sm bg-white border rounded-xl p-3.5 text-slate-900 focus:outline-none focus:ring-2 transition-all leading-relaxed ${
              errors.message ? 'border-rose-500 focus:ring-rose-200' : 'border-slate-300 focus:ring-blue-200 focus:border-blue-600'
            }`}
          />
          {errors.message && (
            <p className="text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.message}
            </p>
          )}
          {errors.privacy && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{errors.privacy}</span>
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors min-h-[44px]"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 font-semibold text-xs sm:text-sm rounded-xl text-white transition-all shadow-xs min-h-[44px] ${
              isQualityFlow
                ? 'bg-rose-700 hover:bg-rose-800 focus:ring-rose-300'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-200'
            } ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Registrando Protocolo...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{isQualityFlow ? 'Registrar Protocolo de Qualidade' : 'Enviar Consulta Técnica'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

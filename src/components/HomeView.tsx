import React from 'react';
import { Conversation, NavTab } from '../types';
import { GuardrailBanner } from './GuardrailBanner';
import { 
  MessageSquarePlus, 
  ShieldAlert, 
  BookOpen, 
  Clock, 
  ChevronRight, 
  FileCheck2, 
  Send, 
  Sparkles,
  Download
} from 'lucide-react';

interface HomeViewProps {
  conversations: Conversation[];
  onSelectTab: (tab: NavTab) => void;
  onOpenConversation: (conv: Conversation) => void;
  onStartNewWithCategory: (category: 'Qualidade e segurança' | 'Informação técnico-científica' | 'Produto e ingredientes' | 'Parceria ou evento') => void;
  openExportModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  conversations,
  onSelectTab,
  onOpenConversation,
  onStartNewWithCategory,
  openExportModal
}) => {
  const totalRecebidas = conversations.filter(c => c.status === 'Recebida').length;
  const totalEmAnalise = conversations.filter(c => c.status === 'Em análise').length;
  const totalRespondidas = conversations.filter(c => c.status === 'Respondida').length;

  const recentConversations = [...conversations].slice(0, 3);

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Welcome Header */}
      <section className="bg-gradient-to-b from-blue-50/70 to-white border border-blue-100 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-800 bg-blue-100/70 px-2.5 py-0.5 rounded-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-700" />
              <span>Suporte Técnico Especializado NUTRIPET</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Olá, Dr(a). Veterinário(a)
            </h1>
            <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
              Consulte nossa equipe científica sobre formulação, ingredientes, bromatologia, laudos e rastreabilidade com rapidez e fundamentação técnica.
            </p>
          </div>

          <div className="flex sm:flex-col gap-2 shrink-0">
            <button
              onClick={() => onSelectTab('new')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors min-h-[44px]"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Nova Consulta</span>
            </button>
            <button
              onClick={openExportModal}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-slate-200 rounded-xl transition-colors min-h-[44px]"
              title="Baixar arquivo autônomo offline para celular"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span className="truncate">Salvar vetconecta.html</span>
            </button>
          </div>
        </div>
      </section>

      {/* Mandatory Guardrail Banner */}
      <GuardrailBanner />

      {/* Summary of Open Conversations */}
      <section aria-labelledby="resumo-atendimentos" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 id="resumo-atendimentos" className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Resumo de Protocolos
          </h2>
          <button
            onClick={() => onSelectTab('conversations')}
            className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-0.5 py-1"
          >
            <span>Ver todas ({conversations.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
          <button
            onClick={() => onSelectTab('conversations')}
            className="p-3.5 sm:p-4 bg-white border border-slate-200 rounded-xl text-left hover:border-blue-300 transition-colors shadow-xs"
          >
            <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
              <Send className="w-3.5 h-3.5 text-blue-600" />
              <span className="truncate">Recebidas</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">
              {totalRecebidas}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 truncate">
              Aguardando triagem
            </div>
          </button>

          <button
            onClick={() => onSelectTab('conversations')}
            className="p-3.5 sm:p-4 bg-white border border-slate-200 rounded-xl text-left hover:border-amber-300 transition-colors shadow-xs"
          >
            <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span className="truncate">Em análise</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">
              {totalEmAnalise}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 truncate">
              Comitê técnico
            </div>
          </button>

          <button
            onClick={() => onSelectTab('conversations')}
            className="p-3.5 sm:p-4 bg-white border border-slate-200 rounded-xl text-left hover:border-emerald-300 transition-colors shadow-xs"
          >
            <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="truncate">Respondidas</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">
              {totalRespondidas}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 truncate">
              Prontas para leitura
            </div>
          </button>
        </div>
      </section>

      {/* Priority Actions */}
      <section aria-labelledby="acoes-prioritarias" className="space-y-3">
        <h2 id="acoes-prioritarias" className="text-sm font-bold uppercase tracking-wider text-slate-700">
          Ações Prioritárias
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Priority Action 1: New Tech Consultation */}
          <button
            onClick={() => onStartNewWithCategory('Informação técnico-científica')}
            className="p-4 bg-white border border-slate-200 rounded-xl text-left hover:border-blue-400 hover:shadow-sm transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <MessageSquarePlus className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">
                Consulta Técnico-Científica
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dúvidas de bromatologia, nutrientes, balanço mineral e literatura sobre dietas coadjuvantes.
              </p>
            </div>
            <div className="mt-3 pt-2 text-xs font-medium text-blue-600 flex items-center gap-1">
              <span>Iniciar pergunta</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* Priority Action 2: Quality & Lot Traceability (Dedicated flow) */}
          <button
            onClick={() => onStartNewWithCategory('Qualidade e segurança')}
            className="p-4 bg-rose-50/40 border border-rose-200 rounded-xl text-left hover:border-rose-400 hover:shadow-sm transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 text-sm">
                  Qualidade & Lote
                </h3>
                <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wide bg-rose-100 px-1.5 py-0.5 rounded">
                  Prioritário
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rastreabilidade de número de lote, divergência física ou verificação microbiológica oficial.
              </p>
            </div>
            <div className="mt-3 pt-2 text-xs font-semibold text-rose-700 flex items-center gap-1">
              <span>Abrir protocolo de lote</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* Priority Action 3: Scientific Library */}
          <button
            onClick={() => onSelectTab('library')}
            className="p-4 bg-white border border-slate-200 rounded-xl text-left hover:border-blue-400 hover:shadow-sm transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">
                Biblioteca Científica
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Guias nutricionais, tabelas completas de níveis de garantia e compêndios técnicos para download.
              </p>
            </div>
            <div className="mt-3 pt-2 text-xs font-medium text-blue-600 flex items-center gap-1">
              <span>Consultar materiais</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </section>

      {/* Recent Activity List */}
      <section aria-labelledby="atividades-recentes" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 id="atividades-recentes" className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Últimos Protocolos
          </h2>
          <button
            onClick={() => onSelectTab('conversations')}
            className="text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            Ver histórico completo
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 shadow-xs">
          {recentConversations.map((conv) => {
            const statusConfig = {
              'Recebida': { label: 'Recebida', color: 'text-blue-700 bg-blue-50' },
              'Em análise': { label: 'Em análise', color: 'text-amber-800 bg-amber-50' },
              'Respondida': { label: 'Respondida', color: 'text-emerald-700 bg-emerald-50' }
            }[conv.status];

            return (
              <button
                key={conv.id}
                onClick={() => onOpenConversation(conv)}
                className="w-full text-left p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono font-semibold text-slate-700">{conv.protocolNumber}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{conv.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{conv.createdAt.split(' ')[0]}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 truncate">
                    {conv.subject}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {conv.initialMessage}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${statusConfig.color}`}>
                    {statusConfig.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Technical Operational Desk Information */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-900 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-500" />
            Plantão Técnico-Científico NUTRIPET
          </span>
          <span className="text-slate-500 text-[11px]">Segunda a Sexta, 08h às 18h</span>
        </div>
        <p className="leading-relaxed text-slate-600">
          Equipe formada por médicos veterinários com pós-graduação e doutorado em nutrição clínica de cães e gatos. O tempo médio de primeira resposta para consultas rotineiras é de 4 horas; casos de qualidade e rastreabilidade possuem triagem prioritária.
        </p>
      </section>
    </div>
  );
};

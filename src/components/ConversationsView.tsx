import React, { useState } from 'react';
import { Conversation, ConversationStatus, NavTab } from '../types';
import { GuardrailBanner } from './GuardrailBanner';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  Send, 
  ChevronRight, 
  Plus, 
  ShieldAlert,
  Inbox
} from 'lucide-react';

interface ConversationsViewProps {
  conversations: Conversation[];
  onOpenConversation: (conv: Conversation) => void;
  onSelectTab: (tab: NavTab) => void;
}

export const ConversationsView: React.FC<ConversationsViewProps> = ({
  conversations,
  onOpenConversation,
  onSelectTab
}) => {
  const [filterStatus, setFilterStatus] = useState<ConversationStatus | 'Todas'>('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter((c) => {
    const matchesStatus = filterStatus === 'Todas' || c.status === filterStatus;
    const matchesSearch = 
      c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.protocolNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.initialMessage.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: ConversationStatus) => {
    switch (status) {
      case 'Recebida':
        return {
          label: 'Recebida',
          icon: <Send className="w-3.5 h-3.5 text-blue-600" />,
          classes: 'bg-blue-50 text-blue-700 border border-blue-200'
        };
      case 'Em análise':
        return {
          label: 'Em análise',
          icon: <Clock className="w-3.5 h-3.5 text-amber-600" />,
          classes: 'bg-amber-50 text-amber-800 border border-amber-200'
        };
      case 'Respondida':
        return {
          label: 'Respondida',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
          classes: 'bg-emerald-50 text-emerald-700 border border-emerald-200'
        };
    }
  };

  return (
    <div className="space-y-5 pb-24 md:pb-12">
      {/* Header & New Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Conversas e Protocolos
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Acompanhe o parecer técnico e as orientações emitidas pela equipe científica NUTRIPET.
          </p>
        </div>

        <button
          onClick={() => onSelectTab('new')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors min-h-[44px] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Consulta</span>
        </button>
      </div>

      {/* Mandatory Guardrail Banner */}
      <GuardrailBanner compact />

      {/* Search and Filters Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por protocolo (ex: VET-2026), assunto ou nutriente..."
            className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600 shadow-xs placeholder:text-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-medium"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
          {(['Todas', 'Recebida', 'Em análise', 'Respondida'] as const).map((st) => {
            const count = st === 'Todas' 
              ? conversations.length 
              : conversations.filter(c => c.status === st).length;
            const isActive = filterStatus === st;

            return (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 min-h-[36px] ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <span>{st}</span>
                <span className={`ml-1.5 text-[11px] tabular-nums font-normal ${isActive ? 'text-blue-600 font-semibold' : 'text-slate-500'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conversations List */}
      <div className="space-y-3">
        {filteredConversations.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-slate-800 text-sm">
              Nenhuma conversa encontrada
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Nenhum protocolo corresponde aos filtros selecionados. Tente ajustar os termos de busca ou inicie um novo contato.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setFilterStatus('Todas'); }}
              className="text-xs font-semibold text-blue-600 hover:underline pt-1"
            >
              Limpar todos os filtros
            </button>
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const badge = getStatusBadge(conv.status);
            const isQuality = conv.category === 'Qualidade e segurança';

            return (
              <button
                key={conv.id}
                onClick={() => onOpenConversation(conv)}
                className="w-full text-left bg-white border border-slate-200 hover:border-blue-400 rounded-xl p-4 sm:p-5 shadow-xs transition-all space-y-3 group focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-mono font-bold text-slate-800">{conv.protocolNumber}</span>
                      <span aria-hidden="true">·</span>
                      <span className={isQuality ? 'text-rose-700 font-medium' : 'text-slate-600'}>
                        {conv.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{conv.createdAt.split(' ')[0]}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {conv.subject}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg ${badge.classes}`}>
                      {badge.icon}
                      <span>{badge.label}</span>
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {conv.initialMessage}
                </p>

                {/* Footer metadata */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-600">
                      Urgência: {conv.urgency.split(' ')[0]}
                    </span>
                    {conv.qualityData && (
                      <span className="text-[11px] font-mono text-rose-700 font-semibold bg-rose-50 px-1.5 py-0.5 rounded">
                        Lote: {conv.qualityData.batchNumber}
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-medium text-blue-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    <span>Ver detalhes</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

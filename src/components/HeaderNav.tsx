import React from 'react';
import { NavTab } from '../types';
import { Plus, Download } from 'lucide-react';

interface HeaderNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  openExportModal: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentTab,
  onSelectTab,
  openExportModal
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 text-left focus-visible:outline-2 focus-visible:outline-blue-600 rounded-md"
          title="VetConecta NUTRIPET - Página Inicial"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
            NP
          </div>
          <div>
            <div className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap">
              VetConecta <span className="text-blue-600 font-semibold">NUTRIPET</span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium hidden sm:block">
              Canal Técnico-Científico
            </div>
          </div>
        </button>

        {/* Zone 2: Navigation Links (visible on md+) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectTab('home')}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              currentTab === 'home'
                ? 'text-blue-700 border-blue-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Início
          </button>
          <button
            onClick={() => onSelectTab('new')}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              currentTab === 'new'
                ? 'text-blue-700 border-blue-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Nova conversa
          </button>
          <button
            onClick={() => onSelectTab('conversations')}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              currentTab === 'conversations'
                ? 'text-blue-700 border-blue-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Conversas
          </button>
          <button
            onClick={() => onSelectTab('library')}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              currentTab === 'library'
                ? 'text-blue-700 border-blue-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Biblioteca
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={openExportModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
            title="Exportar arquivo autônomo vetconecta.html"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>vetconecta.html</span>
          </button>

          <button
            onClick={() => onSelectTab('new')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-blue-600 min-h-[38px]"
          >
            <Plus className="w-4 h-4" />
            <span className="whitespace-nowrap">Nova Consulta</span>
          </button>
        </div>
      </div>
    </header>
  );
};

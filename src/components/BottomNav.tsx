import React from 'react';
import { NavTab } from '../types';
import { Home, MessageSquarePlus, MessageSquare, BookOpen } from 'lucide-react';

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  openCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  openCount
}) => {
  const tabs: { id: NavTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'home',
      label: 'Início',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'new',
      label: 'Nova conversa',
      icon: <MessageSquarePlus className="w-5 h-5" />
    },
    {
      id: 'conversations',
      label: 'Conversas',
      icon: <MessageSquare className="w-5 h-5" />,
      badge: openCount > 0 ? openCount : undefined
    },
    {
      id: 'library',
      label: 'Biblioteca',
      icon: <BookOpen className="w-5 h-5" />
    }
  ];

  return (
    <nav 
      aria-label="Navegação Principal Móvel"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="grid grid-cols-4 h-16 max-w-md mx-auto items-stretch">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`min-h-[48px] flex flex-col items-center justify-center relative transition-colors focus-visible:outline-none ${
                isActive ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-900 font-medium'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {tab.badge !== undefined && (
                  <span className="absolute -top-1 -right-2.5 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] tracking-tight mt-1 truncate max-w-[80px]">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-6 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

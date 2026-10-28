/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavTab, Conversation, LibraryMaterial, Category } from './types';
import { INITIAL_CONVERSATIONS, INITIAL_LIBRARY_MATERIALS } from './data/mockData';
import { HeaderNav } from './components/HeaderNav';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { NewConversationView } from './components/NewConversationView';
import { ConversationsView } from './components/ConversationsView';
import { LibraryView } from './components/LibraryView';
import { ConversationDetailModal } from './components/ConversationDetailModal';
import { MaterialModal } from './components/MaterialModal';
import { ExportHtmlModal } from './components/ExportHtmlModal';

const STORAGE_CONVERSATIONS = 'vetconecta_conversations_v1';
const STORAGE_LIBRARY = 'vetconecta_library_v1';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [preselectedCategory, setPreselectedCategory] = useState<Category | null>(null);

  // Conversations state with localStorage persistence
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CONVERSATIONS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_CONVERSATIONS;
  });

  // Library materials state with localStorage persistence
  const [materials, setMaterials] = useState<LibraryMaterial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LIBRARY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_LIBRARY_MATERIALS;
  });

  // Modals state
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [activeMaterial, setActiveMaterial] = useState<LibraryMaterial | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CONVERSATIONS, JSON.stringify(conversations));
    } catch {
      // ignore
    }
  }, [conversations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LIBRARY, JSON.stringify(materials));
    } catch {
      // ignore
    }
  }, [materials]);

  // Keep active conversation reference in sync
  useEffect(() => {
    if (activeConversation) {
      const fresh = conversations.find(c => c.id === activeConversation.id);
      if (fresh) {
        setActiveConversation(fresh);
      }
    }
  }, [conversations]);

  const handleSelectTab = (tab: NavTab) => {
    setCurrentTab(tab);
    if (tab !== 'new') {
      setPreselectedCategory(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartNewWithCategory = (cat: Category) => {
    setPreselectedCategory(cat);
    setCurrentTab('new');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddConversation = (newConv: Conversation) => {
    setConversations(prev => [newConv, ...prev]);
    showToast(`Protocolo ${newConv.protocolNumber} registrado com sucesso!`);
  };

  const handleGoToConversation = (conv: Conversation) => {
    setCurrentTab('conversations');
    setActiveConversation(conv);
  };

  const handleSendMessage = (conversationId: string, content: string) => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = now.toTimeString().slice(0, 5);

    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        const newMessage = {
          id: `msg-${Date.now()}`,
          sender: 'veterinario' as const,
          senderName: 'Dr(a). Veterinário(a)',
          timestamp: `${dateStr} ${timeStr}`,
          content
        };
        return {
          ...c,
          updatedAt: `${dateStr} ${timeStr}`,
          messages: [...c.messages, newMessage]
        };
      }
      return c;
    }));

    showToast('Mensagem complementar enviada à equipe NUTRIPET.');
  };

  const handleToggleFavorite = (materialId: string) => {
    setMaterials(prev => prev.map(m => {
      if (m.id === materialId) {
        const updatedFav = !m.isFavorite;
        showToast(updatedFav ? 'Material adicionado aos favoritos ⭐' : 'Material removido dos favoritos');
        return { ...m, isFavorite: updatedFav };
      }
      return m;
    }));

    // If active material modal is open, update its state
    if (activeMaterial && activeMaterial.id === materialId) {
      setActiveMaterial(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
  };

  const openCount = conversations.filter(c => c.status !== 'Respondida').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Google Cloud-inspired Clean Header */}
      <HeaderNav
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        openExportModal={() => setIsExportModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-5 sm:pt-6">
        {currentTab === 'home' && (
          <HomeView
            conversations={conversations}
            onSelectTab={handleSelectTab}
            onOpenConversation={(conv) => setActiveConversation(conv)}
            onStartNewWithCategory={handleStartNewWithCategory}
            openExportModal={() => setIsExportModalOpen(true)}
          />
        )}

        {currentTab === 'new' && (
          <NewConversationView
            initialCategory={preselectedCategory}
            onSubmitConversation={handleAddConversation}
            onGoToConversation={handleGoToConversation}
            onCancel={() => handleSelectTab('home')}
          />
        )}

        {currentTab === 'conversations' && (
          <ConversationsView
            conversations={conversations}
            onOpenConversation={(conv) => setActiveConversation(conv)}
            onSelectTab={handleSelectTab}
          />
        )}

        {currentTab === 'library' && (
          <LibraryView
            materials={materials}
            onOpenMaterial={(mat) => setActiveMaterial(mat)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </main>

      {/* Mobile-first bottom navigation bar */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        openCount={openCount}
      />

      {/* Conversation Detail Modal / Drawer */}
      <ConversationDetailModal
        conversation={activeConversation}
        onClose={() => setActiveConversation(null)}
        onSendMessage={handleSendMessage}
      />

      {/* Library Material Detail Modal */}
      <MaterialModal
        material={activeMaterial}
        onClose={() => setActiveMaterial(null)}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Standalone HTML File Export Modal */}
      <ExportHtmlModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      {/* Toast Feedback Banner */}
      {toastMessage && (
        <div 
          role="status" 
          aria-live="polite"
          className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg border border-slate-700/50 flex items-center gap-2 animate-fadeIn"
        >
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

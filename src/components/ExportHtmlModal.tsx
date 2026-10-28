import React, { useState } from 'react';
import { X, Download, Check, FileCode, Smartphone, ExternalLink } from 'lucide-react';

interface ExportHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportHtmlModal: React.FC<ExportHtmlModalProps> = ({ isOpen, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownloadFile = () => {
    // Create an anchor linking to /vetconecta.html
    const link = document.createElement('a');
    link.href = '/vetconecta.html';
    link.download = 'vetconecta.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleOpenDirectly = () => {
    window.open('/vetconecta.html', '_blank');
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
    >
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <h2 id="export-modal-title" className="text-base font-bold text-slate-900">
                Arquivo Autônomo: vetconecta.html
              </h2>
              <p className="text-[11px] text-slate-500">
                Conforme solicitado na Entrega Técnica
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-600">
          <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1.5 text-xs text-blue-900">
            <div className="font-bold flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-blue-600" />
              <span>Pronto para abrir em qualquer celular ou navegador</span>
            </div>
            <p className="text-blue-800 leading-relaxed">
              O arquivo <strong>vetconecta.html</strong> é 100% autocontido: reúne todo o HTML, CSS limpo inspirado no Google Cloud e JavaScript com sessão em um só arquivo sem nenhuma dependência externa, permitindo teste local e offline imediato.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="font-semibold text-slate-800 uppercase tracking-wider text-[11px]">
              O que este arquivo inclui:
            </div>
            <ul className="space-y-1 text-slate-600 list-disc list-inside">
              <li>As 4 áreas navegáveis: Início, Nova conversa, Conversas e Biblioteca</li>
              <li>Fluxo especializado e prioritário para <strong>Qualidade e segurança</strong> com validação de lote</li>
              <li>Conversa fictícia técnica já respondida pelo especialista da NUTRIPET</li>
              <li>3 materiais fictícios completos, busca em tempo real e sistema de favoritos</li>
              <li>Aviso de guardrail legal e clínico permanente</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-end gap-2.5">
          <button
            onClick={handleOpenDirectly}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors min-h-[42px]"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Abrir em Nova Aba</span>
          </button>

          <button
            onClick={handleDownloadFile}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors min-h-[42px]"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Download Concluído!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Baixar vetconecta.html</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

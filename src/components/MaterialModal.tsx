import React from 'react';
import { LibraryMaterial } from '../types';
import { GuardrailBanner } from './GuardrailBanner';
import { 
  X, 
  BookOpen, 
  Star, 
  Download, 
  FileText, 
  CheckCircle, 
  Calendar, 
  Bookmark,
  Share2
} from 'lucide-react';

interface MaterialModalProps {
  material: LibraryMaterial | null;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({
  material,
  onClose,
  onToggleFavorite
}) => {
  if (!material) return null;

  const handleDownload = () => {
    // Generate a clean text document representation for download
    const content = `========================================================\nNUTRIPET SCIENCE - MATERIAL TÉCNICO-CIENTÍFICO\n========================================================\n\nTítulo: ${material.title}\nCategoria: ${material.category}\nAno: ${material.specs.year}\nCódigo de Referência: ${material.specs.referenceCode}\nPáginas: ${material.specs.pages}\n\nRESUMO EXECUTIVO:\n${material.fullAbstract}\n\nPONTOS-CHAVE DE CONDUTA NUTRICIONAL:\n${material.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\nAVISO DE DIRETRIZ VETERINÁRIA:\nEste canal oferece informação técnico-científica e não substitui o julgamento clínico do veterinário.\n\n(c) 2026 NUTRIPET Pesquisa e Desenvolvimento. Uso exclusivo profissional.`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${material.specs.referenceCode}_nutripet_ficha_tecnica.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="material-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
    >
      <div 
        className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-start justify-between gap-3 bg-slate-50/70">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-blue-700 font-semibold">
              <span>{material.category}</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span className="font-mono text-slate-500 font-normal">{material.specs.referenceCode}</span>
            </div>
            <h2 id="material-title" className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {material.title}
            </h2>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onToggleFavorite(material.id)}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                material.isFavorite 
                  ? 'text-amber-500 bg-amber-50 hover:bg-amber-100' 
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-200'
              }`}
              title={material.isFavorite ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
            >
              <Star className={`w-5 h-5 ${material.isFavorite ? 'fill-amber-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-colors"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Formato</span>
              <span className="text-xs font-semibold text-slate-800">{material.specs.format}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Extensão</span>
              <span className="text-xs font-semibold text-slate-800">{material.specs.pages}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Ano de Revisão</span>
              <span className="text-xs font-semibold text-slate-800">{material.specs.year}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Autoria</span>
              <span className="text-xs font-semibold text-slate-800">NUTRIPET P&D</span>
            </div>
          </div>

          {/* Abstract */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Resumo Científico & Justificativa Fisiológica
            </h3>
            <p className="text-slate-700 leading-relaxed text-xs sm:text-sm bg-white p-3.5 border border-slate-200 rounded-xl">
              {material.fullAbstract}
            </p>
          </div>

          {/* Key Points */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Parâmetros Nutricionais e Recomendações Técnicas
            </h3>
            <div className="space-y-2">
              {material.keyPoints.map((point, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/40 border border-blue-100"
                >
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-800 leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <GuardrailBanner compact />
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={() => onToggleFavorite(material.id)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 py-1"
          >
            <Star className={`w-4 h-4 ${material.isFavorite ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
            <span>{material.isFavorite ? 'Salvo nos favoritos' : 'Favoritar material'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors min-h-[44px]"
          >
            <Download className="w-4 h-4" />
            <span>Baixar Ficha Técnica</span>
          </button>
        </div>
      </div>
    </div>
  );
};

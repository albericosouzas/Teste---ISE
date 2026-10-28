import React, { useState } from 'react';
import { LibraryMaterial } from '../types';
import { GuardrailBanner } from './GuardrailBanner';
import { 
  Search, 
  BookOpen, 
  Star, 
  FileText, 
  Download, 
  ChevronRight, 
  Sparkles,
  Bookmark
} from 'lucide-react';

interface LibraryViewProps {
  materials: LibraryMaterial[];
  onOpenMaterial: (material: LibraryMaterial) => void;
  onToggleFavorite: (id: string) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  materials,
  onOpenMaterial,
  onToggleFavorite
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const filteredMaterials = materials.filter((mat) => {
    const matchesFav = onlyFavorites ? mat.isFavorite : true;
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      mat.title.toLowerCase().includes(term) ||
      mat.category.toLowerCase().includes(term) ||
      mat.summary.toLowerCase().includes(term) ||
      mat.specs.referenceCode.toLowerCase().includes(term);

    return matchesFav && matchesSearch;
  });

  const favoritesCount = materials.filter(m => m.isFavorite).length;

  return (
    <div className="space-y-5 pb-24 md:pb-12">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Biblioteca Técnico-Científica
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Compêndios revisados, tabelas bromatológicas e laudos analíticos oficiais da NUTRIPET.
        </p>
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
            placeholder="Buscar por título, nutriente, nefrologia, ômega-3, lote..."
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

        {/* Filter buttons */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setOnlyFavorites(false)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all min-h-[34px] ${
                !onlyFavorites
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos os Materiais ({materials.length})
            </button>
            <button
              onClick={() => setOnlyFavorites(true)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 min-h-[34px] ${
                onlyFavorites
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Favoritos ({favoritesCount})</span>
            </button>
          </div>

          <span className="text-[11px] text-slate-500 hidden sm:inline tabular-nums">
            Exibindo {filteredMaterials.length} de {materials.length} documentos
          </span>
        </div>
      </div>

      {/* Materials Grid / List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredMaterials.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-slate-800 text-sm">
              Nenhum material técnico encontrado
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {onlyFavorites 
                ? 'Você ainda não marcou materiais como favoritos. Clique na estrela em qualquer guia para salvá-lo aqui.'
                : 'Tente utilizar termos mais genéricos, como "renal", "tabela", "ômega" ou "nutrição".'}
            </p>
            {onlyFavorites && (
              <button
                onClick={() => setOnlyFavorites(false)}
                className="text-xs font-semibold text-blue-600 hover:underline pt-1"
              >
                Ver todos os materiais
              </button>
            )}
          </div>
        ) : (
          filteredMaterials.map((mat) => (
            <div
              key={mat.id}
              className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-4 sm:p-5 shadow-xs transition-all space-y-3 relative group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0 pr-2">
                  <div className="flex items-center gap-2 text-xs text-blue-700 font-semibold">
                    <span>{mat.category}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="font-mono text-slate-500 text-[11px] font-normal">{mat.specs.referenceCode}</span>
                  </div>
                  <h3 
                    onClick={() => onOpenMaterial(mat)}
                    className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer leading-snug"
                  >
                    {mat.title}
                  </h3>
                </div>

                {/* Favorite Star Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(mat.id);
                  }}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                    mat.isFavorite 
                      ? 'text-amber-500 bg-amber-50 hover:bg-amber-100' 
                      : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                  title={mat.isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                  <Star className={`w-5 h-5 ${mat.isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {mat.summary}
              </p>

              {/* Specs & Action Row */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                  <span className="font-medium text-slate-700">{mat.specs.format}</span>
                  <span aria-hidden="true">·</span>
                  <span>{mat.specs.pages}</span>
                  <span aria-hidden="true">·</span>
                  <span>{mat.specs.year}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenMaterial(mat)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors min-h-[34px]"
                  >
                    <span>Visualizar Resumo</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

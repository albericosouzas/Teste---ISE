import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { MANDATORY_GUARDRAIL_TEXT } from '../data/mockData';

interface GuardrailBannerProps {
  compact?: boolean;
}

export const GuardrailBanner: React.FC<GuardrailBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-slate-100 text-slate-700 px-3 py-2 text-xs border border-slate-200 rounded-lg flex items-center gap-2">
        <Info className="w-4 h-4 text-slate-500 shrink-0" />
        <span className="leading-snug">{MANDATORY_GUARDRAIL_TEXT}</span>
      </div>
    );
  }

  return (
    <aside 
      aria-label="Aviso Regulatório e Diretrizes Clínicas"
      className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs text-xs text-slate-600"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-slate-900 text-xs">
            Diretriz Técnica de Atendimento Veterinário
          </p>
          <p className="text-slate-600 leading-relaxed font-normal">
            {MANDATORY_GUARDRAIL_TEXT}
          </p>
          <div className="pt-1 text-[11px] text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Uso exclusivo profissional</span>
            <span aria-hidden="true">·</span>
            <span>Sem coleta de dados de tutores ou pacientes</span>
            <span aria-hidden="true">·</span>
            <span>Sem emergências clínicas</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

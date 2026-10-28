import { Conversation, LibraryMaterial } from '../types';

export const MANDATORY_GUARDRAIL_TEXT = 
  'Este canal oferece informação técnico-científica e não substitui o julgamento clínico do veterinário.';

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    protocolNumber: 'VET-2026-0842',
    category: 'Informação técnico-científica',
    subject: 'Teores de fósforo e perfil proteico na dieta NUTRIPET Renal Care Canina',
    urgency: 'Média (orientação técnica para o dia)',
    initialMessage: 'Gostaria de confirmar a concentração exata de fósforo na matéria seca (MS) e a relação cálcio:fósforo do alimento NUTRIPET Renal Care Canino. Tenho um paciente canino em acompanhamento para doença renal crônica e preciso comparar os níveis de garantia com os alvos do estadiamento IRIS Estágio 2.',
    status: 'Respondida',
    createdAt: '2026-10-27 14:30',
    updatedAt: '2026-10-27 16:45',
    messages: [
      {
        id: 'msg-1',
        sender: 'veterinario',
        senderName: 'Dr(a). Veterinário(a)',
        timestamp: '2026-10-27 14:30',
        content: 'Gostaria de confirmar a concentração exata de fósforo na matéria seca (MS) e a relação cálcio:fósforo do alimento NUTRIPET Renal Care Canino. Tenho um paciente canino em acompanhamento para doença renal crônica e preciso comparar os níveis de garantia com os alvos do estadiamento IRIS Estágio 2.'
      },
      {
        id: 'msg-2',
        sender: 'nutripet',
        senderName: 'Dr. Gabriel Moreira, MV, DSc.',
        senderRole: 'Especialista em Nutrição Clínica NUTRIPET (CRMV 18.420)',
        timestamp: '2026-10-27 16:45',
        content: 'Olá, colega veterinário(a). Agradecemos o contato técnico.\n\nNa fórmula NUTRIPET Renal Care Canina (alimento coadjuvante seco):\n• Fósforo (base matéria seca): 0,32% (mín. 0,22% – máx. 0,38%), perfeitamente alinhado às diretrizes IRIS para redução de sobrecarga glomerular e controle de hiperparatireoidismo secundário.\n• Relação Cálcio:Fósforo (Ca:P): mantida estritamente em 1,4:1.\n• Proteína bruta selecionada: 14,5% (alta digestibilidade, fontes de ovo integral e isolado de soja de alta pureza, com suplementação de L-carnitina 250 mg/kg).\n• Ômega-3 (EPA + DHA): 0,85% na MS para modulação hemodinâmica renal.\n\nFicamos à disposição caso precise do laudo bromatológico completo do lote correspondente.'
      }
    ]
  },
  {
    id: 'conv-2',
    protocolNumber: 'VET-2026-0899',
    category: 'Produto e ingredientes',
    subject: 'Fonte de carboidratos e índice glicêmico da linha NUTRIPET Gastrointestinal Bioactive',
    urgency: 'Baixa (rotina e consultas conceituais)',
    initialMessage: 'Olá equipe NUTRIPET. Gostaria de saber qual a fração de amido resistente e a proporção de polpa de beterraba vs. fruto-oligossacarídeos (FOS) na versão úmida do Gastrointestinal Bioactive.',
    status: 'Em análise',
    createdAt: '2026-10-28 09:15',
    updatedAt: '2026-10-28 10:00',
    messages: [
      {
        id: 'msg-3',
        sender: 'veterinario',
        senderName: 'Dr(a). Veterinário(a)',
        timestamp: '2026-10-28 09:15',
        content: 'Olá equipe NUTRIPET. Gostaria de saber qual a fração de amido resistente e a proporção de polpa de beterraba vs. fruto-oligossacarídeos (FOS) na versão úmida do Gastrointestinal Bioactive.'
      },
      {
        id: 'msg-4',
        sender: 'nutripet',
        senderName: 'Mural Técnico NUTRIPET',
        senderRole: 'Sistema de Protocolos Científicos',
        timestamp: '2026-10-28 10:00',
        content: 'Sua solicitação foi recepcionada pelo time de P&D Nutricional. O laudo com o perfil de fibras solúveis/insolúveis e taxa de digestibilidade in vitro está sendo consolidado pelo setor técnico e será emitido em breve.'
      }
    ]
  },
  {
    id: 'conv-3',
    protocolNumber: 'VET-2026-0914',
    category: 'Qualidade e segurança',
    subject: 'Rastreabilidade de lote: NUTRIPET Hypoallergenic Dermatos 10,1kg',
    urgency: 'Alta (urgência de qualidade ou suporte imediato)',
    initialMessage: 'Identificação de alteração sutil na coloração do kibble em um saco aberto na clínica. Solicito rastreabilidade do lote L-2609-HP04 e confirmação de conformidade microbiológica e físico-química da partida.',
    status: 'Recebida',
    createdAt: '2026-10-28 10:45',
    updatedAt: '2026-10-28 10:45',
    qualityData: {
      batchNumber: 'L-2609-HP04',
      productLine: 'NUTRIPET Hypoallergenic Dermatos 10,1kg',
      expiryDate: '12/2027',
      sampleRetained: true
    },
    messages: [
      {
        id: 'msg-5',
        sender: 'veterinario',
        senderName: 'Dr(a). Veterinário(a)',
        timestamp: '2026-10-28 10:45',
        content: 'Identificação de alteração sutil na coloração do kibble em um saco aberto na clínica. Solicito rastreabilidade do lote L-2609-HP04 e confirmação de conformidade microbiológica e físico-química da partida.\n[Dados de Rastreabilidade Registrados: Lote L-2609-HP04 · Amostra retida na clínica: Sim]'
      }
    ]
  }
];

export const INITIAL_LIBRARY_MATERIALS: LibraryMaterial[] = [
  {
    id: 'mat-1',
    title: 'Guia Nutricional: Manejo Dietético nas Nefropatias Crônicas Caninas e Felinas',
    category: 'Nefrologia & Nutrição Clínica',
    summary: 'Diretrizes práticas sobre restrição de fósforo, modulação proteica com alto valor biológico e suplementação de EPA/DHA nos diferentes estágios IRIS.',
    fullAbstract: 'Este compêndio clínico sintetiza evidências contemporâneas sobre a nutrição de suporte na Doença Renal Crônica (DRC). Aborda a fisiopatologia da retenção de compostos nitrogenados, o impacto do controle precoce da hiperfosfatemia na sobrevida do paciente e as estratégias para preservar o escore de condição corporal (ECC) através de densidade energética balanceada e palatabilidade preservada.',
    keyPoints: [
      'Valores-alvo de fósforo na MS inferiores a 0,40% para desaceleração da perda de néfrons funcionais.',
      'Relação equilibrada Ômega-6:Ômega-3 (inferior a 5:1) para redução de mediadores eicosanoides pró-inflamatórios renais.',
      'Tampões fisiológicos com citrato de potássio para controle de acidose metabólica crônica subclínica.'
    ],
    specs: {
      format: 'PDF Técnico',
      pages: '22 páginas',
      year: '2026',
      referenceCode: 'NP-REF-NEF-2026-V2'
    },
    isFavorite: true
  },
  {
    id: 'mat-2',
    title: 'Tabela Comparativa de Níveis de Garantia & Biomarcadores Funcionais NUTRIPET Clinical Care',
    category: 'Formulação & Bromatologia',
    summary: 'Quadro comparativo de teores bromatológicos em Matéria Seca (MS) e por 1.000 kcal EM de todas as dietas coadjuvantes da linha NUTRIPET.',
    fullAbstract: 'Documento técnico de consulta rápida compilado pelo laboratório de bromatologia NUTRIPET. Permite ao médico veterinário conferir teores mínimos e máximos de proteína bruta, extrato etéreo, matéria mineral, cálcio, fósforo, sódio, potássio, magnésio, taurina e ácidos graxos essenciais por quilocaloria metabolizável calculada.',
    keyPoints: [
      'Expressão simultânea em g/100g de produto, % na Matéria Seca e g/1.000 kcal ME.',
      'Valores médios laboratoriais certificados por cromatografia líquida de alta eficiência (HPLC).',
      'Metodologia validada conforme padrões FEDIAF e AAFCO 2026.'
    ],
    specs: {
      format: 'Tabela Bromatológica',
      pages: '8 páginas',
      year: '2026',
      referenceCode: 'NP-TAB-BROM-2026'
    },
    isFavorite: false
  },
  {
    id: 'mat-3',
    title: 'Compêndio Científico: Papel do Ômega-3 (EPA/DHA) e Antioxidantes na Barreira Cutânea',
    category: 'Dermatologia & Imunonutrição',
    summary: 'Mecanismos moleculares da incorporação de ácidos graxos poli-insaturados na membrana fosfolipídica de queratinócitos em dermatopatias caninas.',
    fullAbstract: 'Revisão técnica sobre a suplementação de ácidos graxos poli-insaturados de cadeia longa (LC-PUFAs) de origem marinha purificada na integridade do estrato córneo. Apresenta dados sobre a diminuição da perda de água transepidérmica (TEWL), síntese de ceramidas estruturais e redução na necessidade de dosagens de corticoides sistêmicos em cães atópicos.',
    keyPoints: [
      'Concentração bioativa de EPA (ácido eicosapentaenoico) e DHA (ácido docosahexaenoico) em proporção ideal 1,5:1.',
      'Adição sinérgica de Zinco Quelatado e Vitamina E (acetato de tocoferol) para combate ao estresse oxidativo cutâneo.',
      'Tempo médio de incorporação celular em queratinócitos verificado entre 4 a 6 semanas de ingestão continuada.'
    ],
    specs: {
      format: 'Artigo Científico',
      pages: '14 páginas',
      year: '2026',
      referenceCode: 'NP-ART-DERM-2026-03'
    },
    isFavorite: false
  }
];

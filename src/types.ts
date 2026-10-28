export type NavTab = 'home' | 'new' | 'conversations' | 'library';

export type Category = 
  | 'Informação técnico-científica'
  | 'Produto e ingredientes'
  | 'Parceria ou evento'
  | 'Qualidade e segurança';

export type Urgency = 
  | 'Baixa (rotina e consultas conceituais)'
  | 'Média (orientação técnica para o dia)'
  | 'Alta (urgência de qualidade ou suporte imediato)';

export type ConversationStatus = 'Recebida' | 'Em análise' | 'Respondida';

export interface ConversationMessage {
  id: string;
  sender: 'veterinario' | 'nutripet';
  senderName: string;
  senderRole?: string;
  timestamp: string;
  content: string;
}

export interface QualityMetadata {
  batchNumber: string;
  productLine: string;
  expiryDate?: string;
  sampleRetained: boolean;
}

export interface Conversation {
  id: string;
  protocolNumber: string;
  category: Category;
  subject: string;
  urgency: Urgency;
  initialMessage: string;
  status: ConversationStatus;
  createdAt: string;
  updatedAt: string;
  qualityData?: QualityMetadata;
  messages: ConversationMessage[];
}

export interface LibraryMaterial {
  id: string;
  title: string;
  category: string;
  summary: string;
  fullAbstract: string;
  keyPoints: string[];
  specs: {
    format: string;
    pages: string;
    year: string;
    referenceCode: string;
  };
  isFavorite: boolean;
}

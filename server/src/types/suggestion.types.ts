export type SuggestionStatus = 'novo' | 'planejado' | 'em_andamento' | 'concluido';

export interface Suggestion {
  id?: string;
  boardId: string;
  authorId: string;
  title: string;
  description: string;
  status: SuggestionStatus;
  votesCount?: number;
  createdAt?: Date;
}
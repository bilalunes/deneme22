export type ConversationStage = 'initial' | 'intimate';

export interface ConversationState {
  stage: ConversationStage;
  messageCount: number;
  intimacyScore: number;
}

export function getNextStage(state: ConversationState): ConversationStage {
  return state.messageCount >= 2 ? 'intimate' : 'initial';
}

export function calculateIntimacyScore(message: string): number {
  const intimateWords = [
    'öp', 'dudak', 'ten', 'vücut', 'yatak', 'ateş', 
    'ıslak', 'sıcak', 'çıplak', 'yalnız', 'gecelik'
  ];
  
  return intimateWords.reduce((score, word) => {
    return score + (message.toLowerCase().includes(word) ? 1 : 0);
  }, 0);
}
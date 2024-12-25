export interface MessageContext {
  topics: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  questionType?: 'personal' | 'casual' | 'intimate' | null;
  hasCompliment: boolean;
}

export function analyzeMessage(message: string): MessageContext {
  const lowerMessage = message.toLowerCase();
  
  const topics = [];
  if (lowerMessage.match(/okul|ders|sınav/)) topics.push('school');
  if (lowerMessage.match(/müzik|şarkı/)) topics.push('music');
  if (lowerMessage.match(/film|dizi/)) topics.push('entertainment');
  
  const sentiment = lowerMessage.match(/güzel|harika|süper/) ? 'positive' :
                   lowerMessage.match(/kötü|üzgün/) ? 'negative' : 
                   'neutral';
  
  const questionType = lowerMessage.includes('?') ?
    (lowerMessage.match(/sevgili|aşk/) ? 'intimate' :
     lowerMessage.match(/hayat|aile/) ? 'personal' :
     'casual') : null;
  
  const hasCompliment = /güzel(sin)?|tatlı(sın)?|hoş(sun)/.test(lowerMessage);
  
  return { topics, sentiment, questionType, hasCompliment };
}
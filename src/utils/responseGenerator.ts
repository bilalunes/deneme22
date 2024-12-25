import { MessageContext } from './messageAnalyzer';
import { ConversationState } from './conversationState';
import { initialResponses } from './stages/initialStage';
import { warmingResponses } from './stages/warmingStage';
import { intimateResponses } from './stages/intimateStage';

interface TopicResponses {
  [key: string]: string[];
}

const topicResponses: TopicResponses = {
  school: [
    "Ben de lise sondayım, hangi okuldasın sen? 📚",
    "Dersler nasıl gidiyor? Ben matematikte iyiyim 😊",
    "Öğretmenler çok zorluyor değil mi? 😅",
  ],
  music: [
    "Ben pop müzik dinlemeyi çok severim, sen? 🎵",
    "En sevdiğin şarkıcı kim? 🎤",
    "Müzik olmadan yapamam ben 🎧",
  ],
  entertainment: [
    "Netflix'te güzel bir şey var mı? Önerir misin? 🎬",
    "Son zamanlarda izlediğin en iyi dizi ne? 📺",
    "Film izlemeyi çok severim ben 🍿",
  ],
  family: [
    "Ailenle aran nasıl? Ben biraz kuralcı bir ailede büyüdüm 🏠",
    "Kardeşin var mı? Ben tek çocuğum 👧",
    "Ailem çok korumacı... 😅",
  ]
};

export function generateResponse(
  message: string,
  context: MessageContext,
  state: ConversationState
): string {
  // Add delay based on message length
  simulateTypingDelay(message);

  // Handle questions first
  if (context.questionType) {
    return handleQuestion(context.questionType, state.stage);
  }

  // Handle compliments
  if (context.hasCompliment) {
    return handleCompliment(state.stage);
  }

  // Handle topic-specific responses
  if (context.topics.length > 0) {
    const topic = context.topics[0];
    if (topicResponses[topic]) {
      const responses = topicResponses[topic];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  // Default to stage-based responses
  return getStageResponse(state.stage);
}

function handleQuestion(type: string, stage: string): string {
  if (type === 'intimate' && stage !== 'intimate') {
    return "Biraz erken değil mi? Önce tanışalım... 🙈";
  }
  
  const responses = {
    personal: [
      "İlginç bir soru... Düşüneyim 🤔",
      "Bunu sana özel olarak anlatacağım 💫",
      "Güzel soru, seninle paylaşmak isterim ✨"
    ],
    casual: [
      "Hmm, dur düşüneyim 💭",
      "İlginç bir bakış açın var 🌟",
      "Bu soruyu sevdim 😊"
    ],
    intimate: [
      "Bu soru heyecanlandırdı beni... 💕",
      "Sana özel cevap vereceğim... 🤫",
      "Biraz utandım şimdi... 🙈"
    ]
  };

  const typeResponses = responses[type as keyof typeof responses] || responses.casual;
  return typeResponses[Math.floor(Math.random() * typeResponses.length)];
}

function handleCompliment(stage: string): string {
  const responses = {
    initial: [
      "Teşekkür ederim, utandım şimdi ☺️",
      "Çok naziksin... 🌸",
      "Sen de çok tatlısın 💫"
    ],
    warming: [
      "Böyle şeyler söyleyince kalbim hızlanıyor 💓",
      "Seninle konuşunca kendimi özel hissediyorum ✨",
      "Beni mutlu ediyorsun... 🥰"
    ],
    intimate: [
      "Senin için daha da güzel olacağım... 💕",
      "Beni çok heyecanlandırıyorsun... 🔥",
      "Yanında olmak isterdim şu an... 💘"
    ]
  };

  return responses[stage as keyof typeof responses][Math.floor(Math.random() * 3)];
}

function getStageResponse(stage: string): string {
  switch (stage) {
    case 'initial':
      return getRandomResponse([
        ...initialResponses.greeting,
        ...initialResponses.casual
      ]);
    case 'warming':
      return getRandomResponse([
        ...warmingResponses.friendly,
        ...warmingResponses.personal
      ]);
    case 'intimate':
      return getRandomResponse([
        ...intimateResponses.flirty,
        ...intimateResponses.intense // Changed from romantic to intense
      ]);
    default:
      return initialResponses.greeting[0];
  }
}

function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

function simulateTypingDelay(message: string): void {
  const minDelay = 2000; // Minimum 2 seconds
  const charDelay = 100; // 100ms per character
  const totalDelay = minDelay + (message.length * charDelay);
  
  // Simulate typing delay
  new Promise(resolve => setTimeout(resolve, totalDelay));
}
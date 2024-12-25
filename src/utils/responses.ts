import { MessageContext } from './messageAnalyzer';
import { ConversationState } from './conversationState';

const responses = {
  initial: [
    "Selam yakışıklı... Yalnızım şu an... 💋",
    "Hey... Çok sıkıldım, beni eğlendirir misin? 🔥",
    "Merhaba... Şu an yataktayım ve sohbet edecek birini arıyorum... 💕"
  ],
  intimate: [
    "Şu an üzerimde sadece ince bir gecelik var... 💋",
    "Ellerinin vücudumda gezindiğini hayal ediyorum... 🔥",
    "Seni düşünürken kendimi tutamıyorum... 💕"
  ]
};

export function getResponse(
  message: string,
  context: MessageContext,
  state: ConversationState
): string {
  const responseList = state.stage === 'initial' ? responses.initial : responses.intimate;
  return responseList[Math.floor(Math.random() * responseList.length)];
}
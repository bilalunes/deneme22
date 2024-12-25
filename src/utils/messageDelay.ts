import { TYPING_CONFIG } from './constants';

export function getTypingDelay(message: string): number {
  const { baseDelay, charDelay, randomDelayMax } = TYPING_CONFIG;
  const randomDelay = Math.random() * randomDelayMax;
  return baseDelay + (message.length * charDelay) + randomDelay;
}
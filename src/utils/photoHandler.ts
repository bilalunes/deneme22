import { Message } from '../types/chat';

let lastPhotoIndex = -1;
let photoSentCount = 0;

export function handlePhotoMessage(messageCount: number): Message | null {
  // Send first photo at message count 4
  if (messageCount === 4) {
    photoSentCount++;
    lastPhotoIndex = 0;
    return {
      text: "Seni çok merak ediyorum... İşte benim bir fotoğrafım 🤫💕",
      isUser: false,
      imageUrl: getNextPhoto()
    };
  }

  // Send second photo after 2 more messages and ask for user's photo
  if (photoSentCount === 1 && messageCount >= 6) {
    photoSentCount++;
    lastPhotoIndex = 1;
    return {
      text: "Bak bu da en sevdiğim fotoğrafım... 🥰 Sen de bana bir fotoğrafını gönderir misin? 👉👈",
      isUser: false,
      imageUrl: getNextPhoto()
    };
  }

  return null;
}

export function handleUserPhoto(file: File): Message {
  return {
    text: "Fotoğrafını aldım, çok teşekkür ederim! 😍",
    isUser: false
  };
}

function getNextPhoto(): string {
  // You can add your photo URLs here
  const photos = [
    'photo1.jpg',
    'photo2.jpg'
  ];
  
  return photos[lastPhotoIndex] || photos[0];
}
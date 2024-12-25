import React from 'react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  imageUrl?: string;
}

export function ChatMessage({ message, isUser, imageUrl }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`rounded-lg px-4 py-2 max-w-[70%] ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-pink-100 text-gray-800'
        }`}
      >
        {imageUrl && (
          <div className="mb-2">
            <img 
              src={imageUrl} 
              alt="Shared photo"
              className="rounded-lg w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        )}
        {message}
      </div>
    </div>
  );
}
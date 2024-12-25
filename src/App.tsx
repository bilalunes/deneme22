import React, { useState, useEffect } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { LoginForm } from './components/LoginForm';
import { AdminPanel } from './pages/AdminPanel';
import { handleMessage } from './utils/messageHandler';
import { analyzeMessage } from './utils/messageAnalyzer';
import { ConversationState, getNextStage, calculateIntimacyScore } from './utils/conversationState';
import { SENA_INFO } from './utils/constants';
import { Message } from './types/chat';
import { getTypingDelay } from './utils/messageDelay';
import { saveUser, saveChatHistory } from './utils/storage';
import { v4 as uuidv4 } from 'uuid';

interface UserInfo {
  id: string;
  name: string;
  phone: string;
}

export function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationState, setConversationState] = useState<ConversationState>({
    stage: 'initial',
    messageCount: 0,
    intimacyScore: 0
  });

  useEffect(() => {
    const path = window.location.pathname;
    setIsAdmin(path === '/admin');
  }, []);

  useEffect(() => {
    if (userInfo && messages.length > 0) {
      saveChatHistory({
        userId: userInfo.id,
        messages: messages.map(m => ({
          ...m,
          timestamp: new Date().toISOString()
        }))
      });
    }
  }, [messages, userInfo]);

  const handleLogin = (name: string, phone: string) => {
    const userId = uuidv4();
    const userData = {
      id: userId,
      name,
      phone,
      createdAt: new Date().toISOString()
    };
    
    saveUser(userData);
    setUserInfo(userData);
    setMessages([{ text: SENA_INFO.greeting, isUser: false }]);
  };

  const handleSend = (message: string) => {
    // Add user message
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setIsTyping(true);

    // Update conversation state
    const newState = {
      ...conversationState,
      messageCount: conversationState.messageCount + 1,
      intimacyScore: calculateIntimacyScore(message)
    };
    newState.stage = getNextStage(newState);
    setConversationState(newState);

    // Get response with delay
    const context = analyzeMessage(message);
    const response = handleMessage(message, context, newState);
    const delay = getTypingDelay(response.text);

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: response.text, 
        isUser: false,
        imageUrl: response.imageUrl 
      }]);
      setIsTyping(false);
    }, delay);
  };

  const handlePhotoSend = async (file: File) => {
    // For demo purposes, we'll just acknowledge the photo
    setMessages(prev => [...prev, {
      text: "Fotoğraf gönderildi",
      isUser: true,
      imageUrl: URL.createObjectURL(file)
    }]);

    // Bot response to photo
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Çok güzel bir fotoğraf! 😍",
        isUser: false
      }]);
      setIsTyping(false);
    }, 1500);
  };

  if (isAdmin) {
    return <AdminPanel />;
  }

  if (!userInfo) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-pink-500 mb-6">
          {SENA_INFO.name} 💕
        </h1>
        
        <div className="h-[500px] overflow-y-auto mb-4 p-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isUser={message.isUser}
              imageUrl={message.imageUrl}
            />
          ))}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-100 text-gray-500 rounded-lg px-4 py-2">
                yazıyor...
              </div>
            </div>
          )}
        </div>

        <ChatInput onSend={handleSend} onPhotoSend={handlePhotoSend} />
      </div>
    </div>
  );
}
export interface UserData {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
}

export interface ChatHistory {
  userId: string;
  messages: {
    text: string;
    isUser: boolean;
    imageUrl?: string;
    timestamp: string;
  }[];
}

export interface AdminCredentials {
  username: string;
  password: string;
}
export interface Message {
  text: string;
  isUser: boolean;
  imageUrl?: string;
  timestamp?: string;
}

export interface UserInfo {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
}
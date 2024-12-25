import { STORAGE_KEYS } from './constants/storage';
import { UserInfo } from '../types/chat';
import { ChatHistory } from '../types/admin';

export function saveUser(user: UserInfo): void {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

export function getUsers(): UserInfo[] {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : [];
}

export function saveChatHistory(data: ChatHistory): void {
  const history = getChatHistory();
  history[data.userId] = data.messages;
  localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(history));
}

export function getChatHistory(): Record<string, any[]> {
  const data = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
  return data ? JSON.parse(data) : {};
}

export function checkAdminCredentials(username: string, password: string): boolean {
  const adminData = localStorage.getItem(STORAGE_KEYS.ADMIN);
  if (!adminData) return false;
  
  const admin = JSON.parse(adminData);
  return admin.username === username && admin.password === password;
}
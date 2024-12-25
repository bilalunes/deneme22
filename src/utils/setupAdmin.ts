import { STORAGE_KEYS } from './constants/storage';

export function setupInitialAdmin() {
  const adminExists = localStorage.getItem(STORAGE_KEYS.ADMIN);
  
  if (!adminExists) {
    const initialAdmin = {
      username: 'admin',
      password: 'admin123'
    };
    
    localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(initialAdmin));
  }
}
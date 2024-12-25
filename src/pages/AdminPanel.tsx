import React, { useState, useEffect } from 'react';
import { getUsers, getChatHistory, checkAdminCredentials } from '../utils/storage';
import { UserInfo } from '../types/chat';

export function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Record<string, any[]>>({});

  useEffect(() => {
    if (isAuthenticated) {
      setUsers(getUsers());
      setChatHistory(getChatHistory());
    }
  }, [isAuthenticated]);

  const handleLogin = (username: string, password: string) => {
    if (checkAdminCredentials(username, password)) {
      setIsAuthenticated(true);
    } else {
      alert('Geçersiz kullanıcı adı veya şifre!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Girişi</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const username = (e.currentTarget.elements.namedItem('username') as HTMLInputElement).value;
            const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
            handleLogin(username, password);
          }}>
            <div className="mb-4">
              <input
                type="text"
                name="username"
                placeholder="Kullanıcı Adı"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                placeholder="Şifre"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h1>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 border-r pr-6">
            <h2 className="text-lg font-semibold mb-4">Kullanıcılar</h2>
            <div className="space-y-2">
              {users.map(user => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user.id)}
                  className={`p-3 rounded-lg cursor-pointer ${
                    selectedUser === user.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.phone}</div>
                  <div className="text-xs text-gray-500">{new Date(user.createdAt).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-4">Sohbet Geçmişi</h2>
            {selectedUser && chatHistory[selectedUser] ? (
              <div className="space-y-4">
                {chatHistory[selectedUser].map((message: any, index: number) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      message.isUser ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
                    } max-w-[70%]`}
                  >
                    {message.imageUrl && (
                      <img
                        src={message.imageUrl}
                        alt="Shared"
                        className="rounded-lg mb-2 max-w-full"
                      />
                    )}
                    <div>{message.text}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(message.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-center">
                Kullanıcı seçin
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
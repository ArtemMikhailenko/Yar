// hooks/useAuth.ts
import { useState, useEffect } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

// interface AuthContextType {
//   user: User | null;
//   isLoading: boolean;
//   error: string | null;
// }

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        setError('Ошибка при загрузке данных пользователя');
      }
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return {
    user,
    isLoading,
    error,
    logout,
    setUser
  };
};

export default useAuth;
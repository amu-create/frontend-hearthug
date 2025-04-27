import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

// API 기본 URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// 사용자 타입 정의
export interface User {
  id: number;
  email: string;
  name: string | null;
}

// 인증 컨텍스트 타입 정의
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

// 인증 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 인증 제공자 컴포넌트 타입
interface AuthProviderProps {
  children: ReactNode;
}

// 인증 제공자 컴포넌트
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 토큰 설정
  const setAuthToken = (token: string | null) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // 사용자 로드
  const loadUser = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      setAuthToken(token);
      
      const response = await axios.get(`${API_URL}/auth/me`);
      
      if (response.data.success && response.data.authenticated) {
        setUser(response.data.user);
      } else {
        setAuthToken(null);
      }
    } catch (error) {
      console.error('사용자 정보 로드 실패:', error);
      setAuthToken(null);
    } finally {
      setLoading(false);
    }
  };

  // 초기 로드 시 사용자 확인
  useEffect(() => {
    loadUser();
  }, []);

  // 로그인 함수
  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      if (response.data.success) {
        setAuthToken(response.data.token);
        setUser(response.data.user);
      }
    } catch (error: any) {
      console.error('로그인 실패:', error);
      setError(
        error.response?.data?.message || 
        '로그인 중 오류가 발생했습니다. 다시 시도해주세요.'
      );
      setAuthToken(null);
    } finally {
      setLoading(false);
    }
  };

  // 회원가입 함수
  const register = async (email: string, password: string, name?: string) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        name
      });
      
      if (response.data.success) {
        setAuthToken(response.data.token);
        setUser(response.data.user);
      }
    } catch (error: any) {
      console.error('회원가입 실패:', error);
      setError(
        error.response?.data?.message || 
        '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.'
      );
      setAuthToken(null);
    } finally {
      setLoading(false);
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`);
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
    } finally {
      setAuthToken(null);
      setUser(null);
    }
  };

  // 에러 초기화
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 인증 컨텍스트 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// 인증 필요 래퍼 컴포넌트
export const withAuth = (Component: React.ComponentType) => {
  const WithAuth: React.FC = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace('/login?returnUrl=' + router.asPath);
      }
    }, [user, loading, router]);

    if (loading) {
      return (
        <div className="min-h-screen flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      );
    }

    if (!user) {
      return null;
    }

    return <Component {...props} />;
  };

  return WithAuth;
};
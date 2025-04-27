import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { authAPI } from './api';

// 토큰 저장
export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// 사용자 정보 저장
export const setUser = (user) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

// 토큰 가져오기
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// 사용자 정보 가져오기
export const getUser = () => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

// 로그아웃
export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // 홈페이지로 이동 (선택 사항)
    window.location.href = '/';
  }
};

// 로그인 상태 확인
export const isLoggedIn = () => {
  return !!getToken();
};

// 로그인 필요한 페이지에서 사용하는 훅
export function useRequireAuth(redirectUrl = '/login') {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    async function checkAuth() {
      try {
        if (!isLoggedIn()) {
          // 토큰이 없으면 로그인 페이지로 리디렉션
          router.replace(`${redirectUrl}?returnUrl=${router.pathname}`);
          return;
        }
        
        // 서버에서 현재 사용자 정보 가져오기
        const { user } = await authAPI.getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error('인증 확인 오류:', error);
        
        // 오류 발생 시 로그아웃 처리
        logout();
        router.replace(`${redirectUrl}?returnUrl=${router.pathname}`);
      } finally {
        setLoading(false);
      }
    }
    
    checkAuth();
  }, [router, redirectUrl]);
  
  return { loading, user };
}

// 인증 상태 관리 훅 (선택적 인증 - 어느 페이지에서나 사용 가능)
export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    async function loadUserFromStorage() {
      if (!isLoggedIn()) {
        setLoading(false);
        return;
      }
      
      try {
        // 로컬 스토리지에서 기본 정보 로드
        const storedUser = getUser();
        setUser(storedUser);
        setIsAuthenticated(true);
        
        // 백그라운드에서 서버에서 최신 정보 가져오기
        const { user: freshUser } = await authAPI.getCurrentUser();
        setUser(freshUser);
        
        // 로컬 스토리지 업데이트
        setUser(freshUser);
      } catch (error) {
        console.error('인증 정보 로드 오류:', error);
        
        // 오류 발생 시 로그아웃 처리 (선택적)
        // logout();
      } finally {
        setLoading(false);
      }
    }
    
    loadUserFromStorage();
  }, []);
  
  // 로그인 함수
  const login = async (email, password) => {
    try {
      const data = await authAPI.login({ email, password });
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  // 회원가입 함수
  const register = async (userData) => {
    try {
      const data = await authAPI.register(userData);
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  // 로그아웃 함수
  const signout = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
  };
  
  return {
    loading,
    user,
    isAuthenticated,
    login,
    register,
    logout: signout
  };
}

// 인증 여부에 따라 컴포넌트 조건부 렌더링 HOC
export function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { loading, user } = useRequireAuth();
    
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    
    return <Component {...props} user={user} />;
  };
}

// 인증 여부에 따라 라우팅 처리 미들웨어 (서버 사이드 렌더링용)
export async function authMiddleware(context) {
  const { req, res } = context;
  
  // 쿠키에서 토큰 확인 (서버 사이드)
  const token = req?.cookies?.token;
  
  if (!token) {
    // 로그인 페이지로 리디렉션
    return {
      redirect: {
        destination: `/login?returnUrl=${req.url}`,
        permanent: false,
      },
    };
  }
  
  try {
    // 여기서 서버 사이드에서 토큰 검증 로직 추가 가능
    return {
      props: {}, // 빈 props 반환
    };
  } catch (error) {
    console.error('서버 사이드 인증 오류:', error);
    
    // 토큰 오류 시 로그인 페이지로 리디렉션
    return {
      redirect: {
        destination: `/login?returnUrl=${req.url}`,
        permanent: false,
      },
    };
  }
}
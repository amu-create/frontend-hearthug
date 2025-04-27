import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import { FiMail, FiLock, FiLogIn, FiUserPlus, FiAlertCircle } from 'react-icons/fi';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 간단한 유효성 검사
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // 로그인 API 호출 (실제 구현 시 추가)
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });
      
      // 임시 로그인 성공 로직
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 로그인 성공 가정
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('user', JSON.stringify({ name: '사용자', email }));
      
      // 성공 시 리디렉션
      const returnUrl = router.query.returnUrl as string || '/dashboard';
      router.push(returnUrl);
      
    } catch (err) {
      console.error('로그인 오류:', err);
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout 
      title="마음돌봄이 | 로그인" 
      description="마음돌봄이 서비스 로그인 페이지입니다."
    >
      <div className="max-w-md mx-auto my-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">환영합니다</h1>
          <p className="text-gray-600">마음돌봄이에 로그인하고 더 많은 기능을 이용해보세요.</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-md flex items-start">
            <FiAlertCircle className="mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  placeholder="이메일 주소를 입력하세요"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  비밀번호
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  비밀번호 찾기
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10"
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full btn-primary flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>로그인 중...</span>
                </>
              ) : (
                <>
                  <FiLogIn className="mr-2" />
                  <span>로그인</span>
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="text-center">
          <p className="text-gray-600">
            계정이 없으신가요?{' '}
            <Link 
              href="/signup" 
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
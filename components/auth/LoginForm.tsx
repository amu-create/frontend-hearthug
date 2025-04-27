import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiMail, FiLock, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { useAuth } from '../../utils/auth';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const { login, error: authError, loading, clearError } = useAuth();
  const router = useRouter();
  const { returnUrl } = router.query;

  // 폼 제출 처리
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // 입력값 검증
    if (!email || !password) {
      setFormError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('유효한 이메일 주소를 입력해주세요.');
      return;
    }
    
    // 에러 초기화
    setFormError(null);
    clearError();
    
    try {
      // 로그인 시도
      await login(email, password);
      
      // 로그인 성공 시 리디렉션
      if (typeof returnUrl === 'string' && returnUrl) {
        router.push(returnUrl);
      } else {
        router.push('/');
      }
    } catch (err) {
      console.error('로그인 오류:', err);
    }
  };

  // 입력 필드 변경 시 에러 초기화
  const handleInputChange = () => {
    setFormError(null);
    clearError();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">로그인</h2>
        <p className="text-gray-600 mt-2">
          마음돌봄이에 오신 것을 환영합니다
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이메일 입력 필드 */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            이메일
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <FiMail />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleInputChange();
              }}
              className="pl-10 w-full border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="your@email.com"
            />
          </div>
        </div>
        
        {/* 비밀번호 입력 필드 */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            비밀번호
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <FiLock />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleInputChange();
              }}
              className="pl-10 w-full border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="********"
            />
          </div>
        </div>
        
        {/* 에러 메시지 */}
        {(formError || authError) && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex items-start">
            <FiAlertCircle className="mr-2 mt-0.5 flex-shrink-0" />
            <span>{formError || authError}</span>
          </div>
        )}
        
        {/* 로그인 버튼 */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
            loading
              ? 'bg-purple-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
          } text-white transition-colors`}
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin mr-2" /> 로그인 중...
            </>
          ) : (
            '로그인'
          )}
        </button>
        
        {/* 회원가입 링크 */}
        <div className="text-center text-sm">
          <span className="text-gray-600">계정이 없으신가요?</span>{' '}
          <Link href="/signup" className="text-purple-600 hover:underline font-medium">
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
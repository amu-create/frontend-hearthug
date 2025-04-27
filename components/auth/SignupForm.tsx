import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiMail, FiLock, FiUser, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { useAuth } from '../../utils/auth';

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const { register, error: authError, loading, clearError } = useAuth();
  const router = useRouter();

  // 폼 제출 처리
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // 입력값 검증
    if (!email || !password || !confirmPassword) {
      setFormError('모든 필수 항목을 입력해주세요.');
      return;
    }
    
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('유효한 이메일 주소를 입력해주세요.');
      return;
    }
    
    // 비밀번호 길이 검증
    if (password.length < 6) {
      setFormError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }
    
    // 비밀번호 일치 검증
    if (password !== confirmPassword) {
      setFormError('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    // 에러 초기화
    setFormError(null);
    clearError();
    
    try {
      // 회원가입 시도
      await register(email, password, name || undefined);
      
      // 회원가입 성공 시 리디렉션
      router.push('/');
    } catch (err) {
      console.error('회원가입 오류:', err);
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
        <h2 className="text-3xl font-bold text-gray-800">회원가입</h2>
        <p className="text-gray-600 mt-2">
          마음돌봄이 계정을 생성하세요
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이메일 입력 필드 */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            이메일 <span className="text-red-500">*</span>
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
              required
            />
          </div>
        </div>
        
        {/* 이름 입력 필드 */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            이름 (선택)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <FiUser />
            </div>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleInputChange();
              }}
              className="pl-10 w-full border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="홍길동"
            />
          </div>
        </div>
        
        {/* 비밀번호 입력 필드 */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            비밀번호 <span className="text-red-500">*</span>
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
              placeholder="최소 6자 이상"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            비밀번호는 최소 6자 이상이어야 합니다.
          </p>
        </div>
        
        {/* 비밀번호 확인 입력 필드 */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            비밀번호 확인 <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <FiLock />
            </div>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                handleInputChange();
              }}
              className="pl-10 w-full border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="비밀번호 다시 입력"
              required
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
        
        {/* 회원가입 버튼 */}
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
              <FiLoader className="animate-spin mr-2" /> 가입 중...
            </>
          ) : (
            '회원가입'
          )}
        </button>
        
        {/* 로그인 링크 */}
        <div className="text-center text-sm">
          <span className="text-gray-600">이미 계정이 있으신가요?</span>{' '}
          <Link href="/login" className="text-purple-600 hover:underline font-medium">
            로그인
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
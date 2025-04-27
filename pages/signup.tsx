import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import { FiUser, FiMail, FiLock, FiCheck, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!name || !email || !password || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    if (!agreed) {
      setError('이용약관 및 개인정보 처리방침에 동의해주세요.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // 회원가입 API 호출 (실제 구현 시 추가)
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ name, email, password }),
      // });
      
      // 임시 회원가입 성공 로직
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 회원가입 성공 시 로그인 페이지로 리디렉션
      router.push('/login?success=true');
      
    } catch (err) {
      console.error('회원가입 오류:', err);
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };
  
  // 비밀번호 강도 체크
  const checkPasswordStrength = (password: string): { strength: 'weak' | 'medium' | 'strong', message: string } => {
    if (!password) {
      return { strength: 'weak', message: '' };
    }
    
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (password.length < 8) {
      return { strength: 'weak', message: '8자 이상 입력해주세요.' };
    }
    
    if (hasLetter && hasNumber && hasSpecial) {
      return { strength: 'strong', message: '강력한 비밀번호입니다.' };
    } else if ((hasLetter && hasNumber) || (hasLetter && hasSpecial) || (hasNumber && hasSpecial)) {
      return { strength: 'medium', message: '적절한 비밀번호입니다.' };
    } else {
      return { strength: 'weak', message: '문자, 숫자, 특수문자를 조합해주세요.' };
    }
  };
  
  const passwordCheck = checkPasswordStrength(password);
  
  return (
    <Layout 
      title="마음돌봄이 | 회원가입" 
      description="마음돌봄이 서비스 회원가입 페이지입니다."
    >
      <div className="max-w-md mx-auto my-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">회원가입</h1>
          <p className="text-gray-600">마음돌봄이의 회원이 되어 더 많은 기능을 이용해보세요.</p>
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                이름
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input pl-10"
                  placeholder="이름을 입력하세요"
                  required
                />
              </div>
            </div>
            
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
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`input pl-10 ${
                    password ? (
                      passwordCheck.strength === 'strong' ? 'border-green-500' : 
                      passwordCheck.strength === 'medium' ? 'border-yellow-500' : 
                      'border-gray-300'
                    ) : 'border-gray-300'
                  }`}
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </div>
              {password && (
                <div className="mt-1 text-sm">
                  <div className="flex items-center mb-1">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          passwordCheck.strength === 'strong' ? 'bg-green-500 w-full' : 
                          passwordCheck.strength === 'medium' ? 'bg-yellow-500 w-2/3' : 
                          'bg-gray-800 w-1/3'
                        }`}
                      ></div>
                    </div>
                    <span className={`ml-2 ${
                      passwordCheck.strength === 'strong' ? 'text-green-600' : 
                      passwordCheck.strength === 'medium' ? 'text-yellow-600' : 
                      'text-gray-600'
                    }`}>
                      {passwordCheck.strength === 'strong' ? '강력' : 
                       passwordCheck.strength === 'medium' ? '적절' : 
                       '약함'}
                    </span>
                  </div>
                  <p className="text-gray-500">{passwordCheck.message}</p>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호 확인
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`input pl-10 ${
                    confirmPassword && password === confirmPassword ? 'border-green-500' : 'border-gray-300'
                  }`}
                  placeholder="비밀번호를 다시 입력하세요"
                  required
                />
                {confirmPassword && password === confirmPassword && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FiCheck className="text-green-500" />
                  </div>
                )}
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-sm text-gray-800">비밀번호가 일치하지 않습니다.</p>
              )}
            </div>
            
            <div className="mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-600">
                    <span>
                      <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                        이용약관
                      </Link>
                      {' '}및{' '}
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                        개인정보 처리방침
                      </Link>
                      에 동의합니다.
                    </span>
                  </label>
                </div>
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
                  <span>가입 중...</span>
                </>
              ) : (
                <span>회원가입</span>
              )}
            </button>
          </form>
        </div>
        
        <div className="text-center">
          <Link 
            href="/login" 
            className="text-blue-600 hover:text-blue-500 font-medium flex items-center justify-center"
          >
            <FiArrowLeft className="mr-1" />
            <span>로그인 페이지로 돌아가기</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
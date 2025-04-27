import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import { 
  FiUser, 
  FiMail, 
  FiEdit, 
  FiSave, 
  FiInfo, 
  FiAlertCircle, 
  FiCheck,
  FiClock,
  FiMessageSquare,
  FiTrash2
} from 'react-icons/fi';

interface UserProfile {
  name: string;
  email: string;
  createdAt: string;
  remainingChats: number;
  totalEmotionRecords: number;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      // 로그인 확인 (실제 구현 시 API 호출 또는 localStorage 확인)
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login?returnUrl=/profile');
        return;
      }
      
      // 사용자 프로필 데이터 로드
      await fetchUserProfile();
    };
    
    checkAuth();
  }, [router]);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 실제 API 호출 코드 (구현 시 주석 해제)
      // const response = await fetch('/api/user/profile', {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('token')}`,
      //   },
      // });
      // const data = await response.json();
      
      // 임시 데이터
      const mockProfile: UserProfile = {
        name: '김마음',
        email: 'user@example.com',
        createdAt: '2023-04-15T09:00:00Z',
        remainingChats: 12,
        totalEmotionRecords: 24,
      };
      
      // 데이터 로딩 시뮬레이션
      setTimeout(() => {
        setProfile(mockProfile);
        setEditedName(mockProfile.name);
        setIsLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error('프로필 로드 오류:', err);
      setError('프로필 정보를 불러오는 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!editedName.trim()) {
      setError('이름을 입력해주세요.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // 실제 API 호출 코드 (구현 시 주석 해제)
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${localStorage.getItem('token')}`,
      //   },
      //   body: JSON.stringify({ name: editedName }),
      // });
      
      // 임시 업데이트 로직
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (profile) {
        const updatedProfile = { ...profile, name: editedName };
        setProfile(updatedProfile);
      }
      
      setIsEditing(false);
      setSuccessMessage('프로필이 성공적으로 업데이트되었습니다.');
      
      // 성공 메시지 자동 제거
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      
    } catch (err) {
      console.error('프로필 업데이트 오류:', err);
      setError('프로필 정보를 업데이트하는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    // 계정 삭제 확인
    const confirmed = window.confirm(
      '정말 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없으며, 모든 데이터가 영구적으로 삭제됩니다.'
    );
    
    if (!confirmed) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // 실제 API 호출 코드 (구현 시 주석 해제)
      // const response = await fetch('/api/user/profile', {
      //   method: 'DELETE',
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('token')}`,
      //   },
      // });
      
      // 임시 삭제 로직
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 로그아웃 처리
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // 홈으로 리디렉션
      router.push('/?accountDeleted=true');
      
    } catch (err) {
      console.error('계정 삭제 오류:', err);
      setError('계정을 삭제하는 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  return (
    <Layout
      title="마음돌봄이 | 내 프로필"
      description="마음돌봄이 서비스의 사용자 프로필 관리 페이지입니다."
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">내 프로필</h1>
        <p className="text-gray-600">계정 정보를 확인하고 관리하세요.</p>
      </div>
      
      {/* 로딩 및 메시지 처리 */}
      {isLoading && !profile ? (
        <div className="bg-white rounded-lg shadow-md p-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-gray-50 border border-gray-200 text-gray-800 p-4 rounded-lg mb-6">
          <div className="flex items-center">
            <FiAlertCircle className="text-gray-400 mr-2" />
            <p>{error}</p>
          </div>
        </div>
      ) : successMessage ? (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
          <div className="flex items-center">
            <FiCheck className="text-green-500 mr-2" />
            <p>{successMessage}</p>
          </div>
        </div>
      ) : null}
      
      {profile && (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {/* 프로필 정보 카드 */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-800">개인 정보</h2>
                {isEditing ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedName(profile.name);
                        setError(null);
                      }}
                      className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 text-sm flex items-center hover:bg-gray-50"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleUpdateProfile}
                      disabled={isLoading}
                      className="px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm flex items-center hover:bg-blue-600"
                    >
                      {isLoading ? (
                        <svg className="animate-spin h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <FiSave className="mr-1.5" />
                      )}
                      저장
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 text-sm flex items-center hover:bg-gray-50"
                  >
                    <FiEdit className="mr-1.5" />
                    수정
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    이름
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    {isEditing ? (
                      <input
                        id="name"
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="input pl-10"
                        placeholder="이름을 입력하세요"
                        required
                      />
                    ) : (
                      <div className="input pl-10 bg-gray-50 flex items-center">
                        {profile.name}
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    이메일
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <div className="input pl-10 bg-gray-50 flex items-center">
                      {profile.email}
                      <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                        인증됨
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    이메일 주소는 수정할 수 없습니다. 변경이 필요한 경우 고객 지원에 문의하세요.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    가입일
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiClock className="text-gray-400" />
                    </div>
                    <div className="input pl-10 bg-gray-50 flex items-center">
                      {new Date(profile.createdAt).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-base font-medium text-gray-800 mb-4">계정 삭제</h3>
                <p className="text-sm text-gray-600 mb-4">
                  계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 취소할 수 없습니다.
                </p>
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 flex items-center"
                >
                  <FiTrash2 className="mr-1.5 text-gray-800" />
                  계정 삭제하기
                </button>
              </div>
            </div>
          </div>
          
          {/* 사이드바 카드 */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">사용 현황</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">남은 상담 횟수</span>
                    <span className="text-sm font-medium">{profile.remainingChats}회</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${Math.min((profile.remainingChats / 15) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    오늘 사용 가능한 상담 횟수입니다. 자정에 15회로 리셋됩니다.
                  </p>
                </div>
                
                <div className="flex items-center py-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <FiMessageSquare className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">채팅 시간</p>
                    <p className="font-medium">무제한</p>
                  </div>
                </div>
                
                <div className="flex items-center py-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <FiBarChart2 className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">감정 기록</p>
                    <p className="font-medium">{profile.totalEmotionRecords}개</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start">
                <FiInfo className="text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800 mb-1">도움이 필요하신가요?</h3>
                  <p className="text-sm text-blue-700">
                    문의사항이 있으시면 언제든지 <a href="mailto:support@hearthug.com" className="underline">support@hearthug.com</a>으로 연락해주세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
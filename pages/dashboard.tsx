import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import EmotionChart from '../components/emotion/EmotionChart';
import EmotionForm from '../components/emotion/EmotionForm';
import { EmotionData } from '../components/emotion/EmotionForm';
import { FiPlusCircle, FiBarChart2, FiCalendar, FiChevronLeft, FiChevronRight, FiInfo } from 'react-icons/fi';

const Dashboard: React.FC = () => {
  // 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [emotionRecords, setEmotionRecords] = useState<EmotionData[]>([]);
  const [showEmotionForm, setShowEmotionForm] = useState<boolean>(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 감정 기록을 불러오는 함수 (임시 데이터 사용)
  const fetchEmotionData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 실제 API 호출 코드 (구현 시 주석 해제)
      // const response = await fetch('/api/emotion/records', {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('token')}`,
      //   },
      // });
      // const data = await response.json();
      
      // 임시 데이터
      const today = new Date();
      const mockData: EmotionData[] = Array.from({ length: 14 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() - i);
        
        return {
          date: date.toISOString().split('T')[0],
          score: Math.floor(Math.random() * 10) + 1, // 1-10 사이 랜덤 점수
          keywords: getRandomKeywords(),
          comment: i % 3 === 0 ? '오늘은 전반적으로 괜찮은 하루였습니다.' : '',
        };
      });
      
      // 데이터 로딩 시뮬레이션
      setTimeout(() => {
        setEmotionRecords(mockData);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error('감정 기록 불러오기 오류:', err);
      setError('감정 기록을 불러오는 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 로그인 상태 확인 및 데이터 로드
  useEffect(() => {
    // 로그인 확인 (실제 구현 시 API 호출 또는 localStorage 확인)
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login?returnUrl=/dashboard');
      return;
    }
    
    setIsLoggedIn(true);
    fetchEmotionData();
  }, [router]);

  // 감정 기록 저장 처리
  const handleSaveEmotion = async (data: EmotionData) => {
    try {
      // 실제 API 호출 코드 (구현 시 주석 해제)
      // const response = await fetch('/api/emotion/record', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${localStorage.getItem('token')}`,
      //   },
      //   body: JSON.stringify(data),
      // });
      
      // 임시 저장 로직 (데이터 추가)
      setEmotionRecords([data, ...emotionRecords]);
      setShowEmotionForm(false);
      
    } catch (err) {
      console.error('감정 기록 저장 오류:', err);
      setError('감정 기록을 저장하는 중 오류가 발생했습니다.');
    }
  };

  // 랜덤 감정 키워드 생성 (임시 데이터용)
  const getRandomKeywords = () => {
    const allKeywords = ['기쁨', '평화', '감사', '설렘', '희망', '불안', '슬픔', '분노', '상실감', '혼란', '무기력', '외로움'];
    const shuffled = [...allKeywords].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 3) + 1); // 1-3개의 랜덤 키워드
  };

  // 요약 통계 계산
  const calculateStats = () => {
    if (emotionRecords.length === 0) return { average: 0, highest: 0, lowest: 0, mostFrequent: [] };
    
    const scores = emotionRecords.map(record => record.score);
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    
    // 가장 많이 사용된 감정 키워드 찾기
    const keywordCount: Record<string, number> = {};
    emotionRecords.forEach(record => {
      record.keywords.forEach(keyword => {
        keywordCount[keyword] = (keywordCount[keyword] || 0) + 1;
      });
    });
    
    let maxCount = 0;
    let mostFrequent: string[] = [];
    
    Object.entries(keywordCount).forEach(([keyword, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostFrequent = [keyword];
      } else if (count === maxCount) {
        mostFrequent.push(keyword);
      }
    });
    
    return { average, highest, lowest, mostFrequent };
  };
  
  const stats = calculateStats();

  // 기간에 맞는 데이터만 필터링
  const getFilteredData = () => {
    const today = new Date();
    let startDate = new Date();
    
    switch (selectedPeriod) {
      case 'week':
        startDate.setDate(today.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(today.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(today.getFullYear() - 1);
        break;
    }
    
    return emotionRecords.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= startDate && recordDate <= today;
    });
  };

  const filteredData = getFilteredData();

  return (
    <Layout
      title="마음돌봄이 | 감정 대시보드"
      description="당신의 감정 변화를 그래프로 확인하고 관리하세요."
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">감정 대시보드</h1>
        <p className="text-gray-600">일상 속 감정을 기록하고 변화를 확인해보세요.</p>
      </div>
      
      {/* 로딩 및 에러 처리 */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-md p-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-gray-50 border border-gray-200 text-gray-800 p-4 rounded-lg mb-6">
          <div className="flex items-center">
            <FiInfo className="text-gray-400 mr-2" />
            <p>{error}</p>
          </div>
        </div>
      ) : (
        <>
          {/* 상단 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500 mb-1">평균 감정 점수</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.average.toFixed(1)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500 mb-1">최고 감정 점수</h3>
              <p className="text-2xl font-bold text-green-600">{stats.highest}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500 mb-1">최저 감정 점수</h3>
              <p className="text-2xl font-bold text-gray-600">{stats.lowest}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500 mb-1">자주 느낀 감정</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {stats.mostFrequent.map((keyword, index) => (
                  <span 
                    key={index}
                    className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
      
          {/* 차트 섹션 */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <FiBarChart2 className="text-blue-600 mr-2" />
                <h2 className="text-lg font-medium">감정 변화 추이</h2>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSelectedPeriod('week')} 
                  className={`px-3 py-1.5 text-sm rounded-md ${
                    selectedPeriod === 'week' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  1주일
                </button>
                <button 
                  onClick={() => setSelectedPeriod('month')} 
                  className={`px-3 py-1.5 text-sm rounded-md ${
                    selectedPeriod === 'month' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  1개월
                </button>
                <button 
                  onClick={() => setSelectedPeriod('year')} 
                  className={`px-3 py-1.5 text-sm rounded-md ${
                    selectedPeriod === 'year' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  1년
                </button>
              </div>
            </div>
            
            <EmotionChart data={filteredData} period={selectedPeriod} />
          </div>
      
          {/* 감정 기록 목록 */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <FiCalendar className="text-blue-600 mr-2" />
                <h2 className="text-lg font-medium">최근 감정 기록</h2>
              </div>
              <button 
                onClick={() => setShowEmotionForm(true)}
                className="px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm flex items-center hover:bg-blue-600"
              >
                <FiPlusCircle className="mr-1.5" />
                감정 기록하기
              </button>
            </div>
            
            {emotionRecords.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>아직 기록된 감정이 없습니다.</p>
                <p className="mt-2">첫 번째 감정을 기록해보세요!</p>
              </div>
            ) : (
              <div className="overflow-hidden">
                <div className="border rounded-lg overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          날짜
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          감정 점수
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          감정 키워드
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          코멘트
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {emotionRecords.slice(0, 5).map((record, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(record.date).toLocaleDateString('ko-KR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full emotion-score-${record.score}`}>
                              {record.score} / 10
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {record.keywords.map((keyword, kidx) => (
                                <span 
                                  key={kidx}
                                  className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                            {record.comment || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* 페이지네이션 (예시) */}
                {emotionRecords.length > 5 && (
                  <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          전체 <span className="font-medium">{emotionRecords.length}</span> 개의 기록 중{' '}
                          <span className="font-medium">1</span> 페이지 표시 중
                        </p>
                      </div>
                      <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                          <button
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            <FiChevronLeft className="h-5 w-5" />
                          </button>
                          <button
                            className="relative inline-flex items-center bg-blue-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          >
                            1
                          </button>
                          <button
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            2
                          </button>
                          <button
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            <FiChevronRight className="h-5 w-5" />
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* 감정 기록 폼 모달 */}
          {showEmotionForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">감정 기록하기</h3>
                  <button
                    onClick={() => setShowEmotionForm(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">닫기</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <EmotionForm 
                    onSubmit={handleSaveEmotion} 
                    onCancel={() => setShowEmotionForm(false)} 
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default Dashboard;
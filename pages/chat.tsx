import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import ChatBox from '../components/chat/ChatBox';
import { Message } from '../components/chat/ChatBox';
import { FiAlertCircle, FiHeart, FiInfo } from 'react-icons/fi';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [remainingChats, setRemainingChats] = useState<number>(0);
  const [stylePreference, setStylePreference] = useState<string>('friendly');
  const [showStyleSelector, setShowStyleSelector] = useState<boolean>(true);
  const router = useRouter();
  
  // 스타일 선택 옵션
  const styleOptions = [
    { id: 'friendly', label: '명랑하고 따뜻한 20대 친구 스타일', icon: '😊' },
    { id: 'calm', label: '부드럽고 차분한 30대 상담사 스타일', icon: '😌' },
    { id: 'wise', label: '연륜 있고 조용한 60대 어르신 스타일', icon: '🧓' },
  ];

  // 컴포넌트 마운트 시 초기 메시지 설정
  useEffect(() => {
    // 로그인 상태 확인 (실제 구현 시 API 호출 또는 localStorage 확인)
    const checkLoginStatus = async () => {
      try {
        // 임시 로그인 체크 로직
        const isUserLoggedIn = localStorage.getItem('token') !== null;
        setIsLoggedIn(isUserLoggedIn);
        
        if (isUserLoggedIn) {
          // 임시 데이터 - 실제로는 API에서 가져옴
          setRemainingChats(15); // 로그인 시 하루 15회
        } else {
          setRemainingChats(3); // 비로그인 시 3회
        }
      } catch (err) {
        console.error('로그인 상태 확인 실패:', err);
        setError('로그인 상태를 확인하는 중 오류가 발생했습니다.');
      }
    };
    
    checkLoginStatus();
    
    // 초기 웰컴 메시지 설정
    const initialMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: '안녕하세요, 마음돌봄이입니다. 오늘은 어떤 마음이 함께하고 있을까요? 먼저, 어떤 말투로 대화를 나누고 싶으신지 선택해주세요.',
      createdAt: new Date().toISOString(),
    };
    
    setMessages([initialMessage]);
  }, []);

  // 채팅 스타일 선택 처리
  const handleStyleSelect = (style: string) => {
    setStylePreference(style);
    setShowStyleSelector(false);
    
    // 스타일 선택 후 응답 메시지
    let responseContent = '';
    
    switch (style) {
      case 'friendly':
        responseContent = '편안한 친구처럼 대화하고 싶으시군요! 좋아요, 지금 어떤 생각이나 감정이 드는지 자유롭게 이야기해주세요. 함께 살펴볼게요! 😊';
        break;
      case 'calm':
        responseContent = '차분한 대화를 원하시는군요. 충분히 이해합니다. 오늘 어떤 감정이 들고 계신지, 천천히 말씀해주시겠어요? 함께 살펴보도록 하겠습니다.';
        break;
      case 'wise':
        responseContent = '세월의 지혜를 담은 대화를 원하시는군요. 그럼 오늘 마음 상태는 어떠신가요? 차분히 이야기 나눠보도록 해요. 걱정 말고 말씀해주세요.';
        break;
      default:
        responseContent = '선택해주셔서 감사합니다. 어떤 이야기를 나누고 싶으신가요? 편안하게 말씀해주세요.';
    }
    
    const styleResponseMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: responseContent,
      createdAt: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, styleResponseMessage]);
  };

  // 메시지 전송 처리
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // 남은 채팅 횟수 확인
    if (remainingChats <= 0) {
      setError('오늘 사용 가능한 채팅 횟수를 모두 사용하셨습니다. 내일 다시 시도하시거나 로그인하여 더 많은 대화를 나눠보세요.');
      return;
    }
    
    // 사용자 메시지 추가
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    
    try {
      // 여기서 실제 API 호출
      // const response = await fetch('/api/chat', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     message: content,
      //     stylePreference,
      //   }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('API 응답 오류');
      // }
      
      // const data = await response.json();
      
      // 임시 응답 (실제로는 API 응답으로 대체)
      await new Promise(resolve => setTimeout(resolve, 1000)); // 응답 지연 시뮬레이션
      
      const mockResponses = [
        '그런 감정이 드는 건 충분히 자연스러운 일이에요. 좀 더 자세히 이야기해 볼까요?',
        '그 마음이 언제부터 느껴지셨나요? 혹시 특별한 계기가 있었을까요?',
        '그런 상황에서 그렇게 느끼는 건 정말 어려운 일이었을 것 같아요. 어떻게 대처하고 계신가요?',
        '그 감정에 이름을 붙인다면 어떤 이름을 붙여주고 싶으신가요?',
        '만약 그 감정이 색깔이라면 어떤 색깔로 표현할 수 있을까요?',
        '그 감정을 느낄 때 몸의 어느 부분에서 가장 강하게 느껴지나요?',
      ];
      
      const randomIndex = Math.floor(Math.random() * mockResponses.length);
      const assistantContent = mockResponses[randomIndex];
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: assistantContent,
        createdAt: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setRemainingChats(prev => prev - 1); // 남은 채팅 횟수 감소
      
    } catch (err) {
      console.error('메시지 전송 오류:', err);
      setError('메시지 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout 
      title="마음돌봄이 | 상담하기" 
      description="마음돌봄이와 대화하며 당신의 감정을 표현하고 돌봄받으세요."
      fullWidth={true}
      hideFooter={true}
    >
      {/* 남은 채팅 및 로그인 안내 */}
      <div className="bg-blue-50 text-blue-800 p-3 flex items-center justify-between">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-2 sm:mb-0">
            <FiInfo className="mr-2 flex-shrink-0" />
            <span>
              남은 상담: <strong>{remainingChats}회</strong>
              {!isLoggedIn && remainingChats < 10 && (
                <span className="ml-2 text-sm">
                  (로그인 시 하루 15회 가능)
                </span>
              )}
            </span>
          </div>
          
          {!isLoggedIn && (
            <button
              onClick={() => router.push('/login')}
              className="btn-primary text-sm py-1.5 px-3"
            >
              로그인하기
            </button>
          )}
        </div>
      </div>
      
      {/* 채팅 컨테이너 */}
      <div className="flex flex-col h-[calc(100vh-14.5rem)]">
        <div className="container mx-auto px-4 flex-grow flex flex-col h-full">
          {/* 스타일 선택기 */}
          {showStyleSelector && (
            <div className="bg-white rounded-lg shadow-md p-5 mb-4 mt-4">
              <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                <FiHeart className="mr-2 text-pink-500" />
                대화 스타일 선택
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {styleOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleStyleSelect(option.id)}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center text-center"
                  >
                    <span className="text-2xl mb-2">{option.icon}</span>
                    <span className="text-sm font-medium text-gray-800">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* 채팅 박스 */}
          <ChatBox
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            error={error}
            disabled={remainingChats <= 0}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiInfo, FiLoader, FiRefreshCw } from 'react-icons/fi';
import { chatApi } from '../../utils/api';
import { useAuth } from '../../utils/auth';
import MessageList from './MessageList';
import ConversationStyle from './ConversationStyle';

// 메시지 타입 정의
export interface Message {
  id?: number;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt?: string;
}

// 대화 스타일 타입 정의
export type ChatStyle = 'default' | 'cheerful' | 'calm' | 'wise';

interface ChatBoxProps {
  conversationId?: number;
  initialMessages?: Message[];
  onNewConversation?: (id: number) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  conversationId,
  initialMessages = [],
  onNewConversation
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usageInfo, setUsageInfo] = useState<{
    remainingCount: number;
    limitType: string;
  } | null>(null);
  const [chatStyle, setChatStyle] = useState<ChatStyle>('default');
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'error'>('connecting');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 메시지 목록 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 메시지 추가 시 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 포커스 관리
  useEffect(() => {
    // 로딩이 끝나면 텍스트 영역에 포커스
    if (!isLoading && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isLoading]);

  // API 연결 상태 확인
  useEffect(() => {
    const checkConnection = async () => {
      try {
        setConnectionStatus('connecting');
        await chatApi.checkUsage();
        setConnectionStatus('connected');
      } catch (err) {
        console.error('API 연결 확인 오류:', err);
        setConnectionStatus('error');
      }
    };
    
    checkConnection();
  }, []);

  // 사용량 제한 확인
  const checkUsageLimit = async () => {
    try {
      const response = await chatApi.checkUsage();
      if (response.data.success) {
        setUsageInfo({
          remainingCount: response.data.usage.remainingCount,
          limitType: response.data.usage.limitType
        });
        
        // 사용량 한도 초과 시 에러 설정
        if (!response.data.usage.allowed) {
          setError(response.data.usage.limitMessage || '오늘의 대화 한도에 도달했습니다.');
        }
      }
    } catch (err) {
      console.error('사용량 확인 오류:', err);
    }
  };

  // 컴포넌트 마운트 시 사용량 확인
  useEffect(() => {
    if (connectionStatus === 'connected') {
      checkUsageLimit();
    }
  }, [connectionStatus]);

  // 메시지 전송 처리
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 빈 메시지 체크 또는 연결 문제 체크
    if (!newMessage.trim() || isLoading || connectionStatus !== 'connected') return;
    
    const userMessage: Message = {
      role: 'user',
      content: newMessage
    };
    
    // 현재 메시지 저장
    const currentMessage = newMessage;
    
    // 메시지 목록에 사용자 메시지 추가
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    setError(null);
    
    try {
      // API 호출
      const response = await chatApi.sendMessage(
        currentMessage, 
        conversationId,
        chatStyle
      );
      
      if (response.data.success) {
        // 응답 메시지 추가
        const assistantMessage: Message = {
          role: 'assistant',
          content: response.data.message,
          id: response.data.messageId
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        
        // 새 대화 ID 콜백
        if (!conversationId && response.data.conversationId && onNewConversation) {
          onNewConversation(response.data.conversationId);
        }
        
        // 사용량 정보 업데이트
        if (response.data.usage) {
          setUsageInfo(response.data.usage);
        }
        
        // 위기 상황 표시
        if (response.data.hasCrisisSignal) {
          setShowCrisisAlert(true);
        }
      }
    } catch (err: any) {
      console.error('메시지 전송 오류:', err);
      setConnectionStatus('error');
      
      // 네트워크 오류 처리
      if (err.message && err.message.includes('Network Error')) {
        setConnectionStatus('error');
      }
      
      // 사용량 제한 오류 처리
      if (err.response?.status === 429) {
        checkUsageLimit();
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 새 대화 시작
  const handleNewConversation = () => {
    setMessages([]);
    setShowCrisisAlert(false);
    if (onNewConversation) {
      onNewConversation(0); // 0은 새 대화를 의미
    }
  };

  // 대화 스타일 변경
  const handleStyleChange = (style: ChatStyle) => {
    setChatStyle(style);
  };

  // 재연결 시도
  const handleRetryConnection = () => {
    setConnectionStatus('connecting');
    checkUsageLimit().then(() => {
      setConnectionStatus('connected');
      setError(null);
    }).catch(() => {
      setConnectionStatus('error');
    });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden">
      {/* 연결 상태 표시 */}
      {connectionStatus !== 'connected' && (
        <div className={`px-4 py-2 text-gray-700 text-sm ${
          connectionStatus === 'connecting' 
            ? 'bg-gray-100' 
            : 'bg-gray-200'
        }`}>
          {connectionStatus === 'connecting' ? (
            <div className="flex items-center">
              <FiLoader className="animate-spin mr-2" />
              서버에 연결 중입니다...
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FiInfo className="mr-2" />
                서버 연결에 실패했습니다. 대화를 이용할 수 없습니다.
              </div>
              <button 
                onClick={handleRetryConnection}
                className="bg-white text-gray-600 px-2 py-1 rounded-md text-xs hover:bg-gray-100 border border-gray-300"
              >
                재연결
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* 위기 상황 알림 */}
      {showCrisisAlert && (
        <div className="px-4 py-3 bg-gray-100 text-gray-700 border-b flex items-start">
          <FiInfo className="mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">안내 메시지</p>
            <p className="text-sm mt-1">
              지금 굉장히 힘드신 것 같아요. 이런 순간엔 혼자 견디지 않으셔도 돼요.
              정신건강 지원 전화 1577-0199에 연락해 보실 수 있을까요?
            </p>
          </div>
        </div>
      )}
      
      {/* 대화 스타일 선택 */}
      <div className="p-4 bg-gray-50 border-b">
        <ConversationStyle
          currentStyle={chatStyle}
          onChange={handleStyleChange}
        />
      </div>
      
      {/* 메시지 목록 */}
      <div className="flex-grow overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-4">
            <div className="text-6xl mb-2">💖</div>
            <h3 className="text-xl font-medium">마음돌봄이와 대화를 시작해보세요</h3>
            <p className="max-w-md">
              오늘의 기분이나 생각을 자유롭게 이야기해보세요.
              마음돌봄이가 따뜻하게 귀 기울여 드립니다.
            </p>
          </div>
        ) : (
          <MessageList messages={messages} />
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* 사용량 정보 표시 */}
      {usageInfo && connectionStatus === 'connected' && (
        <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 border-t flex items-center justify-between">
          <div>
            {usageInfo.limitType === 'anonymous' ? (
              <span>
                비로그인 상태: 오늘 {usageInfo.remainingCount}회 대화 가능 
              </span>
            ) : (
              <span>
                남은 대화: {usageInfo.remainingCount}회
              </span>
            )}
          </div>
          
          {usageInfo.limitType === 'anonymous' && (
            <a href="/login" className="text-purple-600 hover:underline font-medium">
              로그인하여 더 많은 대화하기 →
            </a>
          )}
        </div>
      )}
      
      {/* 메시지 입력 폼 */}
      <form 
        onSubmit={handleSendMessage} 
        className="p-4 border-t flex items-end"
        id="chatForm"
      >
        <div className="relative flex-grow">
          <textarea
            ref={textareaRef}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition"
            placeholder={
              connectionStatus !== 'connected' 
                ? "서버 연결이 필요합니다" 
                : "무슨 생각을 하고 계신가요?"
            }
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            rows={3}
            disabled={isLoading || connectionStatus !== 'connected'}
          />
          {isLoading && (
            <div className="absolute right-3 bottom-3 text-purple-500">
              <FiLoader className="animate-spin" size={20} />
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`ml-2 p-3 rounded-full ${
            isLoading || connectionStatus !== 'connected' || !newMessage.trim()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          } transition-colors`}
          disabled={isLoading || connectionStatus !== 'connected' || !newMessage.trim()}
        >
          <FiSend />
        </button>
      </form>
      
      {/* 새 대화 버튼 */}
      {messages.length > 0 && connectionStatus === 'connected' && (
        <div className="p-2 border-t text-center">
          <button
            onClick={handleNewConversation}
            className="inline-flex items-center text-sm text-purple-600 hover:text-purple-800"
          >
            <FiRefreshCw className="mr-1" /> 새 대화 시작하기
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
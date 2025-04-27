import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import ChatBox, { Message } from '../../components/chat/ChatBox';
import { chatApi } from '../../utils/api';
import { FiMessageSquare, FiPlus, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// 대화 타입 정의
interface Conversation {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  last_message?: string;
}

const ChatPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<number | undefined>(
    id ? Number(id) : undefined
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // 대화 목록 로드
  const loadConversations = async () => {
    try {
      const response = await chatApi.getConversations();
      if (response.data.success) {
        setConversations(response.data.conversations);
        
        // 최근 대화가 있고 ID가 지정되지 않은 경우, 가장 최근 대화 선택
        if (
          response.data.conversations.length > 0 && 
          !currentConversationId && 
          !id
        ) {
          setCurrentConversationId(response.data.conversations[0].id);
        }
      }
    } catch (err) {
      console.error('대화 목록 로드 오류:', err);
      setError('대화 목록을 불러오는 중 오류가 발생했습니다.');
    }
  };
  
  // 특정 대화의 메시지 로드
  const loadMessages = async (conversationId: number) => {
    try {
      setLoading(true);
      const response = await chatApi.getMessages(conversationId);
      if (response.data.success) {
        setMessages(response.data.messages);
      }
    } catch (err) {
      console.error('메시지 로드 오류:', err);
      setError('메시지를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  // 대화 삭제
  const deleteConversation = async (conversationId: number) => {
    if (!window.confirm('정말 이 대화를 삭제하시겠습니까?')) {
      return;
    }
    
    try {
      const response = await chatApi.deleteConversation(conversationId);
      if (response.data.success) {
        // 대화 목록에서 삭제된 대화 제거
        setConversations(prev => 
          prev.filter(conv => conv.id !== conversationId)
        );
        
        // 현재 대화가 삭제된 경우, 다른 대화로 이동
        if (currentConversationId === conversationId) {
          const nextConversation = conversations.find(
            conv => conv.id !== conversationId
          );
          
          if (nextConversation) {
            setCurrentConversationId(nextConversation.id);
          } else {
            setCurrentConversationId(undefined);
            setMessages([]);
          }
        }
      }
    } catch (err) {
      console.error('대화 삭제 오류:', err);
      alert('대화를 삭제하는 중 오류가 발생했습니다.');
    }
  };
  
  // 대화 추가 또는 변경 시 메시지 로드
  useEffect(() => {
    if (currentConversationId) {
      loadMessages(currentConversationId);
      
      // URL 업데이트
      router.push(`/chat?id=${currentConversationId}`, undefined, { shallow: true });
    } else {
      setMessages([]);
    }
  }, [currentConversationId]);
  
  // 컴포넌트 마운트 시 대화 목록 로드
  useEffect(() => {
    loadConversations();
  }, []);
  
  // URL에서 대화 ID 변경 감지
  useEffect(() => {
    if (id) {
      setCurrentConversationId(Number(id));
    }
  }, [id]);
  
  // 새 대화 시작
  const handleNewConversation = () => {
    setCurrentConversationId(undefined);
    setMessages([]);
    setSidebarOpen(false);
  };
  
  // 대화 선택
  const handleSelectConversation = (conversationId: number) => {
    setCurrentConversationId(conversationId);
    setSidebarOpen(false);
  };
  
  // 대화 ID 설정 (ChatBox에서 새 대화가 생성된 경우)
  const handleSetConversationId = (id: number) => {
    setCurrentConversationId(id);
    loadConversations(); // 대화 목록 다시 로드
  };

  return (
    <Layout title="마음돌봄이 - 상담하기">
      <div className="flex h-[calc(100vh-64px)]">
        {/* 사이드바 토글 버튼 (모바일용) */}
        <button
          className="md:hidden fixed z-10 top-20 left-0 bg-white p-2 rounded-r-lg shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
        
        {/* 대화 목록 사이드바 */}
        <aside 
          className={`
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:translate-x-0 
            transition-transform duration-300 
            w-80 bg-white shadow-md z-10
            fixed md:static top-16 bottom-0 left-0
          `}
        >
          <div className="flex flex-col h-full">
            {/* 새 대화 버튼 */}
            <div className="p-4 border-b">
              <button
                onClick={handleNewConversation}
                className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center justify-center"
              >
                <FiPlus className="mr-2" /> 새 대화 시작하기
              </button>
            </div>
            
            {/* 대화 목록 */}
            <div className="flex-grow overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  대화 내역이 없습니다.
                </div>
              ) : (
                <ul className="divide-y">
                  {conversations.map((conversation) => (
                    <li key={conversation.id}>
                      <button
                        className={`w-full p-3 text-left hover:bg-gray-50 flex items-start ${
                          currentConversationId === conversation.id
                            ? 'bg-purple-50'
                            : ''
                        }`}
                        onClick={() => handleSelectConversation(conversation.id)}
                      >
                        <FiMessageSquare className="mr-3 mt-1 text-purple-500 flex-shrink-0" />
                        <div className="flex-grow min-w-0">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium truncate">
                              {conversation.title}
                            </h3>
                            <button
                              className="text-gray-400 hover:text-red-500 p-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteConversation(conversation.id);
                              }}
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                          {conversation.last_message && (
                            <p className="text-sm text-gray-500 truncate">
                              {conversation.last_message}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(conversation.updated_at).toLocaleDateString()}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </aside>
        
        {/* 채팅 영역 */}
        <div className="flex-grow p-4 md:p-6">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="spinner"></div>
            </div>
          ) : (
            <ChatBox
              conversationId={currentConversationId}
              initialMessages={messages}
              onNewConversation={handleSetConversationId}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
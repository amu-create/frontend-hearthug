import React from 'react';
import { Message } from './ChatBox';
import { FiUser, FiCheck, FiClock } from 'react-icons/fi';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  // 마크다운 텍스트에서 줄바꿈을 HTML로 변환하는 함수
  const formatMessage = (text: string) => {
    return text
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // s 플래그를 사용하지 않는 방식으로 수정
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/`(.*?)`/g, '<code>$1</code>');
  };

  return (
    <div className="space-y-6">
      {messages.map((message, index) => {
        const isUser = message.role === 'user';
        const isConsecutive = index > 0 && messages[index - 1].role === message.role;
        return (
          <div 
            key={message.id || index} 
            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] md:max-w-[70%] rounded-lg p-4 ${
                isUser ? 'bg-blue-100 text-gray-800' : 'bg-gray-100 border border-gray-200 text-gray-800'
              } ${isConsecutive ? 'mt-2' : 'mt-4'}`}
            >
              {/* 아바타 및 역할 표시 - 연속 메시지가 아닐 때만 표시 */}
              {!isConsecutive && (
                <div className="flex items-center mb-2">
                  {isUser ? (
                    <>
                      <span className="text-sm font-medium text-blue-600 ml-auto">나</span>
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center ml-2">
                        <FiUser />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2 flex-shrink-0">
                        💖
                      </div>
                      <span className="text-sm font-medium text-blue-600">마음돌봄이</span>
                    </>
                  )}
                </div>
              )}
              
              {/* 메시지 내용 */}
              <div 
                className={`prose max-w-none ${
                  isUser ? 'text-right' : 'text-left'
                }`}
                dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
              />
              
              {/* 타임스탬프 (있는 경우) */}
              <div 
                className={`flex items-center text-xs text-gray-500 mt-2 ${
                  isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.createdAt ? (
                  <>
                    <FiClock className="mr-1" />
                    <span>
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </>
                ) : message.status === 'sent' ? (
                  <>
                    <FiCheck className="mr-1" />
                    <span>전송됨</span>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
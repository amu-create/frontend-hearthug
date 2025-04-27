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
      .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>')
      .replace(/`(.*?)`/g, '<code>$1</code>');
  };

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div
          key={message.id || index}
          className={`flex ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[80%] md:max-w-[70%] rounded-lg p-4 ${
              message.role === 'user'
                ? 'bg-purple-100 text-gray-800'
                : 'bg-white border border-gray-200 text-gray-800'
            }`}
          >
            {/* 아바타 및 역할 표시 */}
            <div className="flex items-center mb-2">
              {message.role === 'user' ? (
                <>
                  <span className="text-sm font-medium text-purple-700 ml-auto">나</span>
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center ml-2">
                    <FiUser />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2 flex-shrink-0">
                    💖
                  </div>
                  <span className="text-sm font-medium text-blue-700">마음돌봄이</span>
                </>
              )}
            </div>

            {/* 메시지 내용 */}
            <div 
              className={`prose max-w-none ${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}
              dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
            />

            {/* 타임스탬프 (있는 경우) */}
            {message.createdAt && (
              <div
                className={`text-xs text-gray-500 mt-1 ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
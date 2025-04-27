import React from 'react';
import { ChatStyle } from './ChatBox';

interface ConversationStyleProps {
  currentStyle: ChatStyle;
  onChange: (style: ChatStyle) => void;
}

const ConversationStyle: React.FC<ConversationStyleProps> = ({
  currentStyle,
  onChange
}) => {
  // 스타일 옵션 정의
  const styleOptions: { value: ChatStyle; label: string; description: string; emoji: string }[] = [
    {
      value: 'default',
      label: '기본',
      description: '부드럽고 공감적인 기본 스타일',
      emoji: '💖'
    },
    {
      value: 'cheerful',
      label: '명랑한 친구',
      description: '밝고 활기찬 20대 친구처럼',
      emoji: '✨'
    },
    {
      value: 'calm',
      label: '차분한 상담사',
      description: '안정감 있는 30대 상담사처럼',
      emoji: '🌊'
    },
    {
      value: 'wise',
      label: '지혜로운 어르신',
      description: '연륜 있는 60대 어르신처럼',
      emoji: '🍵'
    }
  ];

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">대화 스타일 선택</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {styleOptions.map((option) => (
          <button
            key={option.value}
            className={`p-3 rounded-lg text-left transition-all ${
              currentStyle === option.value
                ? 'bg-purple-100 border-purple-500 border-2 shadow-md transform scale-[1.02]'
                : 'bg-gray-100 hover:bg-gray-200 border-2 border-transparent hover:transform hover:scale-[1.01]'
            }`}
            onClick={() => onChange(option.value)}
          >
            <div className="text-xl mb-1">{option.emoji}</div>
            <div className="font-medium text-sm">{option.label}</div>
            <div className="text-xs text-gray-600 line-clamp-2">{option.description}</div>
          </button>
        ))}
      </div>
      <div className="text-xs text-gray-500 mt-2 flex items-center">
        <span className="mr-2">💡</span>
        <span>대화 스타일에 따라 마음돌봄이의 말투와 접근 방식이 달라집니다.</span>
      </div>
    </div>
  );
};

export default ConversationStyle;
import React, { useState } from 'react';
import { FiSave, FiX, FiHeart } from 'react-icons/fi';

interface EmotionFormProps {
  onSubmit: (data: EmotionData) => void;
  onCancel?: () => void;
  initialData?: Partial<EmotionData>;
}

export interface EmotionData {
  score: number;
  keywords: string[];
  comment: string;
  date: string;
}

// 감정 키워드 선택 옵션
const EMOTION_KEYWORDS = [
  { label: '기쁨', color: 'bg-yellow-100 text-yellow-800' },
  { label: '평화', color: 'bg-green-100 text-green-800' },
  { label: '감사', color: 'bg-blue-100 text-blue-800' },
  { label: '설렘', color: 'bg-pink-100 text-pink-800' },
  { label: '희망', color: 'bg-purple-100 text-purple-800' },
  { label: '불안', color: 'bg-orange-100 text-orange-800' },
  { label: '슬픔', color: 'bg-blue-100 text-blue-800' },
  { label: '분노', color: 'bg-red-100 text-red-800' },
  { label: '상실감', color: 'bg-gray-100 text-gray-800' },
  { label: '혼란', color: 'bg-yellow-100 text-yellow-800' },
  { label: '무기력', color: 'bg-gray-100 text-gray-800' },
  { label: '외로움', color: 'bg-blue-100 text-blue-800' },
];

const EmotionForm: React.FC<EmotionFormProps> = ({ onSubmit, onCancel, initialData = {} }) => {
  const [score, setScore] = useState(initialData.score || 5);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(initialData.keywords || []);
  const [comment, setComment] = useState(initialData.comment || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const today = new Date().toISOString().split('T')[0];
    
    onSubmit({
      score,
      keywords: selectedKeywords,
      comment,
      date: initialData.date || today,
    });
  };

  const toggleKeyword = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">오늘의 감정 점수</h3>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>매우 나쁨</span>
            <span>보통</span>
            <span>매우 좋음</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={score}
            onChange={(e) => setScore(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="text-center text-2xl font-bold text-blue-600 mt-2">
            {score}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">어떤 감정이었나요?</h3>
        <div className="flex flex-wrap gap-2">
          {EMOTION_KEYWORDS.map((emotion) => (
            <button
              key={emotion.label}
              type="button"
              onClick={() => toggleKeyword(emotion.label)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedKeywords.includes(emotion.label)
                  ? `${emotion.color} ring-2 ring-offset-2 ring-blue-300`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {emotion.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">남기고 싶은 이야기</h3>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all resize-none"
          placeholder="오늘 있었던 일이나 감정에 대해 자유롭게 작성해보세요."
          rows={4}
        />
      </div>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all flex items-center"
          >
            <FiX className="mr-2" />
            취소
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all flex items-center"
        >
          <FiSave className="mr-2" />
          저장하기
        </button>
      </div>
    </form>
  );
};

export default EmotionForm;
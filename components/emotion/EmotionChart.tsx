import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { FiInfo } from 'react-icons/fi';

interface EmotionRecord {
  date: string;
  score: number;
  keywords: string[];
  comment?: string;
}

interface EmotionChartProps {
  data: EmotionRecord[];
  period?: 'week' | 'month' | 'year';
}

const EmotionChart: React.FC<EmotionChartProps> = ({ 
  data, 
  period = 'week' 
}) => {
  // 데이터 포맷 변환 (차트에 맞게)
  const chartData = data.map(record => ({
    date: formatDate(record.date, period),
    점수: record.score,
    keywords: record.keywords.join(', '),
    comment: record.comment
  }));

  // 차트 색상 설정
  const getLineColor = () => {
    return '#3b82f6'; // 파란색 계열
  };

  // 툴팁 커스터마이징
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
          <p className="font-medium text-gray-700">{label}</p>
          <p className="text-blue-600 font-bold">감정 점수: {data.점수}</p>
          {data.keywords && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">키워드: </span>
              {data.keywords}
            </p>
          )}
          {data.comment && (
            <p className="text-sm text-gray-600 mt-1 max-w-xs overflow-hidden text-ellipsis">
              {data.comment.length > 50 
                ? `${data.comment.substring(0, 50)}...` 
                : data.comment}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-800">감정 변화 그래프</h3>
        <div className="text-sm text-gray-500 flex items-center">
          <FiInfo className="mr-1" />
          <span>점수가 높을수록 긍정적인 감정</span>
        </div>
      </div>
      
      {data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-gray-500">
          감정 기록이 없습니다. 첫 번째 감정을 기록해보세요.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              stroke="#64748b"
              tickMargin={10}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              domain={[0, 10]}
              stroke="#64748b"
              tickMargin={10}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            <Line
              type="monotone"
              dataKey="점수"
              stroke={getLineColor()}
              strokeWidth={2}
              activeDot={{ r: 6 }}
              dot={{ strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

// 날짜 포맷 함수
function formatDate(dateString: string, period: 'week' | 'month' | 'year'): string {
  const date = new Date(dateString);
  
  switch (period) {
    case 'week':
      return `${date.getMonth() + 1}/${date.getDate()}`;
    case 'month':
      return `${date.getMonth() + 1}/${date.getDate()}`;
    case 'year':
      return `${date.getMonth() + 1}월`;
    default:
      return dateString;
  }
}

export default EmotionChart;
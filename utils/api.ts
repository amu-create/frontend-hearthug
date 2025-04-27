import axios, { AxiosResponse } from 'axios';

// API 기본 URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청 인터셉터 설정 (토큰 추가)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정 (에러 처리)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 인증 오류 처리 (401)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      
      // 로그인 페이지로 리디렉션 (클라이언트 사이드에서만 작동)
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// 타입 정의
type ApiCallFunction = () => Promise<AxiosResponse<any>>;

// 자동 재시도 함수
const withRetry = async (apiCall: ApiCallFunction, maxRetries = 3, delay = 1000): Promise<AxiosResponse<any>> => {
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      return await apiCall();
    } catch (error) {
      retries++;
      if (retries === maxRetries) {
        throw error;
      }
      
      console.log(`API 호출 실패, ${retries}번째 재시도...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      // 지수 백오프 적용
      delay *= 2;
    }
  }
  
  // TypeScript 에러를 피하기 위한 더미 리턴
  // 이 코드는 실행되지 않지만, TypeScript 컴파일러를 만족시키기 위해 필요함
  throw new Error('재시도 실패');
};

// 채팅 관련 API
export const chatApi = {
  // 메시지 전송
  sendMessage: (message: string, conversationId?: number, conversationStyle?: string) => {
    return withRetry(() => 
      api.post('/chat/send', { message, conversationId, conversationStyle })
    );
  },
  
  // 대화 목록 조회
  getConversations: () => {
    return withRetry(() => api.get('/chat/conversations'));
  },
  
  // 특정 대화의 메시지 조회
  getMessages: (conversationId: number) => {
    return withRetry(() => api.get(`/chat/messages/${conversationId}`));
  },
  
  // 대화 삭제
  deleteConversation: (conversationId: number) => {
    return api.delete(`/chat/conversations/${conversationId}`);
  },
  
  // 대화 제목 업데이트
  updateConversationTitle: (conversationId: number, title: string) => {
    return api.put(`/chat/conversations/${conversationId}/title`, { title });
  },
  
  // 사용량 제한 확인
  checkUsage: () => {
    return api.get('/chat/usage/check');
  }
};

// 감정 기록 관련 API
export const emotionApi = {
  // 감정 기록 추가
  recordEmotion: (data: { score: number, date: string, comment?: string, keywords?: string[] }) => {
    return api.post('/emotion/record', data);
  },
  
  // 감정 기록 목록 조회
  getRecords: (startDate?: string, endDate?: string) => {
    return api.get('/emotion/records', { params: { startDate, endDate } });
  },
  
  // 감정 요약 조회
  getSummary: (startDate?: string, endDate?: string) => {
    return api.get('/emotion/summary', { params: { startDate, endDate } });
  },
  
  // 차트 데이터 조회
  getChartData: (startDate?: string, endDate?: string) => {
    return api.get('/emotion/chart-data', { params: { startDate, endDate } });
  },
  
  // 감정 키워드 추천 조회
  getKeywordSuggestions: () => {
    return api.get('/emotion/keyword-suggestions');
  }
};

// 사용자 관련 API
export const userApi = {
  // 프로필 조회
  getProfile: () => {
    return api.get('/user/profile');
  },
  
  // 프로필 업데이트
  updateProfile: (data: { name: string }) => {
    return api.put('/user/profile', data);
  },
  
  // 비밀번호 변경
  changePassword: (data: { currentPassword: string, newPassword: string }) => {
    return api.put('/user/password', data);
  },
  
  // 결제 내역 조회
  getPayments: () => {
    return api.get('/user/payments');
  },
  
  // 도네이션(커피값) 결제
  donate: (data: { amount: number, paymentMethod: string }) => {
    return api.post('/user/donate', data);
  },
  
  // 계정 삭제
  deleteAccount: (data: { password: string }) => {
    return api.delete('/user/account', { data });
  }
};

export default api;
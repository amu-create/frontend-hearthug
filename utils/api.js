import axios from 'axios';

// API 기본 URL 설정
const baseURL = 'https://hearthug.netlify.app/api';  // 항상 배포된 서버 URL 사용

// Axios 인스턴스 생성
const api = axios.create({
  baseURL,
  timeout: 30000, // 30초
  withCredentials: true, // 쿠키 사용
});

// 요청 인터셉터 - 모든 요청에 토큰 추가
api.interceptors.request.use(
  (config) => {
    // localStorage에서 토큰 가져오기
    const token = localStorage.getItem('token');
    
    // 토큰이 있으면 Authorization 헤더에 추가
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 오류 처리 및 토큰 만료 처리
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 오류(인증 실패)인 경우
    if (error.response && error.response.status === 401) {
      // 로컬 스토리지 토큰 삭제
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // 로그인 페이지로 리디렉션 (현재 페이지 URL 유지)
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        window.location.href = `/login?returnUrl=${currentPath}`;
      }
    }
    
    return Promise.reject(error);
  }
);

// API 요청 함수들

// 인증 관련 함수
export const authAPI = {
  // 회원가입
  register: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },
  
  // 로그인
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  // 현재 사용자 정보 조회
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  
  // 비밀번호 변경
  changePassword: async (passwordData) => {
    const response = await api.post('/auth/change-password', passwordData);
    return response.data;
  },
  
  // 비밀번호 찾기 요청
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },
  
  // 비밀번호 재설정
  resetPassword: async (resetData) => {
    const response = await api.post('/auth/reset-password', resetData);
    return response.data;
  }
};

// 채팅 관련 함수
export const chatAPI = {
  // 메시지 전송
  sendMessage: async (messageData) => {
    const response = await api.post('/chat/message', messageData);
    return response.data;
  },
  
  // 대화 목록 가져오기
  getConversations: async () => {
    const response = await api.get('/chat/conversations');
    return response.data;
  },
  
  // 특정 대화의 메시지 가져오기
  getConversationMessages: async (conversationId) => {
    const response = await api.get(`/chat/conversations/${conversationId}`);
    return response.data;
  },
  
  // 대화 삭제
  deleteConversation: async (conversationId) => {
    const response = await api.delete(`/chat/conversations/${conversationId}`);
    return response.data;
  },
  
  // 남은 채팅 횟수 확인
  getRemainingChats: async () => {
    const response = await api.get('/chat/remaining');
    return response.data;
  }
};

// 감정 기록 관련 함수
export const emotionAPI = {
  // 감정 기록 저장
  recordEmotion: async (emotionData) => {
    const response = await api.post('/emotion/record', emotionData);
    return response.data;
  },
  
  // 감정 기록 목록 가져오기
  getEmotionRecords: async (params) => {
    const response = await api.get('/emotion/records', { params });
    return response.data;
  },
  
  // 감정 차트 데이터 가져오기
  getChartData: async (params) => {
    const response = await api.get('/emotion/chart', { params });
    return response.data;
  },
  
  // 감정 요약 데이터 가져오기
  getSummary: async () => {
    const response = await api.get('/emotion/summary');
    return response.data;
  },
  
  // 감정 기록 삭제
  deleteEmotionRecord: async (recordId) => {
    const response = await api.delete(`/emotion/record/${recordId}`);
    return response.data;
  }
};

// 사용자 관련 함수
export const userAPI = {
  // 프로필 정보 가져오기
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },
  
  // 프로필 정보 업데이트
  updateProfile: async (profileData) => {
    const response = await api.put('/user/profile', profileData);
    return response.data;
  },
  
  // 계정 삭제
  deleteAccount: async () => {
    const response = await api.delete('/user/profile');
    return response.data;
  },
  
  // 사용자 통계 가져오기
  getStatistics: async () => {
    const response = await api.get('/user/statistics');
    return response.data;
  },
  
  // 사용자 설정 가져오기
  getSettings: async () => {
    const response = await api.get('/user/settings');
    return response.data;
  },
  
  // 사용자 설정 저장
  saveSettings: async (settingsData) => {
    const response = await api.post('/user/settings', settingsData);
    return response.data;
  },
  
  // 도네이션(후원) 처리
  makeDonation: async (donationData) => {
    const response = await api.post('/user/donation', donationData);
    return response.data;
  }
};

export default api;
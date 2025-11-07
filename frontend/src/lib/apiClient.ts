'use client';

import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/movieTheaterManagement';

console.log('🌐 API Base URL:', BASE_URL);

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// REQUEST INTERCEPTOR
apiClient.interceptors.request.use(
  (config) => {
    console.log(`📤 REQUEST: ${config.method?.toUpperCase()} ${config.url}`);

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    console.error('❌ REQUEST ERROR:', error);
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response) => {
    console.log(`📥 RESPONSE: ${response.status} ${response.config.url}`);
    return response.data;
  },
  (error) => {
    console.error('❌ RESPONSE ERROR:', error.response?.status, error.message);

    if (error.response) {
      const { status, data } = error.response;
      let errorMessage = data.message || 'Có lỗi xảy ra';

      switch (status) {
        case 400:
          errorMessage = 'Dữ liệu không hợp lệ: ' + errorMessage;
          break;
        case 401:
          errorMessage = 'Phiên đăng nhập hết hạn';
          if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
          }
          break;
        case 403:
          errorMessage = 'Bạn không có quyền truy cập';
          break;
        case 404:
          errorMessage = 'Không tìm thấy: ' + errorMessage;
          break;
        case 500:
          errorMessage = 'Lỗi server: ' + errorMessage;
          break;
      }

      if (typeof window !== 'undefined') {
        alert(errorMessage);
      }
    } else if (error.request) {
      const msg = '❌ Không thể kết nối đến server!\n\n' +
                  '🔍 Vui lòng kiểm tra:\n' +
                  '1. Backend đã chạy chưa? (http://localhost:8080)\n' +
                  '2. CORS đã cấu hình đúng chưa?\n' +
                  '3. URL trong .env.local đúng chưa?';

      if (typeof window !== 'undefined') {
        alert(msg);
      }
      console.error(msg);
    }

    return Promise.reject(error);
  }
);

export default apiClient;

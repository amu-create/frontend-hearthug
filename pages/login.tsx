import React from 'react';
import Layout from '../components/layout/Layout';
import LoginForm from '../components/auth/LoginForm';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/auth';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  
  // 이미 로그인한 사용자 리디렉션
  React.useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <Layout title="로그인 - 마음돌봄이">
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
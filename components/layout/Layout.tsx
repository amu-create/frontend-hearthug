import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { FiAlertCircle } from 'react-icons/fi';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  fullWidth?: boolean;
  hideFooter?: boolean;
  showAlert?: {
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
  };
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = '마음돌봄이 | 당신의 감정을 돌보는 AI 친구',
  description = '마음돌봄이는 당신의 감정을 안전하게 표현하고 돌볼 수 있는 AI 감정 친구입니다.',
  fullWidth = false,
  hideFooter = false,
  showAlert
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {showAlert && (
        <div className={`
          w-full py-3 px-4 md:px-6 
          ${showAlert.type === 'info' && 'bg-blue-50 text-blue-800'}
          ${showAlert.type === 'success' && 'bg-green-50 text-green-800'}
          ${showAlert.type === 'warning' && 'bg-yellow-50 text-yellow-800'}
          ${showAlert.type === 'error' && 'bg-gray-50 text-gray-800'}
        `}>
          <div className="container mx-auto flex items-center">
            <FiAlertCircle className="mr-2 flex-shrink-0" />
            <p>{showAlert.message}</p>
          </div>
        </div>
      )}

      <main className={`flex-grow ${fullWidth ? '' : 'container mx-auto px-4 py-6 md:px-6'}`}>
        {children}
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
import React from 'react';
import Link from 'next/link';
import { FiHeart, FiMail, FiGithub } from 'react-icons/fi';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <FiHeart className="text-pink-500 mr-2" />
            <span className="text-blue-600 font-bold text-lg">마음돌봄이</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-600">
            <div className="mb-3 md:mb-0 md:mr-6 text-center md:text-left">
              <p>&copy; {currentYear} 마음돌봄이. 모든 권리 보유.</p>
              <p className="mt-1">당신의 마음을 돌보는 AI 친구</p>
            </div>
            
            <div className="flex space-x-4">
              <Link 
                href="/privacy" 
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                개인정보 처리방침
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                이용약관
              </Link>
              <a 
                href="mailto:support@hearthug.com" 
                className="text-gray-600 hover:text-blue-500 transition-colors flex items-center"
              >
                <FiMail className="mr-1" />
                문의하기
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
          <p>마음돌봄이는 전문 심리상담을 대체하지 않습니다. 긴급한 도움이 필요하시면 전문가와 상담하세요.</p>
          <p className="mt-1">위기 상담 전화: 1577-0199 (자살예방핫라인)</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
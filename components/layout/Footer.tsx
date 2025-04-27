import React from 'react';
import Link from 'next/link';
import { FiHeart, FiCoffee } from 'react-icons/fi';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-600 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* 로고 및 저작권 */}
          <div className="mb-4 md:mb-0">
            <div className="flex items-center mb-2">
              <span className="text-xl font-bold text-purple-600">💖 HeartHug</span>
            </div>
            <p className="text-sm">
              &copy; {currentYear} HeartHug (마음돌봄이). 모든 권리 보유.
            </p>
          </div>

          {/* 기본 링크 */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <Link href="/about" className="hover:text-purple-600 transition-colors">
              서비스 소개
            </Link>
            <Link href="/terms" className="hover:text-purple-600 transition-colors">
              이용약관
            </Link>
            <Link href="/privacy" className="hover:text-purple-600 transition-colors">
              개인정보처리방침
            </Link>
            <Link href="/support" className="hover:text-purple-600 transition-colors">
              고객지원
            </Link>
          </div>

          {/* 도네이션 버튼 */}
          <div className="mt-6 md:mt-0">
            <Link
              href="/donate"
              className="flex items-center bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full px-6 py-2 hover:shadow-lg transition-shadow"
            >
              <FiCoffee className="mr-2" />
              개발자에게 커피 한 잔
            </Link>
            <p className="text-xs mt-2 text-center text-gray-500">
              여러분의 작은 도움이 큰 힘이 됩니다.
            </p>
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p className="mb-1">
            HeartHug는 전문적인 심리 상담 서비스가 아닙니다. 정신건강 이슈는 전문가와 상담하세요.
          </p>
          <p className="flex items-center justify-center">
            Made with <FiHeart className="mx-1 text-red-500" /> 마음돌봄이 팀
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
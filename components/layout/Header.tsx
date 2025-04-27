import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiHome, FiMessageSquare, FiBarChart, FiUser, FiMenu, FiX, FiLogIn, FiLogOut, FiHeart } from 'react-icons/fi';

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
  user?: {
    name: string;
    remainingChats?: number;
  };
}

const Header: React.FC<HeaderProps> = ({ 
  isLoggedIn = false, 
  onLogout, 
  user = { name: '', remainingChats: 0 } 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  // 현재 페이지 경로 확인을 위한 헬퍼 함수
  const isActive = (path: string) => router.pathname === path;

  // 모바일 메뉴 토글
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // 스크롤 시 메뉴 닫기
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // 네비게이션 항목 데이터
  const navItems = [
    { href: '/', icon: <FiHome />, label: '홈' },
    { href: '/chat', icon: <FiMessageSquare />, label: '상담하기' },
    { href: '/dashboard', icon: <FiBarChart />, label: '감정기록', authRequired: true },
    { href: '/profile', icon: <FiUser />, label: '내 정보', authRequired: true },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <Link 
            href="/" 
            className="flex items-center text-blue-600 font-bold text-xl md:text-2xl"
          >
            <FiHeart className="mr-2 text-pink-500" />
            <span>마음돌봄이</span>
          </Link>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems
              .filter(item => !item.authRequired || isLoggedIn)
              .map(item => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium flex items-center
                    ${isActive(item.href) 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <span className="mr-1.5">{item.icon}</span>
                  {item.label}
                </Link>
              ))
            }

            {/* 로그인/로그아웃 버튼 */}
            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="ml-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md flex items-center"
              >
                <FiLogOut className="mr-1.5" />
                로그아웃
              </button>
            ) : (
              <Link
                href="/login"
                className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 flex items-center"
              >
                <FiLogIn className="mr-1.5" />
                로그인
              </Link>
            )}
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button 
            className="md:hidden text-gray-600 focus:outline-none" 
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* 잔여 상담 횟수 표시 (로그인 된 경우) */}
        {isLoggedIn && user.remainingChats !== undefined && (
          <div className="mt-2 text-sm text-gray-600 flex justify-end items-center">
            <FiMessageSquare className="mr-1" />
            <span>남은 상담: <strong>{user.remainingChats}회</strong></span>
          </div>
        )}
      </div>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-1">
              {navItems
                .filter(item => !item.authRequired || isLoggedIn)
                .map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      px-3 py-3 rounded-md text-sm font-medium flex items-center
                      ${isActive(item.href) 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                      }
                    `}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                ))
              }

              {/* 로그인/로그아웃 버튼 */}
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    if (onLogout) onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md flex items-center"
                >
                  <FiLogOut className="mr-2" />
                  로그아웃
                </button>
              ) : (
                <Link
                  href="/login"
                  className="px-3 py-3 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiLogIn className="mr-2" />
                  로그인
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
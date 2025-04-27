import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiMenu, FiX, FiHome, FiMessageCircle, FiBarChart2, FiUser, FiLogIn, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../utils/auth';

const Header: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* 로고 */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold">💖 HeartHug</span>
          </Link>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link href="/" className={`flex items-center ${router.pathname === '/' ? 'text-white font-bold' : 'text-white/80 hover:text-white'}`}>
              <FiHome className="mr-1" /> 홈
            </Link>
            
            <Link href="/chat" className={`flex items-center ${router.pathname === '/chat' ? 'text-white font-bold' : 'text-white/80 hover:text-white'}`}>
              <FiMessageCircle className="mr-1" /> 상담하기
            </Link>
            
            {user && (
              <Link href="/emotion" className={`flex items-center ${router.pathname === '/emotion' ? 'text-white font-bold' : 'text-white/80 hover:text-white'}`}>
                <FiBarChart2 className="mr-1" /> 감정 기록
              </Link>
            )}
            
            {user ? (
              <>
                <Link href="/profile" className={`flex items-center ${router.pathname === '/profile' ? 'text-white font-bold' : 'text-white/80 hover:text-white'}`}>
                  <FiUser className="mr-1" /> 내 정보
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center bg-white/10 hover:bg-white/20 rounded-full px-4 py-2 transition-colors"
                >
                  <FiLogOut className="mr-1" /> 로그아웃
                </button>
              </>
            ) : (
              <Link href="/login" className="flex items-center bg-white/10 hover:bg-white/20 rounded-full px-4 py-2 transition-colors">
                <FiLogIn className="mr-1" /> 로그인
              </Link>
            )}
          </nav>

          {/* 모바일 메뉴 토글 버튼 */}
          <button
            className="md:hidden text-white p-2"
            onClick={toggleMobileMenu}
            aria-label="메뉴 토글"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-2 space-y-3">
            <Link href="/" 
                  className={`block py-2 px-4 ${router.pathname === '/' ? 'bg-white/20 rounded-lg' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}>
              <FiHome className="inline mr-2" /> 홈
            </Link>
            
            <Link href="/chat" 
                  className={`block py-2 px-4 ${router.pathname === '/chat' ? 'bg-white/20 rounded-lg' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}>
              <FiMessageCircle className="inline mr-2" /> 상담하기
            </Link>
            
            {user && (
              <Link href="/emotion" 
                    className={`block py-2 px-4 ${router.pathname === '/emotion' ? 'bg-white/20 rounded-lg' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}>
                <FiBarChart2 className="inline mr-2" /> 감정 기록
              </Link>
            )}
            
            {user ? (
              <>
                <Link href="/profile" 
                      className={`block py-2 px-4 ${router.pathname === '/profile' ? 'bg-white/20 rounded-lg' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}>
                  <FiUser className="inline mr-2" /> 내 정보
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 px-4 bg-white/10 rounded-lg mt-2"
                >
                  <FiLogOut className="inline mr-2" /> 로그아웃
                </button>
              </>
            ) : (
              <Link href="/login" 
                    className="block py-2 px-4 bg-white/10 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}>
                <FiLogIn className="inline mr-2" /> 로그인
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
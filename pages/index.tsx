import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/layout/Layout';
import { FiMessageCircle, FiHeart, FiBarChart2, FiArrowRight, FiCoffee } from 'react-icons/fi';
import { useAuth } from '../utils/auth';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <Layout>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              마음을 돌보는<br />따뜻한 시간
            </h1>
            <p className="text-xl opacity-90 mb-8">
              마음돌봄이(HeartHug)는 당신의 감정을 안전하게 표현하고
              이해할 수 있게 돕는 AI 감정 친구입니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/chat" className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-full font-medium flex items-center">
                <FiMessageCircle className="mr-2" /> 대화 시작하기
              </Link>
              {!user && (
                <Link href="/login" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-full font-medium flex items-center">
                  <FiHeart className="mr-2" /> 회원가입
                </Link>
              )}
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 bg-white rounded-full opacity-30 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl">💖</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 기능 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">마음돌봄이의 특별한 기능</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-purple-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl mb-4">
                <FiMessageCircle />
              </div>
              <h3 className="text-xl font-bold mb-2">AI 감정 상담</h3>
              <p className="text-gray-600 mb-4">
                당신의 감정을 안전하게 표현하고 공감받을 수 있는 대화 공간을 제공합니다.
                마음돌봄이는 판단하지 않고 귀 기울여 듣는 감정 친구입니다.
              </p>
              <Link href="/chat" className="text-purple-600 font-medium flex items-center hover:underline">
                대화 시작하기 <FiArrowRight className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl mb-4">
                <FiBarChart2 />
              </div>
              <h3 className="text-xl font-bold mb-2">감정 기록과 분석</h3>
              <p className="text-gray-600 mb-4">
                매일의 감정을 기록하고 시간에 따른 감정 변화를 시각적으로 확인할 수 있습니다.
                감정 패턴을 이해하면 자기 이해가 깊어집니다.
              </p>
              <Link href="/emotion" className="text-blue-600 font-medium flex items-center hover:underline">
                감정 기록하기 <FiArrowRight className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-pink-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-pink-600 text-white rounded-full flex items-center justify-center text-2xl mb-4">
                <FiHeart />
              </div>
              <h3 className="text-xl font-bold mb-2">맞춤형 대화 스타일</h3>
              <p className="text-gray-600 mb-4">
                기본, 명랑한 친구, 차분한 상담사, 지혜로운 어르신 등 다양한 대화 스타일 중
                당신에게 가장 편안한 방식을 선택할 수 있습니다.
              </p>
              <Link href="/chat" className="text-pink-600 font-medium flex items-center hover:underline">
                스타일 선택하기 <FiArrowRight className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 사용 방법 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">마음돌봄이 사용 방법</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            복잡한 설정 없이 간단하게 시작할 수 있습니다.
            마음돌봄이와 함께 감정 여정을 시작해보세요.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold mb-2">대화 시작하기</h3>
              <p className="text-gray-600 text-sm">
                마음돌봄이와 대화를 시작하고 원하는 대화 스타일을 선택하세요.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold mb-2">감정 표현하기</h3>
              <p className="text-gray-600 text-sm">
                지금 느끼는 감정이나 생각을 자유롭게 나누어 보세요.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold mb-2">감정 기록하기</h3>
              <p className="text-gray-600 text-sm">
                오늘의 감정 점수를 기록하고 감정 키워드를 태그해 보세요.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold mb-2">변화 확인하기</h3>
              <p className="text-gray-600 text-sm">
                시간에 따른 감정 변화를 차트로 확인하고 인사이트를 얻으세요.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/chat" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium">
              지금 시작하기
            </Link>
          </div>
        </div>
      </section>

      {/* 후원 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl text-white p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">마음돌봄이 서비스 후원하기</h2>
              <p className="text-white/90 mb-6">
                마음돌봄이는 더 많은 사람들에게 정서적 지원을 제공하기 위해 노력하고 있습니다.
                커피 한 잔 값의 후원으로 서비스 개선과 지속에 도움을 주실 수 있습니다.
              </p>
              <Link href="/donate" className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-full font-medium inline-flex items-center">
                <FiCoffee className="mr-2" /> 커피 한 잔 후원하기
              </Link>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="text-8xl">☕</div>
            </div>
          </div>
        </div>
      </section>

      {/* 오시는 말 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">마음돌봄이가 오시는 말</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            "여러분의 감정은 소중합니다. 기쁨도, 슬픔도, 화남도, 불안함도 모두 자연스러운 감정입니다.
            마음돌봄이는 여러분의 모든 감정을 있는 그대로 받아들이고, 함께 살펴보며,
            여러분이 자신의 감정을 더 잘 이해할 수 있도록 돕고 싶습니다.
            언제든 편안하게 찾아와 주세요. 함께 이야기 나눌 준비가 되어 있습니다."
          </p>
          <div className="flex justify-center">
            <Link href="/chat" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-medium flex items-center">
              <FiMessageCircle className="mr-2" /> 대화 시작하기
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
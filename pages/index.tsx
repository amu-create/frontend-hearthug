import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/layout/Layout';
import { 
  FiMessageSquare, 
  FiBarChart, 
  FiHeart, 
  FiShield, 
  FiSmile, 
  FiClock,
  FiArrowRight
} from 'react-icons/fi';

const Home: React.FC = () => {
  // 특징 항목
  const features = [
    {
      icon: <FiMessageSquare className="h-7 w-7 text-blue-600" />,
      title: '언제든지 대화하세요',
      description: '하루 중 언제든지 감정을 나누고 싶을 때 마음돌봄이와 대화하세요. 판단 없이 모든 감정을 공감으로 들어드립니다.'
    },
    {
      icon: <FiBarChart className="h-7 w-7 text-blue-600" />,
      title: '감정 변화 추적',
      description: '날마다 기록하는 감정 점수와 키워드로 자신의 감정 패턴을 이해하고 변화를 확인하세요.'
    },
    {
      icon: <FiShield className="h-7 w-7 text-blue-600" />,
      title: '개인정보 보호',
      description: '엄격한 개인정보 보호 정책으로 여러분의 민감한 대화와 감정 기록을 안전하게 보호합니다.'
    },
  ];

  // 사용 방법 단계
  const steps = [
    {
      title: '대화 시작하기',
      description: '마음돌봄이와 대화를 시작하고 원하는 대화 스타일을 선택하세요.',
      icon: <FiMessageSquare className="h-6 w-6 text-white" />,
    },
    {
      title: '감정 표현하기',
      description: '현재 느끼는 감정이나 상황에 대해 자유롭게 이야기하세요.',
      icon: <FiSmile className="h-6 w-6 text-white" />,
    },
    {
      title: '감정 기록하기',
      description: '하루를 마무리하며 오늘의 감정을 점수와 키워드로 기록하세요.',
      icon: <FiClock className="h-6 w-6 text-white" />,
    },
  ];

  return (
    <Layout>
      {/* 히어로 섹션 */}
      <section className="py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              당신의 마음을 돌보는<br />
              <span className="text-blue-600">AI 감정 친구</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              마음돌봄이와 함께 당신의 감정을 안전하게 표현하고, 이름 붙이고, 돌보세요. 
              판단 없이 당신의 모든 감정을 있는 그대로 받아들입니다.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/chat" 
                className="btn-primary flex items-center justify-center"
              >
                지금 시작하기
                <FiArrowRight className="ml-2" />
              </Link>
              <Link 
                href="/about" 
                className="btn-outline flex items-center justify-center"
              >
                더 알아보기
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            {/* 히어로 이미지 또는 일러스트 */}
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* 실제 배포 시 이미지 추가 */}
              <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center">
                <FiHeart className="w-32 h-32 text-pink-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            마음돌봄이의 특별한 기능
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 사용 방법 섹션 */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
            이렇게 사용하세요
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            마음돌봄이는 복잡한 설정 없이 간단하게 사용할 수 있습니다.
          </p>
          
          <div className="relative">
            {/* 단계 연결선 (데스크탑) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 -translate-x-1/2 z-0"></div>
            
            <div className="space-y-12 relative z-10">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-center`}
                >
                  <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center my-4 md:my-0">
                    {step.icon}
                  </div>
                  
                  <div className="md:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/chat" 
              className="btn-primary inline-flex items-center"
            >
              지금 바로 시작하기
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 추천사 섹션 */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            사용자들의 경험
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "매일 감정을 기록하며 내 마음의 패턴을 발견할 수 있었어요. 덕분에 나를 더 잘 이해하게 되었습니다.",
                author: "김지은",
                role: "직장인"
              },
              {
                quote: "말하기 어려운 감정들을 마음돌봄이에게 털어놓으면 항상 위로가 돼요. 판단 없이 들어주는 것이 너무 좋아요.",
                author: "이승우",
                role: "대학생"
              },
              {
                quote: "불안감이 심할 때마다 마음돌봄이와 대화하면서 마음을 차분하게 정리할 수 있었어요. 매일 사용하고 있습니다.",
                author: "박소연",
                role: "프리랜서"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiHeart 
                      key={i} 
                      className="text-pink-500 mr-1 w-4 h-4" 
                      fill="#ec4899"
                    />
                  ))}
                </div>
                <p className="italic text-gray-600 mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium text-gray-800">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            지금 바로 마음돌봄이와 대화를 시작하세요
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            언제 어디서나 마음돌봄이가 당신의 감정을 함께 들어드립니다.
            지금 로그인 없이도 무료로 시작할 수 있습니다.
          </p>
          <Link 
            href="/chat" 
            className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            무료로 시작하기
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
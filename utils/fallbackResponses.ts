/**
 * 오프라인 폴백 응답 시스템
 * API 연결이 불안정할 때 기본적인 응답을 제공합니다.
 */

// 기본 응답 메시지
const defaultResponses = [
  "안녕하세요. 현재 서버 연결이 원활하지 않아 기본 응답을 제공하고 있습니다. 조금 후에 다시 시도해주세요.",
  "오늘 어떤 기분이신가요? 지금 느끼시는 감정에 이름을 붙여보는 것은 어떨까요?",
  "감정을 표현하는 것은 중요한 자기 돌봄의 첫 걸음이에요. 오늘 하루는 어떠셨나요?",
  "마음속에 있는 생각을 글로 표현하면 정리가 될 때가 있어요. 어떤 생각이 떠오르시나요?",
  "때로는 아무 말도 하지 않고 그냥 함께 있는 것만으로도 위로가 될 수 있어요. 조용히 함께하겠습니다.",
  "감정은 파도처럼 오고 가는 것이 자연스러워요. 지금 느끼는 감정도 언젠가는 지나갈 거예요.",
  "오늘 하루 중 가장 기억에 남는 순간은 무엇인가요?",
  "작은 것에 감사하는 습관은 행복감을 높여준다고 해요. 오늘 감사한 일이 있으셨나요?",
];

// 위로의 메시지
const comfortResponses = [
  "힘든 시간을 보내고 계신 것 같아요. 그런 감정이 드는 것은 매우 자연스러운 일이에요.",
  "지금 느끼시는 감정이 무엇이든, 그것은 유효하고 중요한 신호예요. 스스로를 잘 돌봐주세요.",
  "때로는 그냥 쉬어가는 것도 필요해요. 자신에게 충분한 휴식을 허락해주세요.",
  "모든 감정은 파도처럼 오고 가는 것이에요. 이 순간의 어려움도 언젠가는 지나갈 거예요.",
  "누구나 힘든 시간을 겪기 마련이에요. 혼자가 아니라는 것을 기억해주세요.",
];

// 키워드 기반 응답
const keywordResponses: Record<string, string[]> = {
  "불안": [
    "불안한 마음이 드실 때는 깊게 숨을 들이마시고 천천히 내쉬는 것이 도움이 될 수 있어요.",
    "불안감이 느껴질 때는 지금 이 순간에 집중하는 것이 도움이 돼요. 주변의 다섯 가지를 보고, 네 가지를 만지고, 세 가지 소리를 듣고, 두 가지 냄새를 맡고, 한 가지 맛을 느껴보세요.",
    "불안은 미래에 대한 걱정에서 오는 경우가 많아요. 지금 이 순간에 집중해보는 건 어떨까요?"
  ],
  "슬픔": [
    "슬픔은 우리가 무언가를 소중히 여겼다는 증거예요. 그 감정을 있는 그대로 느껴보는 것도 괜찮아요.",
    "슬픈 감정이 들 때는 자신에게 더 많은 위로와 이해를 베풀어주세요.",
    "슬픔은 자연스러운 감정이에요. 억지로 참거나 무시하지 말고 충분히 느껴주세요."
  ],
  "화남": [
    "화가 날 때는 잠시 깊게 숨을 쉬고, 10까지 천천히 세어보는 것이 도움이 될 수 있어요.",
    "화나는 감정도 중요한 신호예요. 그 감정의 원인을 살펴보는 것이 도움이 될 수 있어요.",
    "화는 종종 우리의 경계나 가치가 침해받았을 때 생기는 자연스러운 반응이에요."
  ],
  "행복": [
    "행복한 순간을 충분히 음미하고 기억해두면, 어려운 시간을 지날 때 힘이 될 수 있어요.",
    "작은 행복에도 감사하는 마음을 갖는 것은 기쁨을 오래 간직하는 비결이에요.",
    "행복감을 느낄 때 그 순간을 온전히 즐기는 것이 중요해요."
  ],
  "감사": [
    "감사하는 마음은 긍정적인 에너지를 가져와요. 오늘 감사한 일을 적어보는 것은 어떨까요?",
    "작은 것에도 감사하는 습관은 우리의 관점을 변화시킬 수 있어요.",
    "감사함을 표현하는 것은 자신과 상대방 모두에게 기쁨을 줄 수 있어요."
  ]
};

/**
 * 입력 텍스트에 기반한 폴백 응답 생성
 * @param text 사용자 입력 텍스트
 * @param style 대화 스타일
 * @returns 적절한 폴백 응답
 */
export const generateFallbackResponse = (text: string, style: string = 'default'): string => {
  // 사용자 메시지에서 키워드 감지
  const lowerText = text.toLowerCase();
  
  // 감지된 키워드에 기반한 응답
  for (const [keyword, responses] of Object.entries(keywordResponses)) {
    if (lowerText.includes(keyword.toLowerCase())) {
      const randomIndex = Math.floor(Math.random() * responses.length);
      return responses[randomIndex];
    }
  }
  
  // 감정 상태 감지 (간단한 휴리스틱)
  const negativeWords = ['슬프', '우울', '불안', '걱정', '화나', '짜증', '힘들', '괴롭', '외롭'];
  const isNegativeEmotion = negativeWords.some(word => lowerText.includes(word));
  
  if (isNegativeEmotion) {
    const randomIndex = Math.floor(Math.random() * comfortResponses.length);
    return comfortResponses[randomIndex];
  }
  
  // 기본 응답
  const randomIndex = Math.floor(Math.random() * defaultResponses.length);
  return defaultResponses[randomIndex];
};

/**
 * 대화 스타일에 맞는 인사말 생성
 * @param style 대화 스타일
 * @returns 스타일에 맞는 인사말
 */
export const getStyleGreeting = (style: string = 'default'): string => {
  switch (style) {
    case 'cheerful':
      return "안녕하세요! 오늘 기분이 어떠세요? 함께 이야기 나눠볼까요? ✨";
    case 'calm':
      return "안녕하세요. 오늘은 어떤 마음으로 찾아오셨나요? 편안하게 이야기 나누어 보시겠어요?";
    case 'wise':
      return "반갑습니다. 오늘 마음의 날씨는 어떠신지요? 천천히 이야기 나누어 보면 좋겠습니다.";
    default:
      return "안녕하세요. 마음돌봄이가 함께합니다. 오늘은 어떤 이야기를 나누고 싶으신가요?";
  }
};
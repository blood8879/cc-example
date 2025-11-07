import { BudgetFilter, RegionFilter, EnvironmentFilter, SeasonFilter } from "@/types";

// 정렬 옵션
export const SORT_OPTIONS = [
  { value: "like_desc", label: "좋아요 많은 순" },
  { value: "like_asc", label: "좋아요 적은 순" },
  { value: "name_asc", label: "이름 가나다순" },
] as const;

// Phase 2: 새로운 필터 옵션
export const BUDGET_OPTIONS: { value: BudgetFilter; label: string }[] = [
  { value: "100만원 이하", label: "100만원 이하" },
  { value: "100~200만원", label: "100~200만원" },
  { value: "200만원 이상", label: "200만원 이상" },
];

export const REGION_OPTIONS: { value: RegionFilter; label: string }[] = [
  { value: "전체", label: "전체" },
  { value: "수도권", label: "수도권" },
  { value: "경상도", label: "경상도" },
  { value: "전라도", label: "전라도" },
  { value: "강원도", label: "강원도" },
  { value: "제주도", label: "제주도" },
  { value: "충청도", label: "충청도" },
];

export const ENVIRONMENT_OPTIONS: { value: EnvironmentFilter; label: string }[] = [
  { value: "자연친화", label: "자연친화" },
  { value: "도심선호", label: "도심선호" },
  { value: "카페작업", label: "카페작업" },
  { value: "코워킹 필수", label: "코워킹 필수" },
];

export const SEASON_OPTIONS: { value: SeasonFilter; label: string }[] = [
  { value: "봄", label: "봄 (3-5월)" },
  { value: "여름", label: "여름 (6-8월)" },
  { value: "가을", label: "가을 (9-11월)" },
  { value: "겨울", label: "겨울 (12-2월)" },
];

// 기존 필터 옵션 (Phase 4에서 제거 예정)
export const FILTER_OPTIONS = {
  internet: [
    { value: "100", label: "100Mbps 이상" },
    { value: "200", label: "200Mbps 이상" },
  ],
  cafe: [
    { value: "many", label: "많음 (50개+)" },
    { value: "24h", label: "24시간 카페" },
  ],
  housing: [
    { value: "coliving", label: "코리빙" },
    { value: "sharehouse", label: "셰어하우스" },
    { value: "studio", label: "원룸" },
  ],
  vibe: [
    { value: "hip", label: "힙한" },
    { value: "quiet", label: "조용한" },
    { value: "nature", label: "자연친화적" },
  ],
  transportation: [
    { value: "subway", label: "지하철 인근" },
    { value: "bus", label: "버스 많음" },
  ],
} as const;

// 날씨 아이콘 매핑
export const WEATHER_ICONS = {
  sunny: "☀️",
  cloudy: "🌤️",
  rainy: "🌧️",
  snowy: "❄️",
} as const;

// AQI 레벨 매핑
export const AQI_LEVELS = {
  good: { range: [0, 50], emoji: "😊", label: "좋음" },
  moderate: { range: [51, 100], emoji: "😐", label: "보통" },
  bad: { range: [101, 999], emoji: "😷", label: "나쁨" },
} as const;

// 진행바 색상 매핑 (퍼센트 기준)
export const PROGRESS_BAR_COLORS = [
  { max: 20, color: "bg-red-500" },
  { max: 40, color: "bg-orange-500" },
  { max: 60, color: "bg-yellow-500" },
  { max: 80, color: "bg-green-500" },
  { max: 100, color: "bg-blue-500" },
] as const;

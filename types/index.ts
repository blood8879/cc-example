// Phase 2: 새로운 필터 타입
export type BudgetFilter = "100만원 이하" | "100~200만원" | "200만원 이상";
export type RegionFilter = "전체" | "수도권" | "경상도" | "전라도" | "강원도" | "제주도" | "충청도";
export type EnvironmentFilter = "자연친화" | "도심선호" | "카페작업" | "코워킹 필수";
export type SeasonFilter = "봄" | "여름" | "가을" | "겨울";

// 도시 타입
export interface City {
  id: string;
  name: string; // "강남/역삼"
  region: string; // "강남구, 서울"
  slug: string; // "gangnam-yeoksam"
  imageUrl: string;
  description: string;
  rank: number;

  // Phase 2: 새로운 필터 필드
  budget: BudgetFilter;
  regionFilter: RegionFilter; // region과 구분하기 위해 regionFilter로 명명
  environment: EnvironmentFilter[];
  bestSeason: SeasonFilter[];

  // 메타데이터
  reviewCount: number;
  likeCount: number;
  dislikeCount: number;
  viewCount: number;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// 필터 타입
export interface CityFilters {
  search?: string;
  budget?: BudgetFilter;
  region?: RegionFilter;
  environment?: EnvironmentFilter[];
  season?: SeasonFilter[];
}

// 정렬 타입
export type SortOption = "like_desc" | "like_asc" | "name_asc";

// 추천 장소 타입
export interface Place {
  id: string;
  name: string;
  category: "cafe" | "accommodation" | "attraction";
  description: string;
  imageUrl: string;
  address: string;
  tags: string[];
}

// 리뷰 타입
export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  content: string;
  date: Date;
  likeCount: number;
}

// 상세 도시 정보 타입
export interface CityDetail extends City {
  fullDescription: string;
  images: string[]; // 갤러리 이미지들
  places: Place[]; // 추천 장소들
  reviews: Review[]; // 리뷰들
  transportation: string; // 교통 정보
  tips: string[]; // 여행 팁
}

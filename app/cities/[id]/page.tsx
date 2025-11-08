import { notFound } from "next/navigation";
import Link from "next/link";
import { mockCities } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Heart,
  ThumbsDown,
  Eye,
  MessageSquare,
  Coffee,
  Building2,
  TreePine,
  Briefcase,
  Sun,
  Cloud,
  Leaf,
  Snowflake,
} from "lucide-react";
import type { EnvironmentFilter, SeasonFilter } from "@/types";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CityDetailPage({ params }: PageProps) {
  const { id } = await params;
  const city = mockCities.find((c) => c.id === id);

  if (!city) {
    notFound();
  }

  // 환경 아이콘 매핑
  const getEnvironmentIcon = (env: EnvironmentFilter) => {
    switch (env) {
      case "자연친화":
        return <TreePine className="h-4 w-4" />;
      case "도심선호":
        return <Building2 className="h-4 w-4" />;
      case "카페작업":
        return <Coffee className="h-4 w-4" />;
      case "코워킹 필수":
        return <Briefcase className="h-4 w-4" />;
    }
  };

  // 계절 아이콘 매핑
  const getSeasonIcon = (season: SeasonFilter) => {
    switch (season) {
      case "봄":
        return <Leaf className="h-4 w-4" />;
      case "여름":
        return <Sun className="h-4 w-4" />;
      case "가을":
        return <Cloud className="h-4 w-4" />;
      case "겨울":
        return <Snowflake className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 뒤로 가기 버튼 */}
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            목록으로 돌아가기
          </Button>
        </Link>
      </div>

      {/* 메인 카드 */}
      <Card className="overflow-hidden">
        {/* 헤더 이미지 영역 */}
        <div className="relative h-64 w-full bg-gradient-to-br from-blue-500 to-purple-600">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div
              className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full font-bold text-white text-2xl ${
                city.rank <= 3
                  ? city.rank === 1
                    ? "bg-yellow-500"
                    : city.rank === 2
                    ? "bg-gray-400"
                    : "bg-orange-600"
                  : "bg-muted-foreground"
              }`}
            >
              #{city.rank}
            </div>
            <h1 className="text-4xl font-bold mb-2">🏙️ {city.name}</h1>
            <div className="flex items-center gap-2 text-lg opacity-90">
              <MapPin className="h-5 w-5" />
              <span>{city.region}</span>
            </div>
          </div>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="p-8">
          {/* 설명 */}
          <div className="mb-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {city.description}
            </p>
          </div>

          {/* 통계 */}
          <div className="mb-8 grid grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <Eye className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{city.viewCount.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">조회수</div>
            </Card>
            <Card className="p-4 text-center">
              <Heart className="h-5 w-5 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold">{city.likeCount}</div>
              <div className="text-xs text-muted-foreground">좋아요</div>
            </Card>
            <Card className="p-4 text-center">
              <ThumbsDown className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{city.dislikeCount}</div>
              <div className="text-xs text-muted-foreground">싫어요</div>
            </Card>
            <Card className="p-4 text-center">
              <MessageSquare className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{city.reviewCount}</div>
              <div className="text-xs text-muted-foreground">리뷰</div>
            </Card>
          </div>

          {/* 상세 정보 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">상세 정보</h2>

            {/* 예산 */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-muted-foreground">예산</div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  {city.budget}
                </Badge>
              </div>
            </div>

            {/* 지역 */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-muted-foreground">지역</div>
                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                  {city.regionFilter}
                </Badge>
              </div>
            </div>

            {/* 환경 */}
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100">
                <Coffee className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-2">환경</div>
                <div className="flex flex-wrap gap-2">
                  {city.environment.map((env) => (
                    <Badge
                      key={env}
                      variant="secondary"
                      className="bg-orange-100 text-orange-700 hover:bg-orange-100 flex items-center gap-1.5"
                    >
                      {getEnvironmentIcon(env)}
                      {env}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* 최고 계절 */}
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100">
                <Sun className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-2">최고의 계절</div>
                <div className="flex flex-wrap gap-2">
                  {city.bestSeason.map((season) => (
                    <Badge
                      key={season}
                      variant="secondary"
                      className="bg-purple-100 text-purple-700 hover:bg-purple-100 flex items-center gap-1.5"
                    >
                      {getSeasonIcon(season)}
                      {season}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="mt-8 pt-6 border-t flex gap-3">
            <Button className="flex-1 gap-2">
              <Heart className="h-4 w-4" />
              좋아요
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <MessageSquare className="h-4 w-4" />
              리뷰 작성
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

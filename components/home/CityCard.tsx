"use client";

import { useState } from "react";
import Link from "next/link";
import { City } from "@/types";
import { Card } from "@/components/ui/card";
import { Heart, ThumbsDown, DollarSign, MapPin, Coffee, Building2, TreePine, Briefcase, Sun, Cloud, Leaf, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { EnvironmentFilter, SeasonFilter } from "@/types";

interface CityCardProps {
  city: City;
}

export function CityCard({ city }: CityCardProps) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(city.likeCount);
  const [dislikeCount, setDislikeCount] = useState(city.dislikeCount);

  // 좋아요 버튼 클릭
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault(); // Link 네비게이션 방지
    e.stopPropagation(); // 이벤트 전파 방지
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
      if (disliked) {
        setDisliked(false);
        setDislikeCount((prev) => prev - 1);
      }
    }
  };

  // 싫어요 버튼 클릭
  const handleDislike = (e: React.MouseEvent) => {
    e.preventDefault(); // Link 네비게이션 방지
    e.stopPropagation(); // 이벤트 전파 방지
    if (disliked) {
      setDisliked(false);
      setDislikeCount((prev) => prev - 1);
    } else {
      setDisliked(true);
      setDislikeCount((prev) => prev + 1);
      if (liked) {
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      }
    }
  };

  // 환경 아이콘 매핑
  const getEnvironmentIcon = (env: EnvironmentFilter) => {
    switch (env) {
      case "자연친화":
        return <TreePine className="h-3 w-3" />;
      case "도심선호":
        return <Building2 className="h-3 w-3" />;
      case "카페작업":
        return <Coffee className="h-3 w-3" />;
      case "코워킹 필수":
        return <Briefcase className="h-3 w-3" />;
    }
  };

  // 계절 아이콘 매핑
  const getSeasonIcon = (season: SeasonFilter) => {
    switch (season) {
      case "봄":
        return <Leaf className="h-3 w-3" />;
      case "여름":
        return <Sun className="h-3 w-3" />;
      case "가을":
        return <Cloud className="h-3 w-3" />;
      case "겨울":
        return <Snowflake className="h-3 w-3" />;
    }
  };

  return (
    <Link href={`/cities/${city.slug}`} className="block">
      <Card className="group relative overflow-hidden transition-card hover:-translate-y-1 hover:shadow-card-hover cursor-pointer">
        {/* 대표 이미지 */}
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-10" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <h3 className="text-3xl font-bold text-white">🏙️ {city.name}</h3>
          </div>
        </div>

        <div className="p-5">
        {/* 상단 정보: 순위 배지와 설명 */}
        <div className="mb-4 flex items-start gap-3">
          {/* 순위 배지 */}
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-bold text-white ${
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
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{city.description}</p>
          </div>
        </div>

        {/* 필터 정보 */}
        <div className="space-y-3 border-t pt-4">
          {/* 예산 */}
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-muted-foreground">예산:</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
              {city.budget}
            </Badge>
          </div>

          {/* 지역 */}
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-muted-foreground">지역:</span>
            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
              {city.regionFilter}
            </Badge>
          </div>

          {/* 환경 */}
          <div className="flex items-start gap-2">
            <Coffee className="h-4 w-4 text-orange-600 mt-0.5" />
            <span className="text-sm font-medium text-muted-foreground">환경:</span>
            <div className="flex flex-wrap gap-1">
              {city.environment.map((env) => (
                <Badge
                  key={env}
                  variant="secondary"
                  className="bg-orange-100 text-orange-700 hover:bg-orange-100 flex items-center gap-1"
                >
                  {getEnvironmentIcon(env)}
                  {env}
                </Badge>
              ))}
            </div>
          </div>

          {/* 최고 계절 */}
          <div className="flex items-start gap-2">
            <Sun className="h-4 w-4 text-purple-600 mt-0.5" />
            <span className="text-sm font-medium text-muted-foreground">계절:</span>
            <div className="flex flex-wrap gap-1">
              {city.bestSeason.map((season) => (
                <Badge
                  key={season}
                  variant="secondary"
                  className="bg-purple-100 text-purple-700 hover:bg-purple-100 flex items-center gap-1"
                >
                  {getSeasonIcon(season)}
                  {season}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* 좋아요/싫어요 버튼 */}
        <div className="mt-4 flex gap-2 border-t pt-4">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-2 ${liked ? "text-red-500" : ""}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-red-500" : ""}`} />
            <span className="text-sm font-medium">{likeCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-2 ${disliked ? "text-gray-500" : ""}`}
            onClick={handleDislike}
          >
            <ThumbsDown className={`h-4 w-4 ${disliked ? "fill-gray-500" : ""}`} />
            <span className="text-sm font-medium">{dislikeCount}</span>
          </Button>
        </div>
        </div>
      </Card>
    </Link>
  );
}

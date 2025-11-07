"use client";

import { City } from "@/types";
import { CityCard } from "./CityCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface CityGridProps {
  cities: City[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export function CityGrid({ cities, isLoading, hasMore, onLoadMore }: CityGridProps) {
  if (cities.length === 0 && !isLoading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/20 p-12">
        <div className="text-center">
          <div className="mb-4 text-6xl">🔍</div>
          <h3 className="mb-2 text-xl font-semibold">검색 결과가 없습니다</h3>
          <p className="text-muted-foreground">다른 필터를 선택해보세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 그리드 */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>

      {/* 로딩 상태 */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* 더 보기 버튼 */}
      {!isLoading && hasMore && (
        <div className="flex justify-center py-8">
          <Button onClick={onLoadMore} size="lg" variant="outline">
            더 많은 도시 보기
          </Button>
        </div>
      )}
    </div>
  );
}

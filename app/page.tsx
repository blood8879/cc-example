"use client";

import { useState, useMemo } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { FilterSidebar } from "@/components/home/FilterSidebar";
import { SortOptions } from "@/components/home/SortOptions";
import { CityGrid } from "@/components/home/CityGrid";
import { Container } from "@/components/layout/Container";
import { mockCities } from "@/lib/mock-data";
import { CityFilters, SortOption } from "@/types";

export default function Home() {
  const [filters, setFilters] = useState<CityFilters>({
    search: "",
    budget: undefined,
    region: "전체",
    environment: [],
    season: [],
  });

  const [sortOption, setSortOption] = useState<SortOption>("like_desc");
  const [displayCount, setDisplayCount] = useState(6);

  // 필터링 로직
  const filteredCities = useMemo(() => {
    let result = [...mockCities];

    // 검색 (도시명, 지역)
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (city) =>
          city.name.toLowerCase().includes(search) ||
          city.region.toLowerCase().includes(search)
      );
    }

    // 예산 필터
    if (filters.budget) {
      result = result.filter((city) => city.budget === filters.budget);
    }

    // 지역 필터 ("전체"가 아닐 때만 필터링)
    if (filters.region && filters.region !== "전체") {
      result = result.filter((city) => city.regionFilter === filters.region);
    }

    // 환경 필터 (OR 조건: 선택된 옵션 중 하나라도 포함)
    if (filters.environment && filters.environment.length > 0) {
      result = result.filter((city) =>
        filters.environment!.some((env) => city.environment.includes(env))
      );
    }

    // 최고 계절 필터 (OR 조건: 선택된 옵션 중 하나라도 포함)
    if (filters.season && filters.season.length > 0) {
      result = result.filter((city) =>
        filters.season!.some((season) => city.bestSeason.includes(season))
      );
    }

    return result;
  }, [filters]);

  // 정렬 로직
  const sortedCities = useMemo(() => {
    const result = [...filteredCities];

    switch (sortOption) {
      case "like_desc":
        result.sort((a, b) => b.likeCount - a.likeCount);
        break;
      case "like_asc":
        result.sort((a, b) => a.likeCount - b.likeCount);
        break;
      case "name_asc":
        result.sort((a, b) => a.name.localeCompare(b.name, "ko"));
        break;
    }

    return result;
  }, [filteredCities, sortOption]);

  // 표시할 도시들
  const displayedCities = sortedCities.slice(0, displayCount);
  const hasMore = displayCount < sortedCities.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 6);
  };

  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <HeroSection />

      {/* 메인 콘텐츠 */}
      <section className="py-12">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* 필터 사이드바 - Desktop */}
            <aside className="hidden w-full lg:block lg:w-64 lg:flex-shrink-0">
              <div className="sticky top-24">
                <FilterSidebar filters={filters} onFiltersChange={setFilters} />
              </div>
            </aside>

            {/* 메인 콘텐츠 영역 */}
            <main className="flex-1">
              {/* 헤더: 결과 개수 & 정렬 */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">도시 리스트</h2>
                  <p className="text-sm text-muted-foreground">
                    총 {sortedCities.length}개의 도시
                  </p>
                </div>
                <SortOptions currentSort={sortOption} onSortChange={setSortOption} />
              </div>

              {/* 필터 사이드바 - Mobile */}
              <div className="mb-6 lg:hidden">
                <details className="rounded-lg border bg-card">
                  <summary className="cursor-pointer p-4 font-semibold">
                    필터 & 검색
                  </summary>
                  <div className="border-t p-4">
                    <FilterSidebar
                      filters={filters}
                      onFiltersChange={setFilters}
                    />
                  </div>
                </details>
              </div>

              {/* 도시 그리드 */}
              <CityGrid
                cities={displayedCities}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
              />
            </main>
          </div>
        </Container>
      </section>
    </div>
  );
}

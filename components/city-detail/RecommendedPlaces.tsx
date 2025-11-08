"use client";

import { useState } from "react";
import { Place } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coffee, Home, MapPin as MapPinIcon } from "lucide-react";

interface RecommendedPlacesProps {
  places: Place[];
}

type Category = "all" | "cafe" | "accommodation" | "attraction";

const categoryLabels: Record<Category, string> = {
  all: "전체",
  cafe: "카페",
  accommodation: "숙소",
  attraction: "관광지",
};

const categoryIcons: Record<Exclude<Category, "all">, React.ReactNode> = {
  cafe: <Coffee className="h-4 w-4" />,
  accommodation: <Home className="h-4 w-4" />,
  attraction: <MapPinIcon className="h-4 w-4" />,
};

export function RecommendedPlaces({ places }: RecommendedPlacesProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  const filteredPlaces =
    selectedCategory === "all"
      ? places
      : places.filter((place) => place.category === selectedCategory);

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">추천 장소</h2>

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(categoryLabels) as Category[]).map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="gap-2"
          >
            {category !== "all" && categoryIcons[category as Exclude<Category, "all">]}
            {categoryLabels[category]}
          </Button>
        ))}
      </div>

      {/* 장소 그리드 */}
      {filteredPlaces.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          해당 카테고리의 장소가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* 이미지 placeholder */}
              <div className="h-48 bg-muted flex items-center justify-center">
                <span className="text-6xl">
                  {place.category === "cafe" && "☕"}
                  {place.category === "accommodation" && "🏠"}
                  {place.category === "attraction" && "🗺️"}
                </span>
              </div>

              <div className="p-5">
                {/* 카테고리 배지 */}
                <Badge variant="secondary" className="mb-3">
                  {categoryLabels[place.category]}
                </Badge>

                {/* 장소명 */}
                <h3 className="text-xl font-bold mb-2">{place.name}</h3>

                {/* 설명 */}
                <p className="text-sm text-muted-foreground mb-3">
                  {place.description}
                </p>

                {/* 주소 */}
                <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                  <MapPinIcon className="h-3 w-3" />
                  {place.address}
                </p>

                {/* 태그 */}
                <div className="flex flex-wrap gap-1">
                  {place.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

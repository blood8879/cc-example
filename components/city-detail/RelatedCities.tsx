import { City } from "@/types";
import { CityCard } from "@/components/home/CityCard";
import { mockCities } from "@/lib/mock-data";

interface RelatedCitiesProps {
  currentCityId: string;
  regionFilter?: string;
  budget?: string;
}

export function RelatedCities({
  currentCityId,
  regionFilter,
  budget,
}: RelatedCitiesProps) {
  // 유사한 도시 추천 로직
  const getRelatedCities = (): City[] => {
    return mockCities
      .filter((city) => city.id !== currentCityId) // 현재 도시 제외
      .filter((city) => {
        // 같은 지역이거나 같은 예산대의 도시 우선
        const sameRegion = regionFilter && city.regionFilter === regionFilter;
        const sameBudget = budget && city.budget === budget;
        return sameRegion || sameBudget;
      })
      .slice(0, 3); // 최대 3개
  };

  const relatedCities = getRelatedCities();

  if (relatedCities.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">비슷한 도시</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedCities.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>
    </section>
  );
}

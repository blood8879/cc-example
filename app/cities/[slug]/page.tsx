import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCityDetailBySlug, getAllCitySlugs } from "@/lib/mock-data";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "@/components/city-detail/ImageGallery";
import { RecommendedPlaces } from "@/components/city-detail/RecommendedPlaces";
import { ReviewSection } from "@/components/city-detail/ReviewSection";
import { RelatedCities } from "@/components/city-detail/RelatedCities";

// 정적 경로 생성
export async function generateStaticParams() {
  const slugs = getAllCitySlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityDetailBySlug(slug);

  if (!city) {
    return {
      title: "도시를 찾을 수 없습니다",
    };
  }

  return {
    title: `${city.name} - 워케이션 도시 가이드`,
    description: city.fullDescription,
    openGraph: {
      title: `${city.name} - 워케이션 도시 가이드`,
      description: city.fullDescription,
      images: [city.imageUrl],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${city.name} - 워케이션 도시 가이드`,
      description: city.fullDescription,
      images: [city.imageUrl],
    },
  };
}

export default async function CityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCityDetailBySlug(slug);

  if (!city) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <div className="relative h-[400px] w-full overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">🏙️ {city.name}</h1>
            <p className="text-xl text-gray-200">{city.region}</p>
          </div>
        </div>
      </div>

      <Container>
        {/* 뒤로가기 버튼 */}
        <div className="py-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              목록으로 돌아가기
            </Button>
          </Link>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="pb-16">
          {/* 도시 설명 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">도시 소개</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {city.fullDescription}
            </p>
          </section>

          {/* 기본 정보 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">기본 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2 text-muted-foreground">예산</h3>
                <p className="text-xl font-bold">{city.budget}</p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2 text-muted-foreground">지역</h3>
                <p className="text-xl font-bold">{city.regionFilter}</p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2 text-muted-foreground">환경</h3>
                <p className="text-xl font-bold">{city.environment.join(", ")}</p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2 text-muted-foreground">
                  최고 계절
                </h3>
                <p className="text-xl font-bold">{city.bestSeason.join(", ")}</p>
              </div>
            </div>
          </section>

          {/* 교통 정보 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">교통 정보</h2>
            <div className="p-6 rounded-lg border bg-card">
              <p className="text-lg">{city.transportation}</p>
            </div>
          </section>

          {/* 여행 팁 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">여행 팁</h2>
            <ul className="space-y-3">
              {city.tips.map((tip, index) => (
                <li
                  key={index}
                  className="p-4 rounded-lg border bg-card flex items-start gap-3"
                >
                  <span className="text-xl">💡</span>
                  <span className="text-lg">{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 이미지 갤러리 */}
          <ImageGallery images={city.images} cityName={city.name} />

          {/* 추천 장소 */}
          <RecommendedPlaces places={city.places} />

          {/* 리뷰 섹션 */}
          <ReviewSection reviews={city.reviews} />

          {/* 관련 도시 추천 */}
          <RelatedCities
            currentCityId={city.id}
            regionFilter={city.regionFilter}
            budget={city.budget}
          />

          {/* 통계 정보 */}
          <section>
            <h2 className="text-3xl font-bold mb-6">통계</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-lg border bg-card text-center">
                <p className="text-3xl font-bold text-red-500 mb-2">
                  {city.likeCount}
                </p>
                <p className="text-muted-foreground">좋아요</p>
              </div>
              <div className="p-6 rounded-lg border bg-card text-center">
                <p className="text-3xl font-bold text-blue-500 mb-2">
                  {city.reviewCount}
                </p>
                <p className="text-muted-foreground">리뷰</p>
              </div>
              <div className="p-6 rounded-lg border bg-card text-center">
                <p className="text-3xl font-bold text-green-500 mb-2">
                  {city.viewCount.toLocaleString()}
                </p>
                <p className="text-muted-foreground">조회수</p>
              </div>
              <div className="p-6 rounded-lg border bg-card text-center">
                <p className="text-3xl font-bold text-yellow-500 mb-2">
                  #{city.rank}
                </p>
                <p className="text-muted-foreground">순위</p>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}

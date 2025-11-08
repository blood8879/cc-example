"use client";

import { useState } from "react";
import { Review } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp } from "lucide-react";

interface ReviewSectionProps {
  reviews: Review[];
}

type SortOption = "latest" | "rating" | "likes";

export function ReviewSection({ reviews }: ReviewSectionProps) {
  const [sortBy, setSortBy] = useState<SortOption>("latest");

  // 평균 평점 계산
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  // 평점별 개수 계산
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100,
  }));

  // 정렬된 리뷰
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return b.date.getTime() - a.date.getTime();
      case "rating":
        return b.rating - a.rating;
      case "likes":
        return b.likeCount - a.likeCount;
      default:
        return 0;
    }
  });

  // 별점 렌더링
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">리뷰</h2>

      {/* 평점 통계 */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 평균 평점 */}
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center mb-2">
              {renderStars(Math.round(averageRating))}
            </div>
            <p className="text-muted-foreground">총 {reviews.length}개의 리뷰</p>
          </div>

          {/* 평점 분포 */}
          <div className="space-y-2">
            {ratingCounts.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{rating}</span>
                </div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 정렬 옵션 */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={sortBy === "latest" ? "default" : "outline"}
          size="sm"
          onClick={() => setSortBy("latest")}
        >
          최신순
        </Button>
        <Button
          variant={sortBy === "rating" ? "default" : "outline"}
          size="sm"
          onClick={() => setSortBy("rating")}
        >
          평점순
        </Button>
        <Button
          variant={sortBy === "likes" ? "default" : "outline"}
          size="sm"
          onClick={() => setSortBy("likes")}
        >
          좋아요순
        </Button>
      </div>

      {/* 리뷰 목록 */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <Card key={review.id} className="p-6">
            {/* 리뷰 헤더 */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold">{review.author}</h3>
                  {renderStars(review.rating)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {review.date.toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* 리뷰 내용 */}
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {review.content}
            </p>

            {/* 좋아요 버튼 */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-sm">{review.likeCount}</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

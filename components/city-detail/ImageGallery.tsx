"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  images: string[];
  cityName: string;
}

export function ImageGallery({ images, cityName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  // 키보드 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      goToPrevious();
    } else if (e.key === "ArrowRight") {
      goToNext();
    }
  };

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">갤러리</h2>

      {/* 썸네일 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="relative aspect-square overflow-hidden rounded-lg bg-muted hover:opacity-80 transition-opacity cursor-pointer group"
          >
            {/* 이미지 placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl">📷</span>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {index + 1}/{images.length}
            </div>
          </button>
        ))}
      </div>

      {/* 라이트박스 모달 */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* 닫기 버튼 */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={closeLightbox}
            aria-label="닫기"
          >
            <X className="h-6 w-6" />
          </Button>

          {/* 이전 버튼 */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="이전 이미지"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          {/* 이미지 */}
          <div
            className="max-w-5xl max-h-[80vh] flex items-center justify-center p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-muted rounded-lg overflow-hidden">
              {/* 이미지 placeholder */}
              <div className="w-[800px] h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <span className="text-9xl mb-4 block">📷</span>
                  <p className="text-2xl font-bold mb-2">{cityName}</p>
                  <p className="text-muted-foreground">
                    이미지 {selectedIndex + 1} / {images.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 다음 버튼 */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="다음 이미지"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* 이미지 카운터 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
}

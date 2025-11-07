"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "../layout/Container";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 이메일 제출 로직 (실제 구현 없음)
    console.log("Email submitted:", email);
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 md:py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          {/* 메인 헤드라인 */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            🌍 당신에게 맞는
            <br />
            <span className="text-primary">노마드 도시</span>를 찾으세요
          </h1>

          {/* 서브 헤드라인 */}
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            전국 <span className="font-semibold text-foreground">50개 도시</span> |{" "}
            실시간 업데이트 |{" "}
            <span className="font-semibold text-foreground">5,000+ 리뷰</span>
          </p>

          {/* 이메일 가입 폼 */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto mb-4 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              placeholder="📧 이메일을 입력하세요..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12"
              required
            />
            <Button type="submit" size="lg" className="h-12 sm:w-auto">
              무료로 시작하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="text-sm text-muted-foreground">
            이미 계정이 있으신가요? 자동으로 로그인됩니다
          </p>

          {/* 신뢰도 배지 (선택사항) */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-50">
            <span className="text-sm text-muted-foreground">Featured in:</span>
            <span className="text-sm font-medium">The New York Times</span>
            <span className="text-sm font-medium">BBC</span>
            <span className="text-sm font-medium">Forbes</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

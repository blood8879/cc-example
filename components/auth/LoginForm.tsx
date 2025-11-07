"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm({
  action,
  message,
}: {
  action: (formData: FormData) => Promise<void>;
  message?: string;
}) {
  return (
    <form action={action} className="space-y-4">
      {/* 에러/성공 메시지 */}
      {message && (
        <div className="rounded-md bg-muted p-3 text-sm text-foreground">
          {message}
        </div>
      )}

      {/* 이메일 */}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          이메일
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="example@email.com"
          required
        />
      </div>

      {/* 비밀번호 */}
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium">
          비밀번호
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="8자 이상 입력하세요"
          required
        />
      </div>

      {/* 비밀번호 찾기 */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="rounded" />
          로그인 상태 유지
        </label>
        <Link
          href="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          비밀번호 찾기
        </Link>
      </div>

      {/* 로그인 버튼 */}
      <Button type="submit" className="w-full" size="lg">
        로그인
      </Button>
    </form>
  );
}

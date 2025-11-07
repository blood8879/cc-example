import Link from "next/link";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* 로고 */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="text-3xl">🏠</span>
          <span className="text-2xl font-bold text-primary">한국노마드</span>
        </Link>

        {/* 카드 */}
        <div className="rounded-lg border bg-card p-8 shadow-lg">
          {/* 헤더 */}
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-2xl font-bold">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>

          {/* 폼 */}
          {children}
        </div>
      </div>
    </div>
  );
}

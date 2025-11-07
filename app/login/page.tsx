import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;
  const message = params.message ? decodeURIComponent(params.message) : undefined;

  return (
    <AuthLayout
      title="로그인"
      subtitle="한국노마드에 오신 것을 환영합니다"
    >
      <LoginForm action={login} message={message} />

      {/* 회원가입 링크 */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        계정이 없으신가요?{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          회원가입
        </Link>
      </p>
    </AuthLayout>
  );
}

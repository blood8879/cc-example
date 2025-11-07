import Link from "next/link";
import { signup } from "../login/actions";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;
  const message = params.message ? decodeURIComponent(params.message) : undefined;

  return (
    <AuthLayout
      title="회원가입"
      subtitle="한국노마드 커뮤니티에 참여하세요"
    >
      <RegisterForm action={signup} message={message} />

      {/* 로그인 링크 */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          로그인
        </Link>
      </p>
    </AuthLayout>
  );
}

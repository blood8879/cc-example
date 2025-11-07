import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "./Container";
import { createClient } from "@/utils/supabase/server";
import { signout } from "@/app/login/actions";

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <span className="text-xl font-bold text-primary">한국노마드</span>
          </Link>

          {/* 우측 인증 버튼 */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                <form action={signout}>
                  <Button variant="outline" size="sm" type="submit">
                    <LogOut className="h-4 w-4 mr-2" />
                    로그아웃
                  </Button>
                </form>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="default">
                  <User className="h-4 w-4 mr-2" />
                  로그인/가입
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}

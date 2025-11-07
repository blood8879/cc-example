import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-muted/30 py-12">
      <Container>
        {/* 링크 섹션 */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 mb-12">
          {/* 회사 소개 */}
          <div>
            <h4 className="font-semibold mb-4">회사 소개</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  소개
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-primary transition-colors">
                  팀
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary transition-colors">
                  채용
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  블로그
                </Link>
              </li>
            </ul>
          </div>

          {/* 도시 */}
          <div>
            <h4 className="font-semibold mb-4">도시</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/cities/seoul" className="hover:text-primary transition-colors">
                  서울
                </Link>
              </li>
              <li>
                <Link href="/cities/busan" className="hover:text-primary transition-colors">
                  부산
                </Link>
              </li>
              <li>
                <Link href="/cities/jeju" className="hover:text-primary transition-colors">
                  제주
                </Link>
              </li>
              <li>
                <Link href="/cities" className="hover:text-primary transition-colors">
                  전국 50개
                </Link>
              </li>
            </ul>
          </div>

          {/* 커뮤니티 */}
          <div>
            <h4 className="font-semibold mb-4">커뮤니티</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/meetups" className="hover:text-primary transition-colors">
                  밋업
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-primary transition-colors">
                  채팅
                </Link>
              </li>
              <li>
                <Link href="/qna" className="hover:text-primary transition-colors">
                  질문/답변
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  블로그
                </Link>
              </li>
            </ul>
          </div>

          {/* 고객지원 */}
          <div>
            <h4 className="font-semibold mb-4">고객지원</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  문의하기
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  개인정보처리
                </Link>
              </li>
            </ul>
          </div>

          {/* SNS */}
          <div>
            <h4 className="font-semibold mb-4">SNS</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  인스타그램
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  트위터
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  유튜브
                </a>
              </li>
              <li>
                <a
                  href="https://open.kakao.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  카카오톡
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            🏠 한국노마드 © {currentYear} | 대한민국 최고의 디지털 노마드 커뮤니티 | Since 2025
          </p>
        </div>
      </Container>
    </footer>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Check } from "lucide-react";

export function RegisterForm({
  action,
  message,
}: {
  action: (formData: FormData) => Promise<void>;
  message?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreePrivacy: false,
  });

  const passwordRequirements = [
    { text: "8자 이상", met: formData.password.length >= 8 },
    { text: "영문 포함", met: /[a-zA-Z]/.test(formData.password) },
    { text: "숫자 포함", met: /[0-9]/.test(formData.password) },
  ];

  const isPasswordValid = passwordRequirements.every((req) => req.met);
  const isFormValid =
    formData.name &&
    formData.email &&
    isPasswordValid &&
    formData.password === formData.confirmPassword &&
    formData.agreeTerms &&
    formData.agreePrivacy;

  return (
    <form action={action} className="space-y-4">
      {/* 에러/성공 메시지 */}
      {message && (
        <div className="rounded-md bg-muted p-3 text-sm text-foreground">
          {message}
        </div>
      )}

      {/* 이름 */}
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          이름 <span className="text-destructive">*</span>
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="홍길동"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      {/* 이메일 */}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          이메일 <span className="text-destructive">*</span>
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="example@email.com"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />
      </div>

      {/* 비밀번호 */}
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium">
          비밀번호 <span className="text-destructive">*</span>
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="8자 이상, 영문/숫자 포함"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* 비밀번호 요구사항 */}
        {formData.password && (
          <div className="mt-2 space-y-1">
            {passwordRequirements.map((req, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 text-xs ${
                  req.met ? "text-green-600" : "text-muted-foreground"
                }`}
              >
                <Check className={`h-3 w-3 ${req.met ? "" : "opacity-30"}`} />
                {req.text}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 비밀번호 확인 */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-medium"
        >
          비밀번호 확인 <span className="text-destructive">*</span>
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="비밀번호를 다시 입력하세요"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {formData.confirmPassword && (
          <p
            className={`mt-1 text-xs ${
              formData.password === formData.confirmPassword
                ? "text-green-600"
                : "text-destructive"
            }`}
          >
            {formData.password === formData.confirmPassword
              ? "비밀번호가 일치합니다"
              : "비밀번호가 일치하지 않습니다"}
          </p>
        )}
      </div>

      {/* 약관 동의 */}
      <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={(e) =>
              setFormData({ ...formData, agreeTerms: e.target.checked })
            }
            className="mt-0.5 rounded"
          />
          <span>
            <span className="text-destructive">*</span> 이용약관에 동의합니다
          </span>
        </label>

        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            name="agreePrivacy"
            checked={formData.agreePrivacy}
            onChange={(e) =>
              setFormData({ ...formData, agreePrivacy: e.target.checked })
            }
            className="mt-0.5 rounded"
          />
          <span>
            <span className="text-destructive">*</span> 개인정보처리방침에
            동의합니다
          </span>
        </label>
      </div>

      {/* 회원가입 버튼 */}
      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={!isFormValid}
      >
        회원가입
      </Button>
    </form>
  );
}

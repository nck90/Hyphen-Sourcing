"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";

export default function SignupPage() {
    const [userType, setUserType] = useState<"participant" | "client">("participant");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { mutate } = useAuth();
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");
        const name = formData.get("name");
        const phone = formData.get("phone");

        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, name, phone, role: userType }),
            });

            const data = await res.json();

            if (res.ok) {
                await mutate();
                router.push("/verify");
            } else {
                setError(data.error || "회원가입에 실패했습니다.");
            }
        } catch (err) {
            setError("네트워크 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center py-[60px] px-4">
            <Link href="/" className="fixed top-8 left-8 flex items-center gap-2 text-[14px] font-bold text-[#666666] hover:text-[#222222] transition-colors">
                <ArrowLeft className="w-4 h-4" /> 홈으로 이동
            </Link>

            <div className="w-full max-w-[480px] bg-white border border-[#E5E5E5] p-10 animate-fade-in">
                <div className="text-center mb-10">
                    <h1 className="text-[28px] font-black text-[#222222] mb-2 tracking-tighter">
                        회원가입
                    </h1>
                    <p className="text-[14px] text-[#999999] font-medium tracking-tight">하이픈소싱과 함께 MVP를 완성하세요.</p>
                </div>

                <form className="space-y-6" onSubmit={handleSignup}>
                    {/* User Type Switch (Functional Mock UI) */}
                    <div>
                        <label className="block text-[14px] font-bold text-[#222222] mb-3">가입 유형</label>
                        <div className="flex border border-[#E5E5E5] rounded-sm overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setUserType("participant")}
                                className={`flex-1 py-3 text-[14px] font-bold transition-colors ${userType === "participant"
                                    ? "bg-white text-[#FF5000] border-2 border-[#FF5000] z-10"
                                    : "bg-[#F8F9FA] text-[#999999] border-y border-transparent hover:bg-white"
                                    }`}
                            >
                                참가자 (디자이너/개발자)
                            </button>
                            <button
                                type="button"
                                onClick={() => setUserType("client")}
                                className={`flex-1 py-3 text-[14px] font-bold transition-colors ${userType === "client"
                                    ? "bg-white text-[#FF5000] border-2 border-[#FF5000] z-10 -ml-[1px]"
                                    : "bg-[#F8F9FA] text-[#999999] border-y border-transparent hover:bg-white -ml-[1px]"
                                    }`}
                            >
                                의뢰자 (창업자/기업)
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[14px] font-bold text-[#222222] mb-2">이메일 주소</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="사용하실 이메일을 입력해주세요."
                            className="input-loud focus:border-[#FF5000]"
                        />
                    </div>

                    <div>
                        <label className="block text-[14px] font-bold text-[#222222] mb-2">비밀번호</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="영문, 숫자, 특수문자 조합 8자 이상"
                            className="input-loud focus:border-[#FF5000]"
                        />
                    </div>

                    <div>
                        <label className="block text-[14px] font-bold text-[#222222] mb-2">비밀번호 확인</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            placeholder="비밀번호를 다시 한 번 입력해주세요."
                            className="input-loud focus:border-[#FF5000]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[14px] font-bold text-[#222222] mb-2">이름 (실명)</label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="홍길동"
                                className="input-loud focus:border-[#FF5000]"
                            />
                        </div>
                        <div>
                            <label className="block text-[14px] font-bold text-[#222222] mb-2">전화번호</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                placeholder="010-0000-0000"
                                className="input-loud focus:border-[#FF5000]"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-[13px] font-bold text-center mt-2">{error}</p>}

                    <div className="pt-4 pb-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" required className="mt-1 w-[16px] h-[16px] border-[#E5E5E5] text-[#FF5000] focus:ring-0" />
                            <span className="text-[13px] text-[#666666] leading-tight flex-1">
                                [필수] 하이픈소싱 서비스 이용약관, 개인정보 수집 및 이용 동의
                            </span>
                        </label>
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full btn-primary text-[16px] h-[52px] disabled:opacity-50">
                        {isLoading ? "처리 중..." : "가입 완료하기"}
                    </button>
                </form>

                <div className="mt-8 text-center pt-6 border-t border-[#E5E5E5]">
                    <p className="text-[13px] text-[#666666] inline-flex items-center gap-2">
                        이미 아이디가 있으신가요?
                        <Link href="/login" className="text-[#222222] font-bold hover:text-[#FF5000] underline-offset-4 hover:underline">
                            로그인하기
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

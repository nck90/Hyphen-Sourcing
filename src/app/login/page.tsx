"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { mutate } = useAuth();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                await mutate();
                router.push("/");
            } else {
                setError(data.error || "로그인에 실패했습니다.");
            }
        } catch (err) {
            setError("네트워크 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = () => {
        alert("입력하신 이메일로 비밀번호 재설정 링크를 발송했습니다.");
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-4">
            <Link href="/" className="fixed top-8 left-8 flex items-center gap-2 text-[14px] font-bold text-[#666666] hover:text-[#222222] transition-colors">
                <ArrowLeft className="w-4 h-4" /> 홈으로 이동
            </Link>

            <div className="w-full max-w-[400px] bg-white border border-[#E5E5E5] p-10 animate-fade-in text-center">
                <h1 className="text-[28px] font-black text-[#222222] mb-2 tracking-tighter">
                    하이픈<span className="text-[#FF5000]">소싱</span>
                </h1>
                <p className="text-[14px] text-[#999999] mb-8 font-medium tracking-tight">서비스 이용을 위해 로그인해주세요.</p>

                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-[14px] font-bold text-[#222222] mb-2">이메일 주소</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="user@example.com"
                            className="input-loud focus:border-[#FF5000]"
                        />
                    </div>

                    <div>
                        <label className="block text-[14px] font-bold text-[#222222] mb-2">비밀번호</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="비밀번호 입력"
                            className="input-loud focus:border-[#FF5000]"
                        />
                    </div>

                    {error && <p className="text-red-500 text-[13px] font-bold text-center mt-2">{error}</p>}

                    <div className="flex justify-between items-center text-[13px] mt-2 mb-6">
                        <label className="flex items-center gap-2 cursor-pointer text-[#666666]">
                            <input type="checkbox" className="w-[14px] h-[14px] border-[#E5E5E5] text-[#FF5000] focus:ring-0" />
                            로그인 유지
                        </label>
                        <button
                            type="button"
                            onClick={handleResetPassword}
                            className="text-[#999999] hover:text-[#222222] hover:underline underline-offset-2"
                        >
                            비밀번호 찾기
                        </button>
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full btn-primary text-[16px] h-[52px] mt-2 disabled:opacity-50">
                        {isLoading ? "로그인 중..." : "로그인"}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-[#E5E5E5]">
                    <p className="text-[13px] text-[#666666] inline-flex items-center gap-2">
                        아직 회원이 아니신가요?
                        <Link href="/signup" className="text-[#222222] font-bold hover:text-[#FF5000] underline-offset-4 hover:underline">
                            회원가입하기
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

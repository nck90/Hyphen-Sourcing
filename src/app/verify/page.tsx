"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { Mail, RefreshCw, CheckCircle2 } from "lucide-react";

export default function VerifyPage() {
    const { user, isAuthenticated, isLoading, mutate } = useAuth();
    const router = useRouter();
    const [code, setCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    if (isLoading) return <div className="min-h-screen pt-40 px-4 text-center">로딩 중...</div>;
    if (!isAuthenticated) return <div className="min-h-screen pt-40 px-4 text-center">로그인이 필요합니다.</div>;

    if (user?.verified) {
        setTimeout(() => router.push("/"), 2000);
        return (
            <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center px-4">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                <h2 className="text-[20px] font-bold text-[#222222]">이미 인증된 계정입니다.</h2>
                <p className="text-[#666666] mt-2">메인화면으로 이동합니다.</p>
            </div>
        );
    }

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMsg("");
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/auth/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code })
            });
            const data = await res.json();

            if (res.ok) {
                await mutate();
                setSuccessMsg("이메일 인증이 완료되었습니다!");
                setTimeout(() => router.push("/onboarding"), 1500);
            } else {
                setError(data.error || "인증에 실패했습니다.");
            }
        } catch (err) {
            setError("네트워크 오류가 발생했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResend = async () => {
        setIsResending(true);
        setError("");
        setSuccessMsg("");

        try {
            const res = await fetch("/api/auth/resend", { method: "POST" });
            const data = await res.json();

            if (res.ok) {
                setSuccessMsg("새로운 인증 코드가 이메일로 발송되었습니다.");
            } else {
                setError(data.error || "발송에 실패했습니다.");
            }
        } catch (err) {
            setError("네트워크 서류가 발생했습니다.");
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center pt-[100px] px-4">
            <div className="w-full max-w-[480px] bg-white border border-[#E5E5E5] p-10 animate-fade-in shadow-sm">
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mb-4 border border-[#E5E5E5]">
                        <Mail className="w-8 h-8 text-[#FF5000]" />
                    </div>
                    <h1 className="text-[24px] font-black text-[#222222] tracking-tighter mb-2">이메일 인증</h1>
                    <p className="text-[14px] text-[#666666] leading-relaxed">
                        <strong className="text-[#333333]">{user?.email}</strong>(으)로<br />
                        6자리 인증 코드를 발송했습니다.
                    </p>
                </div>

                <form onSubmit={handleVerify} className="space-y-6">
                    <div>
                        <label className="block text-[13px] font-bold text-[#222222] mb-2 text-center">인증 코드 (6자리 숫자)</label>
                        <input
                            type="text"
                            maxLength={6}
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
                            className="input-loud text-center text-[24px] tracking-[8px] font-bold h-[64px]"
                            placeholder="000000"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-[13px] font-bold text-center">{error}</p>}
                    {successMsg && <p className="text-green-600 text-[13px] font-bold text-center">{successMsg}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting || code.length !== 6}
                        className="w-full btn-primary h-[52px] text-[15px] font-bold disabled:opacity-50"
                    >
                        {isSubmitting ? "인증 확인 중..." : "인증하기"}
                    </button>
                </form>

                <div className="mt-8 text-center pt-6 border-t border-[#E5E5E5]">
                    <p className="text-[13px] text-[#666666] mb-3">이메일을 받지 못하셨나요?</p>
                    <button
                        onClick={handleResend}
                        disabled={isResending}
                        className="flex items-center justify-center gap-1.5 mx-auto text-[#FF5000] font-bold text-[13px] hover:underline cursor-pointer disabled:opacity-50"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                        인증 코드 재발송
                    </button>
                </div>
            </div>
        </div>
    );
}

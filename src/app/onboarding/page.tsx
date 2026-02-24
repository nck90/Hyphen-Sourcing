"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Briefcase, ChevronRight, CheckCircle2, Camera } from "lucide-react";

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Form states
    const [role, setRole] = useState("개발자");
    const [bio, setBio] = useState("");
    const [portfolioUrl, setPortfolioUrl] = useState("");

    const handleNext = () => setStep(2);
    const handlePrev = () => setStep(1);

    const handleComplete = async () => {
        setIsLoading(true);
        try {
            await fetch("/api/users/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ jobRole: role, bio, portfolioUrl }),
            });
            router.push("/");
        } catch (error) {
            console.error("Failed to update profile", error);
        } finally {
            setIsLoading(false);
            router.push("/");
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center py-[60px] px-4 font-sans">

            <div className="w-full max-w-[500px] mb-6 flex justify-between items-end">
                <h1 className="text-[24px] font-black text-[#222222] tracking-tighter">
                    프로필 설정
                </h1>
                <span className="text-[13px] font-bold text-[#999999]">
                    <span className="text-[#FF5000]">0{step}</span> / 02
                </span>
            </div>

            <div className="w-full max-w-[500px] bg-white border border-[#E5E5E5] p-8 sm:p-10 animate-fade-in shadow-sm">

                {step === 1 && (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-[18px] font-bold text-[#222222] mb-2">기본 프로필을 완성해주세요.</h2>
                            <p className="text-[14px] text-[#666666]">팀원이나 의뢰자가 나를 신뢰할 수 있도록 사진과 직군을 등록합니다.</p>
                        </div>

                        {/* Profile Image Mock */}
                        <div className="flex flex-col items-center">
                            <div className="w-[100px] h-[100px] bg-[#F8F9FA] border border-[#E5E5E5] flex items-center justify-center relative cursor-pointer group rounded-full overflow-hidden mb-3">
                                <User className="w-10 h-10 text-[#CCCCCC]" />
                                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="w-6 h-6 text-white mb-1" />
                                </div>
                            </div>
                            <button className="text-[13px] font-bold text-[#666666] hover:text-[#222222] transition-colors">
                                이미지 업로드
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[14px] font-bold text-[#222222] mb-2">주 활동 분야</label>
                                <select className="input-loud" value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option>프론트엔드 개발자</option>
                                    <option>백엔드 개발자</option>
                                    <option>풀스택 개발자</option>
                                    <option>UI/UX 디자이너</option>
                                    <option>서비스 기획자</option>
                                    <option>기타</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[14px] font-bold text-[#222222] mb-2">한 줄 소개</label>
                                <input
                                    type="text"
                                    placeholder="예) React와 Tailwind에 능숙한 기획하는 프론트엔더"
                                    className="input-loud focus:border-[#FF5000]"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[#E5E5E5]">
                            <button
                                onClick={handleNext}
                                className="w-full btn-primary text-[15px] h-[52px] flex items-center justify-center gap-2"
                            >
                                다음 단계로 <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-8 animate-fade-in">
                        <div>
                            <h2 className="text-[18px] font-bold text-[#222222] mb-2">포트폴리오 링크 (선택)</h2>
                            <p className="text-[14px] text-[#666666]">프로젝트 경험을 증명할 수 있는 링크를 등록해두면 팀 합류 확률이 크게 높아집니다.</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[14px] font-bold text-[#222222] mb-2">GitHub / Behance</label>
                                <input
                                    type="url"
                                    placeholder="https://"
                                    className="input-loud focus:border-[#FF5000]"
                                    value={portfolioUrl}
                                    onChange={(e) => setPortfolioUrl(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="bg-[#F8F9FA] border border-[#E5E5E5] p-4 text-[13px] text-[#666666] leading-relaxed">
                            <span className="font-bold text-[#222222]">팁:</span> 포트폴리오와 학생증 인증은 추후 [마이페이지]에서 언제든지 다시 수정하거나 업로드할 수 있습니다.
                        </div>

                        <div className="pt-4 border-t border-[#E5E5E5] flex gap-3">
                            <button
                                onClick={handlePrev}
                                className="flex-1 btn-outline text-[14px] h-[52px]"
                            >
                                이전
                            </button>
                            <button onClick={handleComplete} disabled={isLoading} className="flex-[2] bg-[#FF5000] hover:bg-[#E64800] text-white font-bold text-[15px] h-[52px] transition-colors flex items-center justify-center gap-2 rounded-sm disabled:opacity-50">
                                {isLoading ? "저장 중..." : <><CheckCircle2 className="w-4 h-4" /> 완료하고 시작하기</>}
                            </button>
                        </div>
                    </div>
                )}

            </div>

            {/* Skip Option */}
            <div className="mt-8">
                <Link href="/" className="text-[13px] font-bold text-[#999999] hover:text-[#222222] underline underline-offset-4 transition-colors">
                    건너뛰기 (나중에 설정할게요)
                </Link>
            </div>
        </div>
    );
}

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function CreateContestPage() {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form Data
    const [title, setTitle] = useState("");
    const [type, setType] = useState("웹/앱 개발");
    const [description, setDescription] = useState("");
    const [prize, setPrize] = useState("");

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            // Set deadline to 14 days from now
            const deadline = new Date();
            deadline.setDate(deadline.getDate() + 14);

            const res = await fetch("/api/contests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    type,
                    description,
                    prize: prize.toString(),
                    deadline: deadline.toISOString(),
                }),
            });

            if (res.ok) {
                setIsSubmitted(true);
            } else {
                alert("콘테스트 생성에 실패했습니다.");
            }
        } catch (error) {
            alert("네트워크 오류 발생");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-4">
                <div className="bg-white p-10 border border-[#E5E5E5] max-w-[500px] w-full text-center animate-fade-in shadow-sm rounded-sm">
                    <CheckCircle2 className="w-16 h-16 text-[#FF5000] mx-auto mb-6" />
                    <h1 className="text-[24px] font-bold text-[#222222] mb-3">콘테스트가 성공적으로 개최되었습니다!</h1>
                    <p className="text-[15px] text-[#666666] mb-8">
                        결제 및 에스크로 입금이 확인되었습니다.<br />최고의 학생 개발팀들이 곧 참여를 시작합니다.
                    </p>
                    <Link href="/contests" className="btn-primary w-full h-[52px] text-[16px] flex items-center justify-center">
                        콘테스트 리스트로 이동
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F5F5] font-sans pb-20">
            {/* Header */}
            <div className="bg-white border-b border-[#E5E5E5] sticky top-0 z-10 h-[72px] flex items-center">
                <div className="max-w-[1080px] w-full mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-[#666666] hover:text-[#222222]">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-[18px] font-bold text-[#222222]">콘테스트 개최하기</h1>
                    </div>
                    <div className="text-[14px] font-bold text-[#999999]">
                        <span className="text-[#FF5000] mr-1">Step {step}</span> / 3
                    </div>
                </div>
            </div>

            <div className="max-w-[800px] mx-auto px-4 py-8">
                <div className="bg-white border border-[#E5E5E5] p-8 md:p-12 rounded-sm shadow-sm">

                    {step === 1 && (
                        <div className="animate-fade-in space-y-8">
                            <div>
                                <h2 className="text-[20px] font-bold text-[#222222] mb-2">어떤 MVP를 만들고 싶으신가요?</h2>
                                <p className="text-[14px] text-[#666666] mb-6">개발하려는 프로덕트의 핵심 정보를 입력해주세요.</p>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[14px] font-bold text-[#222222] mb-2">프로젝트 제목</label>
                                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="예: 대학생 중고서적 거래 앱 프론트엔드 제작" className="input-loud" />
                                    </div>
                                    <div>
                                        <label className="block text-[14px] font-bold text-[#222222] mb-2">카테고리</label>
                                        <select value={type} onChange={(e) => setType(e.target.value)} className="input-loud">
                                            <option>웹/앱 개발</option>
                                            <option>AI/데이터 분석</option>
                                            <option>UX/UI 기획</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[14px] font-bold text-[#222222] mb-2">기본 브리핑 내용</label>
                                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} className="w-full bg-[#F8F9FA] border border-[#E5E5E5] rounded-[4px] p-4 text-[14px] focus:outline-none focus:border-[#FF5000]" placeholder="해결하고자 하는 문제, 필수 기능 등을 적어주세요."></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end pt-4 border-t border-[#E5E5E5]">
                                <button onClick={() => setStep(2)} className="btn-primary w-full md:w-auto h-[48px]">다음 단계로</button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-fade-in space-y-8">
                            <div>
                                <h2 className="text-[20px] font-bold text-[#222222] mb-2">상금 및 일정을 설정해주세요.</h2>
                                <p className="text-[14px] text-[#666666] mb-6">충분한 상금은 더 훌륭한 결과물을 보장합니다.</p>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[14px] font-bold text-[#222222] mb-2">총 상금 (원)</label>
                                        <div className="relative">
                                            <input type="number" value={prize} onChange={(e) => setPrize(e.target.value)} placeholder="3000000" className="input-loud font-bold text-[18px] pl-4 pr-12 text-[#FF5000]" />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666] font-bold">원</span>
                                        </div>
                                        <p className="text-[12px] text-[#999999] mt-2">* 최소 상금은 1,000,000원 이상이어야 합니다.</p>
                                    </div>
                                    <div>
                                        <label className="block text-[14px] font-bold text-[#222222] mb-2">진행 방식 (해커톤)</label>
                                        <div className="bg-[#F8F9FA] border border-[#E5E5E5] p-4 text-[13px] text-[#666666] rounded-[4px]">
                                            하이픈소싱의 모든 콘테스트는 시작 후 <strong className="text-[#222222]">24시간</strong> 내에 산출물이 제출되는 해커톤 방식으로 자동 설정됩니다.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between pt-4 border-t border-[#E5E5E5] gap-4">
                                <button onClick={() => setStep(1)} className="btn-outline w-full md:w-auto h-[48px]">이전으로</button>
                                <button onClick={() => setStep(3)} className="btn-primary w-full md:w-auto h-[48px]">마지막 단계로</button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-fade-in space-y-8">
                            <div>
                                <h2 className="text-[20px] font-bold text-[#222222] mb-2">마지막으로 확인해주세요.</h2>
                                <p className="text-[14px] text-[#666666] mb-6">결제를 완료하면 콘테스트가 승인 후 즉시 게시됩니다.</p>

                                <div className="bg-[#F8F9FA] border border-[#E5E5E5] p-6 space-y-4 mb-6 rounded-[4px]">
                                    <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E5]">
                                        <span className="text-[14px] text-[#666666]">결제될 상금 (에스크로 보증)</span>
                                        <span className="text-[18px] font-bold text-[#222222]">{prize ? Number(prize).toLocaleString() : 0}원</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E5]">
                                        <span className="text-[14px] text-[#666666]">플랫폼 이용 수수료 (런칭 프로모션 0%)</span>
                                        <span className="text-[18px] font-bold text-[#222222]">0원</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-[15px] font-bold text-[#222222]">총 결제 금액</span>
                                        <span className="text-[24px] font-black text-[#FF5000]">{prize ? Number(prize).toLocaleString() : 0}<span className="text-[16px] text-[#222222] ml-1">원</span></span>
                                    </div>
                                </div>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" className="mt-1 w-[16px] h-[16px] border-[#E5E5E5] text-[#FF5000] focus:ring-0" />
                                    <span className="text-[13px] text-[#666666] leading-relaxed">
                                        [필수] 결제 후, 환불 정책 및 참가작 사용 권리에 관한 약관에 모두 동의합니다. 미선정 시에 대한 환불 조항을 확인했습니다.
                                    </span>
                                </label>
                            </div>
                            <div className="flex justify-between pt-4 border-t border-[#E5E5E5] gap-4">
                                <button onClick={() => setStep(2)} className="btn-outline w-full md:w-auto h-[48px]">이전으로</button>
                                <button onClick={handleSubmit} disabled={isLoading} className="bg-[#FF5000] hover:bg-[#E64800] text-white font-bold px-8 h-[48px] rounded-[4px] w-full md:w-auto transition-colors focus:outline-none disabled:opacity-50">
                                    {isLoading ? "결제 중..." : "상금 결제 및 개최 완료"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

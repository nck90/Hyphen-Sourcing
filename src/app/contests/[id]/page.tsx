"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Share2, Heart, Download, FileText, CheckCircle2, AlertCircle, Clock, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ContestDetail() {
    const params = useParams();
    const id = params?.id as string;
    const [activeTab, setActiveTab] = useState("상세 정보");
    const [isInterested, setIsInterested] = useState(false);

    const { data: contest, isLoading, error } = useSWR(id ? `/api/contests/${id}` : null, fetcher);

    const handleShare = () => {
        alert("콘테스트 링크가 클립보드에 복사되었습니다!");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#FF5000]" />
            </div>
        );
    }

    if (error || !contest) {
        return (
            <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center text-[#666666]">
                콘테스트를 찾을 수 없습니다.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F5F5] font-sans pb-[100px]">

            {/* ── Loud.kr 스타일 상단 타이틀 바 ── */}
            <div className="bg-[#222222] text-white pt-[40px] pb-[60px] px-4">
                <div className="max-w-[1080px] mx-auto">

                    <div className="flex items-center gap-2 text-[12px] text-[#999999] mb-[20px]">
                        <Link href="/" className="hover:text-white transition-colors">홈</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/contests" className="hover:text-white transition-colors">콘테스트</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-[#DDDDDD] font-bold">웹/앱 개발</span>
                    </div>

                    <div className="flex items-start gap-4">
                        {/* Left: Status Image Placeholder */}
                        <div className="w-[120px] h-[120px] bg-white text-[#222222] border-2 border-[#FF5000] flex flex-col justify-center items-center shrink-0 shadow-lg">
                            <span className="text-[13px] font-bold text-[#FF5000] border-b border-[#E5E5E5] w-full text-center pb-2 mb-2">{contest.status}</span>
                            <span className="text-[20px] font-black tracking-tighter">D-{contest.daysLeft}</span>
                        </div>

                        {/* Right: Title & Meta */}
                        <div className="flex-1 pt-1">
                            <div className="flex gap-2 mb-3">
                                {contest.urgent && <span className="bg-[#FF5000] text-white text-[11px] font-bold px-2 py-0.5 rounded-[2px]">긴급</span>}
                                {contest.tags?.map((tag: string, idx: number) => (
                                    <span key={idx} className="border border-[#666666] text-[#DDDDDD] text-[11px] px-2 py-0.5">{tag}</span>
                                ))}
                            </div>

                            <h1 className="text-[26px] md:text-[32px] font-bold leading-[1.3] text-white mb-[16px] tracking-[-1px]">
                                {contest.title}
                            </h1>

                            <div className="flex items-center gap-4 text-[13px] text-[#BBBBBB]">
                                <span><strong>의뢰자:</strong> {contest.client}</span>
                                <span className="w-px h-3 bg-[#666666]"></span>
                                <span><strong>조회수:</strong> {contest.views?.toLocaleString()}</span>
                                <span className="w-px h-3 bg-[#666666]"></span>
                                <span className="flex items-center gap-1 text-[#FF5000] font-bold">
                                    <Clock className="w-4 h-4" /> {contest.daysLeft}일 남음
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1080px] mx-auto px-4 mt-[-20px] relative z-10 flex flex-col lg:flex-row gap-[24px]">

                {/* ── 좌측 메인 상세 영역 ── */}
                <div className="flex-1 w-full bg-white border border-[#E5E5E5] shadow-sm">

                    {/* 탭 바 */}
                    <div className="flex border-b border-[#E5E5E5] bg-[#F8F9FA]">
                        {["상세 정보", "참여작 (12)", "Q&A (2)"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-[16px] text-[15px] font-bold text-center border-r border-[#E5E5E5] last:border-none transition-colors
                     ${activeTab === tab ? "bg-white text-[#FF5000] border-t-[3px] border-t-[#FF5000]" : "text-[#666666] border-t-[3px] border-t-transparent hover:bg-white"}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* 상세 내용 패널 */}
                    <div className="p-6 md:p-10 min-h-[500px]">
                        {activeTab === "상세 정보" && (
                            <div className="animate-fade-in text-[#333333] text-[14px] leading-[1.8]">
                                <div className="pb-8 border-b border-[#E5E5E5] mb-8">
                                    <h3 className="text-[18px] font-bold text-[#222222] mb-4 border-l-4 border-[#FF5000] pl-3">프로젝트 소개</h3>
                                    <p className="whitespace-pre-wrap">
                                        {contest.description}
                                    </p>
                                </div>

                                <div className="pb-8 border-b border-[#E5E5E5] mb-8">
                                    <h3 className="text-[18px] font-bold text-[#222222] mb-4 border-l-4 border-[#FF5000] pl-3">필수 산출물 (DoD)</h3>
                                    <ul className="space-y-2 mt-2">
                                        <li className="flex gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-[#FF5000] shrink-0" />
                                            <span>작동 가능한 컴포넌트가 포함된 완전한 <strong className="text-[#222222]">GitHub 소스코드</strong> 압축파일 첨부</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-[#FF5000] shrink-0" />
                                            <span>Vercel 또는 AWS 배포본 <strong className="text-[#222222]">실시간 데모 링크 (URL)</strong> 제출 필수</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-[#BBBBBB] shrink-0" />
                                            <span>로직 구동 영상 (Youtube 링크 권장)</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-[18px] font-bold text-[#222222] mb-4 border-l-4 border-[#FF5000] pl-3">참고자료 / 첨부파일</h3>
                                    <div className="bg-[#F8F9FA] border border-[#E5E5E5] p-4 flex flex-col gap-2">
                                        <button className="flex items-center justify-between text-[13px] bg-white border border-[#E5E5E5] p-3 hover:border-[#FF5000] group">
                                            <span className="font-bold text-[#222222] group-hover:text-[#FF5000]">Brand_Guide_v1.pdf (12.4 MB)</span>
                                            <Download className="w-4 h-4 text-[#999999]" />
                                        </button>
                                        <button className="flex items-center justify-between text-[13px] bg-white border border-[#E5E5E5] p-3 hover:border-[#FF5000] group">
                                            <span className="font-bold text-[#222222] group-hover:text-[#FF5000]">UI_Wireframe_Base.zip (4.1 MB)</span>
                                            <Download className="w-4 h-4 text-[#999999]" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab !== "상세 정보" && (
                            <div className="py-[100px] flex flex-col items-center text-center">
                                <AlertCircle className="w-10 h-10 text-[#DDDDDD] mb-4" />
                                <p className="text-[14px] text-[#999999]">등록된 정보가 없습니다.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── 우측 플로팅 액션 바 (Loud.kr Sticky Box) ── */}
                <aside className="w-full lg:w-[320px] shrink-0">
                    <div className="bg-white border border-[#E5E5E5] border-t-4 border-t-[#222222] p-6 shadow-sm sticky top-[20px]">

                        <div className="mb-6 pb-6 border-b border-[#E5E5E5] text-center">
                            <p className="text-[13px] text-[#666666] font-bold mb-1">우승 상금 (1등 100%)</p>
                            <p className="text-[36px] font-black text-[#FF5000] leading-none tracking-tighter">
                                {Number(contest.prize.replace(/,/g, '')).toLocaleString()}<span className="text-[22px] font-bold text-[#222222] ml-1 tracking-tight">원</span>
                            </p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center text-[13px] border-b border-[#F0F0F0] pb-2">
                                <span className="text-[#666666]">카테고리</span>
                                <span className="text-[#222222] font-bold">{contest.type}</span>
                            </div>
                            <div className="flex justify-between items-center text-[13px] border-b border-[#F0F0F0] pb-2">
                                <span className="text-[#666666]">남은 기간</span>
                                <span className="text-[#222222] font-bold text-[#FF5000]">{contest.daysLeft}일 남음</span>
                            </div>
                            <div className="flex justify-between items-center text-[13px] border-b border-[#F0F0F0] pb-2">
                                <span className="text-[#666666]">현재 참여팀</span>
                                <span className="text-[#222222] font-bold">{contest.teamCount}팀</span>
                            </div>
                            <div className="flex justify-between items-center text-[13px] border-b border-[#F0F0F0] pb-2">
                                <span className="text-[#666666]">에스크로 보증</span>
                                <span className="text-[#222222] font-bold text-green-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> 입금완료</span>
                            </div>
                        </div>

                        <Link href={`/contests/${id}/apply`} className="w-full bg-[#FF5000] hover:bg-[#E64800] text-white font-bold text-[16px] h-[54px] transition-colors mb-3 flex items-center justify-center">
                            콘테스트 참여하기
                        </Link>

                        <div className="flex gap-2">
                            <button onClick={() => setIsInterested(!isInterested)} className="flex-1 bg-white border border-[#E5E5E5] text-[#333333] hover:bg-[#F8F9FA] font-bold text-[13px] h-[44px] transition-colors flex items-center justify-center gap-1">
                                <Heart className={`w-4 h-4 ${isInterested ? "fill-[#FF5000] text-[#FF5000]" : ""}`} /> 관심
                            </button>
                            <button onClick={handleShare} className="flex-1 bg-white border border-[#E5E5E5] text-[#333333] hover:bg-[#F8F9FA] font-bold text-[13px] h-[44px] transition-colors flex items-center justify-center gap-1">
                                <Share2 className="w-4 h-4" /> 공유
                            </button>
                        </div>

                        <p className="text-[11px] text-[#999999] text-center mt-4">
                            * 참여 전 콘테스트 이용약관을 반드시 확인하세요.
                        </p>
                    </div>
                </aside>

            </div>
        </div>
    );
}

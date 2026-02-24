"use client";

import { Star, Trophy, MessageSquare, ExternalLink, Download, FileText, ChevronDown, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function JudgingDashboard() {
    const [selectedId, setSelectedId] = useState<number | null>(1);

    const submissions = [
        { id: 1, title: "청년 다모아: 맞춤형 정책 큐레이터", team: "팀 시너지", score: 4.5, time: "2시간 전" },
        { id: 2, title: "Policy Hub: 청년 정책 통합 플랫폼", team: "혁신러들", score: 0, time: "5시간 전" },
        { id: 3, title: "Youth Connect UX/UI 제안", team: "디자인A", score: 3.0, time: "1일 전" },
        { id: 4, title: "정부 지원금 알리미 프로토타입", team: "김개발", score: 0, time: "2일 전" },
    ];

    return (
        <div className="min-h-screen bg-[#f3f4f6]">

            {/* Top Navigation Bar / Context */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="inline-flex items-center px-[10px] py-[4px] rounded-md bg-green-50 text-green-600 text-[13px] font-bold tracking-tight">
                            심사 진행중
                        </span>
                        <h1 className="text-[18px] font-bold text-gray-900 tracking-[-0.01em]">
                            청년 지원 정책 플랫폼 랜딩페이지 기획
                        </h1>
                    </div>

                    <button className="bg-gray-900 text-white text-[14px] font-bold px-[20px] py-[10px] rounded-[10px] shadow-sm hover:bg-gray-800 transition-colors flex items-center gap-2">
                        <Trophy className="w-4 h-4" /> 우승작 (1위) 최종 선정하기
                    </button>
                </div>
            </div>

            <div className="flex max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-[32px] gap-[32px] h-[calc(100vh-72px)]">

                {/* Left: Submissions List */}
                <div className="w-[360px] bg-white rounded-[20px] shadow-sm border border-gray-200/60 flex flex-col overflow-hidden flex-shrink-0 animate-fade-in-up">
                    <div className="p-[20px] border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <h2 className="text-[16px] font-bold text-gray-900">제출된 참여작 <span className="text-primary ml-1">4</span></h2>
                        <button className="flex items-center gap-1 text-[13px] font-semibold text-gray-500 hover:text-gray-900 transition-colors">
                            최신순 <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="overflow-y-auto flex-1 p-[12px] space-y-[8px]">
                        {submissions.map((sub) => (
                            <div
                                key={sub.id}
                                onClick={() => setSelectedId(sub.id)}
                                className={`p-[16px] rounded-[12px] cursor-pointer transition-all border ${selectedId === sub.id ? 'bg-blue-50/50 border-primary shadow-sm' : 'bg-white border-transparent hover:bg-gray-50'}`}
                            >
                                <div className="flex items-start justify-between mb-[8px]">
                                    <h3 className={`text-[15px] font-bold tracking-tight line-clamp-2 leading-[1.4] ${selectedId === sub.id ? 'text-primary' : 'text-gray-900'}`}>
                                        {sub.title}
                                    </h3>
                                </div>
                                <div className="flex items-center justify-between mt-[12px]">
                                    <span className="text-[13px] font-medium text-gray-500">{sub.team}</span>
                                    <div className="flex items-center gap-2">
                                        {sub.score > 0 ? (
                                            <div className="flex items-center gap-1 text-[13px] font-bold text-amber-500">
                                                <Star className="w-3.5 h-3.5 fill-current" /> {sub.score.toFixed(1)}
                                            </div>
                                        ) : (
                                            <span className="text-[12px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-sm">미평가</span>
                                        )}
                                        <span className="text-[12px] text-gray-400">{sub.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Submission Detail View (Preview Pane) */}
                <div className="flex-1 bg-white rounded-[20px] shadow-sm border border-gray-200/60 overflow-hidden flex flex-col animate-fade-in-up delay-100">

                    {/* Detail Header */}
                    <div className="p-[32px] border-b border-gray-100 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-[12px]">
                                <span className="inline-flex items-center px-[8px] py-[4px] rounded-md bg-gray-100 text-[12px] font-bold text-gray-600">
                                    참여작 #3481
                                </span>
                                <span className="text-[14px] font-semibold text-gray-500">
                                    팀 시너지
                                </span>
                            </div>
                            <h2 className="text-[28px] font-bold text-gray-900 tracking-[-0.02em] mb-[8px]">
                                청년 다모아: 맞춤형 정책 큐레이터 플랫폼
                            </h2>
                            <p className="text-[15px] text-gray-600 leading-[1.6]">
                                2030 청년들이 자신에게 맞는 정부 정책을 쉽게 찾고 비교할 수 있는 반응형 웹 서비스 기획안입니다. <br />개인화된 대시보드와 카카오톡 알림 연동을 핵심 기능으로 삼았습니다.
                            </p>
                        </div>

                        {/* Rating Control (Toss Style) */}
                        <div className="bg-gray-50 rounded-[16px] p-[20px] border border-gray-200">
                            <div className="text-[13px] font-bold text-gray-500 mb-[12px] text-center">내 평가 별점</div>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button key={star} className={`p-1 transition-transform hover:scale-110 ${star <= 4 ? 'text-amber-400' : 'text-gray-300 hover:text-amber-200'}`}>
                                        <Star className="w-8 h-8 fill-current" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Detail Body (Scrollable) */}
                    <div className="flex-1 overflow-y-auto p-[32px] bg-gray-50/30">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mb-[40px]">
                            {/* Actions / Links */}
                            <a href="#" className="flex items-center justify-between p-[24px] rounded-[16px] bg-white border border-gray-200 hover:border-primary/50 hover:shadow-sm transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-[48px] h-[48px] rounded-full bg-blue-50 flex items-center justify-center">
                                        <ExternalLink className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-[16px] font-bold text-gray-900 group-hover:text-primary transition-colors">Figma 프로토타입 보기</div>
                                        <div className="text-[13px] text-gray-500">figma.com/file/...</div>
                                    </div>
                                </div>
                            </a>

                            <a href="#" className="flex items-center justify-between p-[24px] rounded-[16px] bg-white border border-gray-200 hover:border-gray-400 hover:shadow-sm transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-[48px] h-[48px] rounded-full bg-gray-100 flex items-center justify-center">
                                        <Download className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <div className="text-[16px] font-bold text-gray-900 group-hover:text-gray-700 transition-colors">상세 기획서 다운로드</div>
                                        <div className="text-[13px] text-gray-500">기획서_시너지팀.pdf (4.2MB)</div>
                                    </div>
                                </div>
                            </a>
                        </div>

                        {/* Markdown Content Area (Mock) */}
                        <div className="bg-white rounded-[16px] border border-gray-200 p-[32px] prose prose-gray max-w-none">
                            <h3 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-primary" /> 상세 설명
                            </h3>
                            <div className="space-y-4 text-[15px] text-gray-700 leading-[1.8]">
                                <p><strong>1. 문제 정의</strong><br />
                                    기존 청년 정책 포털은 방대한 정보를 제공하지만, 사용자가 자신에게 해당하는 정책을 선별하기 어렵다는 치명적인 UX 문제를 안고 있습니다.</p>

                                <p><strong>2. 핵심 해결책 (Core Solution)</strong><br />
                                    - <strong>스마트 필터링:</strong> 생년월일, 거주지, 관심사(주거/취업/금융) 3가지 Step만으로 맞춤형 정책을 1차 필터링합니다.<br />
                                    - <strong>정책 카드 요약:</strong> 복잡한 정책 공고문을 5줄 이내의 쉬운 용어로 번역하여 카드 형태로 제공합니다.<br />
                                    - <strong>마감일 알리미:</strong> 찜한 정책의 신청 마감일 3일 전에 카카오톡 알림톡을 발송합니다.</p>
                            </div>
                        </div>

                        {/* 1:1 Feedback / Shortlist Action */}
                        <div className="mt-[40px] bg-blue-50/50 border border-blue-100 rounded-[16px] p-[24px] flex items-center justify-between">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                <div>
                                    <div className="text-[15px] font-bold text-gray-900 mb-1">이 작품이 마음에 드시나요?</div>
                                    <div className="text-[14px] text-gray-600">
                                        우승 후보(쇼트리스트)로 선정하여 참여자와 1:1 메시지로 수정 요청을 하거나 상세한 피드백을 주고받을 수 있습니다.
                                    </div>
                                </div>
                            </div>
                            <button className="flex-shrink-0 bg-white border border-gray-200 text-gray-900 text-[14px] font-bold px-[20px] py-[12px] rounded-[10px] hover:border-gray-400 hover:bg-gray-50 shadow-sm transition-all flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" /> 1:1 메시지 보내기
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

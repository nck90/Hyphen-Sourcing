"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/* ─────────────────────────── Page ─────────────────────────────── */
export default function Contests() {
    const [activeTab, setActiveTab] = useState("전체보기");
    const [activeStatus, setActiveStatus] = useState<string>("접수중");

    const { data: contests = [], isLoading } = useSWR(
        `/api/contests?type=${activeTab}&status=${activeStatus}`,
        fetcher
    );

    return (
        <div className="min-h-screen bg-[#F5F5F5] font-sans pb-20">

            {/* ── Loud.kr 스타일 상단 타이틀 바 ── */}
            <div className="bg-[#222222] text-white py-[40px] px-4 text-center">
                <h1 className="text-[32px] font-black tracking-[-1px]">콘테스트 리스트</h1>
                <p className="text-[15px] text-[#BBBBBB] mt-2 tracking-[-0.5px]">
                    전국 상위 1% 대학생 개발팀들의 치열한 아이디어 경쟁
                </p>
            </div>

            {/* 가로 탭바 (Loud.kr standard thin tabs) */}
            <div className="bg-white border-b border-[#E5E5E5] mb-[40px]">
                <div className="max-w-[1200px] mx-auto px-4 flex">
                    {["전체보기", "웹/앱 개발", "AI/데이터 분석", "UX/UI 기획", "콘텐츠 마케팅"].map((c) => (
                        <button
                            key={c}
                            onClick={() => setActiveTab(c)}
                            className={`py-4 px-6 text-[15px] font-bold border-b-2 transition-colors
                  ${activeTab === c ? "border-[#FF5000] text-[#FF5000]" : "border-transparent text-[#666666] hover:text-[#222222]"}`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-[1240px] mx-auto px-4 flex flex-col lg:flex-row gap-[30px] items-start">

                {/* ── 좌측 필터 (Loud Boxy Sidebar) ── */}
                <aside className="w-full lg:w-[240px] flex-shrink-0">
                    <div className="bg-white border border-[#E5E5E5] p-5 mb-[16px]">
                        <h3 className="text-[14px] font-bold text-[#222222] pb-3 border-b border-[#E5E5E5] mb-4">상세검색</h3>
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="키워드 입력"
                                className="w-full border border-[#E5E5E5] h-[36px] px-3 text-[13px] outline-none focus:border-[#FF5000]"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
                        </div>
                    </div>

                    <div className="bg-white border border-[#E5E5E5] p-5">
                        <h3 className="text-[14px] font-bold text-[#222222] pb-3 border-b border-[#E5E5E5] mb-4">참여 상태</h3>
                        <div className="space-y-3">
                            {["접수중", "마감임박", "심사중", "우승작 선정"].map((status) => (
                                <label key={status} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={activeStatus === status}
                                        onChange={() => setActiveStatus(status)}
                                        className="w-[14px] h-[14px] border-[#E5E5E5] text-[#FF5000] focus:ring-0 checked:bg-[#FF5000]"
                                    />
                                    <span className="text-[13px] text-[#666666]">{status}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* ── 우측 메인 리스트 ── */}
                <main className="flex-1 w-full bg-white border border-[#E5E5E5]">

                    {/* 리스트 헤더 정보 */}
                    <div className="flex items-center justify-between p-4 border-b border-[#E5E5E5] bg-[#F8F9FA]">
                        <span className="text-[13px] text-[#666666]">
                            총 <strong className="text-[#FF5000]">{contests.length}</strong>개의 콘테스트
                        </span>
                        <select className="border border-[#E5E5E5] bg-white h-[32px] px-2 text-[12px] text-[#666666] outline-none">
                            <option>마감 임박순</option>
                            <option>최신 등록순</option>
                            <option>상금 높은순</option>
                        </select>
                    </div>

                    <div className="divide-y divide-[#E5E5E5]">
                        {isLoading ? (
                            <div className="text-center py-10 text-[14px] text-[#999999]">로딩 중...</div>
                        ) : contests.length === 0 ? (
                            <div className="text-center py-20 text-[15px] text-[#666666]">선택한 조건의 콘테스트가 없습니다.</div>
                        ) : (
                            contests.map((contest: any) => (
                                <Link href={`/contests/${contest.id}`} key={contest.id} className="flex flex-col md:flex-row p-6 hover:bg-[#F8F9FA] transition-colors group">
                                    {/* 상태 및 카테고리 태그 (모바일 대비) */}
                                    <div className="w-[120px] shrink-0 mb-3 md:mb-0 flex flex-col justify-center items-center h-[90px] border border-[#E5E5E5] bg-[#F5F5F5]">
                                        <span className={`text-[12px] font-bold border px-1.5 py-0.5 rounded-[2px] mb-1 ${contest.urgent ? 'text-red-500 border-red-500' : 'text-[#FF5000] border-[#FF5000]'}`}>
                                            D-{contest.daysLeft}
                                        </span>
                                        <span className="text-[11px] text-[#999999]">{contest.type}</span>
                                    </div>

                                    {/* 중앙 상세 정보 */}
                                    <div className="flex-1 md:px-6">
                                        <p className="text-[12px] text-[#999999] mb-1">{contest.client}</p>
                                        <h2 className="text-[18px] font-bold text-[#222222] mb-2 leading-[1.3] group-hover:underline decoration-1 underline-offset-4 decoration-[#222222]">
                                            {contest.title}
                                        </h2>
                                        <div className="flex gap-1.5 flex-wrap">
                                            {contest.tags.map((tag: string, idx: number) => (
                                                <span key={idx} className="text-[11px] text-[#666666] bg-[#F5F5F5] border border-[#E5E5E5] px-2 py-0.5">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 우측 상금 및 현황 */}
                                    <div className="w-full md:w-[150px] shrink-0 text-right flex flex-row md:flex-col items-center md:items-end justify-between mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-none border-[#E5E5E5]">
                                        <div>
                                            <p className="text-[11px] text-[#999999] mb-1 text-left md:text-right">우승 상금</p>
                                            <p className="text-[22px] font-black text-[#FF5000] tracking-tighter">
                                                {Number(contest.prize.replace(/,/g, '')).toLocaleString()}<span className="text-[13px] text-[#222222] ml-0.5 items-baseline font-bold font-sans tracking-tight">원</span>
                                            </p>
                                        </div>
                                        <p className="text-[12px] text-[#666666] mt-2">
                                            <strong className="text-[#333333]">{contest.count}</strong>명 참여의사
                                        </p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                    {/* 페이지네이션 */}
                    <div className="flex justify-center p-8 bg-white border-t border-[#E5E5E5]">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(page => (
                                <button key={page} className={`w-[32px] h-[32px] border border-[#E5E5E5] text-[13px] font-bold
                     ${page === 1 ? "bg-[#FF5000] text-white border-[#FF5000]" : "bg-white text-[#666666] hover:bg-[#F8F9FA]"}`}>
                                    {page}
                                </button>
                            ))}
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}

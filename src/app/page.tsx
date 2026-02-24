"use client";
import Link from "next/link";
import { Monitor, Smartphone, Brain, Layout, Code2, ArrowRight } from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const categories = [
  { icon: Monitor, label: "웹 플랫폼 MVP", count: "35건" },
  { icon: Smartphone, label: "모바일 앱 데모", count: "15건" },
  { icon: Brain, label: "AI 모델 기획", count: "20건" },
  { icon: Layout, label: "SaaS 대시보드", count: "40건" },
  { icon: Code2, label: "B2B 어드민", count: "10건" }
];



/* ─────────────────────────── Page ─────────────────────────────── */
export default function Home() {
  const { data: contests = [], isLoading } = useSWR("/api/contests", fetcher);
  const liveContests = contests.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#333333]">

      {/* 1. 배너 (Loud.kr Style Massive Top Banner) */}
      <section className="bg-[#222222] py-[60px] md:py-[100px] text-center px-4 relative overflow-hidden">
        {/* Subtle pattern for texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/always-grey.png')]"></div>

        <div className="max-w-[1000px] mx-auto animate-fade-in relative z-10">
          <h1 className="text-[32px] md:text-[46px] font-black text-white leading-[1.3] mb-4 tracking-[-1px]">
            대한민국 No.1 아이디어 개발 해커톤 마켓
          </h1>
          <p className="text-[16px] md:text-[20px] text-[#DDDDDD] mb-10 leading-[1.6]">
            검증된 상위 1% 대학생 개발팀이 창업가의 기획을 완벽한 MVP로 구현합니다.<br />
            합리적인 예산으로 압도적인 완성도의 결과물을 받아보세요.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <Link href="/contests/create" className="bg-[#FF5000] text-white font-bold text-[18px] w-full md:w-[280px] h-[64px] flex items-center justify-center transition-colors hover:bg-[#E64800] rounded-[4px]">
              해커톤 개최하기
            </Link>
            <Link href="/contests" className="bg-transparent border border-[#666666] text-white hover:border-white font-bold text-[18px] w-full md:w-[280px] h-[64px] flex items-center justify-center transition-all rounded-[4px]">
              콘테스트 구경하기
            </Link>
          </div>
        </div>
      </section>

      {/* 2. 카테고리 네비게이션 (Loud.kr icon grid) */}
      <div className="bg-white border-b border-[#E5E5E5] mb-[60px]">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-6 py-10">
          <h2 className="text-[20px] font-bold text-[#222222] mb-6 text-center tracking-[-0.5px]">어떤 IT 서비스 카테고리가 필요하신가요?</h2>
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-4">
            {categories.map((c, i) => (
              <Link href="/contests" key={i} className="flex flex-col items-center justify-center w-[120px] h-[120px] border border-[#E5E5E5] rounded-[8px] hover:border-[#FF5000] hover:shadow-[0_4px_12px_rgba(255,80,0,0.1)] transition-all bg-white group cursor-pointer">
                <c.icon className="w-8 h-8 text-[#666666] mb-3 group-hover:text-[#FF5000] transition-colors" />
                <span className="text-[14px] font-bold text-[#333333] mb-1">{c.label}</span>
                <span className="text-[12px] text-[#999999]">{c.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 lg:px-6">

        {/* 3. 진행 중인 콘테스트 리스트 (Loud.kr Card Grid) */}
        <section className="pb-[120px]">
          <div className="flex justify-between items-end border-b-2 border-[#222222] pb-3 mb-6">
            <h2 className="text-[24px] font-bold text-[#222222] tracking-[-1px]">진행중인 콘테스트</h2>
            <Link href="/contests" className="text-[13px] font-bold text-[#666666] hover:text-[#222222] flex items-center gap-1">
              더보기 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {liveContests.map((contest: any) => (
              <Link href={`/contests/${contest.id}`} key={contest.id} className="bg-white border border-[#E5E5E5] block hover:border-[#999999] transition-colors">

                {/* 상단 썸네일 대체 회색 영역 (Loud.kr style solid color or gray placeholder) */}
                <div className="h-[140px] bg-[#F8F9FA] border-b border-[#E5E5E5] flex items-center justify-center flex-col relative">
                  {contest.urgent && (
                    <span className="absolute top-3 left-3 bg-[#FF5000] text-white text-[11px] font-bold px-2 py-0.5 rounded-[2px]">긴급</span>
                  )}
                  <span className="text-[#999999] text-[15px] font-bold">{contest.type}</span>
                </div>

                {/* 하단 텍스트 정보 */}
                <div className="p-5">
                  {/* 상단 라벨 & 디데이 */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[12px] font-bold text-[#FF5000] border border-[#FF5000] px-1.5 py-0.5 rounded-[2px]">
                      D-{contest.daysLeft}
                    </span>
                    <span className="text-[12px] text-[#999999] flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500" /> {contest.status}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h3 className="text-[16px] font-bold text-[#222222] leading-[1.4] mb-2 h-[44px] overflow-hidden line-clamp-2">
                    {contest.title}
                  </h3>

                  {/* 의뢰자 */}
                  <p className="text-[13px] text-[#666666] mb-5">{contest.client}</p>

                  {/* 상금 정보 (Loud.kr style emphasis) */}
                  <div className="border-t border-[#E5E5E5] pt-4 flex justify-between items-baseline">
                    <span className="text-[13px] font-bold text-[#666666]">상금</span>
                    <span className="text-[20px] font-black text-[#222222] tracking-tighter">
                      {Number(contest.prize.replace(/,/g, '')).toLocaleString()} <span className="text-[14px] font-bold">원</span>
                    </span>
                  </div>

                  {/* 참여자 수 */}
                  <div className="mt-2 text-right">
                    <span className="text-[12px] text-[#999999]">
                      현재 <strong className="text-[#FF5000]">{contest.count}</strong>명 참여
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

    </div>
  );
}

import Link from "next/link";
import { Trophy, ArrowRight } from "lucide-react";

// Dummy data for winners
const winners = [
    { id: 101, title: "소상공인 맞춤형 세금 관리 자동화 웹서비스", team: "TaxFree즈", prize: "5,000,000", year: "2025 왕중왕전", image: "bg-blue-100" },
    { id: 102, title: "외국인 유학생을 위한 중고거래 및 번역 메신저", team: "글로벌캠퍼스", prize: "3,000,000", year: "2025 하반기", image: "bg-green-100" },
    { id: 103, title: "반려동물 건강기록 및 수의사 비대면 상담 앱", team: "멍냥닥터스", prize: "3,000,000", year: "2025 상반기", image: "bg-yellow-100" },
    { id: 104, title: "AI 기반 수능 비문학 지문 맞춤형 요약봇", team: "에듀블록", prize: "5,000,000", year: "2024 왕중왕전", image: "bg-purple-100" },
];

export default function WinnersPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] font-sans pb-20">
            {/* Header */}
            <div className="bg-[#222222] text-white py-[40px] px-4 text-center mb-[40px]">
                <h1 className="text-[32px] font-black tracking-[-1px] mb-2">역대 수상작</h1>
                <p className="text-[15px] text-[#BBBBBB] tracking-[-0.5px]">
                    하이픈소싱을 통해 MVP를 완성하고 큰 상금을 차지한 영광의 얼굴들입니다.
                </p>
            </div>

            <div className="max-w-[1240px] mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
                    {winners.map((winner) => (
                        <Link href={`/contests/${winner.id}`} key={winner.id} className="bg-white border border-[#E5E5E5] hover:border-[#FF5000] hover:shadow-lg transition-all group flex flex-col h-full cursor-pointer">
                            <div className={`w-full h-[220px] ${winner.image} border-b border-[#E5E5E5] flex items-center justify-center`}>
                                <Trophy className="w-16 h-16 text-black/10 transition-transform group-hover:scale-110 duration-300" />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="bg-[#222222] text-white text-[12px] font-bold px-2 py-1">{winner.year}</span>
                                    <span className="text-[#FF5000] font-bold text-[13px]">우승 상금 {winner.prize}원</span>
                                </div>
                                <h2 className="text-[18px] font-bold text-[#222222] mb-2 leading-[1.3] group-hover:underline decoration-2 underline-offset-4 decoration-[#FF5000]">
                                    {winner.title}
                                </h2>
                                <p className="text-[14px] text-[#666666] mb-6 mt-1 flex-1">
                                    우승팀: {winner.team}
                                </p>
                                <div className="text-[13px] font-bold text-[#222222] flex items-center gap-1 group-hover:text-[#FF5000] transition-colors mt-auto">
                                    프로젝트 상세 보기 <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

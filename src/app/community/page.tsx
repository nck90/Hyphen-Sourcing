"use client";
import { useState } from "react";
import Link from "next/link";
import { MessageSquare, Users, Trophy, Mic, TrendingUp, Search, Plus, ThumbsUp, ChevronRight, Star, Clock, Zap } from "lucide-react";

const loungePosts = [
    { id: 1, type: "Q&A", user: "dev_jihun", avatar: "J", color: "bg-blue-500", title: "Next.js 14에서 Clerk 인증 설정이 안 되는 이슈", desc: "미들웨어 설정 후에도 계속 리다이렉트 루프가 발생합니다. 구체적인 설정값을 공유해주실 수 있나요?", tags: ["Next.js", "Clerk", "Auth"], likes: 24, replies: 7, time: "23분 전", solved: true },
    { id: 2, type: "쇼케이스", user: "team_alpha", avatar: "A", color: "bg-amber-500", title: "[1등 수상] 지역 농특산물 커머스 MVP 완성 후기", desc: "24시간 안에 완성한 커머스 플랫폼 MVP입니다. 기술 스택 선정부터 배포까지 전 과정을 공유합니다!", tags: ["React", "Next.js", "Supabase", "우승작"], likes: 58, replies: 12, time: "1시간 전", solved: false },
    { id: 3, type: "팀찾기", user: "design_soyul", avatar: "S", color: "bg-violet-500", title: "해커톤 팀 구함 — React / 디자인 3년차, PM 경험 있음", desc: "다음 달 진행 예정인 AI 기능 PoC 해커톤에 같이 참가할 팀원을 구합니다. 포트폴리오 첨부했어요.", tags: ["React", "Figma", "PM", "팀찾기"], likes: 12, replies: 3, time: "2시간 전", solved: false },
    { id: 4, type: "팁공유", user: "backend_kay", avatar: "K", color: "bg-emerald-500", title: "24h 해커톤에서 살아남기 — DB 스키마 설계 꿀팁 5가지", desc: "여러 해커톤을 거치며 터득한 20분 안에 ERD 잡는 방법을 정리했습니다. 주니어 분들한테 도움이 됐으면 합니다.", tags: ["PostgreSQL", "ERD", "Tips"], likes: 94, replies: 18, time: "5시간 전", solved: false },
    { id: 5, type: "Q&A", user: "ml_minjae", avatar: "M", color: "bg-rose-500", title: "FastAPI + OpenAI 스트리밍 응답 구현 시 cors 이슈", desc: "SSE 스트리밍으로 구현 중인데 CORS 헤더 처리 방법이 궁금합니다.", tags: ["FastAPI", "OpenAI", "CORS"], likes: 17, replies: 4, time: "8시간 전", solved: false },
];

const teamBoard = [
    { id: 1, user: "hyena_dev", avatar: "H", color: "bg-blue-600", role: "풀스택 개발자", skills: ["React", "Node.js", "MongoDB"], level: "3년차", available: "주말 가능", port: "github.com/hyena_dev", seeking: "디자이너, PM" },
    { id: 2, user: "uxlover_j", avatar: "U", color: "bg-pink-500", role: "UI/UX 디자이너", skills: ["Figma", "Framer", "UI Research"], level: "2년차", available: "전일 가능", port: "behance.net/uxlover", seeking: "풀스택 개발자" },
    { id: 3, user: "pm_jiwoo", avatar: "P", color: "bg-indigo-500", role: "프로덕트 매니저", skills: ["Notion", "제품기획", "사용자조사"], level: "신입/열정", available: "협의 가능", port: "notion.so/pm_jiwoo", seeking: "개발자, 디자이너" },
];

const podcasts = [
    { title: "스타트업 MVP의 현실 — GPT로 1일 만에 아이디어 검증하기", speaker: "김성준 · Toss 프로덕트 PM", date: "2026.03.01", time: "오후 8:00", status: "upcoming" },
    { title: "현업 개발자가 말하는 24h 해커톤 전략", speaker: "이다은 · 카카오 프론트엔드 개발자", date: "2026.02.15", time: "오후 8:00", status: "archived" },
];

type PostType = "전체" | "Q&A" | "쇼케이스" | "팀찾기" | "팁공유";

const typeColors: Record<PostType | string, string> = {
    "전체": "bg-gray-900 text-white",
    "Q&A": "bg-blue-100 text-blue-700 border border-blue-200",
    "쇼케이스": "bg-amber-100 text-amber-700 border border-amber-200",
    "팀찾기": "bg-violet-100 text-violet-700 border border-violet-200",
    "팁공유": "bg-emerald-100 text-emerald-700 border border-emerald-200",
};

const typeIcons: Record<string, string> = {
    "Q&A": "💬",
    "쇼케이스": "🏆",
    "팀찾기": "🤝",
    "팁공유": "💡",
};

export default function CommunityPage() {
    const [activeTab, setActiveTab] = useState<PostType>("전체");
    const [activeSection, setActiveSection] = useState<"lounge" | "team" | "podcast">("lounge");

    const filtered = loungePosts.filter((p) => activeTab === "전체" || p.type === activeTab);

    return (
        <div className="min-h-screen bg-[#f6f8fb]">

            {/* ── Page Header ── */}
            <div className="bg-white border-b border-gray-150">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[36px]">
                    <h1 className="text-[32px] font-extrabold text-gray-900 tracking-heading mb-[6px]">커뮤니티</h1>
                    <p className="text-[15px] text-gray-500 font-medium">해커톤 참가자, 개발자, 디자이너가 모이는 지식 허브.</p>
                </div>

                {/* Section Tabs */}
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto">
                    {[
                        { key: "lounge", label: "라운지", icon: MessageSquare },
                        { key: "team", label: "팀 빌딩 보드", icon: Users },
                        { key: "podcast", label: "팟캐스트", icon: Mic },
                    ].map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            onClick={() => setActiveSection(key as typeof activeSection)}
                            className={`flex items-center gap-2 px-[16px] py-[12px] text-[13.5px] font-semibold border-b-2 transition-colors flex-shrink-0
                ${activeSection === key
                                    ? "text-primary border-primary"
                                    : "text-gray-500 border-transparent hover:text-gray-800"
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[32px]">

                {/* ────────────── LOUNGE SECTION ────────────── */}
                {activeSection === "lounge" && (
                    <div className="flex flex-col lg:flex-row gap-[28px]">
                        {/* Main Feed */}
                        <div className="flex-1 min-w-0">
                            {/* Type filter + write button */}
                            <div className="flex items-center gap-2 mb-[20px] flex-wrap">
                                {(["전체", "Q&A", "쇼케이스", "팀찾기", "팁공유"] as PostType[]).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-[14px] py-[7px] rounded-[99px] text-[12.5px] font-bold transition-colors
                      ${activeTab === tab ? "bg-primary text-white shadow-blue" : "bg-white border border-gray-150 text-gray-600 hover:border-primary/30 hover:text-primary"}`}
                                    >
                                        {tab !== "전체" && typeIcons[tab]} {tab}
                                    </button>
                                ))}
                                <button className="ml-auto flex items-center gap-1.5 px-[14px] py-[7px] rounded-[99px] bg-gray-900 text-white text-[12.5px] font-bold hover:bg-gray-800 transition-colors">
                                    <Plus className="w-3.5 h-3.5" />
                                    글 작성하기
                                </button>
                            </div>

                            {/* Posts */}
                            <div className="space-y-[12px]">
                                {filtered.map((post, i) => (
                                    <div key={post.id} className="group bg-white rounded-[13px] border border-gray-150 p-[20px] hover:border-primary/30 hover:shadow-trust transition-all cursor-pointer animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                                        <div className="flex gap-[14px]">
                                            {/* Avatar */}
                                            <div className={`flex-shrink-0 w-[40px] h-[40px] rounded-[10px] ${post.color} flex items-center justify-center text-white font-extrabold text-[16px]`}>
                                                {post.avatar}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                {/* Meta row */}
                                                <div className="flex items-center gap-2 mb-[8px] flex-wrap">
                                                    <span className={`text-[10.5px] font-bold px-2 py-[2px] rounded ${typeColors[post.type]}`}>
                                                        {typeIcons[post.type]} {post.type}
                                                    </span>
                                                    <span className="text-[12px] font-semibold text-gray-500">@{post.user}</span>
                                                    <span className="text-[11px] text-gray-400 font-medium ml-auto">{post.time}</span>
                                                    {post.solved && <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-[1px] rounded">해결됨</span>}
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-[14.5px] font-bold text-gray-900 mb-[6px] group-hover:text-primary transition-colors leading-[1.4]">
                                                    {post.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-[12.5px] text-gray-500 font-medium leading-[1.6] mb-[10px] line-clamp-2">{post.desc}</p>

                                                {/* Tags */}
                                                <div className="flex items-center gap-[6px] flex-wrap mb-[12px]">
                                                    {post.tags.map((tag) => (
                                                        <span key={tag} className="bg-gray-75 border border-gray-150 text-gray-600 text-[11px] font-semibold px-2 py-[2px] rounded">#{tag}</span>
                                                    ))}
                                                </div>

                                                {/* Reactions */}
                                                <div className="flex items-center gap-4">
                                                    <button className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-400 hover:text-primary transition-colors">
                                                        <ThumbsUp className="w-3.5 h-3.5" />
                                                        {post.likes}
                                                    </button>
                                                    <button className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-400 hover:text-primary transition-colors">
                                                        <MessageSquare className="w-3.5 h-3.5" />
                                                        {post.replies}개 댓글
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right sidebar */}
                        <aside className="w-full lg:w-[280px] flex-shrink-0 space-y-[16px]">
                            {/* Trending */}
                            <div className="bg-white rounded-[13px] border border-gray-150 p-[18px]">
                                <div className="flex items-center gap-2 mb-[14px]">
                                    <TrendingUp className="w-4 h-4 text-primary" />
                                    <p className="text-[13px] font-bold text-gray-900">지금 뜨는 태그</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {["Next.js", "FastAPI", "OpenAI", "Supabase", "Swift", "해커톤후기", "팀찾기", "배포팁"].map((tag) => (
                                        <button key={tag} className="bg-gray-75 border border-gray-150 text-gray-700 text-[11.5px] font-semibold px-2.5 py-1 rounded-[6px] hover:border-primary/30 hover:text-primary hover:bg-primary-light transition-colors">
                                            #{tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Top contributors */}
                            <div className="bg-white rounded-[13px] border border-gray-150 p-[18px]">
                                <div className="flex items-center gap-2 mb-[14px]">
                                    <Star className="w-4 h-4 text-amber-500" />
                                    <p className="text-[13px] font-bold text-gray-900">이번 주 TOP 기여자</p>
                                </div>
                                <div className="space-y-[10px]">
                                    {[
                                        { user: "backend_kay", points: 340, color: "bg-emerald-500" },
                                        { user: "team_alpha", points: 280, color: "bg-amber-500" },
                                        { user: "dev_jihun", points: 210, color: "bg-blue-500" },
                                    ].map((u, i) => (
                                        <div key={u.user} className="flex items-center gap-2.5">
                                            <span className="text-[11px] font-bold text-gray-400 w-4">{i + 1}</span>
                                            <div className={`w-[28px] h-[28px] rounded-[7px] ${u.color} flex items-center justify-center text-white text-[11px] font-extrabold flex-shrink-0`}>
                                                {u.user.charAt(0).toUpperCase()}
                                            </div>
                                            <p className="text-[12.5px] font-semibold text-gray-700 flex-1">@{u.user}</p>
                                            <span className="text-[11px] font-bold text-primary">{u.points}pt</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Upcoming hackathon */}
                            <div className="bg-[#0f1623] rounded-[13px] border border-white/[0.08] p-[18px]">
                                <div className="flex items-center gap-2 mb-[12px]">
                                    <Zap className="w-4 h-4 text-primary" />
                                    <p className="text-[13px] font-bold text-white">다음 해커톤 D-18</p>
                                </div>
                                <p className="text-[12px] text-gray-500 font-medium mb-[14px]">청년 지원 정책 플랫폼 프론트+대시보드 · 상금 250만원</p>
                                <Link href="/contests/4" className="flex items-center justify-center gap-1.5 bg-primary text-white text-[12.5px] font-bold px-4 py-2.5 rounded-[8px] hover:bg-primary-hover transition-colors w-full">
                                    참가하기 <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </aside>
                    </div>
                )}

                {/* ────────────── TEAM BOARD SECTION ────────────── */}
                {activeSection === "team" && (
                    <div>
                        <div className="flex items-center justify-between mb-[24px]">
                            <div>
                                <h2 className="text-[22px] font-extrabold text-gray-900 tracking-heading">팀 빌딩 보드</h2>
                                <p className="text-[13.5px] text-gray-500 font-medium mt-1">해커톤 파트너를 찾고 있나요? 원하는 포지션을 등록하거나 팀원을 스카우트하세요.</p>
                            </div>
                            <button className="flex items-center gap-1.5 bg-primary text-white px-[16px] py-[10px] rounded-[10px] text-[13px] font-bold hover:bg-primary-hover transition-colors shadow-blue">
                                <Plus className="w-4 h-4" />
                                내 프로필 등록
                            </button>
                        </div>

                        {/* Role filter */}
                        <div className="flex items-center gap-2 mb-[20px] flex-wrap">
                            {["전체", "풀스택 개발자", "프론트엔드", "백엔드", "UI/UX 디자이너", "PM/기획", "ML 엔지니어"].map((role, i) => (
                                <button key={role} className={`px-[12px] py-[6px] rounded-[99px] text-[12px] font-semibold border transition-colors ${i === 0 ? "bg-primary text-white border-primary shadow-blue" : "bg-white border-gray-200 text-gray-600 hover:border-primary/30 hover:text-primary"}`}>
                                    {role}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                            {teamBoard.map((member, i) => (
                                <div key={member.id} className="bg-white rounded-[14px] border border-gray-150 p-[22px] hover:border-primary/30 hover:shadow-trust-md transition-all animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                                    <div className="flex items-start gap-3 mb-[16px]">
                                        <div className={`w-[48px] h-[48px] rounded-[12px] ${member.color} flex items-center justify-center text-white font-extrabold text-[20px] flex-shrink-0`}>
                                            {member.avatar}
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-bold text-gray-900">@{member.user}</p>
                                            <p className="text-[12.5px] font-semibold text-primary">{member.role}</p>
                                            <p className="text-[11.5px] text-gray-400 font-medium mt-[2px]">{member.level} · {member.available}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 mb-[14px]">
                                        {member.skills.map((s) => (
                                            <span key={s} className="bg-gray-75 border border-gray-150 text-gray-600 text-[11px] font-semibold px-2 py-[2px] rounded">{s}</span>
                                        ))}
                                    </div>

                                    <div className="pt-[12px] border-t border-gray-100 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10.5px] text-gray-400 font-medium">구하는 팀원</p>
                                            <p className="text-[12px] font-bold text-gray-700">{member.seeking}</p>
                                        </div>
                                        <button className="bg-primary text-white text-[12px] font-bold px-[14px] py-[8px] rounded-[8px] hover:bg-primary-hover transition-colors shadow-blue">
                                            DM 보내기
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ────────────── PODCAST SECTION ────────────── */}
                {activeSection === "podcast" && (
                    <div>
                        <div className="flex items-center justify-between mb-[24px]">
                            <div>
                                <h2 className="text-[22px] font-extrabold text-gray-900 tracking-heading">팟캐스트 라이브</h2>
                                <p className="text-[13.5px] text-gray-500 font-medium mt-1">월 1회 현업 연사자 초청 라이브 세션. 진행자 + 연사만 발언, 청중은 채팅 참여.</p>
                            </div>
                        </div>

                        <div className="space-y-[16px]">
                            {podcasts.map((ep, i) => (
                                <div key={i} className={`bg-white rounded-[14px] border p-[24px] flex gap-[20px] items-center transition-all animate-fade-in-up
                  ${ep.status === "upcoming" ? "border-primary/30 shadow-trust-md" : "border-gray-150 hover:border-gray-200 hover:shadow-trust"}`}
                                    style={{ animationDelay: `${i * 80}ms` }}>
                                    <div className={`w-[60px] h-[60px] rounded-[14px] flex items-center justify-center flex-shrink-0 ${ep.status === "upcoming" ? "bg-primary" : "bg-gray-100"}`}>
                                        <Mic className={`w-6 h-6 ${ep.status === "upcoming" ? "text-white" : "text-gray-400"}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-[6px]">
                                            {ep.status === "upcoming"
                                                ? <span className="bg-primary text-white text-[10.5px] font-bold px-2 py-[2px] rounded flex items-center gap-1"><span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse-soft" />예정</span>
                                                : <span className="bg-gray-100 text-gray-500 text-[10.5px] font-bold px-2 py-[2px] rounded">아카이브</span>
                                            }
                                            <span className="text-[12px] text-gray-400 font-medium">{ep.date} · {ep.time}</span>
                                        </div>
                                        <p className="text-[15px] font-bold text-gray-900 mb-[4px] leading-[1.4]">{ep.title}</p>
                                        <p className="text-[12.5px] text-gray-500 font-medium">{ep.speaker}</p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        {ep.status === "upcoming"
                                            ? <button className="bg-primary text-white text-[13px] font-bold px-[20px] py-[10px] rounded-[10px] hover:bg-primary-hover transition-colors shadow-blue">참가 등록</button>
                                            : <button className="bg-gray-100 text-gray-700 text-[13px] font-bold px-[20px] py-[10px] rounded-[10px] hover:bg-gray-200 transition-colors">다시 보기</button>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, LogOut, User } from "lucide-react";
import { useAuth } from "@/lib/useAuth";

export default function Navigation() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isAuthenticated, isLoading } = useAuth();

    return (
        <>
            <nav className="bg-white border-b border-[--border] w-full">
                <div className="max-w-[1240px] mx-auto px-4 lg:px-6 flex items-center h-[72px] gap-8">

                    {/* Logo */}
                    <Link href="/" className="flex flex-shrink-0 items-center">
                        <span className="text-[22px] font-black text-[#222222] tracking-tighter">
                            하이픈<span className="text-[#FF5000]">소싱</span>
                        </span>
                    </Link>

                    {/* Main Navigation (Middle Left) */}
                    <div className="hidden md:flex items-center gap-6 ml-6">
                        {[
                            { label: "해커톤 리스트", href: "/contests" },
                            { label: "역대 수상작", href: "/winners" }
                        ].map((item, i) => {
                            const isActive = pathname.startsWith(item.href) && item.href !== "/";
                            return (
                                <Link
                                    key={i}
                                    href={item.href}
                                    className={`h-[72px] flex items-center text-[15px] font-bold transition-colors
                     ${isActive ? "text-[#FF5000]" : "text-[#222222] hover:text-[#FF5000]"}`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Search, Login, CTA (Right) */}
                    <div className="flex items-center gap-4 ml-auto">

                        {/* Simple input representing Loud Search */}
                        <div className="hidden lg:flex relative items-center">
                            <input
                                type="text"
                                placeholder="디자인, 개발 검색"
                                className="w-[200px] h-[40px] border-b-2 border-[#222222] bg-transparent outline-none text-[14px] text-[#222222] pl-1 pr-8 placeholder:text-[#999999]"
                            />
                            <Search className="w-[18px] h-[18px] text-[#222222] absolute right-1" />
                        </div>

                        <div className="flex items-center gap-4 ml-2">
                            {isLoading ? (
                                <div className="h-5 w-20 bg-gray-200 animate-pulse rounded" />
                            ) : isAuthenticated ? (
                                <>
                                    <Link href="/profile" className="flex items-center gap-1 text-[13px] font-bold text-[#666666] hover:text-[#222222]">
                                        <User className="w-4 h-4" />
                                        {user?.name || "마이페이지"}
                                    </Link>
                                    <button
                                        onClick={async () => {
                                            await fetch("/api/auth/logout", { method: "POST" });
                                            window.location.href = "/";
                                        }}
                                        className="flex items-center gap-1 text-[13px] font-bold text-[#999999] hover:text-[#666666]"
                                    >
                                        <LogOut className="w-4 h-4" /> 로그아웃
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="text-[13px] font-bold text-[#666666] hover:text-[#222222]">
                                        로그인
                                    </Link>
                                    <Link href="/signup" className="text-[13px] font-bold text-[#666666] hover:text-[#222222]">
                                        회원가입
                                    </Link>
                                </>
                            )}

                            {user?.role === "CLIENT" ? (
                                <Link href="/contests/create" className="btn-primary h-[40px] text-[13px] px-4 font-bold tracking-tight shadow-none ml-2">
                                    콘테스트 개최
                                </Link>
                            ) : (
                                <Link href="/contests" className="bg-white border border-[#E5E5E5] text-[#333333] hover:bg-[#F8F9FA] h-[40px] text-[13px] px-4 font-bold tracking-tight shadow-none ml-2 flex items-center justify-center">
                                    해커톤 찾아보기
                                </Link>
                            )}
                        </div>
                    </div>

                </div>
            </nav>
        </>
    );
}

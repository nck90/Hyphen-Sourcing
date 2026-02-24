"use client";
import React, { useState, useEffect } from "react";
import { Camera, CheckCircle2, Shield, AlertCircle, FileText, Upload, Briefcase, Award } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/useAuth";

export default function Profile() {
    const { user, isAuthenticated, isLoading: isAuthLoading, mutate } = useAuth();
    const [activeTab, setActiveTab] = useState("학생 인증");
    const [verificationStatus, setVerificationStatus] = useState<"pending" | "approved" | "none">("none");

    // Profile form states
    const [bio, setBio] = useState("");
    const [jobRole, setJobRole] = useState("개발자");
    const [portfolioUrl, setPortfolioUrl] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setBio(user.bio || "");
            setJobRole(user.jobRole || "개발자");
            setPortfolioUrl(user.portfolioUrl || "");
        }
    }, [user]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/users/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bio, jobRole, portfolioUrl }),
            });
            if (res.ok) {
                await mutate();
                alert("계정 정보가 성공적으로 변경되었습니다.");
            } else {
                alert("정보 변경에 실패했습니다.");
            }
        } catch (e) {
            alert("네트워크 오류 발생");
        } finally {
            setIsSaving(false);
        }
    };

    const handleWithdrawal = async () => {
        if (!confirm("정말 하이픈소싱을 탈퇴하시겠습니까? 관련 데이터가 모두 삭제되며 복구할 수 없습니다.")) return;
        try {
            const res = await fetch("/api/users/profile/withdrawal", { method: "DELETE" });
            if (res.ok) {
                alert("회원 탈퇴가 완료되었습니다.");
                window.location.href = "/";
            } else {
                alert("회원 탈퇴에 실패했습니다.");
            }
        } catch (e) {
            alert("네트워크 오류 발생");
        }
    };

    if (isAuthLoading) return <div className="min-h-screen pt-40 px-4 text-center">로딩 중...</div>;
    if (!isAuthenticated) return <div className="min-h-screen pt-40 px-4 text-center">로그인이 필요합니다.</div>;

    return (
        <div className="min-h-screen bg-[#F5F5F5] font-sans pb-[100px]">

            {/* ── Loud.kr 스타일 상단 타이틀 바 (마이페이지) ── */}
            <div className="bg-[#222222] text-white py-[40px] px-4 text-center">
                <h1 className="text-[32px] font-black tracking-[-1px]">마이페이지</h1>
                <p className="text-[15px] text-[#BBBBBB] mt-2 tracking-[-0.5px]">
                    포트폴리오 관리 기회 및 콘테스트 수익 설정을 진행하세요
                </p>
            </div>

            <div className="bg-white border-b border-[#E5E5E5] mb-[40px] flex items-center justify-center p-[40px]">
                <div className="max-w-[1000px] w-full flex flex-col md:flex-row items-center gap-[24px]">

                    {/* 프로필 이미지 (Loud Square) */}
                    <div className="w-[100px] h-[100px] bg-[#F8F9FA] border border-[#E5E5E5] flex items-center justify-center relative cursor-pointer group">
                        <span className="text-[36px] font-black text-[#999999]">{user?.name ? user.name[0] : ""}</span>
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
                            <h2 className="text-[24px] font-bold text-[#222222] tracking-tighter">
                                {user?.name || ""} ({jobRole})
                            </h2>

                            {/* Loud 뱃지 */}
                            {verificationStatus === "approved" ? (
                                <span className="bg-[#FF5000] text-white text-[11px] font-bold px-1.5 py-0.5 ml-1 flex items-center gap-1 w-max">
                                    인증완료
                                </span>
                            ) : verificationStatus === "pending" ? (
                                <span className="bg-[#FFB020] text-white text-[11px] font-bold px-1.5 py-0.5 ml-1 flex items-center gap-1 w-max">
                                    심사 중
                                </span>
                            ) : (
                                <span className="bg-[#999999] text-white text-[11px] font-bold px-1.5 py-0.5 ml-1 flex items-center gap-1 w-max">
                                    학생 미인증
                                </span>
                            )}
                        </div>

                        <p className="text-[14px] text-[#666666] mb-3">{user?.email}</p>

                        <div className="flex gap-2 justify-center md:justify-start">
                            <button onClick={() => alert("공개 프로필 뷰어 페이지 준비중입니다.")} className="bg-white border border-[#E5E5E5] text-[#333333] hover:bg-[#F8F9FA] font-bold text-[12px] h-[36px] px-4 transition-colors">
                                공개 프로필 확인
                            </button>
                            <button onClick={() => alert("포트폴리오 문서/링크 업로드 모달이 열립니다.")} className="bg-[#FF5000] text-white hover:bg-[#E64800] font-bold text-[12px] h-[36px] px-4 transition-colors">
                                포트폴리오 업로드
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1000px] mx-auto px-4 flex flex-col md:flex-row gap-8 items-start">

                {/* ── 좌측 탭 영역 (Loud Vertical Tabs) ── */}
                <aside className="w-full md:w-[220px] shrink-0 bg-white border border-[#E5E5E5]">
                    <ul className="divide-y divide-[#E5E5E5]">
                        {["학생 인증", "이력 및 포트폴리오", "계정 설정"].map((tab) => (
                            <li key={tab}>
                                <button
                                    onClick={() => setActiveTab(tab)}
                                    className={`w-full text-left px-5 py-4 text-[14px] font-bold transition-colors border-l-4
                        ${activeTab === tab ? "border-l-[#FF5000] text-[#FF5000] bg-[#F8F9FA]" : "border-l-transparent text-[#666666] hover:bg-[#F8F9FA]"}`}
                                >
                                    {tab}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* ── 우측 메인 콘텐츠 (Boxy Data Views) ── */}
                <main className="flex-1 w-full bg-white border border-[#E5E5E5] p-6 lg:p-10 min-h-[500px]">

                    {activeTab === "학생 인증" && (
                        <div className="animate-fade-in max-w-[600px]">
                            <h2 className="text-[20px] font-bold text-[#222222] border-b-2 border-[#222222] pb-4 mb-6 tracking-tighter">
                                학생 인증 및 계좌 정보
                            </h2>
                            <p className="text-[13px] text-[#666666] mb-8 leading-[1.6]">
                                하이픈소싱에서 상금을 수령하기 위해서는 정확한 신분 확인 및 본인 명의 계좌 등록이 필요합니다.
                            </p>

                            <div className="bg-[#F8F9FA] border border-[#E5E5E5] p-8 text-center flex flex-col items-center">

                                {verificationStatus === "none" && (
                                    <>
                                        <div className="w-[80px] h-[80px] bg-white border border-[#E5E5E5] flex items-center justify-center mb-4">
                                            <FileText className="w-8 h-8 text-[#999999]" />
                                        </div>
                                        <h3 className="text-[16px] font-bold text-[#222222] mb-2">학생증 이미지 업로드</h3>
                                        <p className="text-[12px] text-[#999999] mb-6 max-w-[400px]">
                                            스캔된 학생증 전면부 이미지를 업로드하세요. (JPG/PNG, 최대 10MB)
                                        </p>
                                        <button
                                            onClick={() => setVerificationStatus("pending")}
                                            className="bg-[#333333] hover:bg-[#222222] text-white px-6 h-[48px] font-bold flex items-center gap-2 text-[14px] transition-colors"
                                        >
                                            <Upload className="w-4 h-4" /> 파일 업로드
                                        </button>
                                    </>
                                )}

                                {verificationStatus === "pending" && (
                                    <>
                                        <div className="w-[80px] h-[80px] bg-white border border-[#E5E5E5] flex items-center justify-center mb-4">
                                            <AlertCircle className="w-8 h-8 text-[#FFB020]" />
                                        </div>
                                        <h3 className="text-[16px] font-bold text-[#222222] mb-2">인증 심사 대기중</h3>
                                        <p className="text-[12px] text-[#999999]">
                                            24~48시간 이내에 관리자가 확인하여 처리할 예정입니다.
                                        </p>
                                    </>
                                )}

                                {verificationStatus === "approved" && (
                                    <>
                                        <div className="w-[80px] h-[80px] bg-white border border-[#FF5000] flex items-center justify-center mb-4 text-[#FF5000]">
                                            <CheckCircle2 className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-[16px] font-bold text-[#222222] mb-2">인증 완료 계정</h3>
                                        <p className="text-[12px] text-[#999999] mb-6">
                                            현재 콘테스트 참여 및 상금 수령이 가능합니다.
                                        </p>
                                        <Link href="/contests" className="bg-[#FF5000] hover:bg-[#E64800] text-white px-6 h-[48px] font-bold flex items-center justify-center text-[14px]">
                                            콘테스트 찾아보기
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "이력 및 포트폴리오" && (
                        <div className="animate-fade-in">
                            <h2 className="text-[20px] font-bold text-[#222222] border-b-2 border-[#222222] pb-4 mb-6 tracking-tighter">
                                포트폴리오 요약
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <div className="flex-1 bg-[#F8F9FA] border border-[#E5E5E5] p-6 text-center">
                                    <p className="text-[12px] font-bold text-[#666666] mb-1">참여 완료 프로젝트</p>
                                    <p className="text-[28px] font-black text-[#FF5000]">0<span className="text-[14px] font-bold ml-1 text-[#222222]">건</span></p>
                                </div>
                                <div className="flex-1 bg-[#F8F9FA] border border-[#E5E5E5] p-6 text-center">
                                    <p className="text-[12px] font-bold text-[#666666] mb-1">상금 수령 총액</p>
                                    <p className="text-[28px] font-black text-[#FF5000]">0<span className="text-[14px] font-bold ml-1 text-[#222222]">원</span></p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center py-[80px] bg-[#F8F9FA] border border-[#E5E5E5] border-dashed">
                                <Briefcase className="w-10 h-10 text-[#CCCCCC] mb-3" />
                                <p className="text-[14px] font-bold text-[#999999]">등록된 포트폴리오 내역이 없습니다</p>
                            </div>
                        </div>
                    )}

                    {activeTab === "계정 설정" && (
                        <div className="animate-fade-in max-w-[500px]">
                            <h2 className="text-[20px] font-bold text-[#222222] border-b-2 border-[#222222] pb-4 mb-6 tracking-tighter">
                                회원 정보 변경
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[14px] font-bold text-[#222222] mb-2">이메일 계정</label>
                                    <input type="text" value={user?.email || ""} disabled className="input-loud bg-[#F5F5F5] text-[#999999] cursor-not-allowed" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[14px] font-bold text-[#222222] mb-2">이름</label>
                                        <input type="text" value={user?.name || ""} disabled className="input-loud bg-[#F5F5F5] text-[#999999] cursor-not-allowed" />
                                    </div>
                                    <div>
                                        <label className="block text-[14px] font-bold text-[#222222] mb-2">전화번호</label>
                                        <input type="text" value={user?.phone || ""} disabled className="input-loud bg-[#F5F5F5] text-[#999999] cursor-not-allowed" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[14px] font-bold text-[#222222] mb-2">직군</label>
                                    <select value={jobRole} onChange={(e) => setJobRole(e.target.value)} className="input-loud">
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
                                    <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} className="input-loud focus:border-[#FF5000]" />
                                </div>
                                <div>
                                    <label className="block text-[14px] font-bold text-[#222222] mb-2">포트폴리오 주소</label>
                                    <input type="text" value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} className="input-loud focus:border-[#FF5000]" placeholder="https://" />
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-[#E5E5E5] flex justify-between items-center">
                                <button type="button" onClick={handleWithdrawal} className="text-[#FF5000] font-bold text-[13px] hover:underline cursor-pointer">
                                    회원 탈퇴
                                </button>
                                <button type="button" onClick={handleSave} disabled={isSaving} className="bg-[#333333] hover:bg-[#222222] text-white font-bold text-[14px] h-[48px] px-8 transition-colors disabled:opacity-50">
                                    {isSaving ? "저장 중..." : "변경사항 저장"}
                                </button>
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}

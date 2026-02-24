"use client";

import { useState } from "react";
import { Users, User, Plus, Search, CheckCircle2, ChevronRight, Copy, Link as LinkIcon } from "lucide-react";
import { useParams } from "next/navigation";

// DUMMY removed

export default function ContestApplyPage() {
    const params = useParams();
    const contestId = params.id as string;
    const [entryMode, setEntryMode] = useState<"individual" | "team" | null>("team");
    const [teamMode, setTeamMode] = useState<"create" | "join">("create");

    // Create Team State
    const [teamName, setTeamName] = useState("");
    const [teamDesc, setTeamDesc] = useState("");
    const [inviteCode, setInviteCode] = useState<string | null>(null);
    const [createdTeamId, setCreatedTeamId] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    // Join Team State
    const [joinCode, setJoinCode] = useState("");
    const [isJoining, setIsJoining] = useState(false);

    // Application state
    const [isApplying, setIsApplying] = useState(false);

    const handleCreateTeam = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!teamName) return;
        setIsCreating(true);

        try {
            const res = await fetch("/api/teams", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: teamName, contestId }),
            });
            const data = await res.json();
            if (res.ok) {
                setInviteCode(data.team.inviteCode);
                setCreatedTeamId(data.team.id);
            } else {
                alert(data.error || "팀 생성에 실패했습니다.");
            }
        } catch (error) {
            alert("네트워크 오류 발생");
        } finally {
            setIsCreating(false);
        }
    };

    const handleCopyLink = () => {
        if (inviteCode) {
            navigator.clipboard.writeText(inviteCode);
            alert("초대 코드가 복사되었습니다!");
        }
    };

    const handleJoinTeam = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!joinCode) return;
        setIsJoining(true);

        try {
            const res = await fetch("/api/teams/join", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ inviteCode: joinCode }),
            });
            const data = await res.json();
            if (res.ok) {
                alert("팀에 성공적으로 합류했습니다!");
            } else {
                alert(data.error || "팀 합류에 실패했습니다.");
            }
        } catch (error) {
            alert("네트워크 오류 발생");
        } finally {
            setIsJoining(false);
        }
    };

    const handleFinalSubmit = async (teamIdToUse?: string) => {
        setIsApplying(true);
        try {
            const isIndividual = entryMode === "individual";
            const reqBody = {
                contestId,
                isIndividual,
                teamId: isIndividual ? undefined : teamIdToUse,
            };

            const res = await fetch("/api/applications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reqBody),
            });
            const data = await res.json();

            if (res.ok) {
                alert("참가 신청이 완료되었습니다!");
                // Could redirect back to contest detail page here
                window.location.href = `/contests/${contestId}`;
            } else {
                alert(data.error || "신청에 실패했습니다.");
            }
        } catch (error) {
            alert("네트워크 오류 발생");
        } finally {
            setIsApplying(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-[100px] pb-[120px]">
            <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-[40px] animate-fade-in-up">
                    <h1 className="text-[32px] sm:text-[40px] font-bold text-gray-900 tracking-[-0.03em] mb-2 leading-tight">
                        콘테스트 참가 신청
                    </h1>
                    <p className="text-[16px] text-gray-500 font-medium tracking-[-0.01em]">
                        개인으로 참가할지, 아니면 팀으로 참가할지 선택해주세요.
                    </p>
                </div>

                {/* Entry Mode Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mb-[40px] animate-fade-in-up delay-100">
                    <button
                        onClick={() => setEntryMode("team")}
                        className={`p-[24px] rounded-[24px] border ${entryMode === "team" ? "border-primary bg-blue-50/50 ring-1 ring-primary" : "border-gray-200 bg-white"} text-left transition-all hover:border-primary/50`}
                    >
                        <div className={`w-[48px] h-[48px] rounded-full flex items-center justify-center mb-[16px] ${entryMode === "team" ? "bg-primary text-white" : "bg-gray-100 text-gray-500"}`}>
                            <Users className="w-6 h-6" />
                        </div>
                        <h3 className="text-[18px] font-bold text-gray-900 mb-[4px]">팀으로 참가</h3>
                        <p className="text-[14px] text-gray-500">새로운 팀을 만들거나 기존 팀에 합류합니다.</p>
                    </button>

                    <button
                        onClick={() => setEntryMode("individual")}
                        className={`p-[24px] rounded-[24px] border ${entryMode === "individual" ? "border-primary bg-blue-50/50 ring-1 ring-primary" : "border-gray-200 bg-white"} text-left transition-all hover:border-primary/50`}
                    >
                        <div className={`w-[48px] h-[48px] rounded-full flex items-center justify-center mb-[16px] ${entryMode === "individual" ? "bg-primary text-white" : "bg-gray-100 text-gray-500"}`}>
                            <User className="w-6 h-6" />
                        </div>
                        <h3 className="text-[18px] font-bold text-gray-900 mb-[4px]">개인으로 참가</h3>
                        <p className="text-[14px] text-gray-500">팀 없이 혼자서 콘테스트에 도전합니다.</p>
                    </button>
                </div>

                {/* Team Building Section */}
                {entryMode === "team" && (
                    <div className="bg-white rounded-[24px] shadow-apple border border-gray-100 overflow-hidden animate-fade-in-up delay-200">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => setTeamMode("create")}
                                className={`flex-1 py-[20px] text-[16px] font-bold transition-colors ${teamMode === "create" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-900"}`}
                            >
                                새로운 팀 만들기
                            </button>
                            <button
                                onClick={() => setTeamMode("join")}
                                className={`flex-1 py-[20px] text-[16px] font-bold transition-colors ${teamMode === "join" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-900"}`}
                            >
                                기존 팀에 합류하기
                            </button>
                        </div>

                        <div className="p-[32px] sm:p-[40px]">
                            {/* Create Team Tab */}
                            {teamMode === "create" && (
                                <div>
                                    <h2 className="text-[20px] font-bold text-gray-900 mb-[24px]">어떤 팀을 만들고 싶으신가요?</h2>
                                    <form onSubmit={handleCreateTeam} className="space-y-[24px]">
                                        <div>
                                            <label className="block text-[15px] font-bold text-gray-900 mb-[12px]">팀 이름</label>
                                            <input
                                                type="text"
                                                value={teamName}
                                                onChange={(e) => setTeamName(e.target.value)}
                                                placeholder="멋진 팀 이름을 지어주세요"
                                                className="w-full rounded-[14px] border border-gray-200 px-[16px] py-[16px] text-[16px] focus:border-primary outline-none transition-all shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[15px] font-bold text-gray-900 mb-[12px]">팀 소개 및 목표</label>
                                            <textarea
                                                value={teamDesc}
                                                onChange={(e) => setTeamDesc(e.target.value)}
                                                placeholder="어떤 프로젝트를 만들고 싶은지, 어떤 팀원을 찾는지 간단히 적어주세요."
                                                rows={4}
                                                className="w-full rounded-[14px] border border-gray-200 px-[16px] py-[16px] text-[16px] focus:border-primary outline-none transition-all shadow-sm resize-none"
                                            />
                                        </div>

                                        {!inviteCode ? (
                                            <button
                                                type="submit"
                                                disabled={!teamName || isCreating}
                                                className="w-full bg-gray-900 text-white py-[18px] rounded-[14px] font-bold text-[16px] hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                <Plus className="w-5 h-5" /> {isCreating ? "팀 생성 중..." : "팀 생성 및 초대 코드 발급"}
                                            </button>
                                        ) : (
                                            <div className="bg-blue-50 rounded-[16px] p-[24px] border border-blue-100 flex flex-col items-center text-center animate-fade-in-up">
                                                <div className="w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center mb-[16px] shadow-sm text-primary">
                                                    <CheckCircle2 className="w-8 h-8" />
                                                </div>
                                                <h3 className="text-[18px] font-bold text-gray-900 mb-[8px]">팀이 성공적으로 생성되었습니다!</h3>
                                                <p className="text-[14px] text-gray-600 mb-[24px]">아래 링크를 복사하여 함께할 팀원들을 초대하세요.</p>

                                                <div className="w-full flex flex-col sm:flex-row items-center gap-[8px]">
                                                    <div className="w-full sm:flex-1 bg-white border border-gray-200 rounded-[12px] px-[16px] py-[14px] flex items-center gap-2 overflow-hidden justify-center text-center">
                                                        <span className="text-[20px] text-primary font-black tracking-widest">{inviteCode}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={handleCopyLink}
                                                        className="w-full sm:w-auto px-[20px] py-[14px] bg-primary text-white rounded-[12px] font-bold text-[14px] hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 flex-shrink-0"
                                                    >
                                                        <Copy className="w-4 h-4" /> 복사
                                                    </button>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => handleFinalSubmit(createdTeamId!)}
                                                    disabled={isApplying}
                                                    className="mt-[24px] text-[15px] font-bold text-gray-900 flex items-center gap-1 hover:text-primary transition-colors disabled:opacity-50"
                                                >
                                                    {isApplying ? "참가 신청 중..." : "팀으로 참가 신청 완료하기"} <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            )}

                            {teamMode === "join" && (
                                <div>
                                    <div className="mb-[24px]">
                                        <h2 className="text-[20px] font-bold text-gray-900 mb-[8px]">초대 코드로 합류하기</h2>
                                        <p className="text-[14px] text-gray-500">팀장에게 전달받은 6자리 초대 코드를 입력해주세요.</p>
                                    </div>

                                    <form onSubmit={handleJoinTeam} className="space-y-[24px]">
                                        <div>
                                            <input
                                                type="text"
                                                value={joinCode}
                                                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                                                placeholder="초대 코드 입력 (예: AB12CD)"
                                                maxLength={6}
                                                className="w-full rounded-[14px] border border-gray-200 px-[16px] py-[16px] text-[18px] font-bold text-center tracking-widest focus:border-primary outline-none transition-all shadow-sm uppercase"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={!joinCode || joinCode.length < 6 || isJoining}
                                            className="w-full bg-primary text-white py-[18px] rounded-[14px] font-bold text-[16px] hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {isJoining ? "확인 중..." : "팀 합류하기"}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Individual Entry Summary */}
                {entryMode === "individual" && (
                    <div className="bg-white rounded-[24px] shadow-apple border border-gray-100 p-[32px] sm:p-[40px] animate-fade-in-up delay-200 flex flex-col items-center text-center">
                        <div className="w-[64px] h-[64px] bg-blue-50 rounded-full flex items-center justify-center mb-[24px] text-primary">
                            <User className="w-8 h-8" />
                        </div>
                        <h2 className="text-[20px] font-bold text-gray-900 mb-[12px]">개인으로 참가 준비 완료!</h2>
                        <p className="text-[15px] text-gray-500 mb-[32px] max-w-[400px]">
                            팀 없이 혼자서 이 콘테스트에 도전하시겠습니까? 신청 후에도 언제든지 새로운 팀을 만들거나 합류할 수 있습니다.
                        </p>
                        <button
                            onClick={() => handleFinalSubmit()}
                            disabled={isApplying}
                            className="px-[32px] py-[18px] bg-primary text-white rounded-[14px] font-bold text-[16px] hover:-translate-y-0.5 transition-all shadow-[0_8px_20px_rgba(49,130,246,0.3)] hover:shadow-[0_12px_28px_rgba(49,130,246,0.4)] disabled:opacity-50"
                        >
                            {isApplying ? "신청 중..." : "최종 참가 신청하기"}
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}

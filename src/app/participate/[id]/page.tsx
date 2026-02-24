"use client";

import { useState } from "react";
import Link from "next/link";
import { Upload, Users, User, ArrowLeft, CheckCircle2, AlertCircle, FileText, Check } from "lucide-react";

export default function ParticipatePage({ params }: { params: { id: string } }) {
    const [participationType, setParticipationType] = useState<"individual" | "team">("individual");
    const [step, setStep] = useState(1);

    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-16 z-40">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={`/contests/${params.id}`} className="p-2 -ml-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-[18px] font-bold text-slate-900 truncate max-w-[200px] sm:max-w-md md:max-w-lg">
                            콘테스트 참여하기
                        </h1>
                    </div>
                    <div className="flex items-center gap-3 text-[14px] font-semibold">
                        <div className="flex items-center gap-2">
                            <span className={`flex items-center justify-center w-[22px] h-[22px] rounded-full text-[12px] ${step >= 1 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
                                {step > 1 ? <Check className="w-3 h-3" /> : '1'}
                            </span>
                            <span className={`hidden sm:inline ${step >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>신원 및 팀 설정</span>
                        </div>
                        <span className="w-6 border-t-[2px] border-slate-200 mx-1"></span>
                        <div className="flex items-center gap-2">
                            <span className={`flex items-center justify-center w-[22px] h-[22px] rounded-full text-[12px] ${step >= 2 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>2</span>
                            <span className={`hidden sm:inline ${step >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>아이디어 제출</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-10 md:py-16">
                {step === 1 ? (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Step 1: Team & ID Verification */}
                        <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8 sm:p-10">
                            <h2 className="text-[20px] font-bold text-slate-900 mb-8 font-headings text-center sm:text-left">
                                1. 참여 방식 설정
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label className={`relative flex flex-col items-center justify-center p-8 rounded-[20px] border-[2px] cursor-pointer transition-all duration-200 ${participationType === 'individual' ? 'border-primary bg-primary/5 shadow-sm transform -translate-y-0.5' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                                    <input
                                        type="radio"
                                        name="type"
                                        className="absolute opacity-0"
                                        checked={participationType === 'individual'}
                                        onChange={() => setParticipationType('individual')}
                                    />
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors ${participationType === 'individual' ? 'bg-primary/10' : 'bg-slate-100'}`}>
                                        <User className={`w-6 h-6 ${participationType === 'individual' ? 'text-primary' : 'text-slate-400'}`} />
                                    </div>
                                    <span className="font-bold text-slate-900 text-[18px]">개인 참여</span>
                                    <span className="text-[14px] text-slate-500 mt-1">혼자서 모든 과정을 진행합니다.</span>
                                    {participationType === 'individual' && <CheckCircle2 className="absolute top-5 right-5 text-primary w-5 h-5 animate-in zoom-in" />}
                                </label>

                                <label className={`relative flex flex-col items-center justify-center p-8 rounded-[20px] border-[2px] cursor-pointer transition-all duration-200 ${participationType === 'team' ? 'border-primary bg-primary/5 shadow-sm transform -translate-y-0.5' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                                    <input
                                        type="radio"
                                        name="type"
                                        className="absolute opacity-0"
                                        checked={participationType === 'team'}
                                        onChange={() => setParticipationType('team')}
                                    />
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors ${participationType === 'team' ? 'bg-primary/10' : 'bg-slate-100'}`}>
                                        <Users className={`w-6 h-6 ${participationType === 'team' ? 'text-primary' : 'text-slate-400'}`} />
                                    </div>
                                    <span className="font-bold text-slate-900 text-[18px]">팀 참여</span>
                                    <span className="text-[14px] text-slate-500 mt-1 text-center">동료를 초대하거나 새 팀원을 찾습니다.</span>
                                    {participationType === 'team' && <CheckCircle2 className="absolute top-5 right-5 text-primary w-5 h-5 animate-in zoom-in" />}
                                </label>
                            </div>

                            {participationType === 'team' && (
                                <div className="mt-6 p-6 bg-slate-50 rounded-[16px] border border-slate-100 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-300">
                                    <h3 className="font-bold text-slate-800 text-[14px]">팀 빌딩 (선택)</h3>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button className="flex-1 bg-white border border-slate-200 rounded-[12px] py-3 text-[14px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                                            초대 링크 복사
                                        </button>
                                        <button className="flex-1 bg-slate-800 border border-transparent rounded-[12px] py-3 text-[14px] font-semibold text-white hover:bg-slate-700 transition-colors shadow-sm">
                                            팀원 구인 게시판 이동
                                        </button>
                                    </div>
                                    <p className="text-[13px] text-slate-500 font-medium">
                                        * 대표자 1명이 대표로 아이디어를 일괄 제출하게 됩니다.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8 sm:p-10">
                            <h2 className="text-[20px] font-bold text-slate-900 mb-6 font-headings">
                                2. 학생증 인증 <span className="text-primary text-[14px] ml-1 px-2 py-0.5 bg-primary/10 rounded-full font-semibold">필수</span>
                            </h2>
                            <div className="bg-blue-50/50 border border-blue-100/50 text-blue-800 text-[14px] p-5 rounded-[16px] flex items-start gap-3 mb-8">
                                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-500" />
                                <p className="leading-relaxed font-medium">
                                    본 콘테스트는 대학생만 참여 가능한 프로젝트입니다. 재학 및 휴학 증명서, 혹은 학생증 앞면을 업로드 해주세요. 제출된 정보는 심사 직후 즉시 폐기됩니다.
                                </p>
                            </div>

                            <div className="border-[2px] border-dashed border-slate-200 rounded-[20px] p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer group">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.06)] mb-5 group-hover:scale-110 transition-transform duration-300">
                                    <Upload className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors duration-300" />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-2 text-[16px]">파일 업로드</h4>
                                <p className="text-[14px] text-slate-500 mb-6 text-center leading-relaxed">
                                    클릭하거나 파일을 여기로 드래그 앤 드롭 하세요.<br />
                                    <span className="text-[13px]">JPG, PNG, PDF 최대 10MB</span>
                                </p>
                                <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-full text-[14px] font-semibold text-slate-700 shadow-sm pointer-events-none">
                                    내 컴퓨터에서 찾기
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                onClick={() => setStep(2)}
                                className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-[16px] font-bold text-[16px] hover:bg-primary-hover shadow-[0_8px_20px_rgba(49,130,246,0.25)] hover:shadow-[0_12px_24px_rgba(49,130,246,0.35)] transition-all transform hover:-translate-y-0.5"
                            >
                                다음 단계로 이동
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                        {/* Step 2: Submission */}
                        <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8 sm:p-10">
                            <h2 className="text-[20px] font-bold text-slate-900 mb-8 border-b border-slate-100 pb-5">
                                아이디어 및 포트폴리오 제출
                            </h2>

                            <div className="space-y-8">
                                <div>
                                    <label className="block text-[15px] font-bold text-slate-900 mb-3">
                                        아이디어 핵심 명칭 (네이밍/기획명) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="예: 프로젝트를 가장 잘 나타내는 한 단어 또는 문구"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[14px] px-5 py-4 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[15px] font-bold text-slate-900 mb-3">
                                        배경 및 스토리 (의미) <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        rows={8}
                                        placeholder="해당 아이디어가 나오게 된 배경, 의미, 그리고 주최측의 목표를 어떻게 달성할 수 있는지 구체적으로 적어주세요."
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[14px] px-5 py-4 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all resize-none leading-relaxed"
                                    ></textarea>
                                </div>

                                <div>
                                    <div className="mb-3">
                                        <label className="block text-[15px] font-bold text-slate-900 mb-1">
                                            포트폴리오 및 제안서 첨부 <span className="text-slate-400 font-medium text-[13px] ml-1">(선택)</span>
                                        </label>
                                        <p className="text-[13px] text-slate-500">
                                            서술형 텍스트로 부족한 경우, 시각화된 시안이나 기획서(PDF)를 자유롭게 제출할 수 있습니다.
                                        </p>
                                    </div>
                                    <div className="border border-slate-200 rounded-[16px] p-5 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors cursor-pointer group shadow-sm">
                                        <div className="flex items-center gap-3.5">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-primary" />
                                            </div>
                                            <span className="text-[15px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors">클릭하여 파일 선택하기</span>
                                        </div>
                                        <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-[10px] text-[13px] font-bold text-slate-700 shadow-sm pointer-events-none">
                                            파일 첨부
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-4">
                            <button
                                onClick={() => setStep(1)}
                                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-[16px] font-bold text-[16px] hover:bg-slate-50 transition-colors text-center shadow-sm"
                            >
                                이전 단계
                            </button>
                            <button
                                className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-[16px] font-bold text-[16px] hover:bg-primary-hover shadow-[0_8px_20px_rgba(49,130,246,0.25)] hover:shadow-[0_12px_24px_rgba(49,130,246,0.35)] transition-all text-center transform hover:-translate-y-0.5"
                            >
                                콘테스트 최종 제출하기
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


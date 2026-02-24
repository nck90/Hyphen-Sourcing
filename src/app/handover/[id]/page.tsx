"use client";

import { CheckCircle2, AlertCircle, FileText, Download, UploadCloud, MessageSquare, CreditCard, Lock } from "lucide-react";
import { useState } from "react";

export default function HandoverPage() {
    const [step, setStep] = useState(1); // 1: Waiting for files, 2: Files received/checking, 3: Completed

    return (
        <div className="min-h-screen bg-gray-50 pt-[100px] pb-[120px]">
            <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* 1. Header & Context */}
                <div className="mb-[40px] animate-fade-in-up">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-[10px] py-[6px] rounded-md bg-amber-50 text-amber-600 text-[13px] font-bold tracking-tight border border-amber-100/50">
                            <Lock className="w-3.5 h-3.5" /> 우승작 인수인계 진행중
                        </span>
                    </div>
                    <h1 className="text-[32px] sm:text-[40px] font-bold text-gray-900 tracking-[-0.03em] mb-2 leading-tight">
                        청년 지원 정책 플랫폼 랜딩페이지 기획
                    </h1>
                    <p className="text-[16px] text-gray-500 font-medium tracking-[-0.01em]">
                        우승자(팀 시너지)와 최종 원본 파일을 주고받고 상금을 지급하는 안전한 공간입니다.
                    </p>
                </div>

                <div className="space-y-[24px]">

                    {/* Status Tracker (Toss Style Stepper) */}
                    <div className="bg-white rounded-[24px] shadow-apple border border-gray-100 p-[32px] sm:p-[40px] animate-fade-in-up delay-100">
                        <div className="flex items-center justify-between relative z-10 w-full mb-8">

                            {/* Step 1 */}
                            <div className="flex flex-col items-center flex-1 relative">
                                <div className="w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-sm z-10 relative">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div className="mt-3 text-[14px] font-bold text-gray-900 text-center">우승작 선정</div>
                                <div className="text-[12px] text-gray-500 text-center mt-1">10.24 완료</div>
                                {/* Connecting Line */}
                                <div className="absolute top-[20px] left-[50%] right-[-50%] h-[2px] bg-primary z-0"></div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center flex-1 relative">
                                <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center font-bold shadow-sm z-10 relative transition-colors ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    {step >= 2 ? <CheckCircle2 className="w-5 h-5" /> : '2'}
                                </div>
                                <div className={`mt-3 text-[14px] font-bold text-center ${step >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>원본 파일 전달</div>
                                {step === 1 && <div className="text-[12px] text-primary font-bold text-center mt-1 animate-pulse">우승자 업로드 대기중</div>}
                                {/* Connecting Line */}
                                <div className={`absolute top-[20px] left-[50%] right-[-50%] h-[2px] z-0 transition-colors ${step >= 3 ? 'bg-primary' : 'bg-gray-100'}`}></div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col items-center flex-1 relative">
                                <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center font-bold shadow-sm z-10 relative transition-colors ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    3
                                </div>
                                <div className={`mt-3 text-[14px] font-bold text-center ${step >= 3 ? 'text-gray-900' : 'text-gray-500'}`}>상금 지급 / 완료</div>
                            </div>

                        </div>
                    </div>

                    {/* File Transfer Area */}
                    <div className="bg-white rounded-[24px] shadow-apple border border-gray-100 p-[32px] sm:p-[40px] animate-fade-in-up delay-200">
                        <div className="flex items-center justify-between mb-[24px]">
                            <h2 className="text-[20px] font-bold text-gray-900">원본 파일 다운로드</h2>
                            <button
                                onClick={() => setStep(2)}
                                className="text-[13px] font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors"
                            >
                                (데모용) 우승자 파일 업로드 시뮬레이션
                            </button>
                        </div>

                        {step === 1 ? (
                            <div className="bg-gray-50 border border-gray-200 border-dashed rounded-[16px] p-[40px] flex flex-col items-center justify-center text-center">
                                <div className="w-[56px] h-[56px] rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                                    <AlertCircle className="w-6 h-6 text-amber-500" />
                                </div>
                                <h3 className="text-[16px] font-bold text-gray-900 mb-2">아직 우승자가 파일을 업로드하지 않았습니다.</h3>
                                <p className="text-[14px] text-gray-500 mb-6">우승자가 원본 파일(Figma, PDF 등)을 업로드하면 카카오톡 알림을 보내드립니다.</p>
                                <button className="bg-white border border-gray-200 text-gray-700 text-[14px] font-bold px-[20px] py-[10px] rounded-[10px] hover:bg-gray-50 shadow-sm transition-all flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" /> 우승자에게 독촉 메시지 보내기
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">

                                <div className="flex items-center justify-between p-[20px] rounded-[16px] border border-blue-100 bg-blue-50/30">
                                    <div className="flex items-center gap-4">
                                        <div className="w-[48px] h-[48px] bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                                            <FileText className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <div className="text-[15px] font-bold text-gray-900 mb-0.5">최종_기획서_및_에셋_시너지팀.zip</div>
                                            <div className="text-[13px] text-gray-500">145.2 MB • 2026.10.25 14:30 업로드됨</div>
                                        </div>
                                    </div>
                                    <button className="bg-white border border-gray-200 text-gray-700 text-[14px] font-bold px-[20px] py-[12px] rounded-[10px] hover:border-gray-400 hover:shadow-sm transition-all flex items-center gap-2">
                                        <Download className="w-4 h-4" /> 다운로드
                                    </button>
                                </div>

                                <div className="bg-[#f9fafb] p-[20px] rounded-[16px] border border-gray-100">
                                    <h4 className="text-[14px] font-bold text-gray-900 mb-2">우승자의 메시지</h4>
                                    <p className="text-[14px] text-gray-600 leading-[1.6]">
                                        요청하신 Figma 파일 링크와 에셋들을 압축하여 업로드했습니다.
                                        수정 요청해주신 폰트 사이즈 및 컬러 대비 부분 모두 반영 완료하였습니다. 감사합니다!
                                    </p>
                                </div>

                            </div>
                        )}
                    </div>

                    {/* Finalize Prize Section (Only active if files received) */}
                    <div className="bg-white rounded-[24px] shadow-apple border border-gray-100 p-[32px] sm:p-[40px] animate-fade-in-up delay-300">
                        <div className="flex items-start gap-4 mb-[24px]">
                            <div className="w-[48px] h-[48px] rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                                <CreditCard className="w-6 h-6 text-gray-400" />
                            </div>
                            <div>
                                <h2 className="text-[20px] font-bold text-gray-900 mb-[4px]">예치 내역 확인 및 상금 지급</h2>
                                <p className="text-[14px] text-gray-500 leading-[1.5]">
                                    다운로드 받은 원본 파일에 이상이 없다면 최종 승인을 해주세요.
                                    승인 즉시 예치된 상금이 우승자에게 안전하게 송금되며, 프로젝트의 저작권이 귀하에게 양도됩니다.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-[16px] p-[24px] mb-[32px]">
                            <div className="flex justify-between items-center mb-[12px]">
                                <span className="text-[15px] font-medium text-gray-600">안전결제 예치금 (에스크로)</span>
                                <span className="text-[16px] font-bold text-gray-900">1,500,000 원</span>
                            </div>
                            <div className="flex justify-between items-center text-primary">
                                <span className="text-[15px] font-bold">우승자 송금 예정액</span>
                                <span className="text-[18px] font-bold">1,500,000 원</span>
                            </div>
                        </div>

                        <button
                            disabled={step === 1}
                            className={`w-full py-[18px] rounded-[14px] font-bold text-[16px] flex items-center justify-center gap-2 transition-all ${step === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-gray-800 shadow-[0_8px_20px_rgba(15,18,23,0.15)] hover:shadow-[0_12px_28px_rgba(15,18,23,0.2)] hover:-translate-y-0.5 active:translate-y-0'}`}
                        >
                            파일 확인 완료 및 상금 150만원 지급하기 <CheckCircle2 className="w-5 h-5" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

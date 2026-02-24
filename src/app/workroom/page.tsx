"use client";

import { UploadCloud, Link as LinkIcon, Video, AlignLeft, Users, Eye, Save, Send } from "lucide-react";

export default function WorkroomPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-[100px] pb-[120px]">
            <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* 1. Header & Deadline Context */}
                <div className="mb-[40px] animate-fade-in-up">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center px-[10px] py-[6px] rounded-md bg-blue-50 text-primary text-[13px] font-bold tracking-tight">
                            제출 가능
                        </span>
                        <span className="text-[14px] font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-md">
                            마감까지 14:23:45 남음
                        </span>
                    </div>
                    <h1 className="text-[32px] sm:text-[40px] font-bold text-gray-900 tracking-[-0.03em] mb-2 leading-tight">
                        청년 지원 정책 플랫폼 랜딩페이지 기획
                    </h1>
                    <p className="text-[16px] text-gray-500 font-medium tracking-[-0.01em]">
                        작업물을 최종 제출합니다. 제출 후에도 마감 전까지는 자유롭게 수정할 수 있습니다.
                    </p>
                </div>

                <div className="space-y-[32px]">

                    {/* Basic Info */}
                    <div className="bg-white rounded-[24px] shadow-apple border border-gray-100 p-[32px] sm:p-[40px] animate-fade-in-up delay-100">
                        <h2 className="text-[20px] font-bold text-gray-900 mb-[24px]">프로젝트 기본 정보</h2>

                        <div className="space-y-[24px]">
                            <div>
                                <label className="block text-[15px] font-bold text-gray-900 mb-[12px]">작업물 제목 (프로젝트명)</label>
                                <input
                                    type="text"
                                    placeholder="예: 청년 다모아 - 맞춤형 정책 큐레이션 플랫폼"
                                    className="w-full rounded-[14px] bg-white border border-gray-200 px-[16px] py-[16px] text-[16px] text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-[15px] font-bold text-gray-900 mb-[12px]">한 줄 소개 (Elevator Pitch)</label>
                                <input
                                    type="text"
                                    placeholder="심사위원이 한눈에 파악할 수 있는 핵심 가치를 적어주세요."
                                    maxLength={50}
                                    className="w-full rounded-[14px] bg-white border border-gray-200 px-[16px] py-[16px] text-[16px] text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content & Links (Devpost Style) */}
                    <div className="bg-white rounded-[24px] shadow-apple border border-gray-100 p-[32px] sm:p-[40px] animate-fade-in-up delay-200">
                        <h2 className="text-[20px] font-bold text-gray-900 mb-[24px]">결과물 및 상세 설명</h2>

                        <div className="space-y-[32px]">
                            {/* Figma / Repo Links */}
                            <div>
                                <label className="flex items-center gap-2 text-[15px] font-bold text-gray-900 mb-[12px]">
                                    <LinkIcon className="w-4 h-4 text-gray-500" /> 제출 링크 (Figma, GitHub 등)
                                </label>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <select className="w-[120px] rounded-[12px] bg-gray-50 border border-gray-200 px-[12px] py-[14px] text-[15px] font-medium text-gray-700 outline-none">
                                            <option>Figma</option>
                                            <option>GitHub</option>
                                            <option>Notion</option>
                                            <option>Website</option>
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="https://"
                                            className="flex-1 rounded-[12px] bg-white border border-gray-200 px-[16px] py-[14px] text-[15px] text-gray-900 focus:border-primary outline-none transition-all shadow-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-[1px] bg-gray-100"></div>

                            {/* Pitch Video */}
                            <div>
                                <label className="flex items-center gap-2 text-[15px] font-bold text-gray-900 mb-[12px]">
                                    <Video className="w-4 h-4 text-gray-500" /> 피칭 비디오 링크 (선택)
                                </label>
                                <input
                                    type="text"
                                    placeholder="YouTube 또는 Vimeo 링크를 입력하세요."
                                    className="w-full rounded-[14px] bg-white border border-gray-200 px-[16px] py-[14px] text-[15px] text-gray-900 focus:border-primary outline-none transition-all shadow-sm"
                                />
                                <p className="mt-2 text-[13px] text-gray-500">2분 내외의 데모 영상을 강력히 권장합니다.</p>
                            </div>

                            <div className="w-full h-[1px] bg-gray-100"></div>

                            {/* Markdown Description */}
                            <div>
                                <label className="flex items-center gap-2 text-[15px] font-bold text-gray-900 mb-[12px]">
                                    <AlignLeft className="w-4 h-4 text-gray-500" /> 상세 설명 (Markdown 가능)
                                </label>
                                <div className="border border-gray-200 rounded-[14px] overflow-hidden shadow-sm">
                                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex gap-2">
                                        <button className="text-[13px] font-bold text-gray-900">Write</button>
                                        <button className="text-[13px] font-medium text-gray-500">Preview</button>
                                    </div>
                                    <textarea
                                        rows={8}
                                        placeholder="어떤 문제를 해결했나요? 주요 기능은 무엇인가요? 직면했던 기술적/디자인적 과제와 해결 과정을 적어주세요."
                                        className="w-full bg-white px-[16px] py-[16px] text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none resize-y min-h-[200px] leading-[1.6]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* File Uploads (Loudsourcing Style necessity) */}
                    <div className="bg-white rounded-[24px] shadow-apple border border-gray-100 p-[32px] sm:p-[40px] animate-fade-in-up delay-300">
                        <h2 className="text-[20px] font-bold text-gray-900 mb-[8px]">첨부 파일 (선택)</h2>
                        <p className="text-[14px] text-gray-500 mb-[24px]">기획서 원본, 추가 산출물 압축 파일 등을 업로드하세요.</p>

                        <div className="border-2 border-dashed border-gray-200 rounded-[16px] bg-gray-50 p-[40px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-primary/50 transition-colors">
                            <UploadCloud className="w-8 h-8 text-gray-400 mb-3" />
                            <span className="text-[16px] font-bold text-gray-900 mb-1">여기를 클릭하여 파일 업로드</span>
                            <span className="text-[13px] text-gray-500">최대 100MB, .zip, .pdf 권장</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-[12px] pt-[20px] animate-fade-in-up delay-400">
                        <button className="px-[24px] py-[18px] bg-white border border-gray-200 text-gray-700 rounded-[14px] font-bold text-[16px] hover:bg-gray-50 transition-colors flex items-center gap-2">
                            <Save className="w-5 h-5" /> 임시저장
                        </button>
                        <button className="px-[32px] py-[18px] bg-primary text-white rounded-[14px] font-bold text-[16px] shadow-[0_8px_20px_rgba(49,130,246,0.3)] hover:shadow-[0_12px_28px_rgba(49,130,246,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2">
                            <Send className="w-5 h-5" /> 최종 제출하기
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

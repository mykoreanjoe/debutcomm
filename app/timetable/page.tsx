import React from 'react';
import { CalendarDays, Sun, Award, Info, CheckSquare } from 'lucide-react';
import type { Metadata } from 'next';
import SectionTitle from '@/components/SectionTitle';
import AnimatedSection from '@/components/AnimatedSection';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
    title: '시간표 | 데뷰 영어 학원',
    description: '데뷰 영어 학원의 초등부 및 중등부 정규, 인텐시브, 클리닉 시간표를 안내합니다.',
};

// 초등부 데이터
const elementaryRegularMWF = [
  { days: "월수금", time: "오후 2:30 ~ 4:05", level: "DK ~ D4" },
  { days: "월수금", time: "오후 4:10 ~ 5:45", level: "D3 ~ D6" },
  { days: "화목", time: "오후 3:00 ~ 5:25", level: "D3 ~ D7" },
  { days: "수요일", time: "오후 5:00 ~ 10:00", level: "수요 클리닉" },
];

const elementaryIntensive = [
  { days: "월수금", time: "오후 6:00 ~ 7:35", level: "인텐시브" },
  { days: "화목", time: "오후 6:00 ~ 8:25", level: "인텐시브" },
];

// 중등부 데이터
const middleSchoolRegular = [
  // 월/금 수업
  { days: "월/금", time: "오후 5:00 ~ 8:00", level: "중등 Master" },
  { days: "월/금", time: "오후 7:00 ~ 10:00", level: "고등 Inter" },
  // 화/목 수업
  { days: "화/목", time: "오후 5:00 ~ 8:00", level: "중등 Master" },
  { days: "화/목", time: "오후 7:00 ~ 10:00", level: "고등 Master" },
];

const middleSchoolClinic = [
  { days: "수요일", time: "오후 5:00 ~ 10:00", level: "수요 클리닉" },
];

// 완성학습 데이터
const completionStudy = [
    { type: "수업 전", time: "오전 9:00 ~ 10:00", note: "1시간 완성학습" },
    { type: "수업 전", time: "오전 9:30 ~ 10:00", note: "30분 완성학습" },
    { type: "수업 후", time: "오후 4:05 ~ 5:05", note: "1시간 완성학습 (초등)" },
    { type: "수업 후", time: "오후 4:05 ~ 4:35", note: "30분 완성학습 (초등)" },
    { type: "수업 후", time: "오후 8:00 ~ 9:00", note: "1시간 완성학습 (중등)" },
    { type: "수업 후", time: "오후 8:00 ~ 8:30", note: "30분 완성학습 (중등)" },
];

const InfoListItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start text-sm text-gray-600">
        <CheckSquare className="w-4 h-4 mr-2.5 mt-0.5 flex-shrink-0 text-sky-600" />
        <span>{children}</span>
    </li>
);

export default function TimetablePage() {
  return (
    <div className="bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <AnimatedSection>
            <SectionTitle
                icon={CalendarDays}
                title="시간표 안내"
                subtitle="데뷰 영어의 초등부, 중등부 클래스 시간표를 확인하세요."
                iconColor="text-blue-600"
            />
        </AnimatedSection>

        {/* --- 초등부 시간표 --- */}
        <AnimatedSection>
            <section id="elementary" className="mt-12 mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-sky-700 mb-6 pb-3 border-b-2 border-sky-100 flex items-center">
                    <Sun className="w-8 h-8 mr-3 text-sky-500" />초등부 시간표
                </h2>
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold text-sky-700 mb-5">정규</h3>
                            <div className="bg-sky-50/30 rounded-lg p-4">
                                <Table>
                                    <TableCaption className="caption-top text-base font-medium text-sky-700 mb-3">초등부 정규반</TableCaption>
                                    <TableHeader>
                                        <TableRow className="bg-sky-100/50">
                                            <TableHead className="w-[120px] text-sky-900 py-3">요일</TableHead>
                                            <TableHead className="w-[140px] text-sky-900 py-3">시간</TableHead>
                                            <TableHead className="min-w-[120px] text-sky-900 py-3">레벨</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {elementaryRegularMWF.map((c) => (
                                            <TableRow key={`${c.days}-${c.time}`} className="hover:bg-sky-50">
                                                <TableCell className="font-medium text-sky-800 py-3 whitespace-nowrap">{c.days}</TableCell>
                                                <TableCell className="text-sky-700 py-3 whitespace-nowrap">{c.time}</TableCell>
                                                <TableCell className="text-sky-700 py-3 whitespace-nowrap">{c.level}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-semibold text-purple-700 mb-5">인텐시브</h3>
                            <div className="bg-purple-50/30 rounded-lg p-4">
                                <Table>
                                    <TableCaption className="caption-top text-base font-medium text-purple-700 mb-3">초등부 인텐시브반</TableCaption>
                                    <TableHeader>
                                        <TableRow className="bg-purple-100/50">
                                            <TableHead className="w-[120px] text-purple-900 py-3">요일</TableHead>
                                            <TableHead className="w-[140px] text-purple-900 py-3">시간</TableHead>
                                            <TableHead className="min-w-[120px] text-purple-900 py-3">레벨</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {elementaryIntensive.map((c) => (
                                            <TableRow key={`${c.days}-${c.time}`} className="hover:bg-purple-50">
                                                <TableCell className="font-medium text-purple-800 py-3 whitespace-nowrap">{c.days}</TableCell>
                                                <TableCell className="text-purple-700 py-3 whitespace-nowrap">{c.time}</TableCell>
                                                <TableCell className="text-purple-700 py-3 whitespace-nowrap">{c.level}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                            <Info className="w-4 h-4 mr-2 text-sky-600" />참고 사항
                        </h4>
                        <ul className="space-y-2.5">
                            <InfoListItem>교재: 자체/외부 교재 구성</InfoListItem>
                            <InfoListItem>데뷰 데이: 월 1회 토요일 이벤트 행사 진행</InfoListItem>
                            <InfoListItem>완성 학습: 학생별 과제 수행 필요시, 수업 전후로 고정된 스케줄에 따라 루틴으로 진행됩니다.</InfoListItem>
                            <InfoListItem>수업 시간: 월수금반 95분 수업 (주 3회), 화목반 145분 수업 (주 2회)</InfoListItem>
                        </ul>
                    </div>
                </div>
            </section>
        </AnimatedSection>
        
        {/* --- 중등부 시간표 --- */}
        <AnimatedSection>
            <section id="middle">
                <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6 pb-3 border-b-2 border-indigo-100 flex items-center">
                    <Award className="w-8 h-8 mr-3 text-indigo-500" />중등부 시간표
                </h2>
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold text-indigo-700 mb-5">정규</h3>
                            <div className="bg-indigo-50/30 rounded-lg p-4">
                                <Table>
                                    <TableCaption className="caption-top text-base font-medium text-indigo-700 mb-3">중등부 정규반</TableCaption>
                                    <TableHeader>
                                        <TableRow className="bg-indigo-100/50">
                                            <TableHead className="w-[120px] text-indigo-900 py-3">요일</TableHead>
                                            <TableHead className="w-[140px] text-indigo-900 py-3">시간</TableHead>
                                            <TableHead className="min-w-[120px] text-indigo-900 py-3">레벨</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {middleSchoolRegular.map((c) => (
                                            <TableRow key={`${c.days}-${c.time}`} className="hover:bg-indigo-50">
                                                <TableCell className="font-medium text-indigo-800 py-3 whitespace-nowrap">{c.days}</TableCell>
                                                <TableCell className="text-indigo-700 py-3 whitespace-nowrap">{c.time}</TableCell>
                                                <TableCell className="text-indigo-700 py-3 whitespace-nowrap">{c.level}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-red-700 mb-5">클리닉</h3>
                            <div className="bg-red-50/30 rounded-lg p-4">
                                <Table>
                                    <TableCaption className="caption-top text-base font-medium text-red-700 mb-3">중등부 클리닉반</TableCaption>
                                    <TableHeader>
                                        <TableRow className="bg-red-100/50">
                                            <TableHead className="w-[120px] text-red-900 py-3">요일</TableHead>
                                            <TableHead className="w-[140px] text-red-900 py-3">시간</TableHead>
                                            <TableHead className="min-w-[120px] text-red-900 py-3">레벨</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {middleSchoolClinic.map((c) => (
                                            <TableRow key={`${c.days}-${c.time}`} className="hover:bg-red-50">
                                                <TableCell className="font-medium text-red-800 py-3 whitespace-nowrap">{c.days}</TableCell>
                                                <TableCell className="text-red-700 py-3 whitespace-nowrap">{c.time}</TableCell>
                                                <TableCell className="text-red-700 py-3 whitespace-nowrap">
                                                    <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200">
                                                        {c.level}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                            <Info className="w-4 h-4 mr-2 text-indigo-600" />참고 사항
                        </h4>
                        <ul className="space-y-2.5">
                            <InfoListItem>완성 학습: 스터디 매니저와 상담 후 수업 전후를 선택하여 30분 진행합니다.</InfoListItem>
                            <InfoListItem>수요 클리닉: 실력 보충이 필요한 학생은 수요일에 의무적으로 참석해야 합니다. (시간은 학생별 상이)</InfoListItem>
                            <InfoListItem>수업 시간: 정규반 180분 수업 (주 2회)</InfoListItem>
                        </ul>
                    </div>
                </div>
            </section>
        </AnimatedSection>

        {/* --- 완성학습 시간표 --- */}
        <AnimatedSection>
            <section id="completion" className="mt-16">
                <h2 className="text-2xl md:text-3xl font-bold text-emerald-700 mb-6 pb-3 border-b-2 border-emerald-100 flex items-center">
                    <CheckSquare className="w-8 h-8 mr-3 text-emerald-500" />완성학습 안내
                </h2>
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
                    <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            완성학습은 스터디 매니저 또는 담임 선생님과 함께 그날의 수업과제, 어휘 학습, 온라인 학습 등을 완성하는 개별 맞춤형 관리 시간입니다.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            모든 클래스 전후 30분 또는 1시간 진행, 학부모 요청에 따라 시간은 매월 초 학부모 상담을 통해 결정됩니다.
                        </p>
                    </div>

                    <div className="bg-emerald-50/30 rounded-lg p-4">
                        <Table>
                            <TableCaption className="caption-top text-base font-medium text-emerald-700 mb-3">완성학습 시간</TableCaption>
                            <TableHeader>
                                <TableRow className="bg-emerald-100/50">
                                    <TableHead className="w-[120px] text-emerald-900 py-3">구분</TableHead>
                                    <TableHead className="w-[140px] text-emerald-900 py-3">시간</TableHead>
                                    <TableHead className="min-w-[120px] text-emerald-900 py-3">비고</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="hover:bg-emerald-50">
                                    <TableCell className="font-medium text-emerald-800 py-3 whitespace-nowrap">수업 전</TableCell>
                                    <TableCell className="text-emerald-700 py-3 whitespace-nowrap">30분 또는 1시간</TableCell>
                                    <TableCell className="text-emerald-700 py-3">그날의 수업과제, 어휘 학습, 온라인 학습 등 학생별 맞춤형 관리</TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-emerald-50">
                                    <TableCell className="font-medium text-emerald-800 py-3 whitespace-nowrap">수업 후</TableCell>
                                    <TableCell className="text-emerald-700 py-3 whitespace-nowrap">30분 또는 1시간</TableCell>
                                    <TableCell className="text-emerald-700 py-3">그날의 수업과제, 어휘 학습, 온라인 학습 등 학생별 맞춤형 완성</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <div className="mt-6">
                        <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                            <Info className="w-4 h-4 mr-2 text-emerald-600" />운영 안내
                        </h4>
                        <ul className="space-y-2.5">
                            <InfoListItem>학생별 학습 상황과 니즈에 따라 맞춤형으로 진행됩니다.</InfoListItem>
                            <InfoListItem>정규 수업과 연계하여 체계적인 학습 관리가 이루어집니다.</InfoListItem>
                        </ul>
                    </div>
                </div>
            </section>
        </AnimatedSection>
      </div>
    </div>
  );
} 
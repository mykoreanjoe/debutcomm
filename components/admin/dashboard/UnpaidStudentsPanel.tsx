'use client';

import { useState, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UnpaidStudent, ClassInfo, sendPaymentReminderNotifications } from "@/app/actions/admin";
import { Bell, AlertTriangle, MessageSquare } from "lucide-react";
import { format, subMonths } from 'date-fns';

interface UnpaidStudentsPanelProps {
    unpaidStudents: UnpaidStudent[];
    allClasses: ClassInfo[];
}

export function UnpaidStudentsPanel({ unpaidStudents, allClasses }: UnpaidStudentsPanelProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();

    const currentMonth = searchParams.get('month') || format(new Date(), 'yyyy-MM');
    const currentClass = searchParams.get('classId') || 'all';

    const handleFilterChange = (type: 'month' | 'classId', value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value === 'all') {
            params.delete(type);
        } else {
            params.set(type, value);
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    const handleSelectAll = (checked: boolean | 'indeterminate') => {
        if (checked === true) {
            setSelectedStudents(unpaidStudents.map(s => s.student_id));
        } else {
            setSelectedStudents([]);
        }
    };

    const handleSelectStudent = (studentId: string, checked: boolean) => {
        if (checked) {
            setSelectedStudents(prev => [...prev, studentId]);
        } else {
            setSelectedStudents(prev => prev.filter(id => id !== studentId));
        }
    };

    const handleSendNotifications = () => {
        if (selectedStudents.length === 0) {
            toast.warning('알림을 보낼 학생을 선택해주세요.');
            return;
        }

        startTransition(async () => {
            const studentsToSend = unpaidStudents.filter(s => selectedStudents.includes(s.student_id));
            const result = await sendPaymentReminderNotifications(studentsToSend);

            if (result.success) {
                toast.success(result.message);
                setSelectedStudents([]);
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <AlertTriangle className="mr-2 text-red-500" />
                    미납자 관리 및 알림
                </CardTitle>
                <CardDescription>
                    매월 21일~말일 수납 기준, 미납자는 자동으로 목록에 표시됩니다. 필터를 사용하여 특정 월 또는 반의 미납자를 조회할 수 있습니다.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* Filters */}
                <div className="flex items-center gap-4 mb-4">
                    {/* Month Filter */}
                    <Select value={currentMonth} onValueChange={(value) => handleFilterChange('month', value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="월 선택" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => {
                                const monthDate = subMonths(new Date(), i);
                                const monthValue = format(monthDate, 'yyyy-MM');
                                return <SelectItem key={monthValue} value={monthValue}>{monthValue}</SelectItem>;
                            })}
                        </SelectContent>
                    </Select>

                    {/* Class Filter */}
                    <Select value={currentClass} onValueChange={(value) => handleFilterChange('classId', value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="반 선택" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">모든 반</SelectItem>
                            {allClasses.map(c => (
                                <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="mb-4">
                    <Button onClick={handleSendNotifications} disabled={isPending || selectedStudents.length === 0}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        선택된 {selectedStudents.length}명에게 알림 발송
                        {isPending && "..."}
                    </Button>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">
                                    <Checkbox
                                        checked={selectedStudents.length > 0 && selectedStudents.length === unpaidStudents.length}
                                        onCheckedChange={handleSelectAll}
                                    />
                                </TableHead>
                                <TableHead>학생명</TableHead>
                                <TableHead>반</TableHead>
                                <TableHead>학부모 연락처</TableHead>
                                <TableHead>미납 월</TableHead>
                                <TableHead className="text-right">미납 금액</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {unpaidStudents.length > 0 ? (
                                unpaidStudents.map((student) => (
                                    <TableRow key={student.student_id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedStudents.includes(student.student_id)}
                                                onCheckedChange={(checked) => handleSelectStudent(student.student_id, !!checked)}
                                            />
                                        </TableCell>
                                        <TableCell>{student.student_name}</TableCell>
                                        <TableCell>{student.class_name || '-'}</TableCell>
                                        <TableCell>{student.parent_contact || '-'}</TableCell>
                                        <TableCell>{new Date(student.unpaid_for_month).toLocaleDateString('ko-KR', { month: 'long' })}</TableCell>
                                        <TableCell className="text-right">{student.amount_due.toLocaleString()}원</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">
                                        현재 미납자가 없습니다.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
} 
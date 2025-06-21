'use client';

import { useState, useEffect, useTransition } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAttendanceByDate, updateAttendance } from '@/app/actions/teacher';
import type { StudentInClass, AttendanceData } from '@/app/actions/teacher';
import { formatDate } from '@/lib/utils'; // We'll assume a utility function for date formatting

type ExistingAttendanceRecord = {
    student_id: string;
    status: 'present' | 'late' | 'absent';
    teacher_comment: string | null;
}

interface AttendanceManagerProps {
  classId: number;
  students: StudentInClass[];
}

export function AttendanceManager({ classId, students }: AttendanceManagerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [attendance, setAttendance] = useState<Map<string, AttendanceData>>(new Map());
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!selectedDate) return;
    const dateString = formatDate(selectedDate); // Converts Date to 'YYYY-MM-DD'

    startTransition(async () => {
        const existingData: ExistingAttendanceRecord[] | null = await getAttendanceByDate(classId, dateString);
        const newAttendance = new Map<string, AttendanceData>();
        
        students.forEach(student => {
            const record = existingData?.find(r => r.student_id === student.user_id);
            newAttendance.set(student.user_id, {
                student_id: student.user_id,
                status: record?.status || 'present', // Default to 'present'
                teacher_comment: record?.teacher_comment || ''
            });
        });
        setAttendance(newAttendance);
    });
  }, [selectedDate, classId, students]);

  const handleStatusChange = (studentId: string, status: 'present' | 'late' | 'absent') => {
    setAttendance(prev => {
        const newMap = new Map(prev);
        const record = newMap.get(studentId);
        if (record) {
            newMap.set(studentId, { ...record, status });
        }
        return newMap;
    });
  };

  const handleCommentChange = (studentId: string, comment: string) => {
     setAttendance(prev => {
        const newMap = new Map(prev);
        const record = newMap.get(studentId);
        if (record) {
            newMap.set(studentId, { ...record, teacher_comment: comment });
        }
        return newMap;
    });
  };

  const handleSave = () => {
    if (!selectedDate) return;
    
    startTransition(async () => {
      const dateString = formatDate(selectedDate);
      const dataToSave = Array.from(attendance.values());
      const result = await updateAttendance(classId, dateString, dataToSave);
      
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>출결 관리</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label>날짜 선택</Label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            disabled={isPending}
          />
        </div>
        <div className="md:col-span-2">
            <div className="mb-4 text-lg font-semibold">
                {selectedDate ? formatDate(selectedDate, 'long') : '날짜를 선택하세요'}
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
            {students && students.length > 0 ? (
                students.map((student) => (
                    <div key={student.user_id} className="p-3 border rounded-md">
                        <p className="font-semibold">{student.name}</p>
                        <div className="flex items-center justify-between mt-2">
                            <RadioGroup
                                value={attendance.get(student.user_id)?.status || 'present'}
                                onValueChange={(value) => handleStatusChange(student.user_id, value as any)}
                                className="flex gap-4"
                                disabled={isPending}
                            >
                                <div className="flex items-center space-x-2"><RadioGroupItem value="present" id={`p-${student.user_id}`} /><Label htmlFor={`p-${student.user_id}`}>출석</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="late" id={`l-${student.user_id}`} /><Label htmlFor={`l-${student.user_id}`}>지각</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="absent" id={`a-${student.user_id}`} /><Label htmlFor={`a-${student.user_id}`}>결석</Label></div>
                            </RadioGroup>
                            <Input 
                                placeholder="코멘트..."
                                value={attendance.get(student.user_id)?.teacher_comment || ''}
                                onChange={(e) => handleCommentChange(student.user_id, e.target.value)}
                                className="w-1/2"
                                disabled={isPending}
                            />
                        </div>
                    </div>
                ))
            ) : (
                <p>이 클래스에 배정된 학생이 없습니다.</p>
            )}
            </div>
          <Button onClick={handleSave} disabled={isPending || !selectedDate || !students || students.length === 0} className="mt-6 w-full">
            {isPending ? '저장 중...' : '출결 정보 저장'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 
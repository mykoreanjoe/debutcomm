'use client';

import { useState, useEffect, useTransition } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getDailyScoresByDate, upsertDailyScores } from '@/app/actions/teacher';
import type { StudentInClass, DailyScoreData } from '@/app/actions/teacher';
import { formatDate } from '@/lib/utils';

type ExistingScoreRecord = {
    student_id: string;
    score: number | null;
    max_score: number | null;
    level: string | null;
    teacher_comment: string | null;
};

interface DailyScoreManagerProps {
  classId: number;
  students: StudentInClass[];
}

export function DailyScoreManager({ classId, students }: DailyScoreManagerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [scores, setScores] = useState<Map<string, DailyScoreData>>(new Map());
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!selectedDate) return;
    const dateString = formatDate(selectedDate);

    startTransition(async () => {
        const existingData: ExistingScoreRecord[] | null = await getDailyScoresByDate(classId, dateString);
        const newScores = new Map<string, DailyScoreData>();
        
        students.forEach(student => {
            const record = existingData?.find(r => r.student_id === student.user_id);
            newScores.set(student.user_id, {
                student_id: student.user_id,
                score: record?.score || null,
                max_score: record?.max_score || null,
                level: record?.level || '',
                teacher_comment: record?.teacher_comment || ''
            });
        });
        setScores(newScores);
    });
  }, [selectedDate, classId, students]);

  const handleScoreChange = (studentId: string, field: keyof DailyScoreData, value: string | number) => {
    setScores(prev => {
        const newMap = new Map(prev);
        const record = newMap.get(studentId);
        if (record) {
            newMap.set(studentId, { ...record, [field]: value });
        }
        return newMap;
    });
  };

  const handleSave = () => {
    if (!selectedDate) return;
    
    startTransition(async () => {
      const dateString = formatDate(selectedDate);
      const dataToSave = Array.from(scores.values()).map(s => ({
          ...s,
          score: s.score ? Number(s.score) : null,
          max_score: s.max_score ? Number(s.max_score) : null,
      }));

      const result = await upsertDailyScores(classId, dateString, dataToSave);
      
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
        <CardTitle>일일 성적 관리</CardTitle>
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
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4">
            {students && students.length > 0 ? (
                students.map((student) => {
                    const studentScore = scores.get(student.user_id);
                    return (
                        <div key={student.user_id} className="p-4 border rounded-md space-y-3">
                            <p className="font-semibold">{student.name}</p>
                            <div className="grid grid-cols-3 gap-2">
                                <Input 
                                    placeholder="점수"
                                    type="number"
                                    value={studentScore?.score ?? ''}
                                    onChange={(e) => handleScoreChange(student.user_id, 'score', e.target.value)}
                                    disabled={isPending}
                                />
                                <Input 
                                    placeholder="만점"
                                    type="number"
                                    value={studentScore?.max_score ?? ''}
                                    onChange={(e) => handleScoreChange(student.user_id, 'max_score', e.target.value)}
                                    disabled={isPending}
                                />
                                <Input 
                                    placeholder="레벨"
                                    value={studentScore?.level ?? ''}
                                    onChange={(e) => handleScoreChange(student.user_id, 'level', e.target.value)}
                                    disabled={isPending}
                                />
                            </div>
                            <Textarea
                                placeholder="교사 코멘트..."
                                value={studentScore?.teacher_comment ?? ''}
                                onChange={(e) => handleScoreChange(student.user_id, 'teacher_comment', e.target.value)}
                                disabled={isPending}
                            />
                        </div>
                    );
                })
            ) : (
                <p>이 클래스에 배정된 학생이 없습니다.</p>
            )}
            </div>
          <Button onClick={handleSave} disabled={isPending || !selectedDate || !students || students.length === 0} className="mt-6 w-full">
            {isPending ? '저장 중...' : '성적 정보 저장'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 
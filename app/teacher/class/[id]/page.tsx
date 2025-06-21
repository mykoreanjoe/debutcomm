import { getClassInfo, getStudentsInClass } from "@/app/actions/teacher";
import SectionTitle from "@/components/SectionTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { notFound, redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { AttendanceManager } from "@/components/teacher/AttendanceManager";
import { DailyScoreManager } from "@/components/teacher/DailyScoreManager";

export default async function ClassDetailsPage({ params }: any) {
  const user = await currentUser();
  if (!user || user.publicMetadata.role !== 'teacher') {
    redirect('/');
  }

  const classId = Number(params.id);
  if (isNaN(classId)) {
    notFound();
  }
  
  const classInfo = await getClassInfo(classId);
  if (!classInfo) {
    notFound();
  }
  
  const students = await getStudentsInClass(classId);

  if (!students) {
    return <div>학생 정보를 불러오는데 실패했습니다.</div>;
  }

  return (
    <div className="space-y-8">
      <Link href="/teacher" className="text-blue-500 hover:underline mb-4 block">&larr; 나의 클래스 목록으로 돌아가기</Link>
      
      <SectionTitle
        title={classInfo.name}
        subtitle={classInfo.description || "학생 목록 및 정보"}
      />
      
      <AttendanceManager classId={classId} students={students} />

      <DailyScoreManager classId={classId} students={students} />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>학번</TableHead>
              <TableHead className="text-right">보유 포인트</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.user_id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                    <Badge variant="secondary">{student.student_id || '미지정'}</Badge>
                </TableCell>
                <TableCell className="text-right">{student.points}</TableCell>
              </TableRow>
            ))}
            {students.length === 0 && (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500 py-10">
                        이 클래스에 배정된 학생이 없습니다.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 
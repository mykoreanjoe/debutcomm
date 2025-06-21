import { getMyClasses } from "@/app/actions/teacher";
import SectionTitle from "@/components/SectionTitle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";
import Link from "next/link";
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

export default async function TeacherDashboardPage() {
  const user = await currentUser();

  if (!user || user.publicMetadata.role !== 'teacher') {
    // Redirect non-teachers to the home page or a relevant page
    redirect('/');
  }

  const myClasses = await getMyClasses();

  return (
    <div>
      <SectionTitle
        title="나의 클래스"
        subtitle="담당하고 있는 클래스 목록입니다. 카드를 클릭하여 학생 목록을 확인하세요."
      />
      
      {myClasses && myClasses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myClasses.map((classInfo) => (
            <Link href={`/teacher/class/${classInfo.id}`} key={classInfo.id}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{classInfo.name}</CardTitle>
                  <CardDescription>{classInfo.description || '클래스 설명이 없습니다.'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{classInfo.student_count}명의 학생</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">아직 담당하고 있는 클래스가 없습니다.</p>
          <p className="text-sm text-gray-400 mt-2">관리자에게 클래스 배정을 요청하세요.</p>
        </div>
      )}
    </div>
  );
} 
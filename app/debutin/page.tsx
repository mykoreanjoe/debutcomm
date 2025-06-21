import { getUserEnrollmentStatus } from '@/app/actions/enrollment';
import EnrollmentRequestForm from '@/components/debutin/EnrollmentRequestForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { currentUser } from '@clerk/nextjs/server';

export default async function DebutinPage() {
  const user = await currentUser();
  if (!user) {
    // This case should be handled by middleware, but as a fallback
    return <div>로그인이 필요합니다.</div>;
  }

  const status = await getUserEnrollmentStatus();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md">
        {status.isVerified ? (
          <Card>
            <CardHeader>
              <CardTitle>🎉 환영합니다!</CardTitle>
              <CardDescription>
                데뷰틴 재원생 포털에 오신 것을 환영합니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                학습 현황, 공지사항 등 다양한 정보를 이곳에서 확인하실 수
                있습니다.
              </p>
            </CardContent>
          </Card>
        ) : status.requestStatus === 'pending' ? (
          <Card>
            <CardHeader>
              <CardTitle>⏳ 요청 검토 중</CardTitle>
              <CardDescription>
                재원생 인증 요청이 접수되어 관리자가 검토 중입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                최대한 빠르게 확인 후 처리해 드리겠습니다. 잠시만 기다려주세요.
              </p>
            </CardContent>
          </Card>
        ) : (
          <EnrollmentRequestForm 
            userFullName={`${user.firstName} ${user.lastName}`} 
            requestStatus={status.requestStatus} 
          />
        )}
      </div>
    </main>
  );
} 
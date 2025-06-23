import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MailCheck } from 'lucide-react';

export default function VerifyPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-8 space-y-4">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <MailCheck className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold">이메일을 확인해주세요</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-gray-600">
          <p>
            가입을 거의 완료했습니다!
          </p>
          <p>
            회원가입 시 사용한 이메일 주소로 인증 링크를 보냈습니다. 받은 편지함을 확인하여 계정 인증을 완료해주세요.
          </p>
          <Button asChild className="mt-6 w-full">
            <Link href="/login">로그인 페이지로 돌아가기</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 
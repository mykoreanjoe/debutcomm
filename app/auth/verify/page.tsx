import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  export default function VerifyPage() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="mx-auto max-w-sm text-center">
          <CardHeader>
            <CardTitle className="text-2xl">이메일 확인</CardTitle>
            <CardDescription>
              가입하신 이메일 주소로 인증 링크를 보냈습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              받은편지함(또는 스팸함)을 확인하여 계정 인증을 완료해주세요.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  } 
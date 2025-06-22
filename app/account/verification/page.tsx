import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { VerificationForm } from "./VerificationForm";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Rocket, AlertCircle } from "lucide-react";

export default async function VerificationPage() {
    const { userId } = await auth();
    if (!userId) {
        redirect("/sign-in");
    }

    const { data: profile, error } = await supabase
        .from("user_profile")
        .select("is_verified, request_verified, student_name, reject_reason")
        .eq("id", userId)
        .single();
    
    if (error) {
        // 아직 프로필이 없을 수 있으므로 에러 대신 빈 페이지를 보여줌
        console.error("Error fetching user profile for verification page:", error);
        return (
            <div className="container mx-auto max-w-2xl py-8 md:py-12">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>오류 발생</AlertTitle>
                    <AlertDescription>
                       사용자 프로필을 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }
    
    const isVerified = profile?.is_verified;
    const isPending = !profile?.is_verified && profile?.request_verified;
    const isRejected = !profile?.is_verified && !profile?.request_verified && profile?.reject_reason;
    const canRequest = !profile?.is_verified && !profile?.request_verified;

    return (
        <div className="container mx-auto max-w-2xl py-8 md:py-12">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">재원생 인증</CardTitle>
                    <CardDescription>
                        재원생 인증을 통해 커뮤니티 활동 및 추가 콘텐츠 이용 권한을 얻으세요.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {isVerified && (
                         <Alert className="border-green-500 bg-green-50 text-green-900 dark:border-green-700 dark:bg-green-950 dark:text-green-200">
                            <Rocket className="h-4 w-4" />
                            <AlertTitle className="font-semibold">인증 완료</AlertTitle>
                            <AlertDescription>
                                재원생 인증이 완료되었습니다. 모든 서비스를 정상적으로 이용하실 수 있습니다.
                            </AlertDescription>
                        </Alert>
                    )}

                    {isPending && (
                        <Alert className="border-yellow-500 bg-yellow-50 text-yellow-900 dark:border-yellow-600 dark:bg-yellow-950 dark:text-yellow-200">
                            <AlertTitle className="font-semibold">인증 대기 중</AlertTitle>
                            <AlertDescription>
                                제출하신 인증 요청을 관리자가 확인하고 있습니다. <br />
                                <strong>요청 이름:</strong> {profile.student_name}
                            </AlertDescription>
                        </Alert>
                    )}

                    {isRejected && (
                        <Alert variant="destructive">
                            <AlertTitle className="font-semibold">인증 거절</AlertTitle>
                            <AlertDescription>
                                이전 인증 요청이 거절되었습니다. <br />
                                <strong>거절 사유:</strong> {profile.reject_reason || '별도 사유 없음'} <br />
                                정보를 확인하고 아래 양식을 통해 다시 요청해주세요.
                            </AlertDescription>
                        </Alert>
                    )}
                    
                    {/* 거절되었을 때도 폼이 보여야 함 */}
                    {(canRequest || isRejected) && (
                        <div>
                            <p className="mb-4 text-sm text-gray-600">
                                데뷔 영어학원 재원생 인증을 위해 학생의 이름을 정확히 입력해주세요. 관리자 확인 후 승인 처리됩니다.
                            </p>
                            <VerificationForm />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
} 
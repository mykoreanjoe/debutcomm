import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdditionalInfoForm from "./AdditionalInfoForm";

export default async function AdditionalInfoPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 프로필 정보가 이미 있는지 확인
  const { data: userProfile } = await supabase
    .from("user_profile")
    .select("terms_agreed")
    .eq("id", user.id)
    .single();

  // 프로필이 이미 존재하고, 약관에 동의했다면 커뮤니티로 리디렉션
  if (userProfile && userProfile.terms_agreed) {
    redirect('/community');
  }

  // 소셜 로그인 제공자로부터 받은 기본 닉네임
  const initialNickname = user.user_metadata?.full_name || user.user_metadata?.name || "";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            추가 정보 입력
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-gray-600 mb-6">
            데뷰에듀의 모든 기능을 이용하려면 추가 정보가 필요해요.
          </p>
          <AdditionalInfoForm 
            email={user.email}
            initialNickname={initialNickname}
            error={searchParams.error}
          />
        </CardContent>
      </Card>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { updateUserRole } from '@/app/actions/user';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useUser } from '@clerk/nextjs';

type Role = 'student' | 'parent';

export default function RoleSelectionPage() {
  const [role, setRole] = useState<Role | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      setError('역할을 선택해주세요.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    // const result = await updateUserRole(role);
    console.log('Role selection submitted (currently disabled for testing):', role);

    // For UI testing, we'll just simulate a success and redirect.
    setTimeout(() => {
        router.push('/community');
    }, 1000);
    
    /* Original Logic:
    if (result.success) {
      await user?.reload(); // Reload user data to get the new metadata
      router.push('/community');
    } else {
      setError(result.error || '역할을 업데이트하는 중 오류가 발생했습니다.');
      setIsSubmitting(false);
    }
    */
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">역할 선택</CardTitle>
          <CardDescription className="text-center text-gray-600 pt-2">
            데뷔에듀 커뮤니티 활동을 위해 역할을 선택해주세요.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <RadioGroup
              value={role}
              onValueChange={(value: Role) => setRole(value)}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-100 transition-colors">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student" className="text-lg font-medium cursor-pointer w-full">
                  학생
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-100 transition-colors">
                <RadioGroupItem value="parent" id="parent" />
                <Label htmlFor="parent" className="text-lg font-medium cursor-pointer w-full">
                  학부모
                </Label>
              </div>
            </RadioGroup>
            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting || !role}>
              {isSubmitting ? '저장 중...' : '선택 완료'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 
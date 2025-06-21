'use client';

import {
  EnrollmentFormState,
  requestEnrollment,
} from '@/app/actions/enrollment';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Toaster, toast } from 'sonner';

type EnrollmentRequestFormProps = {
  userFullName: string;
  requestStatus: 'pending' | 'approved' | 'rejected' | null;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? '요청 중...' : '재원생 인증 요청'}
    </Button>
  );
}

export default function EnrollmentRequestForm({
  userFullName,
  requestStatus,
}: EnrollmentRequestFormProps) {
  const initialState: EnrollmentFormState = {
    success: false,
    message: '',
  };
  const [state, dispatch] = useFormState(requestEnrollment, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <>
      <Toaster />
      <form action={dispatch}>
        <Card>
          <CardHeader>
            <CardTitle>재원생 인증</CardTitle>
            <CardDescription>
              {requestStatus === 'rejected'
                ? '인증 요청이 거부되었습니다. 정보를 확인 후 다시 요청해 주세요.'
                : '원활한 서비스 이용을 위해 재원생 인증을 진행해 주세요.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">학생 이름</Label>
              <Input
                id="studentName"
                name="studentName"
                defaultValue={userFullName}
                placeholder="학생의 이름을 입력하세요"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">
                요청 메모 (선택 사항)
              </Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="담당 선생님 성함, 학년 등 관리자가 확인할 수 있는 정보를 남겨주세요."
              />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>
    </>
  );
} 
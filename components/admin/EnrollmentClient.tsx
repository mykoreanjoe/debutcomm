'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { processAuthRequest } from '@/app/actions/admin';
import type { AuthRequest } from '@/app/actions/admin';

interface EnrollmentClientProps {
  requests: AuthRequest[];
}

function SubmitButton({ action }: { action: 'approve' | 'reject' }) {
    const { pending } = useFormStatus();
    
    return (
        <Button
            type="submit"
            name="action"
            value={action}
            disabled={pending}
            size="sm"
            variant={action === 'approve' ? 'default' : 'destructive'}
        >
            {pending ? '처리 중...' : (action === 'approve' ? '승인' : '거절')}
        </Button>
    );
}


function RequestRow({ request }: { request: AuthRequest }) {
  const [state, formAction] = useFormState(processAuthRequest, { success: false, message: '' });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  if (state.success) {
    return null; // Hide the row on successful processing
  }

  return (
    <TableRow>
      <TableCell>{new Date(request.requested_at).toLocaleString()}</TableCell>
      <TableCell className="font-medium">{request.user_name}</TableCell>
      <TableCell>{request.user_email}</TableCell>
      <TableCell>{request.student_name}</TableCell>
      <TableCell>{request.student_id}</TableCell>
      <TableCell>{request.school}</TableCell>
      <TableCell>
        <Badge variant={request.status === 'pending' ? 'secondary' : 'default'}>
          {request.status}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <form action={formAction} className="flex gap-2 justify-end">
          <input type="hidden" name="requestId" value={request.id} />
          <SubmitButton action="approve" />
          <SubmitButton action="reject" />
        </form>
      </TableCell>
    </TableRow>
  );
}


export function EnrollmentClient({ requests }: EnrollmentClientProps) {
  if (!requests || requests.length === 0) {
    return <p className="text-center text-gray-500 py-10">대기 중인 재원생 인증 요청이 없습니다.</p>;
  }

  return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>요청일시</TableHead>
              <TableHead>요청자 이름</TableHead>
              <TableHead>요청자 이메일</TableHead>
              <TableHead>학생 이름</TableHead>
              <TableHead>학번</TableHead>
              <TableHead>학교</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <RequestRow key={request.id} request={request} />
            ))}
          </TableBody>
        </Table>
      </div>
  );
} 
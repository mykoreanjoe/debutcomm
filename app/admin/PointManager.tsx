'use client';

import { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { manageUserPoints, ManagePointsState } from './actions';

const initialState: ManagePointsState = {
  success: false,
  message: null,
  errors: null,
};

interface PointManagerProps {
  userId: string;
  currentPoints: number;
}

export default function PointManager({ userId, currentPoints }: PointManagerProps) {
  const [points, setPoints] = useState(currentPoints);
  const [reason, setReason] = useState('');
  const [state, formAction] = useFormState(manageUserPoints, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message as string);
      setReason('');
    } else if (state.errors) {
      const errorMessages = Object.values(state.errors).flat().join('\n');
      toast.error(errorMessages);
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const handleSubmit = (formData: FormData) => {
    // 포인트 변경량을 계산
    const amountChanged = points - currentPoints;
    // 변경량이 0이면 아무것도 하지 않음
    if (amountChanged === 0) {
        toast.info("포인트 변경 사항이 없습니다.");
        return;
    }
    formData.append('userId', userId);
    formData.append('amount', amountChanged.toString());
    formData.append('reason', reason);
    formAction(formData);
  };
  
  return (
    <form action={handleSubmit} className="flex items-center gap-2">
      <Input
        type="number"
        name="points"
        value={points}
        onChange={(e) => setPoints(Number(e.target.value))}
        className="w-24"
      />
      <Input
        type="text"
        name="reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="변경 사유 (필수)"
        className="w-48"
        required
      />
      <Button type="submit" disabled={points === currentPoints || !reason}>
        저장
      </Button>
    </form>
  );
} 
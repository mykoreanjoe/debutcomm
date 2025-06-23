'use client';

import { useTransition } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { updateUserAdminStatus } from './actions';

type UserAdminSwitchProps = {
  userId: string;
  isAdmin: boolean;
};

export default function UserAdminSwitch({ userId, isAdmin }: UserAdminSwitchProps) {
  const [isPending, startTransition] = useTransition();

  const handleCheckedChange = (checked: boolean) => {
    startTransition(async () => {
      try {
        await updateUserAdminStatus(userId, checked);
        toast.success(`사용자 권한이 성공적으로 변경되었습니다.`);
      } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error('권한 변경 중 오류가 발생했습니다.');
        }
      }
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={`admin-switch-${userId}`}
        checked={isAdmin}
        onCheckedChange={handleCheckedChange}
        disabled={isPending}
        aria-readonly
      />
      <Label htmlFor={`admin-switch-${userId}`} className="sr-only">
        관리자 권한
      </Label>
    </div>
  );
} 
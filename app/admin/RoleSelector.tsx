"use client";

import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role, updateUserRole } from './actions';
import { toast } from 'sonner';

interface RoleSelectorProps {
  userId: string;
  currentRoleId: number | null;
  roles: Role[];
}

export default function RoleSelector({ userId, currentRoleId, roles }: RoleSelectorProps) {
  const [isPending, startTransition] = useTransition();

  const handleValueChange = (newRoleId: string) => {
    startTransition(async () => {
      const result = await updateUserRole(userId, Number(newRoleId));
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("사용자 역할이 성공적으로 변경되었습니다.");
      }
    });
  };

  return (
    <Select
      defaultValue={currentRoleId?.toString()}
      onValueChange={handleValueChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="역할 선택" />
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role.id} value={role.id.toString()}>
            {role.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

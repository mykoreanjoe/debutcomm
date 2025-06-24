'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { UserProfileWithRole as UserWithRole, Role } from "./actions";
import RoleSelector from "./RoleSelector";
import PointManager from "./PointManager";
import SuspensionButton from './SuspensionButton';

export type { UserWithRole, Role };

interface UserTableProps {
  initialUsers: UserWithRole[];
  roles: Role[];
}

export default function UserTable({ initialUsers, roles }: UserTableProps) {
  return (
    <div>
      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>가입일</TableHead>
              <TableHead>닉네임</TableHead>
              <TableHead>역할</TableHead>
              <TableHead className="w-[350px]">포인트 관리</TableHead>
              <TableHead className="text-right">활동 관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialUsers.length > 0 ? (
              initialUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{user.nickname || 'N/A'}</TableCell>
                  <TableCell>
                    <RoleSelector 
                      userId={user.id} 
                      currentRoleId={user.user_roles?.role_id ?? null}
                      roles={roles}
                    />
                  </TableCell>
                  <TableCell>
                    <PointManager userId={user.id} currentPoints={user.points} />
                  </TableCell>
                  <TableCell className="text-right">
                    <SuspensionButton userId={user.id} isSuspended={user.is_suspended} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
               <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    표시할 사용자가 없습니다.
                  </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
'use client';

import { useEffect, useState, useTransition } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { getNotifications, markNotificationsAsRead } from '@/app/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 새로운 테이블 스키마에 맞는 타입 정의
type Notification = {
  id: number;
  content: string; // message -> content
  link_to: string | null; // link_url -> link_to
  is_read: boolean;
  created_at: string;
};

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const fetchNotifications = () => {
    startTransition(async () => {
      // 서버 액션 호출
      const { data, error } = await getNotifications();
      if (data && !error) {
        setNotifications(data as Notification[]);
      }
    });
  };

  // 1분마다 알림을 새로고침합니다.
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); 
    return () => clearInterval(interval);
  }, []);

  // 드롭다운 메뉴를 열 때 모든 알림을 '읽음'으로 처리하는 함수
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && unreadCount > 0) {
      startTransition(async () => {
        await markNotificationsAsRead();
        // UI 즉시 반영
        setNotifications(prev =>
          prev.map(n => ({ ...n, is_read: true }))
        );
      });
    }
  };

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>알림</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <DropdownMenuItem key={notification.id} asChild>
              <Link
                href={notification.link_to || '#'}
                className={`flex flex-col items-start gap-1 p-2 ${!notification.is_read ? 'bg-blue-50 dark:bg-blue-900/50' : ''}`}
              >
                <p className="text-sm font-medium whitespace-normal">{notification.content}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(notification.created_at).toLocaleString()}
                </p>
              </Link>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>새로운 알림이 없습니다.</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 
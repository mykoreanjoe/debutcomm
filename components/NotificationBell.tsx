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
import { getNotifications, markNotificationAsRead } from '@/app/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Notification = {
  id: number;
  message: string;
  link_url: string | null;
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
      const { data } = await getNotifications();
      if (data) {
        setNotifications(data as Notification[]);
      }
    });
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // 1분에 한번씩 폴링
    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = async (notification: Notification) => {
    if (notification.link_url) {
      router.push(notification.link_url);
    }
    if (!notification.is_read) {
      await markNotificationAsRead(notification.id);
      setNotifications(prev =>
        prev.map(n => (n.id === notification.id ? { ...n, is_read: true } : n))
      );
    }
  };

  return (
    <DropdownMenu onOpenChange={fetchNotifications}>
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
            <DropdownMenuItem
              key={notification.id}
              className={`flex flex-col items-start gap-1 p-2 ${!notification.is_read ? 'bg-blue-50 dark:bg-blue-900/50' : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <p className="text-sm font-medium whitespace-normal">{notification.message}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(notification.created_at).toLocaleString()}
              </p>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>새로운 알림이 없습니다.</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 
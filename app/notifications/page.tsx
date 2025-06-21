import { Bell, MessageSquare, Heart, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const dummyNotifications = [
  {
    id: 1,
    type: 'new_comment',
    content: "'Q&A 질문있습니다' 게시글에 새로운 댓글이 달렸습니다.",
    link: '/community/123',
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    isRead: false,
  },
  {
    id: 2,
    type: 'new_like',
    content: "회원님의 '자유게시판입니다' 게시글을 누군가 좋아합니다.",
    link: '/community/456',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isRead: false,
  },
  {
    id: 3,
    type: 'new_comment',
    content: "'데뷰 후기' 게시글에 새로운 댓글이 달렸습니다.",
    link: '/community/789',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isRead: true,
  },
  {
    id: 4,
    type: 'new_like',
    content: "회원님의 '데뷰 후기' 게시글을 누군가 좋아합니다.",
    link: '/community/789',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    isRead: true,
  },
];

const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'new_comment':
      return <MessageSquare className="w-5 h-5 text-blue-500" />;
    case 'new_like':
      return <Heart className="w-5 h-5 text-red-500" />;
    default:
      return <Bell className="w-5 h-5 text-gray-500" />;
  }
};

export default function NotificationsPage() {
  const unreadCount = dummyNotifications.filter(n => !n.isRead).length;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-3xl py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Bell className="w-8 h-8 text-gray-700" />
            알림
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-sm">{unreadCount}</Badge>
            )}
          </h1>
          <Button variant="outline" size="sm">
            <CheckCheck className="w-4 h-4 mr-2" />
            모두 읽음
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {dummyNotifications.map(notification => (
                <Link href={notification.link} key={notification.id}>
                    <div className={`p-4 flex items-start gap-4 transition-colors hover:bg-gray-100 ${!notification.isRead ? 'bg-blue-50' : 'bg-white'}`}>
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mt-1">
                            <NotificationIcon type={notification.type} />
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-800">{notification.content}</p>
                            <time className="text-sm text-gray-500 mt-1">
                                {formatDistanceToNow(notification.createdAt, { addSuffix: true, locale: ko })}
                            </time>
                        </div>
                        {!notification.isRead && (
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 self-center" aria-label="안 읽음"></div>
                        )}
                    </div>
                </Link>
              ))}
            </div>
            {dummyNotifications.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>새로운 알림이 없습니다.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
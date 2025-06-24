'use client';

import { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import TiptapEditor from '@/components/editor/TiptapEditor';
import { updateAnnouncement } from '@/app/admin/actions';
import type { getAnnouncementById } from '@/app/admin/actions';

interface EditFormProps {
  announcement: NonNullable<Awaited<ReturnType<typeof getAnnouncementById>>>;
}

const initialState = {
  success: false,
  message: '',
};

export function EditAnnouncementForm({ announcement }: EditFormProps) {
  const router = useRouter();
  const [content, setContent] = useState(announcement.content || '');
  
  const updateAnnouncementWithId = updateAnnouncement.bind(null, announcement.id);
  const [state, formAction] = useActionState(updateAnnouncementWithId, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        router.push('/admin/announcements');
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <form action={formAction}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">제목</Label>
          <Input 
            id="title" 
            name="title" 
            defaultValue={announcement.title} 
            placeholder="공지사항 제목을 입력하세요." 
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">내용</Label>
          <TiptapEditor
            content={content}
            onChange={setContent}
          />
          <input type="hidden" name="content" value={content} />
        </div>
        <Button type="submit">수정 완료</Button>
      </div>
    </form>
  );
} 
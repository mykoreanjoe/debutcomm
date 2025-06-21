'use client';

import { useRef, useState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useUser } from '@clerk/nextjs';
import { createPost } from '@/app/actions/posts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox"

const ALL_CATEGORIES = [
    { id: 1, name: '교육 FAQ' },
    { id: 2, name: '일반질문' },
    { id: 3, name: '신나는 그림그리기' },
    { id: 4, name: '영어 공부 인증' },
    { id: 5, name: '공지사항' },
];

function SubmitButton({ isUpdateMode }: { isUpdateMode: boolean }) {
  const { pending } = useFormStatus();
  const text = isUpdateMode ? '게시글 수정' : '게시글 작성';
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> 처리 중...</> : text}
    </Button>
  );
}

export type PostFormData = {
    title: string;
    content: string;
    category_id: number | null;
    image_url: string | null;
}

interface PostCreateFormProps {
    formAction: (formData: FormData) => Promise<any>;
    initialData?: PostFormData | null;
}

export default function PostCreateForm({ formAction, initialData }: PostCreateFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { user } = useUser();
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [availableCategories, setAvailableCategories] = useState(ALL_CATEGORIES);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image_url || null);
  const isUpdateMode = !!initialData;

  useEffect(() => {
    const userRole = user?.publicMetadata?.role;
    if (!isUpdateMode) { // Only apply this restriction on create mode
        if (userRole === 'admin' || userRole === 'teacher') {
            setAvailableCategories(ALL_CATEGORIES);
        } else {
            setAvailableCategories(ALL_CATEGORIES.filter(cat => cat.id !== 5));
        }
    } else {
        // In update mode, show all categories in case role changed. Server will validate.
        setAvailableCategories(ALL_CATEGORIES);
    }
  }, [user, isUpdateMode]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // If no file is selected, and we are in edit mode, show the initial image again.
      // Otherwise (create mode), clear the preview.
      setImagePreview(initialData?.image_url || null);
    }
  };
  
  const action = async (formData: FormData) => {
    setMessage(null);
    const result = await formAction(formData);
    
    if (result && !result.success) {
      setMessage({ type: 'error', text: result.message });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isUpdateMode ? '게시글 수정' : '새 게시글 작성'}</CardTitle>
      </CardHeader>
      <form ref={formRef} action={action}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="category">카테고리</Label>
            <Select name="categoryId" required defaultValue={initialData?.category_id?.toString()}>
              <SelectTrigger id="category">
                <SelectValue placeholder="카테고리를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input id="title" name="title" placeholder="제목을 입력하세요" required defaultValue={initialData?.title} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">내용</Label>
            <Textarea id="content" name="content" placeholder="내용을 입력하세요." rows={8} required defaultValue={initialData?.content} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">이미지</Label>
            <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
                <div className="mt-4 border rounded-md p-2 space-y-2">
                    <p className="text-sm font-medium">이미지 미리보기:</p>
                    <img src={imagePreview} alt="Image preview" className="rounded-md max-h-60 object-contain" />
                </div>
            )}
          </div>
          {isUpdateMode && initialData?.image_url && (
              <div className="flex items-center space-x-2">
                  <Checkbox id="deleteImage" name="deleteImage" />
                  <label
                      htmlFor="deleteImage"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                      기존 이미지 삭제 (새 이미지를 업로드하면 이 옵션은 무시됩니다)
                  </label>
              </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
            <p className="text-xs text-gray-500 text-center">
                글/댓글 작성 시 활동 점수(포인트)가 지급됩니다. 커뮤니티 활동을 통해 데뷰 챔피언이 되어보세요!
            </p>
            {message && <p className={`text-sm ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>{message.text}</p>}
            <SubmitButton isUpdateMode={isUpdateMode} />
        </CardFooter>
      </form>
    </Card>
  );
} 
'use client';

import { useState, useTransition, useEffect } from 'react';
import { searchUsers, spendPoints, SearchedUser } from '@/app/actions/points';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Search } from 'lucide-react';

const SPENDING_CATEGORIES = ['test', 'snack', 'tuition', 'etc'];

export default function PointSpendingForm() {
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchedUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<SearchedUser | null>(null);
  const [formState, setFormState] = useState<{ success: boolean; message: string; } | null>(null);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }
      const users = await searchUsers(searchQuery);
      setSearchResults(users);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const handleSelectUser = (user: SearchedUser) => {
    setSelectedUser(user);
    setSearchResults([]);
  };
  
  const handleSubmit = (formData: FormData) => {
    if (!selectedUser) {
        setFormState({ success: false, message: '사용자를 선택해주세요.' });
        return;
    }
    formData.set('userId', selectedUser.id);

    startTransition(async () => {
        const result = await spendPoints(formData);
        setFormState({ success: result.success || false, message: result.message || result.error || '오류가 발생했습니다.'});
        if(result.success) {
            setSelectedUser(prev => prev ? {...prev, total_points: prev.total_points - Number(formData.get('points'))} : null);
        }
    });
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>포인트 사용 등록</CardTitle>
        <CardDescription>학생 이름 또는 이메일로 검색하여 포인트를 차감합니다.</CardDescription>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-6">
          {/* User Search Section */}
          <div className="space-y-2">
            <Label htmlFor="search">사용자 검색</Label>
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="search" placeholder="이름 또는 이메일..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            {searchResults.length > 0 && (
                <ul className="border rounded-md mt-1 max-h-40 overflow-y-auto bg-white absolute z-10 w-full">
                    {searchResults.map(user => (
                        <li key={user.id} onClick={() => handleSelectUser(user)} className="p-2 hover:bg-slate-100 cursor-pointer">
                            {user.name} ({user.email}) - {user.total_points}P
                        </li>
                    ))}
                </ul>
            )}
          </div>

          {selectedUser && (
            <div className="p-4 bg-slate-50 rounded-lg border">
              <p className="font-semibold text-lg">{selectedUser.name}</p>
              <p className="text-sm text-gray-600">{selectedUser.email}</p>
              <p className="text-md mt-2">보유 포인트: <span className="font-bold text-teal-600">{selectedUser.total_points} P</span></p>
            </div>
          )}

          {/* Point Spending Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">사용 항목</Label>
              <Select name="category" required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="항목 선택" />
                </SelectTrigger>
                <SelectContent>
                  {SPENDING_CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="points">사용 포인트</Label>
              <Input id="points" name="points" type="number" placeholder="예: 30" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Input id="description" name="description" placeholder="예: 6월 단어테스트 응시" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch space-y-4">
          <Button type="submit" disabled={isPending || !selectedUser}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            포인트 사용 등록
          </Button>
          {formState && (
            <div className={`p-3 rounded-md text-sm ${formState.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {formState.message}
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
} 
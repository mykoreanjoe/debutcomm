"use client"; // 클라이언트 컴포넌트로 명시

import React, { useState, useEffect, useMemo } from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { BookHeadphones, Lock, ArrowRight, Search, Film, Loader2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Input 컴포넌트 추가

const STUDY_ROOM_PASSWORD = "debutedu";
const SUPABASE_URL = "https://aijwqgvcfzqbrdwbfwsp.supabase.co/rest/v1/grammar_videos?select=*";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpandxZ3ZjZnpxYnJkd2Jmd3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MjE0NzYsImV4cCI6MjA2Mzk5NzQ3Nn0.vq-D3CwR-lBVz6nC61-S8grI0CNAq2GdnRKSZ6cyKVs";

interface Video {
  id: number;
  title: string;
  description: string;
  video_url?: string; // 실제 영상 URL 필드가 있다면 사용
  // 필요한 다른 필드들 추가 가능
}

const StudyRoomPage = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === STUDY_ROOM_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('비밀번호가 일치하지 않습니다.');
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchVideos = async () => {
        setIsLoading(true);
        setFetchError(null);
        try {
          const response = await fetch(SUPABASE_URL, {
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`, // Supabase는 보통 apikey를 Authorization Bearer 토큰으로도 사용
            }
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: Video[] = await response.json();
          setVideos(data);
        } catch (err) {
          console.error("Failed to fetch videos:", err);
          if (err instanceof Error) {
            setFetchError(`영상 목록을 불러오는 데 실패했습니다: ${err.message}`);
          } else {
            setFetchError("영상 목록을 불러오는 데 실패했습니다. 알 수 없는 오류입니다.");
          }
        } finally {
          setIsLoading(false);
        }
      };
      fetchVideos();
    }
  }, [isAuthenticated]);

  const filteredVideos = useMemo(() => {
    if (!searchTerm) {
      return videos;
    }
    return videos.filter(video => 
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (video.description && video.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [videos, searchTerm]);

  return (
    <main className="container mx-auto px-4 py-12 md:py-16 min-h-screen">
      <div className="text-center mb-12">
        <BookHeadphones className="w-20 h-20 md:w-24 md:h-24 text-blue-600 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700">데뷰 스터디룸</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          이곳은 데뷰 학생들만을 위한 집중 학습 공간입니다. 다양한 학습 자료와 조용한 환경을 제공하여 학습 효율을 극대화할 수 있도록 지원합니다.
        </p>
      </div>

      <SignedIn>
        {!isAuthenticated ? (
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg max-w-md mx-auto text-center">
            <Lock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">스터디룸 비밀번호 입력</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                className="text-center"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                입장하기
              </Button>
            </form>
          </div>
        ) : (
          // 비밀번호 인증 성공 후 영상 콘텐츠 표시
          <div>
            <div className="mb-8 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="학습 영상 검색 (제목 또는 내용으로 검색)..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>

            {isLoading && (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                <p className="ml-3 text-lg text-gray-600">영상 목록을 불러오는 중입니다...</p>
              </div>
            )}

            {fetchError && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md shadow-md max-w-2xl mx-auto text-center">
                <div className="flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                  <p className="text-red-700 font-semibold">{fetchError}</p>
                </div>
              </div>
            )}

            {!isLoading && !fetchError && filteredVideos.length === 0 && (
              <p className="text-center text-gray-500 py-10 text-lg">
                {searchTerm ? "검색 결과가 없습니다." : "등록된 영상이 없습니다."}
              </p>
            )}

            {!isLoading && !fetchError && filteredVideos.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <div key={video.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                    {/* 썸네일이나 비디오 아이콘 (video.thumbnail_url 또는 기본 아이콘) */}
                    <div className="bg-gray-200 h-48 flex items-center justify-center">
                      {/* TODO: 실제 썸네일이 있다면 Image 컴포넌트 사용 */}
                      <Film className="w-16 h-16 text-gray-400" />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold text-blue-700 mb-2 truncate" title={video.title}>
                        {video.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                        {video.description || "설명이 없습니다."}
                      </p>
                      {/* TODO: 실제 video_url이 있다면 시청 버튼/링크 추가 */}
                       {video.video_url ? (
                        <Button asChild size="sm" className="mt-auto bg-blue-600 hover:bg-blue-700 w-full">
                          <Link href={video.video_url} target="_blank" rel="noopener noreferrer">
                            영상 시청하기 <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      ) : (
                        <Button size="sm" disabled className="mt-auto w-full">
                          시청 불가
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </SignedIn>

      <SignedOut>
        <div className="mt-12 p-8 bg-amber-50 border border-amber-200 rounded-lg text-center max-w-xl mx-auto shadow-lg">
          <Lock className="w-10 h-10 text-amber-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-amber-700 mb-3">회원 전용 공간입니다</h3>
          <p className="text-amber-600 mb-8 text-lg">
            스터디룸의 모든 콘텐츠와 기능은 로그인한 데뷰 학생들만 이용 가능합니다.
          </p>
          <SignInButton mode="modal">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              로그인하고 스터디룸 이용하기
            </Button>
          </SignInButton>
        </div>
      </SignedOut>
    </main>
  );
};

export default StudyRoomPage; 
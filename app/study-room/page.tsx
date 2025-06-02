"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { BookHeadphones, Lock, ArrowRight, Search, Film, Loader2, AlertTriangle, Youtube } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabaseClient';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const STUDY_ROOM_PASSWORD = "debutedu";

interface Video {
  id: string; // Changed to string to accommodate UUID
  title: string;
  description?: string; // Made optional
  video_url?: string; // For grammar videos that might link directly
  youtube_url?: string; // For student youtube videos
  youtube_id?: string; // For student youtube videos, to construct embed URL
  thumbnail_url?: string;
}

const StudyRoomPage = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  
  // Grammar Videos States
  const [grammarVideos, setGrammarVideos] = useState<Video[]>([]);
  const [searchTermGrammar, setSearchTermGrammar] = useState('');
  const [isLoadingGrammar, setIsLoadingGrammar] = useState(false);
  const [fetchErrorGrammar, setFetchErrorGrammar] = useState<string | null>(null);

  // Student Videos States
  const [studentVideos, setStudentVideos] = useState<Video[]>([]);
  const [searchTermStudent, setSearchTermStudent] = useState('');
  const [isLoadingStudent, setIsLoadingStudent] = useState(false);
  const [fetchErrorStudent, setFetchErrorStudent] = useState<string | null>(null);

  // Video Player Dialog States
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

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
      const fetchGrammarVideos = async () => {
        setIsLoadingGrammar(true);
        setFetchErrorGrammar(null);
        try {
          if (!supabase) {
            throw new Error("Supabase client is not initialized.");
          }
          const { data, error } = await supabase
            .from('grammar_videos')
            .select('*');

          if (error) throw error;
          if (data) setGrammarVideos(data as Video[]);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류입니다.';
          setFetchErrorGrammar(`문법 영상 목록을 불러오는 데 실패했습니다: ${errorMessage}`);
        } finally {
          setIsLoadingGrammar(false);
        }
      };

      const fetchStudentVideos = async () => {
        setIsLoadingStudent(true);
        setFetchErrorStudent(null);
        try {
          if (!supabase) {
            throw new Error("Supabase client is not initialized.");
          }
          const { data, error } = await supabase
            .from('grammar_videos')
            .select('id, title, youtube_id, youtube_url, thumbnail_url');

          if (error) throw error;
          if (data) {
            setStudentVideos(data.map(v => ({...v, id: String(v.id)})) as Video[]);
          }
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류입니다.';
          setFetchErrorStudent(`학생 영상 목록을 불러오는 데 실패했습니다: ${errorMessage}`);
        } finally {
          setIsLoadingStudent(false);
        }
      };

      fetchGrammarVideos();
      fetchStudentVideos();
    }
  }, [isAuthenticated]);

  const filteredGrammarVideos = useMemo(() => {
    if (!searchTermGrammar) return grammarVideos;
    return grammarVideos.filter(video => 
      video.title.toLowerCase().includes(searchTermGrammar.toLowerCase()) ||
      (video.description && video.description.toLowerCase().includes(searchTermGrammar.toLowerCase()))
    );
  }, [grammarVideos, searchTermGrammar]);

  const filteredStudentVideos = useMemo(() => {
    if (!searchTermStudent) return studentVideos;
    return studentVideos.filter(video => 
      video.title.toLowerCase().includes(searchTermStudent.toLowerCase()) ||
      (video.description && video.description.toLowerCase().includes(searchTermStudent.toLowerCase()))
    );
  }, [studentVideos, searchTermStudent]);

  const openVideoPlayer = (video: Video) => {
    setSelectedVideo(video);
    setIsPlayerOpen(true);
  };

  const renderVideoCard = (video: Video, isStudentVideo: boolean = false) => {
    const thumbnailUrl = video.thumbnail_url || ''; // Use a placeholder if no thumbnail
    const title = video.title;
    const description = video.description || "설명이 없습니다.";

    return (
      <div key={video.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
        <button 
          onClick={() => openVideoPlayer(video)} 
          className="w-full focus:outline-none"
          aria-label={`Play video ${title}`}
        >
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt={title} className="w-full h-48 object-cover" />
          ) : (
            <div className="bg-gray-200 h-48 flex items-center justify-center">
              <Film className="w-16 h-16 text-gray-400" />
            </div>
          )}
        </button>
        <div className="p-4 flex flex-col flex-grow">
          <h3 
            className="text-xl font-semibold text-blue-700 mb-2 truncate cursor-pointer hover:underline" 
            title={title}
            onClick={() => openVideoPlayer(video)}
          >
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
            {description}
          </p>
          {isStudentVideo && video.youtube_id && (
            <Button 
              onClick={() => openVideoPlayer(video)} 
              size="sm" 
              className="mt-auto bg-red-600 hover:bg-red-700 w-full"
            >
              <Youtube className="mr-2 h-4 w-4" /> 학생 영상 시청하기
            </Button>
          )}
          {!isStudentVideo && video.video_url && (
            <Button asChild size="sm" className="mt-auto bg-blue-600 hover:bg-blue-700 w-full">
              <Link href={video.video_url} target="_blank" rel="noopener noreferrer">
                문법 영상 시청하기 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
          {/* Fallback for videos without a direct action button if needed */}
          {!isStudentVideo && !video.video_url && !video.youtube_id &&(
             <Button size="sm" disabled className="mt-auto w-full">
                시청 불가
             </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <main className="container mx-auto px-4 py-12 md:py-16 min-h-screen">
      <Dialog open={isPlayerOpen} onOpenChange={setIsPlayerOpen}>
        <DialogContent className="max-w-none w-full h-full p-0 !rounded-none !border-none">
          {selectedVideo && (
            <div className="relative w-full h-full bg-black">
              <DialogHeader className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
                <DialogTitle className="text-white text-lg md:text-xl truncate">{selectedVideo.title}</DialogTitle>
                <DialogClose asChild>
                  <Button variant="outline" size="icon" className="text-white bg-black/50 hover:bg-black/80">
                    X
                  </Button>
                </DialogClose>
              </DialogHeader>
              {/* Prefer youtube_id for embed, fallback to youtube_url if it's an embeddable link */}
              {selectedVideo.youtube_id ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtube_id}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : selectedVideo.youtube_url && selectedVideo.youtube_url.includes("embed") ? (
                 <iframe
                  className="w-full h-full"
                  src={`${selectedVideo.youtube_url}${selectedVideo.youtube_url.includes('?') ? '&' : '?'}autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
                  <AlertTriangle className="w-12 h-12 mr-4" />
                  <p>비디오를 재생할 수 없습니다. (지원되지 않는 URL 형식)</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="text-center mb-12">
        <BookHeadphones className="w-20 h-20 md:w-24 md:h-24 text-blue-600 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700">데뷰 스터디룸</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          데뷰 학생들을 위한 전용 학습 공간입니다. 비밀번호를 입력하여 입장해주세요.
        </p>
      </div>

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
        <div>
          {/* Student Videos Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-red-600 mb-6 text-center">학생 학습 영상</h2>
            <div className="mb-8 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="학생 영상 검색 (제목 또는 내용)..."
                  value={searchTermStudent}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTermStudent(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>

            {isLoadingStudent && (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-12 w-12 animate-spin text-red-600" />
                <p className="ml-3 text-lg text-gray-600">학생 영상 목록을 불러오는 중입니다...</p>
              </div>
            )}

            {fetchErrorStudent && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md shadow-md max-w-2xl mx-auto text-center">
                <div className="flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                  <p className="text-red-700 font-semibold">{fetchErrorStudent}</p>
                </div>
              </div>
            )}

            {!isLoadingStudent && !fetchErrorStudent && filteredStudentVideos.length === 0 && (
              <p className="text-center text-gray-500 py-10 text-lg">
                {searchTermStudent ? "검색된 학생 영상이 없습니다." : "등록된 학생 영상이 없습니다."}
              </p>
            )}
            
            {!isLoadingStudent && !fetchErrorStudent && filteredStudentVideos.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudentVideos.map((video) => renderVideoCard(video, true))}
              </div>
            )}
          </section>

          {/* Grammar Videos Section (Existing) */}
          <section>
            <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">문법 학습 영상</h2>
            <div className="mb-8 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="문법 영상 검색 (제목 또는 내용)..."
                  value={searchTermGrammar}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTermGrammar(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>

            {isLoadingGrammar && (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                <p className="ml-3 text-lg text-gray-600">문법 영상 목록을 불러오는 중입니다...</p>
              </div>
            )}

            {fetchErrorGrammar && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md shadow-md max-w-2xl mx-auto text-center">
                <div className="flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                  <p className="text-red-700 font-semibold">{fetchErrorGrammar}</p>
                </div>
              </div>
            )}
            
            {!isLoadingGrammar && !fetchErrorGrammar && filteredGrammarVideos.length === 0 && (
               <p className="text-center text-gray-500 py-10 text-lg">
                {searchTermGrammar ? "검색된 문법 영상이 없습니다." : "등록된 문법 영상이 없습니다."}
              </p>
            )}

            {!isLoadingGrammar && !fetchErrorGrammar && filteredGrammarVideos.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGrammarVideos.map((video) => renderVideoCard(video, false))}
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
};

export default StudyRoomPage; 
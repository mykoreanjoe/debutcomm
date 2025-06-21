// import { getPost, getComments } from '@/app/actions/posts';
import { currentUser } from '@clerk/nextjs/server';
import PostDetailClient from '@/components/community/PostDetailClient';
import { notFound } from 'next/navigation';
// import { PostType, CommentWithUser } from '@/app/actions/posts'; // Remove explicit typing to avoid mismatch

// --- Dummy Data for UI Testing ---
const dummyPost = {
  id: 102,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  title: '저 이번에 토플 110점 넘었어요! 😭',
  content: `
    <p>안녕하세요, 데뷰에서 공부하고 있는 박수강생입니다.</p>
    <p>정말 오랜 시간 고생했는데, 드디어 이번 토플 시험에서 110점을 넘었습니다. 조셉 선생님의 꼼꼼한 지도와 데뷰의 체계적인 커리큘럼 덕분인 것 같아요. 특히 라이팅 첨삭이 정말 큰 도움이 되었습니다.</p>
    <p>슬럼프도 있었고 포기하고 싶을 때도 많았는데, 커뮤니티에서 다른 분들 글 보면서 자극도 받고 위로도 얻었습니다. 다들 정말 감사합니다!</p>
    <img src="/images/studybook_sample_adj_adv_notes.jpg" alt="공부노트 샘플" style="width:100%; max-width: 500px; margin-top: 1rem; border-radius: 8px;" />
    <p>혹시 토플 공부법 관련해서 궁금한 점 있으시면 댓글로 물어봐 주세요. 제가 아는 선에서 최대한 답변해 드릴게요!</p>
  `,
  user_id: 'user_2',
  user_profile: {
      user_id: 'user_2',
      name: '박수강생',
      role: 'student',
      email: 'student@example.com',
      student_id: 'S12345',
      points: 1500,
      is_verified: true,
      image_url: 'https://i.pravatar.cc/48?u=user_2'
  },
  category: '자유',
  category_id: 2,
  image_url: null,
  likes: ['user_1', 'user_3', 'user_4', 'user_5'],
  comments: [{ count: 3 }],
};

const dummyComments = [
    {
        id: 1,
        content: '와 정말 축하드립니다! 저도 자극받고 더 열심히 해야겠어요!',
        created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        updated_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        user_id: 'user_1',
        post_id: 102,
        is_private: false,
        users: {
            name: '김데뷰',
            role: 'student',
        }
    },
    {
        id: 2,
        content: '대단하시네요! 혹시 리딩 파트는 어떤 식으로 공부하셨는지 여쭤봐도 될까요?',
        created_at: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
        updated_at: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
        user_id: 'user_3',
        post_id: 102,
        is_private: false,
        users: {
            name: '이선생',
            role: 'teacher',
        }
    },
    {
        id: 3,
        content: '축하드립니다. 노력의 결실이네요. 앞으로도 응원하겠습니다.',
        created_at: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
        updated_at: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
        user_id: 'user_admin',
        post_id: 102,
        is_private: false,
        users: {
            name: '관리자',
            role: 'admin',
        }
    }
];
// ---

export default async function PostPage({ params }: any) {
  const id = Number(params.id);
  if (isNaN(id)) {
    // For testing, we can just use the dummy data regardless of ID.
    // notFound();
  }
  
  const user = await currentUser();

  // --- Data fetching is disabled for UI testing ---
  const postData = dummyPost;
  const commentsData = dummyComments;
  // const postData = await getPost(id); 
  // const commentsData = await getComments(id);

  if (!postData) {
    notFound();
  }

  return (
    <PostDetailClient 
      post={postData} 
      comments={commentsData} 
      user={user ? { id: user.id } : null} 
    />
  );
} 
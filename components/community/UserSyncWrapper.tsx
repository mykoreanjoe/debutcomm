'use client';

import { useEffect } from 'react';
import { syncUserToSupabase } from '@/app/actions/user';

// 이 컴포넌트는 오직 Supabase 동기화 작업만 수행합니다.
const UserSyncWrapper = () => {
  useEffect(() => {
    syncUserToSupabase();
  }, []);

  return null; // UI를 렌더링하지 않습니다.
};

export default UserSyncWrapper; 
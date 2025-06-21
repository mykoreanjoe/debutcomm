'use server';

import { supabase } from '@/lib/supabaseClient';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

// ====================================================================
// Type Definitions
// ====================================================================
export type ClassInfo = {
  id: number;
  name: string;
  description: string | null;
  student_count: number;
};

export type StudentInClass = {
  user_id: string;
  name: string;
  email: string;
  student_id: string | null;
  points: number;
};

/**
 * Type for attendance form data.
 */
export type AttendanceData = {
    student_id: string;
    status: 'present' | 'late' | 'absent';
    teacher_comment: string | null;
}

/**
 * Type for daily score form data.
 */
export type DailyScoreData = {
    student_id: string;
    score: number | null;
    max_score: number | null;
    level: string | null;
    teacher_comment: string | null;
}

// ====================================================================
// Teacher Actions
// ====================================================================

/**
 * Fetches the classes assigned to the currently logged-in teacher using an RPC.
 * It also includes a count of students in each class.
 * RLS policy is not strictly needed for the RPC if it's designed to only show correct data.
 */
export async function getMyClasses(): Promise<ClassInfo[]> {
  const teacher = await currentUser();
  if (!teacher || teacher.publicMetadata.role !== 'teacher') {
    return [];
  }

  const { data, error } = await supabase.rpc('get_teacher_classes', {
    p_teacher_id: teacher.id
  });

  if (error) {
    console.error('Error calling get_teacher_classes RPC:', error);
    return [];
  }
  return data;
}

/**
 * Fetches the list of students for a specific class using an RPC.
 * This is more secure and efficient than a complex select query from the client-side.
 */
export async function getStudentsInClass(classId: number): Promise<StudentInClass[]> {
    const teacher = await currentUser();
    if (!teacher || teacher.publicMetadata.role !== 'teacher') {
        return [];
    }

    // A teacher should only be able to get students from their own class.
    // We can add a check here, although RLS on the underlying tables provides security.
    // For simplicity, we trust the RLS policies and call the RPC directly.

    const { data, error } = await supabase.rpc('get_students_in_class', {
        p_class_id: classId
    });
    
    if (error) {
        console.error(`Error calling get_students_in_class RPC for class ${classId}:`, error);
        return [];
    }
    
    return data;
}

/**
 * Fetches details for a single class.
 * RLS ensures a teacher can only access their own class details.
 */
export async function getClassInfo(classId: number) {
    const { data, error } = await supabase
        .from('classes')
        .select('name, description')
        .eq('id', classId)
        .single();
    
    if (error) {
        console.error(`Error fetching info for class ${classId}:`, error);
        return null;
    }

    return data;
}

/**
 * Updates attendance for multiple students in a class for a specific date.
 * Uses 'upsert' to either create a new attendance record or update an existing one.
 */
export async function updateAttendance(
    classId: number,
    attendanceDate: string, // YYYY-MM-DD format
    attendanceData: AttendanceData[]
) {
    const teacher = await currentUser();
    if (!teacher || teacher.publicMetadata.role !== 'teacher') {
        return { success: false, message: '권한이 없습니다.' };
    }

    if (!classId || !attendanceDate || !attendanceData || attendanceData.length === 0) {
        return { success: false, message: '필수 정보가 누락되었습니다.' };
    }

    // RLS policy will prevent a teacher from updating a class that is not theirs.
    
    const recordsToUpsert = attendanceData.map(record => ({
        class_id: classId,
        student_id: record.student_id,
        attendance_date: attendanceDate,
        status: record.status,
        teacher_comment: record.teacher_comment
    }));

    const { error } = await supabase.from('attendance').upsert(recordsToUpsert, {
        onConflict: 'class_id,student_id,attendance_date' // Composite unique key
    });

    if (error) {
        console.error('Error upserting attendance:', error);
        return { success: false, message: '출결 정보 업데이트에 실패했습니다.' };
    }
    
    revalidatePath(`/teacher/class/${classId}`);
    return { success: true, message: '출결 정보가 성공적으로 저장되었습니다.' };
}

/**
 * Creates or updates daily scores for multiple students for a specific date.
 */
export async function upsertDailyScores(
    classId: number,
    scoreDate: string, // YYYY-MM-DD format
    scoreData: DailyScoreData[]
) {
    const teacher = await currentUser();
    if (!teacher || teacher.publicMetadata.role !== 'teacher') {
        return { success: false, message: '권한이 없습니다.' };
    }

    if (!classId || !scoreDate || !scoreData || scoreData.length === 0) {
        return { success: false, message: '필수 정보가 누락되었습니다.' };
    }

    const recordsToUpsert = scoreData.map(record => ({
        class_id: classId,
        student_id: record.student_id,
        score_date: scoreDate,
        score: record.score,
        max_score: record.max_score,
        level: record.level,
        teacher_comment: record.teacher_comment,
        teacher_id: teacher.id
    }));
    
    const { error } = await supabase.from('daily_scores').upsert(recordsToUpsert, {
        onConflict: 'class_id,student_id,score_date'
    });

    if (error) {
        console.error('Error upserting daily scores:', error);
        return { success: false, message: '일일 성적 정보 업데이트에 실패했습니다.' };
    }

    revalidatePath(`/teacher/class/${classId}`);
    return { success: true, message: '일일 성적 정보가 성공적으로 저장되었습니다.' };
}

/**
 * Fetches attendance records for a specific class on a specific date.
 */
export async function getAttendanceByDate(classId: number, attendanceDate: string) {
    const { data, error } = await supabase
        .from('attendance')
        .select('student_id, status, teacher_comment')
        .eq('class_id', classId)
        .eq('attendance_date', attendanceDate);

    if (error) {
        console.error(`Error fetching attendance for class ${classId} on ${attendanceDate}:`, error);
        return null;
    }
    
    return data;
}

/**
 * Fetches daily scores for a specific class on a specific date.
 */
export async function getDailyScoresByDate(classId: number, scoreDate: string) {
    const { data, error } = await supabase
        .from('daily_scores')
        .select('student_id, score, max_score, level, teacher_comment')
        .eq('class_id', classId)
        .eq('score_date', scoreDate);

    if (error) {
        console.error(`Error fetching daily scores for class ${classId} on ${scoreDate}:`, error);
        return null;
    }
    
    return data;
} 
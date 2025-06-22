"use server";

import { supabase } from '@/lib/supabaseClient';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

async function verifyAdmin() {
    const { sessionClaims } = await auth();
    const userRole = (sessionClaims?.metadata as { role?: string })?.role;
    if (userRole !== 'admin') {
        throw new Error('권한이 없습니다.');
    }
}

export async function dismissReport(reportId: number) {
    await verifyAdmin();
    
    try {
        const { error } = await supabase
            .from('reports')
            .delete()
            .eq('id', reportId);
        
        if (error) throw error;
        
        revalidatePath('/admin/reports');
        return { success: true, message: '신고를 기각 처리했습니다.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function deleteContentAndDismiss(reportId: number, postId: number | null, commentId: number | null) {
    await verifyAdmin();

    try {
        if (commentId) {
            const { error: commentError } = await supabase
                .from('comments')
                .delete()
                .eq('id', commentId);
            if (commentError) throw commentError;
        } else if (postId) {
            const { error: postError } = await supabase
                .from('posts')
                .delete()
                .eq('id', postId);
            if (postError) throw postError;
        }

        const { error: reportError } = await supabase
            .from('reports')
            .delete()
            .eq('id', reportId);
        if (reportError) throw reportError;
        
        revalidatePath('/admin/reports');
        // If content was deleted, it might be good to revalidate the community page too
        if(postId) revalidatePath(`/community/${postId}`);
        if(commentId) revalidatePath(`/community/*`); // Revalidate all community detail pages for safety
        
        return { success: true, message: '컨텐츠를 삭제하고 신고를 처리했습니다.' };

    } catch (e: any) {
        return { error: e.message };
    }
}

export async function approveVerificationRequest(userId: string) {
    await verifyAdmin();
    try {
        const { error } = await supabase
            .from('user_profile')
            .update({ 
                is_verified: true,
                request_verified: false, // reset request status
                approved_at: new Date().toISOString()
            })
            .eq('id', userId);

        if (error) throw error;
        revalidatePath('/admin/verifications');
        return { success: true, message: '인증 요청을 승인했습니다.' };
    } catch (e: any) {
        console.error("Error approving verification:", e);
        return { error: e.message };
    }
}

export async function rejectVerificationRequest(userId: string, reason: string) {
    await verifyAdmin();
    try {
        const { error } = await supabase
            .from('user_profile')
            .update({ 
                request_verified: false, // reset request status to allow re-request
                reject_reason: reason,
                rejected_at: new Date().toISOString()
             })
            .eq('id', userId);

        if (error) throw error;
        revalidatePath('/admin/verifications');
        return { success: true, message: '인증 요청을 거절했습니다.' };
    } catch (e: any) {
        console.error("Error rejecting verification:", e);
        return { error: e.message };
    }
} 
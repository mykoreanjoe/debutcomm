import { createClient } from '@/lib/supabase/server';

export const revalidate = 0;

export default async function DebugPage() {
    const supabase = createClient();
    console.log("--- Starting RLS Debug Check ---");

    // 1. Test 'board' table
    try {
        const { data, error } = await supabase.from('board').select('id', { count: 'exact', head: true }).limit(1);
        if (error) throw error;
        console.log("✅ SUCCESS: Reading from 'board' table.");
    } catch (error: any) {
        console.error("❌ FAILED: Reading from 'board' table.", { code: error.code, message: error.message });
    }

    // 2. Test 'user_profile' table
    try {
        const { data, error } = await supabase.from('user_profile').select('id', { count: 'exact', head: true }).limit(1);
        if (error) throw error;
        console.log("✅ SUCCESS: Reading from 'user_profile' table.");
    } catch (error: any) {
        console.error("❌ FAILED: Reading from 'user_profile' table.", { code: error.code, message: error.message });
    }

    // 3. Test 'posts' table
    try {
        const { data, error } = await supabase.from('posts').select('id', { count: 'exact', head: true }).limit(1);
        if (error) throw error;
        console.log("✅ SUCCESS: Reading from 'posts' table.");
    } catch (error: any) {
        console.error("❌ FAILED: Reading from 'posts' table.", { code: error.code, message: error.message });
    }

    // 4. Test 'likes' table
    try {
        const { data, error } = await supabase.from('likes').select('id', { count: 'exact', head: true }).limit(1);
        if (error) throw error;
        console.log("✅ SUCCESS: Reading from 'likes' table.");
    } catch (error: any) {
        console.error("❌ FAILED: Reading from 'likes' table.", { code: error.code, message: error.message });
    }

    // 5. Test 'comments' table
    try {
        const { data, error } = await supabase.from('comments').select('id', { count: 'exact', head: true }).limit(1);
        if (error) throw error;
        console.log("✅ SUCCESS: Reading from 'comments' table.");
    } catch (error: any) {
        console.error("❌ FAILED: Reading from 'comments' table.", { code: error.code, message: error.message });
    }

    console.log("--- RLS Debug Check Complete ---");

    return (
        <div style={{ padding: '2rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
            <h1>RLS Debug Page</h1>
            <p>Check the server console output (your terminal) for the results of the RLS checks.</p>
        </div>
    );
} 
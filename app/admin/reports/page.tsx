import { supabase } from '@/lib/supabaseClient';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import ReportActions from './ReportActions';

export const revalidate = 0;

async function getReports() {
    const { data, error } = await supabase
        .from('reports')
        .select(`
            id, created_at, reason, post_id, comment_id,
            reporter:user_profile ( nickname ),
            post:posts ( title ),
            comment:comments ( content, post_id )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching reports:', error);
        return [];
    }
    
    // 데이터 구조를 표준화하여 타입 문제를 근본적으로 해결
    const standardizedData = data.map(r => ({
        ...r,
        reporter: Array.isArray(r.reporter) ? r.reporter[0] : r.reporter,
        post: Array.isArray(r.post) ? r.post[0] : r.post,
        comment: Array.isArray(r.comment) ? r.comment[0] : r.comment,
    }));

    return standardizedData;
}

export type Report = Awaited<ReturnType<typeof getReports>>[number];

export default async function ReportsPage() {
    const reports = await getReports();

    return (
        <Card>
            <CardHeader>
                <CardTitle>신고 관리</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>유형</TableHead>
                            <TableHead>신고 대상</TableHead>
                            <TableHead>신고 사유</TableHead>
                            <TableHead>신고자</TableHead>
                            <TableHead>신고일</TableHead>
                            <TableHead>처리</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports.length > 0 ? (
                            reports.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell>{report.id}</TableCell>
                                    <TableCell>
                                        <Badge variant={report.post_id ? 'destructive' : 'secondary'}>
                                            {report.post_id ? '게시글' : '댓글'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Link 
                                            href={`/community/${report.post_id || report.comment?.post_id}`} 
                                            className="text-blue-500 hover:underline"
                                            target="_blank"
                                        >
                                            {report.post?.title || `Re: ${report.comment?.content?.slice(0, 20)}...`}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">{report.reason}</TableCell>
                                    <TableCell>{report.reporter?.nickname || '알 수 없음'}</TableCell>
                                    <TableCell>{new Date(report.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <ReportActions report={report} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center">
                                    접수된 신고가 없습니다.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
} 
import { supabase } from "@/lib/supabaseClient";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { VerificationActions } from "./VerificationActions";

async function getPendingVerifications() {
    const { data, error } = await supabase
        .from("user_profile")
        .select(`
            id,
            requested_at,
            student_name,
            email,
            nickname
        `)
        .eq('request_verified', true)
        .eq('is_verified', false)
        .order("requested_at", { ascending: true });

    if (error) {
        console.error("Error fetching pending verifications from user_profile:", error);
        return [];
    }
    return data;
}

export default async function AdminVerificationsPage() {
    const requests = await getPendingVerifications();

    return (
        <div className="p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>재원생 인증 요청 관리</CardTitle>
                    <CardDescription>
                        {requests.length}개의 처리 대기 중인 인증 요청이 있습니다.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>요청일</TableHead>
                                <TableHead>이메일</TableHead>
                                <TableHead>닉네임</TableHead>
                                <TableHead>학생 이름</TableHead>
                                <TableHead>상태</TableHead>
                                <TableHead className="text-right">관리</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">
                                        처리 대기 중인 요청이 없습니다.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                requests.map((request: any) => (
                                    <TableRow key={request.id}>
                                        <TableCell>
                                            {new Date(request.requested_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>{request.email}</TableCell>
                                        <TableCell>{request.nickname}</TableCell>
                                        <TableCell>{request.student_name}</TableCell>
                                        <TableCell>
                                            <Badge variant="default">대기중</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <VerificationActions 
                                                userId={request.id} 
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
} 
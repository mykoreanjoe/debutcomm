import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type Point = {
  id: number;
  created_at: string;
  reason: string | null;
  amount: number;
};

interface PointHistoryProps {
  points: Point[];
}

function getBadgeVariant(amount: number): "default" | "destructive" | "outline" {
    if (amount > 0) return "default";
    if (amount < 0) return "destructive";
    return "outline";
}

export default function PointHistory({ points }: PointHistoryProps) {
  if (!points || points.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">포인트 내역이 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  const totalPoints = points.reduce((acc, p) => acc + p.amount, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>포인트 내역</CardTitle>
        <p className="text-xl font-bold">{totalPoints.toLocaleString()} P</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>일시</TableHead>
              <TableHead>내용</TableHead>
              <TableHead className="text-right">포인트</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {points.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{format(new Date(p.created_at), 'yyyy-MM-dd HH:mm')}</TableCell>
                <TableCell>{p.reason || '기타'}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={getBadgeVariant(p.amount)}>
                    {p.amount > 0 ? `+${p.amount}` : p.amount}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 
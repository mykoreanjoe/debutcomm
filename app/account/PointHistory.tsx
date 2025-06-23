import { getPointHistory } from './actions';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function PointHistory() {
  const pointHistory = await getPointHistory();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">포인트 내역</h2>
      {pointHistory.length > 0 ? (
        <Table>
          <TableCaption>총 {pointHistory.length}개의 내역이 있습니다.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>날짜</TableHead>
              <TableHead>내용</TableHead>
              <TableHead className="text-right">포인트</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pointHistory.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{new Date(entry.created_at).toLocaleString()}</TableCell>
                <TableCell>{entry.reason}</TableCell>
                <TableCell className={`text-right font-bold ${entry.amount > 0 ? 'text-blue-500' : 'text-red-500'}`}>
                  {entry.amount > 0 ? `+${entry.amount}` : entry.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="py-10 text-center text-muted-foreground">
          <p>아직 포인트 내역이 없습니다.</p>
        </div>
      )}
    </div>
  );
} 
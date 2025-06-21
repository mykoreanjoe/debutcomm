import SectionTitle from "@/components/SectionTitle";

export default function AdminPaymentsPage() {
    return (
        <div>
            <SectionTitle
                title="결제/미납 관리"
                subtitle="전체 학생의 결제 내역을 조회하고 미납 상태를 관리합니다."
            />
            <div className="mt-8 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-500">준비 중인 페이지입니다.</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        이곳에서 기간별, 학생별 결제 내역을 상세히 조회하고 수동으로 결제 상태를 변경할 수 있게 될 예정입니다.
                    </p>
                </div>
            </div>
        </div>
    );
} 
import SectionTitle from "@/components/SectionTitle";

export default function AdminDataPage() {
    return (
        <div>
            <SectionTitle
                title="학습 데이터"
                subtitle="학생들의 출결, 성적, 포인트 등 모든 학습 데이터를 조회합니다."
            />
            <div className="mt-8 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-500">준비 중인 페이지입니다.</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        이곳에서 학생별, 기간별 학습 데이터를 종합적으로 분석하고 조회할 수 있게 될 예정입니다.
                    </p>
                </div>
            </div>
        </div>
    );
} 
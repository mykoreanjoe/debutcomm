import SectionTitle from "@/components/SectionTitle";

export default function AdminSettingsPage() {
    return (
        <div>
            <SectionTitle
                title="통계/설정"
                subtitle="웹사이트의 주요 통계를 확인하고 시스템 설정을 변경합니다."
            />
            <div className="mt-8 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-500">준비 중인 페이지입니다.</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        이곳에서 방문자 통계, 학습 데이터 통계 등을 확인하고 각종 알림 설정을 관리할 수 있게 될 예정입니다.
                    </p>
                </div>
            </div>
        </div>
    );
} 
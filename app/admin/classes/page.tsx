import SectionTitle from "@/components/SectionTitle";

export default function AdminClassesPage() {
    return (
        <div>
            <SectionTitle
                title="반/학생 관리"
                subtitle="새로운 반을 생성하고, 학생을 반에 배정하거나 제외합니다."
            />
            <div className="mt-8 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-500">준비 중인 페이지입니다.</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        이곳에서 반 목록을 보고, 학생을 추가하거나 관리할 수 있게 될 예정입니다.
                    </p>
                </div>
            </div>
        </div>
    );
} 
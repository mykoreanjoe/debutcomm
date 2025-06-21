import SectionTitle from "@/components/SectionTitle";

export default function AdminCommunityPage() {
    return (
        <div>
            <SectionTitle
                title="커뮤니티 관리"
                subtitle="게시판의 게시글, 댓글 및 신고 내역을 관리합니다."
            />
            <div className="mt-8 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-500">준비 중인 페이지입니다.</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        이곳에서 신고된 게시물을 처리하고, 공지사항을 작성하거나 게시물을 관리할 수 있게 될 예정입니다.
                    </p>
                </div>
            </div>
        </div>
    );
} 
import { getAnnouncementById } from "@/app/admin/actions";
import { notFound } from "next/navigation";
import { EditAnnouncementForm } from "./EditForm";

interface EditPageProps {
  params: {
    id: string;
  };
}

export default async function EditAnnouncementPage({ params }: EditPageProps) {
  const { id } = params;
  const announcement = await getAnnouncementById(id);

  if (!announcement) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">공지사항 수정</h1>
      <EditAnnouncementForm announcement={announcement} />
    </div>
  );
} 
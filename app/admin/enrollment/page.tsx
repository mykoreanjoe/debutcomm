import SectionTitle from "@/components/SectionTitle";
import { getAuthRequests } from "@/app/actions/admin";
import { EnrollmentClient } from "@/components/admin/EnrollmentClient";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default async function AdminEnrollmentPage() {
    const requests = await getAuthRequests();

    return (
        <div className="space-y-6">
            <SectionTitle
                title="재원생 인증"
                subtitle="학생 및 학부모의 재원생 인증 요청을 승인하거나 거절합니다."
            />
            <EnrollmentClient requests={requests} />
        </div>
    );
} 
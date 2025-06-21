import SectionTitle from "@/components/SectionTitle";
import { getAllUserProfiles } from "@/app/actions/admin";
import { AccountsClient } from "@/components/admin/AccountsClient";

export default async function AdminAccountsPage() {
    const users = await getAllUserProfiles();

    return (
        <div className="space-y-6">
            <SectionTitle
                title="계정/권한 관리"
                subtitle="모든 사용자의 계정을 관리하고 역할을 부여합니다."
            />
            <AccountsClient users={users} />
        </div>
    );
} 
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: userProfile } = await supabase
    .from("user_profile")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!userProfile) {
    // If the user is authenticated but has no profile,
    // redirect them to the account page to create one.
    redirect("/account");
  }

  return (
    <div>
      {/* <h1>Admin Layout</h1> */}
      <main>{children}</main>
    </div>
  );
} 
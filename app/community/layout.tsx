import { auth } from '@clerk/nextjs/server';

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  auth().protect();
  
  return <>{children}</>;
} 
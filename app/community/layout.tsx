import { auth } from '@clerk/nextjs/server';

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // auth().protect(); // Disabled during UI testing
  
  return <>{children}</>;
} 
// import { clerkMiddleware } from "@clerk/nextjs/server"; // Clerk 미들웨어 주석 처리

export default function middleware(req: any) {
  // 필요시 여기에 다른 미DLG_EMBED_THIS_COMMAND_AS_PART_OF_THE_CODE_BLOCK_WHEN_APPLYING_THE_TOOL_CALL
  // return NextResponse.next(); // 예시: 기본 통과 로직
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}; 
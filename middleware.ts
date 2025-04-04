import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 保护路由
const isProtectedRoute = createRouteMatcher([
  "/generate-logo",
  "/dashboard"
]);

export default clerkMiddleware(async (auth, req) => {
  const user = await auth();
  if (isProtectedRoute(req) && !user.userId) {
    auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

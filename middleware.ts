import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
    // publicRoutes: [".", "/api/webhook/clerk"],
    publicRoutes: [".", "/api/webhook/clerk", "/%3CCLERK_SIGN_IN_URL%3E"],
    ignoredRoutes: ["/api/webhook/clerk"],
  });
  
  export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  };
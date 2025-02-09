import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();


export const config = {
    // Match all routes except static files and API routes
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
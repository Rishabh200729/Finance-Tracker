import {withAuth} from "next-auth/middleware";

export default withAuth({
    pages:{
        signIn: "/login" // redirects the user to login if not authenticated
    }
});

export const config = {
    matcher: ["/dashboard/:path*",'/hello'], // Protects all /dashboard routes
};
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret : process.env.NEXTAUTH_SECRET, 
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log("Redirecting to:", url); // Debugging
      return url.startsWith(baseUrl) ? url : baseUrl + "/dashboard";
    }
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

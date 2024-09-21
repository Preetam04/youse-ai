import { dbConnect } from "@/db/dbConnect";
import { User } from "@/models/user.model";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmai.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        // console.log(credentials);

        await dbConnect();
        try {
          // console.log(credentials);

          const user = await User.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            const accessToken = user.generateAccessToken();
            user.accessToken = accessToken;

            return user;
          } else {
            throw new Error("Incorrect Password");
          }
        } catch (error: any) {
          //   console.log(error);
          throw new Error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.accessToken = user.accessToken;
      }

      return token;
    },
  },
};

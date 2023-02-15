import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { nextAuthSignIn } from "../../../lib/auth";
import { fetchStrapiUserData } from "../../../lib/auth";

// import FacebookProvider from "next-auth/providers/facebook";
// import GithubProvider from "next-auth/providers/github";
// import TwitterProvider from "next-auth/providers/twitter";
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    /* EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
    */
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Sign in with Email",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log({ credentials });
        if (credentials === null) return null;
        try {
          const { user, jwt } = await nextAuthSignIn({
            email: credentials?.email,
            password: credentials?.password,
          });
          console.log("manually sign-in with email and pass");
          console.log("manual sign-in - retrieveing user from strapi: ", user);
          // ideally would like to fetch username for site
          // const resData = await fetchStrapiUserData(
          //   credentials?.email,
          //   credentials?.password
          // );
          // console.log({ resData });
          return { ...user, jwt };
        } catch (e) {
          console.error(`error in authorization ${e}`);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, user, token }) => {
      console.log("in session -session: ", session);
      console.log("in session -user: ", user);
      console.log("in session -token: ", token);
      session.id = user.id as string;
      session.jwt = token.jwt as string;
      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user?.id;
        token.jwt = token?.jwt;
      }
      return Promise.resolve(token);
    },
  },
};

export default NextAuth(authOptions);

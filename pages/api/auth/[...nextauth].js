import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import Auth0Provider from "next-auth/providers/auth0";

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../auth/lib/mongodb"

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            issuer: process.env.AUTH0_ISSUER,
        })
    ],
    pages: {
        //    signIn: "/signin",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.JWT_SECRET,
}
export default NextAuth(authOptions)
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"

export const { handlers, auth } = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    // Required on non-Vercel hosts (Netlify): without it NextAuth v5
    // rejects every request with UntrustedHost -> "server configuration" error
    trustHost: true,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            try {
                const existing = await prisma.user.findUnique({ where: { email: user.email } })
                if (!existing) {
                    await prisma.user.create({
                        data: {
                            email: user.email,
                            username: user.email.split("@")[0],
                            name: user.name || null,
                            profilepic: user.image || null,
                        }
                    })
                }
                return true
            } catch {
                return false
            }
        },

        async session({ session }) {
            try {
                const dbUser = await prisma.user.findUnique({ where: { email: session.user.email } })
                if (dbUser) {
                    session.user.name = dbUser.username
                    session.user.image = dbUser.profilepic || null
                }
            } catch {}
            return session
        },
    }
})

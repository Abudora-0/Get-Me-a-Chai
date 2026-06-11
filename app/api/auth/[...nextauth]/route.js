import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { prisma } from "@/lib/prisma"

const { handlers } = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
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
                if (dbUser) session.user.name = dbUser.username
            } catch {}
            return session
        },
    }
})

export const { GET, POST } = handlers

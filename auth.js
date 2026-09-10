import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    // Required on non-Vercel hosts (Netlify): without it NextAuth v5
    // rejects every request with UntrustedHost -> "server configuration" error
    trustHost: true,
    // Set AUTH_DEBUG=true in the host env to get verbose logs while debugging.
    debug: process.env.AUTH_DEBUG === "true",
    // Always surface the underlying error in the function logs. NextAuth hides
    // it from the browser (?error=Configuration), so this is the only place to
    // see what actually failed (bad client secret, PKCE cookie, Prisma, etc).
    logger: {
        error(...args) {
            console.error("[auth][error]", ...args.map(a => (a instanceof Error ? `${a.name}: ${a.message}\n${a.stack}` : a)))
        },
        warn(code) {
            console.warn("[auth][warn]", code)
        },
    },
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
        async signIn({ user, account, profile }) {
            try {
                // GitHub only returns `email` when the user's email is public;
                // fall back to the profile payload before giving up.
                const email = user?.email || profile?.email || null
                if (!email) {
                    console.error(`[auth][signIn] ${account?.provider} returned no email`)
                    return false
                }

                const existing = await prisma.user.findUnique({ where: { email } })
                if (!existing) {
                    await prisma.user.create({
                        data: {
                            email,
                            username: email.split("@")[0],
                            name: user.name || null,
                            profilepic: user.image || null,
                        },
                    })
                }
                return true
            } catch (err) {
                console.error("[auth][signIn] failed:", err)
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
            } catch (err) {
                console.error("[auth][session] failed:", err)
            }
            return session
        },
    },
})

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
    // NextAuth only shows ?error=Configuration in the browser and wraps the real
    // failure several layers deep (error.cause.err, and often .cause again).
    // Walk the whole chain so the function logs show what actually broke.
    logger: {
        error(error) {
            const parts = []
            let e = error
            let depth = 0
            while (e && depth < 6) {
                const name = e.type || e.name || "Error"
                parts.push(`${name}: ${e.message || String(e)}`)
                if (e.stack) parts.push(String(e.stack).split("\n").slice(1, 5).join("\n"))
                const next = e.cause?.err || e.cause
                if (e.cause && !e.cause.err && !(e.cause instanceof Error)) {
                    parts.push(`details: ${JSON.stringify(e.cause)}`)
                }
                e = next instanceof Error ? next : null
                depth++
            }
            console.error("[auth][error]\n" + parts.join("\n"))
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

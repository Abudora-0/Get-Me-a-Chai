import { Suspense } from "react"
import PaymentPage from "@/components/PaymentPage"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"

const Username = async ({ params }) => {
  const { username } = await params
  const u = await prisma.user.findUnique({ where: { username } })
  if (!u) return notFound()

  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-[60vh] text-slate-400">Loading...</div>}>
      <PaymentPage username={username} />
    </Suspense>
  )
}

export default Username

export async function generateMetadata({ params }) {
  const { username } = await params
  return {
    title: `Support ${username} · Get Me a Chai`,
  }
}

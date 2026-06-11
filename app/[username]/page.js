import { Suspense } from "react"
import PaymentPage from "@/components/PaymentPage"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"

const Username = async ({ params }) => {
  const u = await prisma.user.findUnique({ where: { username: params.username } })
  if (!u) return notFound()

  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-[60vh] text-slate-400">Loading...</div>}>
      <PaymentPage username={params.username} />
    </Suspense>
  )
}

export default Username

export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} — Get Me a Chai`,
  }
}

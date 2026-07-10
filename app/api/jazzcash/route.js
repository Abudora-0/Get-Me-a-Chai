import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { computeSecureHash } from "@/lib/jazzcash"

// JazzCash posts the transaction result back here (pp_ReturnURL).
export const POST = async (req) => {
    let body = await req.formData()
    body = Object.fromEntries(body)

    const payment = await prisma.payment.findUnique({ where: { oid: body.pp_TxnRefNo } })
    if (!payment) {
        return NextResponse.json({ success: false, message: "Transaction reference not found" })
    }

    const user = await prisma.user.findUnique({ where: { username: payment.to_user } })
    if (!user) {
        return NextResponse.json({ success: false, message: "User not found" })
    }

    // Recompute the hash over every pp_*/ppmpf_* field JazzCash returned
    const received = {}
    for (const [k, v] of Object.entries(body)) {
        if (k.startsWith("pp_") || k.startsWith("ppmpf_")) received[k] = v
    }
    const expectedHash = computeSecureHash(received, user.jazzcashSalt)
    const hashValid = body.pp_SecureHash && expectedHash.toLowerCase() === String(body.pp_SecureHash).toLowerCase()

    if (hashValid && body.pp_ResponseCode === "000") {
        await prisma.payment.update({
            where: { oid: body.pp_TxnRefNo },
            data: { done: true },
        })
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${payment.to_user}?paymentdone=true`, 303)
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${payment.to_user}?paymentfailed=true`, 303)
}

import { NextResponse } from "next/server"
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils"
import { prisma } from "@/lib/prisma"

export const POST = async (req) => {
    let body = await req.formData()
    body = Object.fromEntries(body)

    const payment = await prisma.payment.findUnique({ where: { oid: body.razorpay_order_id } })
    if (!payment) {
        return NextResponse.json({ success: false, message: "Order ID not found" })
    }

    const user = await prisma.user.findUnique({ where: { username: payment.to_user } })
    if (!user) {
        return NextResponse.json({ success: false, message: "User not found" })
    }

    const isValid = validatePaymentVerification(
        { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
        body.razorpay_signature,
        user.razorpaysecret
    )

    if (isValid) {
        await prisma.payment.update({
            where: { oid: body.razorpay_order_id },
            data: { done: true },
        })
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${payment.to_user}?paymentdone=true`)
    }

    return NextResponse.json({ success: false, message: "Payment verification failed" })
}

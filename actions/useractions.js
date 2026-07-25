"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

// Records a supporter's pledge against the creator's account. The creator pays
// out-of-band (JazzCash/Easypaisa transfer or bank deposit using the details
// on their page) and confirms receipt from the dashboard, which flips
// `confirmed` to true.
export const submitSupport = async (amount, to_username, paymentform) => {
    const user = await prisma.user.findUnique({ where: { username: to_username } })
    if (!user) throw new Error("User not found")
    if (!user.paymentPhone && !(user.paymentBankName && user.paymentBankAccountNumber)) {
        throw new Error("Creator has not set up a payment method")
    }

    await prisma.payment.create({
        data: {
            amount,
            to_user: to_username,
            name: paymentform.name,
            message: paymentform.message || "",
        }
    })
}

export const fetchuser = async (username) => {
    const user = await prisma.user.findUnique({ where: { username } })
    return user
}

export const fetchpayments = async (username) => {
    const payments = await prisma.payment.findMany({
        where: { to_user: username, confirmed: true },
        orderBy: { amount: "desc" },
        take: 10,
    })
    return payments
}

export const fetchpendingpayments = async (username) => {
    const payments = await prisma.payment.findMany({
        where: { to_user: username, confirmed: false },
        orderBy: { createdAt: "desc" },
    })
    return payments
}

// Lets a signed-in creator mark one of their own pending payments as received.
export const confirmPayment = async (paymentId) => {
    const session = await auth()
    const username = session?.user?.name
    if (!username) throw new Error("Not signed in")

    const payment = await prisma.payment.findUnique({ where: { id: paymentId } })
    if (!payment || payment.to_user !== username) throw new Error("Payment not found")

    await prisma.payment.update({
        where: { id: paymentId },
        data: { confirmed: true },
    })
}

export const updateProfile = async (data, olderusername) => {
    const ndata = Object.fromEntries(data)

    if (olderusername !== ndata.username) {
        const existing = await prisma.user.findUnique({ where: { username: ndata.username } })
        if (existing) return { error: "Username already exists" }

        await prisma.user.update({
            where: { email: ndata.email },
            data: ndata,
        })
        await prisma.payment.updateMany({
            where: { to_user: olderusername },
            data: { to_user: ndata.username },
        })
    } else {
        await prisma.user.update({
            where: { email: ndata.email },
            data: ndata,
        })
    }
}

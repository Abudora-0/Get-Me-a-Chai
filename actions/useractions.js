"use server"

import Razorpay from "razorpay"
import { prisma } from "@/lib/prisma"

export const initiate = async (amount, to_username, paymentform) => {
    const user = await prisma.user.findUnique({ where: { username: to_username } })
    if (!user) throw new Error("User not found")

    const instance = new Razorpay({ key_id: user.razorpayid, key_secret: user.razorpaysecret })

    const order = await instance.orders.create({
        amount: Number.parseInt(amount),
        currency: "PKR",
    })

    await prisma.payment.create({
        data: {
            oid: order.id,
            amount: amount / 100,
            to_user: to_username,
            name: paymentform.name,
            message: paymentform.message || "",
        }
    })

    return order
}

export const fetchuser = async (username) => {
    const user = await prisma.user.findUnique({ where: { username } })
    return user
}

export const fetchpayments = async (username) => {
    const payments = await prisma.payment.findMany({
        where: { to_user: username, done: true },
        orderBy: { amount: "desc" },
        take: 10,
    })
    return payments
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

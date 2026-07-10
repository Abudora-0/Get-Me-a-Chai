"use server"

import { prisma } from "@/lib/prisma"
import { JAZZCASH_ENDPOINT, computeSecureHash, pktTimestamp } from "@/lib/jazzcash"

// Builds a JazzCash hosted-checkout request for the creator being supported.
// Returns the endpoint plus the signed form fields; the client submits them
// as a plain form POST, which redirects the supporter to JazzCash.
export const initiate = async (amount, to_username, paymentform) => {
    const user = await prisma.user.findUnique({ where: { username: to_username } })
    if (!user) throw new Error("User not found")
    if (!user.jazzcashMerchantId || !user.jazzcashPassword || !user.jazzcashSalt) {
        throw new Error("Creator has not configured JazzCash")
    }

    const txnRefNo = `T${Date.now()}`

    const fields = {
        pp_Version: "1.1",
        pp_TxnType: "",            // empty = JazzCash page offers wallet + card options
        pp_Language: "EN",
        pp_MerchantID: user.jazzcashMerchantId,
        pp_SubMerchantID: "",
        pp_Password: user.jazzcashPassword,
        pp_BankID: "",
        pp_ProductID: "",
        pp_TxnRefNo: txnRefNo,
        pp_Amount: String(Number.parseInt(amount)),   // amount in paisa
        pp_TxnCurrency: "PKR",
        pp_TxnDateTime: pktTimestamp(),
        pp_BillReference: to_username.slice(0, 20),
        pp_Description: `Chai for ${to_username}`.slice(0, 100),
        pp_TxnExpiryDateTime: pktTimestamp(60),        // valid for 1 hour
        pp_ReturnURL: `${process.env.NEXT_PUBLIC_URL}/api/jazzcash`,
        ppmpf_1: to_username,
    }
    fields.pp_SecureHash = computeSecureHash(fields, user.jazzcashSalt)

    await prisma.payment.create({
        data: {
            oid: txnRefNo,
            amount: amount / 100,
            to_user: to_username,
            name: paymentform.name,
            message: paymentform.message || "",
        }
    })

    return { endpoint: JAZZCASH_ENDPOINT, fields }
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

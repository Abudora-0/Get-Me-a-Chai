import crypto from "crypto"

// Hosted-checkout endpoints. Set JAZZCASH_ENV=live once the merchant
// account is approved for production; defaults to the sandbox.
export const JAZZCASH_ENDPOINT =
  process.env.JAZZCASH_ENV === "live"
    ? "https://payments.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/"
    : "https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/"

// JazzCash secure hash: sort pp_*/ppmpf_* keys alphabetically, join the
// non-empty values with '&', prepend the integrity salt, HMAC-SHA256 keyed
// with the same salt.
export function computeSecureHash(fields, integritySalt) {
  const message = Object.keys(fields)
    .filter(k => k !== "pp_SecureHash" && fields[k] !== "" && fields[k] !== undefined && fields[k] !== null)
    .sort()
    .map(k => fields[k])
    .join("&")
  return crypto
    .createHmac("sha256", integritySalt)
    .update(`${integritySalt}&${message}`)
    .digest("hex")
    .toUpperCase()
}

// yyyyMMddHHmmss in Pakistan time, which JazzCash expects
export function pktTimestamp(offsetMinutes = 0) {
  const now = new Date(Date.now() + offsetMinutes * 60 * 1000)
  const pkt = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Karachi" }))
  const pad = n => String(n).padStart(2, "0")
  return (
    pkt.getFullYear().toString() +
    pad(pkt.getMonth() + 1) +
    pad(pkt.getDate()) +
    pad(pkt.getHours()) +
    pad(pkt.getMinutes()) +
    pad(pkt.getSeconds())
  )
}

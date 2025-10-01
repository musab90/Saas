export type Subscription = {
  id: string | number
  tenant: string
  plan: string
  status: string
  nextBilling: string
  amount: string
}

type ApiSubscription = Record<string, any>

const API_V1 = (import.meta as any)?.env?.VITE_API_BASE_URL || 'http://localhost:4040/api/v1'
const GET_ALL_SUBSCRIPTIONS_URL = `${API_V1}/subs/get/all/subscriptions/sub/subcription`

function valueToString(value: any, fallback: string = ""): string {
  if (value == null) return fallback
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  // Avoid dumping JSON objects into UI; fall back to placeholder
  return fallback
}

function formatDate(value: any): string {
  const raw = typeof value === 'string' ? value : (typeof value === 'number' ? new Date(value).toISOString() : '')
  if (!raw) return ""
  const d = new Date(raw)
  if (isNaN(d.getTime())) return valueToString(value, "")
  return d.toISOString().slice(0, 10)
}

function formatCurrency(value: any): string {
  const num = typeof value === 'number' ? value : Number(String(value).replace(/[^0-9.-]/g, ''))
  if (!isFinite(num)) return valueToString(value, "-")
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(num)
  } catch {
    return `$${num.toFixed(2)}`
  }
}

function normalizeSubscription(raw: ApiSubscription): Subscription {
  const idCandidate = raw.id ?? raw._id ?? raw.subscriptionId ?? raw.uuid ?? raw?.tenant?.id
  // Prefer nested names: subscription.tenant.name and subscription.plan.name
  const tenantCandidate = raw?.tenant?.name ?? raw.tenant ?? raw.tenantName ?? raw.company ?? raw.customer ?? raw.account
  const planCandidate = raw?.plan?.name ?? raw.planName ?? (typeof raw.plan === 'string' ? raw.plan : undefined)
  const statusCandidate = raw.status ?? raw.subscriptionStatus ?? raw.state
  // Backend provides end date; map it to nextBilling in UI
  const nextBillingCandidate = raw.endDate ?? raw.nextBilling ?? raw.next_billing ?? raw.renewalDate ?? raw.nextInvoiceDate
  const amountCandidate = raw.amount ?? raw.price ?? raw.monthlyAmount ?? raw.total

  return {
    id: idCandidate ?? Math.random().toString(36).slice(2),
    tenant: valueToString(tenantCandidate, "Unknown"),
    plan: valueToString(planCandidate, "-"),
    status: valueToString(statusCandidate, "inactive"),
    nextBilling: formatDate(nextBillingCandidate),
    amount: formatCurrency(amountCandidate),
  }
}

export async function fetchAllSubscriptions(signal?: AbortSignal): Promise<Subscription[]> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('superadmin_token') : null
  const headers: Record<string, string> = {}
  if (token) headers.Authorization = `Bearer ${token}`
  const response = await fetch(GET_ALL_SUBSCRIPTIONS_URL, { signal, mode: 'cors', headers })
  if (!response.ok) {
    const text = await response.text().catch(() => "")
    throw new Error(`Failed to fetch subscriptions (${response.status}): ${text}`)
  }
  let data: any
  try {
    data = await response.json()
  } catch (e) {
    throw new Error('Subscriptions API did not return valid JSON')
  }

  const candidates: any[] = [
    Array.isArray(data) ? data : null,
    Array.isArray(data?.data) ? data.data : null,
    Array.isArray(data?.results) ? data.results : null,
    Array.isArray(data?.items) ? data.items : null,
    Array.isArray(data?.subscriptions) ? data.subscriptions : null,
  ].filter(Boolean) as any[]

  const list: ApiSubscription[] = candidates[0] ?? []
  if (!Array.isArray(list)) return []
  return list.map(normalizeSubscription)
}



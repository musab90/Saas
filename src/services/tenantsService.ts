export type Tenant = {
  id: number | string
  name: string
  email: string
  createdDate: string
  plan: string
  status: string
  users: number
}

type ApiTenant = Partial<Tenant> & Record<string, any>

const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL || 'http://localhost:4040/api/v1'

const TENANTS_API_URL = `${API_BASE}/tenants/get/v1/all/tenants/t`
const CREATE_TENANT_API_URL = `${API_BASE}/tenants/create/tenant/t`
const CACHE_KEY = "tenants_cache_v1"
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

type CachePayload = {
  savedAt: number
  tenants: Tenant[]
}

function readCache(): Tenant[] | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed: CachePayload = JSON.parse(raw)
    if (!parsed?.savedAt || !Array.isArray(parsed?.tenants)) return null
    const isFresh = Date.now() - parsed.savedAt < CACHE_TTL_MS
    if (!isFresh) return null
    return parsed.tenants
  } catch {
    return null
  }
}

function writeCache(tenants: Tenant[]): void {
  if (typeof window === "undefined") return
  try {
    const payload: CachePayload = { savedAt: Date.now(), tenants }
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload))
  } catch {
    // ignore
  }
}

export function invalidateTenantsCache(): void {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem(CACHE_KEY)
  } catch {
    // ignore
  }
}

function valueToString(value: any, fallback: string = ""): string {
  if (value == null) return fallback
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  if (typeof value === "object") {
    if (typeof (value as any).name === "string") return (value as any).name
    if (typeof (value as any).label === "string") return (value as any).label
    if (typeof (value as any).title === "string") return (value as any).title
  }
  try {
    return JSON.stringify(value)
  } catch {
    return fallback
  }
}

function normalizeTenant(raw: ApiTenant): Tenant {
  const idCandidate = raw.id ?? raw._id ?? raw.tenantId ?? raw.uuid
  const planCandidate =
    raw.plan ??
    raw.planName ??
    raw.subscriptionPlan ??
    (typeof (raw as any).plan === 'object' && (raw as any).plan?.name ? (raw as any).plan.name : undefined)
  const statusCandidate =
    raw.status ??
    raw.subscriptionStatus ??
    (typeof (raw as any).statusTenet === 'string' ? (raw as any).statusTenet : undefined) ??
    (typeof (raw as any).status_tenet === 'string' ? (raw as any).status_tenet : undefined) ??
    (typeof (raw as any).status_tenett === 'string' ? (raw as any).status_tenett : undefined)
  const nameCandidate = raw.name ?? raw.companyName ?? (raw as any).company_name
  const emailCandidate = raw.email ?? raw.contactEmail ?? (raw as any).contact_email
  const createdCandidate = raw.createdDate ?? raw.created_at ?? raw.createdAt ?? (raw as any).createdOn

  return {
    id: idCandidate ?? Math.random().toString(36).slice(2),
    name: valueToString(nameCandidate, "Unknown"),
    email: valueToString(emailCandidate, "unknown@example.com"),
    createdDate: valueToString(createdCandidate, ""),
    plan: valueToString(planCandidate, "Standard"),
    status: valueToString(statusCandidate, "active"),
    users: Number(raw.users ?? raw.userCount ?? 0),
  }
}

export async function fetchAllTenants(signal?: AbortSignal): Promise<Tenant[]> {
  const cached = readCache()
  if (cached && cached.length > 0) {
    console.log("[tenantsService] Using cached tenants", { count: cached.length })
    return cached
  }
  const token = typeof window !== "undefined" ? localStorage.getItem('superadmin_token') : null
  const headers: Record<string, string> = {
    Accept: 'application/json',
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  console.log("[tenantsService] Fetching tenants", {
    url: TENANTS_API_URL,
    hasToken: Boolean(token),
    headers: { ...headers, Authorization: headers.Authorization ? 'Bearer ***' : undefined }
  })

  const response = await fetch(TENANTS_API_URL, { signal, mode: "cors", headers })
  console.log("[tenantsService] Response received", { status: response.status, ok: response.ok })
  if (!response.ok) {
    const text = await response.text().catch(() => "")
    if (response.status === 401) {
      throw new Error("Unauthorized (401). Please log in as superadmin and try again.")
    }
    if (response.status === 403) {
      throw new Error("Forbidden (403). Your account is not allowed to view tenants.")
    }
    console.error("[tenantsService] Error body", text)
    throw new Error(`Failed to fetch tenants (${response.status}): ${text}`)
  }

  let data: any
  try {
    data = await response.json()
  } catch (e) {
    console.error("[tenantsService] JSON parse error", e)
    throw new Error("Tenants API did not return valid JSON")
  }
  console.log("[tenantsService] Raw JSON keys", Object.keys(data || {}))

  // Try common shapes
  const candidates: any[] = [
    Array.isArray(data) ? data : null,
    Array.isArray(data?.data) ? data.data : null,
    Array.isArray(data?.results) ? data.results : null,
    Array.isArray(data?.items) ? data.items : null,
    Array.isArray(data?.tenants) ? data.tenants : null,
    Array.isArray(data?.payload) ? data.payload : null,
  ].filter(Boolean) as any[]

  let list: ApiTenant[] = candidates[0] ?? []

  // Fallback: search for the largest array of objects within the payload
  if (!Array.isArray(list) || list.length === 0) {
    const collectArrays = (node: any, acc: any[][] = []): any[][] => {
      if (!node || typeof node !== "object") return acc
      if (Array.isArray(node)) {
        acc.push(node)
      } else {
        for (const key of Object.keys(node)) {
          collectArrays(node[key], acc)
        }
      }
      return acc
    }
    const arrays = collectArrays(data)
      .filter(arr => Array.isArray(arr) && arr.every(x => typeof x === "object" && x != null))
      .sort((a, b) => b.length - a.length)
    if (arrays.length > 0) {
      list = arrays[0] as any[]
    }
  }

  if (!Array.isArray(list)) {
    console.warn("Unexpected tenants API shape", data)
    return []
  }

  const normalized = list.map(normalizeTenant)
  console.log("[tenantsService] Normalized tenants count", normalized.length)
  if (normalized.length > 0) {
    console.log("[tenantsService] Sample tenant", normalized[0])
  } else {
    console.log("[tenantsService] Empty list after normalization", { rawSample: Array.isArray(list) && list[0] })
  }
  writeCache(normalized)
  return normalized
}

export type CreateTenantInput = {
  name: string
  email: string
  planName: string
  status: string
}

export async function createTenant(input: CreateTenantInput, signal?: AbortSignal): Promise<Tenant> {
  const token = typeof window !== "undefined" ? localStorage.getItem('superadmin_token') : null
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const body = JSON.stringify({
    name: input.name,
    email: input.email,
    planName: input.planName,
    status: input.status,
  })

  const response = await fetch(CREATE_TENANT_API_URL, {
    method: 'POST',
    mode: 'cors',
    headers,
    body,
    signal,
  })

  if (!response.ok) {
    const text = await response.text().catch(() => "")
    if (response.status === 401) {
      throw new Error("Unauthorized (401). Please log in as superadmin and try again.")
    }
    if (response.status === 403) {
      throw new Error("Forbidden (403). Your account is not allowed to create tenants.")
    }
    throw new Error(`Failed to create tenant (${response.status}): ${text}`)
  }

  let data: any
  try {
    data = await response.json()
  } catch (e) {
    throw new Error("Create tenant API did not return valid JSON")
  }

  // Try to locate the created tenant object in common shapes
  const candidates: any[] = [
    (data && typeof data === 'object') ? data : null,
    data?.data && typeof data.data === 'object' ? data.data : null,
    data?.result && typeof data.result === 'object' ? data.result : null,
    data?.item && typeof data.item === 'object' ? data.item : null,
    Array.isArray(data?.items) && data.items.length > 0 ? data.items[0] : null,
  ].filter(Boolean)

  const createdRaw = candidates[0] ?? data
  const created = normalizeTenant(createdRaw || {})

  // Update cache optimistically
  try {
    const current = readCache() || []
    writeCache([created, ...current])
  } catch {
    // ignore cache errors
  }

  return created
}



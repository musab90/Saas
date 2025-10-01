import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, TrendingUp, TrendingDown, MoreVertical, PanelsTopLeft } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useMemo, useState, useCallback } from "react"
import { fetchAllSubscriptions, type Subscription } from "@/services/subscriptionsService"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const subscriptionPlans = [
  {
    id: 1,
    name: "Trial",
    price: "$0/month",
    description: "Evaluate the platform",
    features: ["1 user", "1GB storage", "Community support"],
    activeSubscriptions: 12,
    totalRevenue: "$0"
  },
  {
    id: 2,
    name: "Professional",
    price: "$99/month",
    description: "For growing businesses",
    features: ["Up to 25 users", "100GB storage", "Priority support", "Advanced analytics"],
    activeSubscriptions: 78,
    totalRevenue: "$7,722"
  },
  {
    id: 3,
    name: "Pro +",
    price: "$149/month",
    description: "Enhanced features and capacity",
    features: ["Up to 50 users", "250GB storage", "Priority support", "Advanced reporting"],
    activeSubscriptions: 34,
    totalRevenue: "$5,066"
  },
  {
    id: 4,
    name: "Standard",
    price: "$49/month",
    description: "Essentials for small teams",
    features: ["Up to 10 users", "50GB storage", "Email support"],
    activeSubscriptions: 41,
    totalRevenue: "$2,009"
  },
  {
    id: 5,
    name: "Enterprise",
    price: "$299/month",
    description: "For large organizations",
    features: ["Unlimited users", "1TB storage", "24/7 support", "Custom integrations", "SSO"],
    activeSubscriptions: 23,
    totalRevenue: "$6,877"
  }
]

const recentSubscriptions = [
  {
    id: 1,
    tenant: "Acme Corporation",
    plan: "Enterprise",
    status: "active",
    nextBilling: "2024-02-15",
    amount: "$299"
  },
  {
    id: 2,
    tenant: "TechStart Inc",
    plan: "Professional",
    status: "active",
    nextBilling: "2024-02-20",
    amount: "$99"
  },
  {
    id: 3,
    tenant: "DataFlow Ltd",
    plan: "Trial",
    status: "past_due",
    nextBilling: "2024-01-28",
    amount: "$29"
  },
  {
    id: 4,
    tenant: "CloudTech Pro",
    plan: "Enterprise",
    status: "active",
    nextBilling: "2024-03-12",
    amount: "$299"
  },
  {
    id: 5,
    tenant: "RetailX",
    plan: "Professional",
    status: "trial",
    nextBilling: "2024-02-10",
    amount: "$0"
  }
]

const Subscriptions = () => {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<string>("all")
  const [plan, setPlan] = useState<string>("all")

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")
  const [rows, setRows] = useState<Subscription[]>([])
  const [viewOpen, setViewOpen] = useState(false)
  const [selected, setSelected] = useState<Subscription | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError("")
    fetchAllSubscriptions(controller.signal)
      .then(data => setRows(data))
      .catch(e => setError(e?.message || 'Failed to load'))
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  const planOptions = useMemo(() => [
    "Trial",
    "Professional",
    "Pro +",
    "Standard",
    "Enterprise",
  ], [])

  const filtered = useMemo(() => {
    return rows.filter(s => {
      const matchesQuery = query.trim().length === 0 ||
        s.tenant.toLowerCase().includes(query.trim().toLowerCase())
      const matchesStatus = status === "all" || s.status === status
      const matchesPlan = plan === "all" || s.plan === plan
      return matchesQuery && matchesStatus && matchesPlan
    })
  }, [rows, query, status, plan])

  const resetFilters = () => {
    setQuery("")
    setStatus("all")
    setPlan("all")
  }

  const openView = (sub: Subscription) => {
    setSelected(sub)
    setViewOpen(true)
  }

  const renderStatus = useCallback((value: string) => {
    const normalized = String(value || "").toLowerCase()
    const color =
      normalized === "active" ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
      normalized === "trial" ? "bg-sky-100 text-sky-700 border-sky-200" :
      normalized === "past_due" ? "bg-amber-100 text-amber-700 border-amber-200" :
      normalized === "cancelled" ? "bg-rose-100 text-rose-700 border-rose-200" :
      "bg-zinc-100 text-zinc-700 border-zinc-200"
    return (
      <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium ${color}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${
          normalized === "active" ? "bg-emerald-500" :
          normalized === "trial" ? "bg-sky-500" :
          normalized === "past_due" ? "bg-amber-500" :
          normalized === "cancelled" ? "bg-rose-500" :
          "bg-zinc-400"
        }`} />
        {String(value || "").replace("_", " ")}
      </span>
    )
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
            <p className="text-muted-foreground">
              Manage subscription plans and monitor tenant subscriptions.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/subscription-plans">
                <PanelsTopLeft className="mr-2 h-4 w-4" />
                Subscription Plans
              </Link>
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Subscription
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <Input
              placeholder="Search tenant..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="past_due">Past due</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Select value={plan} onValueChange={setPlan}>
              <SelectTrigger>
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All plans</SelectItem>
                {planOptions.map(p => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={resetFilters}>Reset</Button>
          </div>
        </div>

        {/* Plans moved to Subscription Plans page */}

        {/* Recent Subscriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="text-sm text-red-600 mb-3">{error}</div>
            )}
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-2/3" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-2 text-lg font-medium">No subscriptions found</div>
                <p className="text-sm text-muted-foreground">Try adjusting filters or clearing them.</p>
                <div className="mt-4">
                  <Button variant="outline" onClick={resetFilters}>Clear filters</Button>
                </div>
              </div>
            ) : (
            <Table className="data-table">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs text-muted-foreground w-64">Tenant name</TableHead>
                  <TableHead className="text-xs text-muted-foreground w-40">Plan name</TableHead>
                  <TableHead className="text-xs text-muted-foreground w-36">Status</TableHead>
                  <TableHead className="text-xs text-muted-foreground w-40">Next billing date</TableHead>
                  <TableHead className="text-xs text-muted-foreground w-32">Amount</TableHead>
                  <TableHead className="text-xs text-muted-foreground text-right w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((subscription) => (
                  <TableRow key={subscription.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium truncate max-w-[256px] w-64" title={subscription.tenant}>{subscription.tenant}</TableCell>
                    <TableCell className="truncate max-w-[160px] w-40">
                      <Badge variant="outline" className="rounded-full px-2 py-0.5 text-xs max-w-full truncate">
                        {subscription.plan}
                      </Badge>
                    </TableCell>
                    <TableCell className="w-36">{renderStatus(subscription.status)}</TableCell>
                    <TableCell className="w-40 tabular-nums">{subscription.nextBilling || '-'}</TableCell>
                    <TableCell className="font-medium tabular-nums font-mono whitespace-nowrap w-32">{subscription.amount}</TableCell>
                    <TableCell className="text-right w-20">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost" aria-label="Actions">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem onClick={() => console.log('Upgrade', subscription)}>
                            <TrendingUp className="mr-2 h-4 w-4" />
                            <span>Upgrade</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => console.log('Downgrade', subscription)}>
                            <TrendingDown className="mr-2 h-4 w-4" />
                            <span>Downgrade</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openView(subscription)}>
                            View Subscription
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            )}
          </CardContent>
        </Card>
        {/* View Subscription Dialog */}
        <Dialog open={viewOpen} onOpenChange={setViewOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Subscription details</DialogTitle>
              <DialogDescription>Quick view of the subscription information</DialogDescription>
            </DialogHeader>
            {selected && (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-xs text-muted-foreground">Tenant name</div>
                  <div className="font-medium">{selected.tenant}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Plan name</div>
                  <div className="font-medium">{selected.plan}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Status</div>
                  <div>
                    <Badge variant="outline">{selected.status.replace('_',' ')}</Badge>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">End date</div>
                  <div className="font-medium">{selected.nextBilling || '-'}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Amount</div>
                  <div className="font-medium tabular-nums font-mono">{selected.amount}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">ID</div>
                  <div className="font-mono text-sm">{String(selected.id)}</div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

export default Subscriptions
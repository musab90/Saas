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
import { Plus, TrendingUp, TrendingDown } from "lucide-react"

const subscriptionPlans = [
  {
    id: 1,
    name: "Starter",
    price: "$29/month",
    description: "Perfect for small teams",
    features: ["Up to 5 users", "10GB storage", "Basic support"],
    activeSubscriptions: 45,
    totalRevenue: "$1,305"
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
    plan: "Starter",
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
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Plan
          </Button>
        </div>

        {/* Subscription Plans */}
        <div className="grid gap-6 md:grid-cols-3">
          {subscriptionPlans.map((plan) => (
            <Card key={plan.id} className="metric-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <Badge variant="outline">{plan.activeSubscriptions} active</Badge>
                </div>
                <div className="text-2xl font-bold">{plan.price}</div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ul className="text-sm space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Monthly Revenue</span>
                      <span className="font-semibold">{plan.totalRevenue}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Upgrade
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Edit Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Subscriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="data-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Billing</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSubscriptions.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell className="font-medium">{subscription.tenant}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{subscription.plan}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={`status-badge ${
                          subscription.status === "active" ? "status-active" :
                          subscription.status === "trial" ? "status-pending" :
                          "status-error"
                        }`}
                      >
                        {subscription.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>{subscription.nextBilling}</TableCell>
                    <TableCell className="font-medium">{subscription.amount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="outline">
                          <TrendingUp className="mr-2 h-4 w-4" />
                          Upgrade
                        </Button>
                        <Button size="sm" variant="outline">
                          <TrendingDown className="mr-2 h-4 w-4" />
                          Downgrade
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default Subscriptions
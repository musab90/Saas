import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { MetricCard } from "@/components/dashboard/MetricCard"
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { DollarSign, FileText, CreditCard, Download } from "lucide-react"

const monthlyRevenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
]

const recentPayments = [
  {
    id: 1,
    tenant: "Acme Corporation",
    amount: "$299.00",
    date: "2024-01-15",
    status: "completed",
    invoice: "INV-001234"
  },
  {
    id: 2,
    tenant: "TechStart Inc",
    amount: "$99.00",
    date: "2024-01-14",
    status: "completed",
    invoice: "INV-001233"
  },
  {
    id: 3,
    tenant: "DataFlow Ltd",
    amount: "$29.00",
    date: "2024-01-13",
    status: "failed",
    invoice: "INV-001232"
  },
  {
    id: 4,
    tenant: "CloudTech Pro",
    amount: "$299.00",
    date: "2024-01-12",
    status: "completed",
    invoice: "INV-001231"
  },
  {
    id: 5,
    tenant: "RetailX",
    amount: "$99.00",
    date: "2024-01-11",
    status: "pending",
    invoice: "INV-001230"
  }
]

const Finance = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
            <p className="text-muted-foreground">
              Monitor revenue, payments, and financial performance.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Financial Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Monthly Revenue"
            value="$67,000"
            change="+21.9% from last month"
            changeType="positive"
            icon={DollarSign}
          />
          <MetricCard
            title="Outstanding Invoices"
            value="8"
            change="$12,450 total"
            changeType="neutral"
            icon={FileText}
          />
          <MetricCard
            title="Successful Payments"
            value="156"
            change="+12% from last month"
            changeType="positive"
            icon={CreditCard}
          />
          <MetricCard
            title="Failed Payments"
            value="3"
            change="-50% from last month"
            changeType="positive"
            icon={CreditCard}
          />
        </div>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="hsl(var(--chart-1))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Payments</CardTitle>
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                View All Invoices
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table className="data-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.tenant}</TableCell>
                    <TableCell>{payment.invoice}</TableCell>
                    <TableCell className="font-medium">{payment.amount}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`status-badge ${
                          payment.status === "completed" ? "status-active" :
                          payment.status === "pending" ? "status-pending" :
                          "status-error"
                        }`}
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          View Invoice
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download
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

export default Finance
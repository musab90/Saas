import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Mail, Phone, CreditCard } from "lucide-react"

const mockCustomers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@acme.com",
    tenant: "Acme Corporation",
    phone: "+1 (555) 123-4567",
    balanceOwed: "$0.00",
    totalPaid: "$2,388.00",
    lastPayment: "2024-01-15",
    status: "good_standing"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@techstart.com",
    tenant: "TechStart Inc",
    phone: "+1 (555) 234-5678",
    balanceOwed: "$99.00",
    totalPaid: "$891.00",
    lastPayment: "2024-01-10",
    status: "overdue"
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "mike@dataflow.co",
    tenant: "DataFlow Ltd",
    phone: "+1 (555) 345-6789",
    balanceOwed: "$58.00",
    totalPaid: "$174.00",
    lastPayment: "2023-12-28",
    status: "overdue"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@cloudtech.com",
    tenant: "CloudTech Pro",
    phone: "+1 (555) 456-7890",
    balanceOwed: "$0.00",
    totalPaid: "$3,588.00",
    lastPayment: "2024-01-12",
    status: "good_standing"
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david@retailx.com",
    tenant: "RetailX",
    phone: "+1 (555) 567-8901",
    balanceOwed: "$0.00",
    totalPaid: "$396.00",
    lastPayment: "2024-01-08",
    status: "trial"
  }
]

const Customers = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            View customer information, balances, and payment history across all tenants.
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Customers</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search customers..."
                    className="pl-9 w-[300px]"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="good_standing">Good Standing</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="trial">Trial</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tenants</SelectItem>
                    <SelectItem value="acme">Acme Corporation</SelectItem>
                    <SelectItem value="techstart">TechStart Inc</SelectItem>
                    <SelectItem value="dataflow">DataFlow Ltd</SelectItem>
                    <SelectItem value="cloudtech">CloudTech Pro</SelectItem>
                    <SelectItem value="retailx">RetailX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table className="data-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Balance Owed</TableHead>
                  <TableHead>Total Paid</TableHead>
                  <TableHead>Last Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.tenant}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3" />
                          <span className="text-muted-foreground">Email</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3" />
                          <span className="text-muted-foreground">{customer.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={customer.balanceOwed !== "$0.00" ? "text-destructive font-medium" : "text-muted-foreground"}>
                        {customer.balanceOwed}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">{customer.totalPaid}</TableCell>
                    <TableCell>{customer.lastPayment}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`status-badge ${
                          customer.status === "good_standing" ? "status-active" :
                          customer.status === "trial" ? "status-pending" :
                          "status-error"
                        }`}
                      >
                        {customer.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="outline">
                          <CreditCard className="mr-2 h-4 w-4" />
                          View Payments
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="mr-2 h-4 w-4" />
                          Contact
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

export default Customers
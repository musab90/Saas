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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Plus, MoreHorizontal, Eye, Edit, UserMinus } from "lucide-react"

const mockTenants = [
  {
    id: 1,
    name: "Acme Corporation",
    email: "admin@acme.com",
    createdDate: "2024-01-15",
    plan: "Enterprise",
    status: "active",
    users: 45
  },
  {
    id: 2,
    name: "TechStart Inc",
    email: "contact@techstart.com",
    createdDate: "2024-02-20",
    plan: "Professional",
    status: "active",
    users: 12
  },
  {
    id: 3,
    name: "DataFlow Ltd",
    email: "info@dataflow.co",
    createdDate: "2024-01-08",
    plan: "Starter",
    status: "suspended",
    users: 5
  },
  {
    id: 4,
    name: "CloudTech Pro",
    email: "hello@cloudtech.com",
    createdDate: "2024-03-12",
    plan: "Enterprise",
    status: "active",
    users: 89
  },
  {
    id: 5,
    name: "RetailX",
    email: "support@retailx.com",
    createdDate: "2024-02-28",
    plan: "Professional",
    status: "trial",
    users: 8
  }
]

const Tenants = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tenants</h1>
            <p className="text-muted-foreground">
              Manage your SaaS platform tenants and their subscriptions.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Tenant
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Tenants</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search tenants..."
                    className="pl-9 w-[300px]"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="trial">Trial</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="starter">Starter</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table className="data-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell className="font-medium">{tenant.name}</TableCell>
                    <TableCell>{tenant.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{tenant.plan}</Badge>
                    </TableCell>
                    <TableCell>{tenant.users}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`status-badge ${
                          tenant.status === "active" ? "status-active" :
                          tenant.status === "trial" ? "status-pending" :
                          "status-error"
                        }`}
                      >
                        {tenant.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{tenant.createdDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Tenant
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <UserMinus className="mr-2 h-4 w-4" />
                            Suspend
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

export default Tenants
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Copy, Trash2, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

const mockApiKeys = [
  {
    id: 1,
    prefix: "ak_live_1234567890abcdef",
    name: "Production API Key",
    tenant: "Acme Corporation",
    scopes: ["read", "write", "billing"],
    createdDate: "2024-01-15",
    lastUsed: "2024-01-20",
    status: "active",
    usage: "45,230 calls"
  },
  {
    id: 2,
    prefix: "ak_test_9876543210fedcba",
    name: "Development Key", 
    tenant: "TechStart Inc",
    scopes: ["read", "write"],
    createdDate: "2024-02-01",
    lastUsed: "2024-01-19",
    status: "active",
    usage: "12,450 calls"
  },
  {
    id: 3,
    prefix: "ak_live_abcdef1234567890",
    name: "Analytics Integration",
    tenant: "DataFlow Ltd",
    scopes: ["read"],
    createdDate: "2024-01-08",
    lastUsed: "2024-01-10",
    status: "revoked",
    usage: "8,921 calls"
  },
  {
    id: 4,
    prefix: "ak_live_fedcba0987654321",
    name: "Webhook Handler",
    tenant: "CloudTech Pro",
    scopes: ["read", "write", "webhooks"],
    createdDate: "2024-03-12",
    lastUsed: "2024-01-20",
    status: "active",
    usage: "67,890 calls"
  }
]

const ApiKeys = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
            <p className="text-muted-foreground">
              Manage API keys for tenant integrations and monitor usage.
            </p>
          </div>
          
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Generate New Key
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Generate New API Key</DialogTitle>
                <DialogDescription>
                  Create a new API key for tenant integration. Choose appropriate scopes carefully.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="keyName">Key Name</Label>
                  <Input id="keyName" placeholder="e.g., Production API Key" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tenant">Tenant</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acme">Acme Corporation</SelectItem>
                      <SelectItem value="techstart">TechStart Inc</SelectItem>
                      <SelectItem value="dataflow">DataFlow Ltd</SelectItem>
                      <SelectItem value="cloudtech">CloudTech Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Scopes</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="read" />
                      <Label htmlFor="read">Read access</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="write" />
                      <Label htmlFor="write">Write access</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="billing" />
                      <Label htmlFor="billing">Billing access</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="webhooks" />
                      <Label htmlFor="webhooks">Webhook management</Label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowCreateDialog(false)}>
                  Generate Key
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active API Keys</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="data-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Key</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Scopes</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockApiKeys.map((apiKey) => (
                  <TableRow key={apiKey.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                          {apiKey.prefix}...
                        </code>
                        <Button size="icon" variant="ghost" className="h-6 w-6">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{apiKey.name}</TableCell>
                    <TableCell>{apiKey.tenant}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {apiKey.scopes.map((scope) => (
                          <Badge key={scope} variant="outline" className="text-xs">
                            {scope}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{apiKey.usage}</TableCell>
                    <TableCell>{apiKey.lastUsed}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`status-badge ${
                          apiKey.status === "active" ? "status-active" : "status-error"
                        }`}
                      >
                        {apiKey.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          View Logs
                        </Button>
                        <Button size="sm" variant="outline">
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Revoke
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Usage Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>API Usage Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold">134,491</div>
                <div className="text-sm text-muted-foreground">Total API Calls (30d)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">45ms</div>
                <div className="text-sm text-muted-foreground">Avg Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Active Keys</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default ApiKeys
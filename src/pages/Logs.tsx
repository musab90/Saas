import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Filter, Download } from "lucide-react"

const mockLogs = [
  {
    id: 1,
    timestamp: "2024-01-20 14:30:15",
    action: "User Login",
    user: "John Smith",
    tenant: "Acme Corporation", 
    details: "Successful login from IP 192.168.1.100",
    category: "authentication",
    severity: "info"
  },
  {
    id: 2,
    timestamp: "2024-01-20 14:25:42",
    action: "API Key Generated",
    user: "Sarah Johnson",
    tenant: "TechStart Inc",
    details: "New API key created with read/write permissions",
    category: "api_management",
    severity: "info"
  },
  {
    id: 3,
    timestamp: "2024-01-20 14:20:18",
    action: "Subscription Upgraded",
    user: "Emily Davis",
    tenant: "CloudTech Pro",
    details: "Plan upgraded from Professional to Enterprise",
    category: "subscription",
    severity: "info"
  },
  {
    id: 4,
    timestamp: "2024-01-20 14:15:33",
    action: "Failed Login Attempt",
    user: "Unknown",
    tenant: "DataFlow Ltd",
    details: "Failed login attempt from IP 45.123.45.67",
    category: "authentication",
    severity: "warning"
  },
  {
    id: 5,
    timestamp: "2024-01-20 14:10:07",
    action: "API Rate Limit Exceeded",
    user: "API User",
    tenant: "RetailX",
    details: "Rate limit exceeded for API key ak_live_1234",
    category: "api_usage",
    severity: "error"
  },
  {
    id: 6,
    timestamp: "2024-01-20 14:05:22",
    action: "Payment Processed",
    user: "System",
    tenant: "Acme Corporation",
    details: "Monthly subscription payment of $299 processed successfully",
    category: "billing",
    severity: "info"
  },
  {
    id: 7,
    timestamp: "2024-01-20 14:00:48",
    action: "User Role Changed",
    user: "Michael Brown",
    tenant: "DataFlow Ltd",
    details: "User role changed from Staff to Manager",
    category: "user_management",
    severity: "info"
  },
  {
    id: 8,
    timestamp: "2024-01-20 13:55:11",
    action: "API Key Revoked",
    user: "David Wilson",
    tenant: "RetailX",
    details: "API key ak_live_5678 revoked due to security concern",
    category: "api_management",
    severity: "warning"
  }
]

const Logs = () => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "info":
        return "ℹ️"
      case "warning":
        return "⚠️"
      case "error":
        return "❌"
      default:
        return "📝"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "authentication":
        return "border-blue-200 text-blue-800 bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:bg-blue-950"
      case "api_management":
        return "border-green-200 text-green-800 bg-green-50 dark:border-green-800 dark:text-green-300 dark:bg-green-950"
      case "subscription":
        return "border-purple-200 text-purple-800 bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:bg-purple-950"
      case "billing":
        return "border-yellow-200 text-yellow-800 bg-yellow-50 dark:border-yellow-800 dark:text-yellow-300 dark:bg-yellow-950"
      case "user_management":
        return "border-indigo-200 text-indigo-800 bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300 dark:bg-indigo-950"
      case "api_usage":
        return "border-red-200 text-red-800 bg-red-50 dark:border-red-800 dark:text-red-300 dark:bg-red-950"
      default:
        return "border-gray-200 text-gray-800 bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:bg-gray-950"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Activity Logs</h1>
            <p className="text-muted-foreground">
              Monitor system activities, user actions, and API usage across all tenants.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Logs
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search logs..."
                    className="pl-9 w-[300px]"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="authentication">Authentication</SelectItem>
                    <SelectItem value="api_management">API Management</SelectItem>
                    <SelectItem value="subscription">Subscription</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="user_management">User Management</SelectItem>
                    <SelectItem value="api_usage">API Usage</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="text-xs">
                      {getSeverityIcon(log.severity)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{log.action}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getCategoryColor(log.category)}`}
                        >
                          {log.category.replace("_", " ")}
                        </Badge>
                      </div>
                      <Badge 
                        className={`status-badge ${
                          log.severity === "info" ? "status-active" :
                          log.severity === "warning" ? "status-pending" :
                          "status-error"
                        }`}
                      >
                        {log.severity}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{log.details}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>👤 {log.user}</span>
                      <span>🏢 {log.tenant}</span>
                      <span>🕒 {log.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default Logs
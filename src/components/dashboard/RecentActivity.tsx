import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    type: "payment",
    description: "Payment received from Acme Corp",
    amount: "$2,400",
    time: "2 minutes ago",
    status: "success"
  },
  {
    id: 2,
    type: "tenant",
    description: "New tenant registered: TechStart Inc",
    time: "1 hour ago",
    status: "info"
  },
  {
    id: 3,
    type: "api_key",
    description: "API key revoked for DataFlow Ltd",
    time: "3 hours ago",
    status: "warning"
  },
  {
    id: 4,
    type: "subscription",
    description: "Subscription upgraded: CloudTech Pro",
    amount: "+$500/mo",
    time: "5 hours ago",
    status: "success"
  },
  {
    id: 5,
    type: "payment",
    description: "Payment failed for RetailX",
    time: "1 day ago",
    status: "error"
  }
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {activity.type === "payment" ? "💰" : 
                   activity.type === "tenant" ? "🏢" :
                   activity.type === "api_key" ? "🔑" : "📊"}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.time}
                </p>
              </div>
              
              {activity.amount && (
                <div className="text-sm font-medium">
                  {activity.amount}
                </div>
              )}
              
              <Badge 
                className={`status-badge ${
                  activity.status === "success" ? "status-active" :
                  activity.status === "warning" ? "status-pending" :
                  activity.status === "error" ? "status-error" : "status-inactive"
                }`}
              >
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
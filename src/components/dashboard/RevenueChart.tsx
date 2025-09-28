import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", revenue: 45000, subscriptions: 320 },
  { month: "Feb", revenue: 52000, subscriptions: 380 },
  { month: "Mar", revenue: 48000, subscriptions: 350 },
  { month: "Apr", revenue: 61000, subscriptions: 420 },
  { month: "May", revenue: 55000, subscriptions: 390 },
  { month: "Jun", revenue: 67000, subscriptions: 460 },
  { month: "Jul", revenue: 72000, subscriptions: 510 },
  { month: "Aug", revenue: 68000, subscriptions: 480 },
  { month: "Sep", revenue: 75000, subscriptions: 530 },
  { month: "Oct", revenue: 82000, subscriptions: 580 },
  { month: "Nov", revenue: 79000, subscriptions: 560 },
  { month: "Dec", revenue: 88000, subscriptions: 620 },
]

export function RevenueChart() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [
                name === "revenue" ? `$${value.toLocaleString()}` : value,
                name === "revenue" ? "Revenue" : "Subscriptions"
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="subscriptions" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
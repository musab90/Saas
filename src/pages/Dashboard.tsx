import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { RevenueChart } from "@/components/dashboard/RevenueChart"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { DollarSign, Building2, CreditCard, AlertTriangle } from "lucide-react"

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your SaaS platform.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value="$1,234,567"
            change="+12.5% from last month"
            changeType="positive"
            icon={DollarSign}
          />
          <MetricCard
            title="Active Tenants"
            value="147"
            change="+8 new this month"
            changeType="positive"
            icon={Building2}
          />
          <MetricCard
            title="Active Subscriptions"
            value="423"
            change="+23 from last month"
            changeType="positive"
            icon={CreditCard}
          />
          <MetricCard
            title="Outstanding Balances"
            value="$45,230"
            change="-15% from last month"
            changeType="positive"
            icon={AlertTriangle}
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid gap-6 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <RevenueChart />
          </div>
          <div className="lg:col-span-3">
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
import { NavLink, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  BarChart3,
  Building2,
  CreditCard,
  DollarSign,
  Users,
  Key,
  Activity,
  Settings,
  Menu,
  Shield,
  FileText,
  ChevronDown
} from "lucide-react"

import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
 

const navItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Tenants", url: "/tenants", icon: Building2 },
  // Subscriptions and Subscription Plans will be rendered as a collapsible group
  { title: "Finance", url: "/finance", icon: DollarSign },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "API Keys", url: "/api-keys", icon: Key },
  { title: "Users", url: "/users", icon: Shield },
  { title: "Logs", url: "/logs", icon: Activity },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/"
    }
    return currentPath.startsWith(path)
  }

  // Smooth, controlled collapsible for Subscription group
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(
    isActive('/subscriptions') || isActive('/subscription-plans')
  )
  useEffect(() => {
    // auto-open when navigating into any child; keep state in sync with route
    setIsSubscriptionOpen(isActive('/subscriptions') || isActive('/subscription-plans'))
  }, [currentPath])
  // Parent is a pure label/toggle; never marked active

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-semibold">SaaS Admin</span>
              <span className="text-xs text-muted-foreground">Dashboard</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`sidebar-item transition-colors duration-150 ${isActive(item.url) ? "active" : ""}`}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Subscription collapsible */}
              <SidebarMenuItem>
                <Collapsible open={isSubscriptionOpen} onOpenChange={setIsSubscriptionOpen}>
                  <div className="flex items-center">
                    <SidebarMenuButton className="sidebar-item flex-1" onClick={() => setIsSubscriptionOpen(!isSubscriptionOpen)}>
                      <CreditCard className="h-4 w-4" />
                      {!collapsed && <span>Subscription</span>}
                    </SidebarMenuButton>
                    {!collapsed && (
                      <CollapsibleTrigger className="ml-1 p-1 rounded hover:bg-muted" onClick={(e) => e.preventDefault()}>
                        <ChevronDown className={`h-4 w-4 transition-transform ${isSubscriptionOpen ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                    )}
                  </div>
                  <CollapsibleContent className="pl-6 py-1 space-y-1">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/subscriptions" className={`sidebar-item ${isActive('/subscriptions') ? 'active' : ''}`}>
                          {!collapsed && <span>Subscriptions</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/subscription-plans" className={`sidebar-item ${isActive('/subscription-plans') ? 'active' : ''}`}>
                          {!collapsed && <span>Subscription Plans</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
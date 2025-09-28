import { NavLink, useLocation } from "react-router-dom"
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
  FileText
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

const navItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Tenants", url: "/tenants", icon: Building2 },
  { title: "Subscriptions", url: "/subscriptions", icon: CreditCard },
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
                      className={`sidebar-item ${isActive(item.url) ? "active" : ""}`}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
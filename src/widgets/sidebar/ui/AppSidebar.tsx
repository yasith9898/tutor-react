import {
  LayoutDashboard,
  BarChart3,
  User,
  Settings,
  Package,
  ShoppingCart,
  Users,
  Lock,
  Globe,
  Calendar,
  FileText,
  CircleHelp,
  LogOut
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/shared/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

const items = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "User Profile", url: "/admin/profile", icon: User },
  { title: "System Settings", url: "/admin/settings", icon: Settings },
  { title: "Products", url: "/admin/products", icon: Package },
  { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
  { title: "Team Members", url: "/admin/team", icon: Users },
  { title: "Security", url: "/admin/security", icon: Lock },
  { title: "Localization", url: "/admin/localization", icon: Globe },
  { title: "Schedule", url: "/admin/schedule", icon: Calendar },
  { title: "Reports", url: "/admin/reports", icon: FileText },
  { title: "Help Center", url: "/admin/help", icon: CircleHelp },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 px-1">
          <Avatar size="lg" className="size-24 mb-4 ring-4 ring-slate-50">
            <AvatarImage src="" alt="profile pic" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-semibold text-sm">Alex Johnson</span>
            <span className="text-xs text-slate-500">Senior Admin & Data Analyst</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-red-500 hover:text-red-600">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
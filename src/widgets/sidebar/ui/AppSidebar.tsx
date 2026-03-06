import {
  LayoutDashboard,
  BarChart3,
  User,
  Settings,
  FileText,
  CircleHelp,
  LogOut
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/shared/api/supabase";
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
  { title: "Reports", url: "/admin/reports", icon: FileText },
  { title: "Help Center", url: "/admin/help", icon: CircleHelp },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email?: string; user_metadata?: { full_name?: string } } | null>(null);

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always redirect to login to ensure the local session is cleared/ignored
      navigate("/auth/login");
    }
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";
  const displayEmail = user?.email || "Not signed in";

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 px-1">
          <Avatar size="lg" className="size-24 mb-4 ring-4 ring-slate-50">
            <AvatarImage src="" alt="profile pic" />
            <AvatarFallback>{displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-semibold text-sm">{displayName}</span>
            <span className="text-xs text-slate-500 truncate max-w-[150px]">{displayEmail}</span>
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
            <SidebarMenuButton onClick={handleLogout} className="text-red-500 hover:text-red-600 cursor-pointer">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
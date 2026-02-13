import { Outlet, useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { Separator } from "@/shared/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/ui/sidebar";
import { AppSidebar } from "@/widgets/sidebar";

export const AdminLayout = () => {
  const location = useLocation();
  
  // Clean path formatting
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const formattedTitle = pathSegments.length > 1 
    ? pathSegments[1].charAt(0).toUpperCase() + pathSegments[1].slice(1) 
    : "Overview";

  return (
    <SidebarProvider>
      {/* 1. The Left Menu (Widget) */}
      <AppSidebar />
      
      <SidebarInset className="bg-background">
        {/* 2. Sleek Sticky Header */}
        <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b bg-card px-4 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/admin">Tutor Panel</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-medium text-foreground">
                    {formattedTitle}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Right side of header for profile/notifications if needed later */}
          <div className="flex items-center gap-4">
             <div className="text-xs text-muted-foreground font-medium hidden sm:block">
                Academic Year 2026
             </div>
          </div>
        </header>

        {/* 3. Main Content Area - Clean & Full Width */}
        <main className="flex flex-1 flex-col p-6 overflow-x-hidden">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

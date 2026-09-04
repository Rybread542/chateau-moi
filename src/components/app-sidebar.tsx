"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NotebookText } from "lucide-react";


const data = {
  navMain: [
    {
      title: "Blog",
      url: "/blog",
      icon: (
        <NotebookText />
      ),
      isActive: true,
      items: [
        {
          title: "All Posts",
          url: "/admin",
        },
        {
          title: "Unpublished",
          url: "/admin?view=unpublished",
        },
        {
          title: "Spooktober",
          url: "/admin?view=spooktober",
        },
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex justify-between items-center px-4">
          <div className="group-data-[collapsible=icon]:hidden text-md">Admin</div>
          <div>
            <SidebarTrigger className="group-data-[collapsible=icon]:-ml-3.5" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

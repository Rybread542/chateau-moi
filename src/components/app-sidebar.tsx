"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { NotebookText, TerminalSquareIcon, BotIcon, BookOpenIcon, Settings2Icon, FrameIcon, PieChartIcon, MapIcon } from "lucide-react"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Blog",
      url: "#",
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
          url: "#",
        },
        {
          title: "Reviews",
          url: "#",
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

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { Link } from "react-router-dom";

export function NavMain({
  items,
  navigationPath,
}: {
  items: any;
  navigationPath: any;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigations</SidebarGroupLabel>
      <SidebarMenu>
        {items?.map((item, index) => (
          <Collapsible
            key={item?.category?.name}
            asChild
            defaultOpen={index === 0}
            className="group/collapsible"
          >
            <SidebarMenuItem className="!text-sm">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.category?.name}>
                  {item.category?.icon && (
                    <span className="material-symbols-outlined">
                      {item.category?.icon}
                    </span>
                  )}
                  <span>{item.category?.name}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item?.features?.map((feature: any) =>
                    feature?.is_show_navigation == 1 ? (
                      <SidebarMenuSubItem key={feature.id}>
                        <SidebarMenuSubButton asChild>
                          <Link to={`../${navigationPath}/${feature.navigation}`}>
                            <span className="material-symbols-outlined">
                              {feature.icon}
                            </span>
                            <span>{feature.label}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ) : null
                  )}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

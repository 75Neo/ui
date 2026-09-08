import { ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/react";

const groups = [
  {
    value: "components",
    label: "Components",
    links: [
      { href: "/docs/components/button", label: "Button" },
      { href: "/docs/components/table", label: "Table" },
      { href: "/docs/components/toc", label: "Table of contents" },
    ],
  },
  {
    value: "guides",
    label: "Guides",
    links: [
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/customization", label: "Customization" },
    ],
  },
];

export default function NavigationMenuOverview() {
  return (
    <NavigationMenu className="justify-center">
      <NavigationMenuList>
        {groups.map((group) => (
          <NavigationMenuItem key={group.value} value={group.value}>
            <NavigationMenuTrigger trailing={<ChevronDown />}>{group.label}</NavigationMenuTrigger>

            <NavigationMenuContent>
              {group.links.map((link) => (
                <NavigationMenuLink key={link.href} href={link.href}>
                  {link.label}
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

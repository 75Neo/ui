import { NavigationMenu } from "@75neo/react/navigation-menu";

const items = [
  {
    value: "components",
    label: "Components",
    links: [
      { href: "#button", title: "Button", description: "The one every page has" },
      { href: "#select", title: "Select", description: "A list that opens on demand" },
    ],
  },
  { value: "docs", label: "Docs", href: "#docs" },
];

export function NavigationMenuPreview() {
  return <NavigationMenu items={items} />;
}

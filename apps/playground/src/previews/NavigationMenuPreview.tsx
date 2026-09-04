import { navigationMenu, variantValues } from "@75neo/themes";
import { NavigationMenu } from "@75neo/react";
import { BookOpen, Compass, LifeBuoy, Rocket, Sparkles } from "lucide-react";

const sizes = variantValues(navigationMenu, "size");
const colors = variantValues(navigationMenu, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const items = [
  {
    value: "overview",
    label: "Overview",
    links: [
      {
        href: "#quick-start",
        title: "Quick Start",
        description: "Install and assemble",
        icon: <Rocket />,
      },
      {
        href: "#styling",
        title: "Styling",
        description: "Tokens, not hardcoded colors",
        icon: <Sparkles />,
      },
    ],
  },
  {
    value: "guides",
    label: "Guides",
    links: [
      {
        href: "#composition",
        title: "Composition",
        description: "Replace and compose parts",
        icon: <BookOpen />,
      },
      {
        href: "#forms",
        title: "Forms",
        description: "Native and library forms",
        icon: <Compass />,
      },
    ],
  },
  { value: "support", label: "Support", href: "#support", icon: <LifeBuoy /> },
];

export default function NavigationMenuPreview() {
  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <NavigationMenu size={size} items={items} />
        </div>
      ))}

      <hr className="border-muted" />

      {/* The accent reaches the highlighted link and the current one. */}
      {colors.map((accent) => (
        <div key={accent} className={row}>
          <p className={rowLabel} data-identifier>
            {accent}
          </p>
          <NavigationMenu
            color={accent}
            size="sm"
            items={[
              {
                value: "guides",
                label: "Guides",
                links: [
                  {
                    href: "#composition",
                    title: "Composition",
                    description: "Replace and compose parts",
                    current: true,
                  },
                  { href: "#forms", title: "Forms", description: "Native and library forms" },
                ],
              },
            ]}
          />
        </div>
      ))}

      <hr className="border-muted" />

      {/* A bar running down instead of across, with its panels opening to the side. */}
      <div className={row}>
        <p className={rowLabel} data-identifier>
          vertical
        </p>
        <NavigationMenu orientation="vertical" items={items} />
      </div>
    </div>
  );
}

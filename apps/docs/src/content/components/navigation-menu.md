---
name: NavigationMenu
key: navigationMenu
module: navigation-menu
summary: A row of triggers, each opening a panel of links.
---

A row is one of two things. A row with links is a trigger and the panel it opens; a
row with an address and no links is a plain anchor. One flat array holds both, so a
caller building rows from data never has to decide where one shape ends and the next
begins.

```tsx
const items = [
  {
    value: "components",
    label: "Components",
    links: [{ href: "/button", title: "Button", description: "The one every page has" }],
  },
  { value: "docs", label: "Docs", href: "/docs" },
];

<NavigationMenu items={items} />;
```

```vue
<NavigationMenu :items="items" />
```

`orientation` set to `vertical` turns the bar into a column and each panel opens beside
its row rather than under it. Each panel is positioned against its own row, so no
positioning library is involved.

The accent reaches a link under the pointer or the arrow keys and the link naming the
page being read, and nothing else. A bar holding every row in the accent colour is a
bar nobody can read.

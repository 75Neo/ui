---
title: Navigation Menu
description: A horizontal or vertical bar of rows, each opening a panel of links on hover or click.
category: Navigation
registryItem: navigation-menu
installNote: "The item pulls in `@ark-ui/react` or `@ark-ui/vue`. It also installs two keyframes for the panel, which the CLI adds to your stylesheet."
---

## Usage

```tsx
import NavigationMenu from "@/components/ui/navigation-menu/NavigationMenu";
import NavigationMenuContent from "@/components/ui/navigation-menu/NavigationMenuContent";
import NavigationMenuItem from "@/components/ui/navigation-menu/NavigationMenuItem";
import NavigationMenuLink from "@/components/ui/navigation-menu/NavigationMenuLink";
import NavigationMenuList from "@/components/ui/navigation-menu/NavigationMenuList";
import NavigationMenuTrigger from "@/components/ui/navigation-menu/NavigationMenuTrigger";

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem value="products">
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/analytics">Analytics</NavigationMenuLink>
        <NavigationMenuLink href="/billing">Billing</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>;
```

```vue
<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem value="products">
        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink href="/analytics">Analytics</NavigationMenuLink>
          <NavigationMenuLink href="/billing">Billing</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
```

Each item needs a `value` that is unique within the menu. It is what the root reports as open and
what you pass to `defaultValue` to open a panel on mount.

## Anatomy

| Part                    | Element  | Role                                                                     |
| ----------------------- | -------- | ------------------------------------------------------------------------ |
| `NavigationMenu`        | `div`    | Holds the state machine and the `size` and `orientation` data attributes |
| `NavigationMenuList`    | `ul`     | The row, or the column when vertical                                     |
| `NavigationMenuItem`    | `li`     | One trigger plus its panel                                               |
| `NavigationMenuTrigger` | `button` | Opens the panel, with optional leading and trailing icons                |
| `NavigationMenuContent` | `div`    | The panel, positioned below the row or beside the column                 |
| `NavigationMenuLink`    | `a`      | A row inside the panel                                                   |

## Behaviour

This is [Ark UI's navigation menu](https://ark-ui.com/docs/components/navigation-menu) underneath,
so keyboard support, focus management and the ARIA wiring come from a state machine rather than
from our styling layer. Triggers open on hover and on click by default, and the panel closes when
the pointer leaves it.

Three props turn parts of that off:

```tsx
<NavigationMenu disableHoverTrigger disablePointerLeaveClose>
  {/* ... */}
</NavigationMenu>
```

`disableHoverTrigger` makes the menu click only, which suits touch heavy interfaces.
`disableClickTrigger` does the reverse. `disablePointerLeaveClose` keeps a panel open until the
user clicks away, which helps when the panel holds a form rather than links.

`openDelay` and `closeDelay` take milliseconds and control how forgiving the hover behaviour is.

## Controlling which panel is open

React reports changes through `onValueChange`:

```tsx
const [value, setValue] = useState("products");

<NavigationMenu value={value} onValueChange={(details) => setValue(details.value)}>
  {/* ... */}
</NavigationMenu>;
```

Vue exposes the same state as a model:

```vue
<NavigationMenu v-model:value="value">
  <!-- ... -->
</NavigationMenu>
```

An empty string means every panel is closed.

## Sizes and orientation

`size` accepts `sm`, `md` and `lg`, and sets a data attribute on the root that the recipe reads
with a group variant, so triggers and links resize together. `orientation` accepts `horizontal`
and `vertical`. A vertical menu stretches its items to full width and opens panels to the side,
which is what you want in a sidebar.

## Mounting

`lazyMount` holds the panel out of the DOM until it first opens, and `unmountOnExit` removes it
again on close. Use both when the panel is expensive. Leave both off when the panel holds links
that should be crawlable.

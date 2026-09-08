---
title: Table of Contents
description: A navigation rail that tracks which headings are on screen and marks the active one.
category: Navigation
registryItem: toc
installNote: "The rail on the right of this page is this component, driven by the headings of this document plus the ones the API reference generates. Narrow the window below `1280px` and it is hidden, which is the layout decision this documentation makes rather than something the component enforces."
---

## Usage

You give it a flat list of items. Each item is the `id` of a heading in the document and the depth
that heading sits at.

```tsx
import Toc from "@/components/ui/toc/Toc";
import TocIndicator from "@/components/ui/toc/TocIndicator";
import TocItem from "@/components/ui/toc/TocItem";
import TocLink from "@/components/ui/toc/TocLink";
import TocList from "@/components/ui/toc/TocList";
import TocTitle from "@/components/ui/toc/TocTitle";

const headings = [
  { slug: "installation", text: "Installation", depth: 2 },
  { slug: "usage", text: "Usage", depth: 2 },
  { slug: "anatomy", text: "Anatomy", depth: 3 },
];

<Toc items={headings.map((h) => ({ value: h.slug, depth: h.depth }))}>
  <TocTitle>On this page</TocTitle>
  <TocList>
    <TocIndicator />
    {headings.map((heading) => (
      <TocItem key={heading.slug} item={{ value: heading.slug, depth: heading.depth }}>
        <TocLink href={`#${heading.slug}`}>{heading.text}</TocLink>
      </TocItem>
    ))}
  </TocList>
</Toc>;
```

```vue
<template>
  <Toc :items="items">
    <TocTitle>On this page</TocTitle>
    <TocList>
      <TocIndicator />
      <TocItem
        v-for="heading in headings"
        :key="heading.slug"
        :item="{ value: heading.slug, depth: heading.depth }"
      >
        <TocLink :href="`#${heading.slug}`">{{ heading.text }}</TocLink>
      </TocItem>
    </TocList>
  </Toc>
</template>
```

The `items` prop on the root and the `item` prop on each row carry the same data. The root needs
the full list to run one observer over every heading. Each row needs its own entry to know whether
it is the active one.

## Anatomy

| Part           | Element | Role                                                               |
| -------------- | ------- | ------------------------------------------------------------------ |
| `Toc`          | `nav`   | Holds the state machine and the indicator geometry                 |
| `TocTitle`     | `h2`    | Labels the rail and is referenced by `aria-labelledby` on the root |
| `TocList`      | `ul`    | The rail, with the left hand rule and the positioning context      |
| `TocItem`      | `li`    | One heading, indented from its `--depth`                           |
| `TocLink`      | `a`     | The link to the heading                                            |
| `TocIndicator` | `li`    | The bar that slides to the active range                            |

`TocIndicator` renders as an `li` so it can live inside the list without breaking the markup. Its
position is measured against the list, so it has to be a child of `TocList` rather than a sibling.

## How the active heading is found

This is [Ark UI's table of contents](https://ark-ui.com/docs/components/toc) underneath. It runs an
`IntersectionObserver` over the heading elements and reports every one currently inside the
observed band. More than one heading can be active at a time, which is why the indicator has a
height rather than a fixed size: it spans from the first active heading to the last.

Two props shape the band:

```tsx
<Toc items={items} rootMargin="-80px 0px -55% 0px" threshold={0} />
```

`rootMargin` shrinks the viewport the observer uses. A negative top margin the height of your
sticky header stops a heading counting as visible while it is still behind the header. A large
negative bottom margin keeps the active heading near the top of the screen rather than switching as
soon as the next one appears at the bottom.

For a scrolling panel rather than the page, hand it the element:

```tsx
<Toc items={items} scrollEl={() => document.getElementById("article")} />
```

## Indentation

`TocItem` reads the `--depth` custom property the machine sets and indents from it, so a level three
heading sits one step in from a level two. The step is set in the recipe:

```ts
export const toc = tv({
  slots: {
    item: "flex min-w-0 ps-[calc(0.75rem*(var(--depth)-2))]",
  },
});
```

The subtraction assumes the shallowest heading you pass is a level two, which is the normal case
when the page title is the only `h1`. If you feed it level ones, change the `2` to a `1`.

## Scrolling and the indicator

Clicking a link scrolls the heading into view. When the page itself is the scroll container the
browser handles it, so `scroll-behavior` and `scroll-margin-top` on the headings are yours to set.
When you pass `scrollEl`, the component scrolls that element instead and pushes the hash onto the
history.

`autoScroll` keeps the active row visible inside a long rail, and `scrollBehavior` chooses between
`smooth` and `instant` for both that and the heading scroll.

The indicator moves with a CSS transition on `top` and `height`, not an animation, so it settles
without drawing attention to itself and respects a reduced motion preference through the same
mechanism as everything else on the page.

---
title: Collapsible
description: A single trigger that shows and hides one panel of content.
category: Disclosure
registryItem: collapsible
---

## Usage

```tsx
<Collapsible>
  <CollapsibleTrigger>
    What the CLI writes
    <CollapsibleIndicator>
      <ChevronDown />
    </CollapsibleIndicator>
  </CollapsibleTrigger>
  <CollapsibleContent>The adapter, the recipe, and the theme stylesheet.</CollapsibleContent>
</Collapsible>
```

```vue
<template>
  <Collapsible>
    <CollapsibleTrigger>
      What the CLI writes
      <CollapsibleIndicator>
        <ChevronDown />
      </CollapsibleIndicator>
    </CollapsibleTrigger>
    <CollapsibleContent>The adapter, the recipe, and the theme stylesheet.</CollapsibleContent>
  </Collapsible>
</template>
```

## Against the accordion

Reach for this when there is one thing to hide. Reach for the
[accordion](/docs/components/accordion) when there are several and only one should be open at a
time. A row of collapsibles is not an accordion, because nothing coordinates them.

## Mounting

`lazyMount` keeps the panel out of the DOM until it first opens and `unmountOnExit` removes it
again on close. Both default to off, which is what you want when the panel holds text that should
be findable with the browser's own search.

## Sizing the panel

`collapsedHeight` and `collapsedWidth` leave a strip of the panel visible when closed, which suits
a "read more" affordance better than hiding the text entirely.

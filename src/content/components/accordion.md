---
title: Accordion
description: Stacked sections that each reveal a panel of content when opened.
category: Disclosure
registryItem: accordion
---

## Installation

```sh
npx shadcn@latest add @75neo/accordion
```

```sh
npx shadcn-vue@latest add @75neo/accordion
```

## Usage

```tsx
<Accordion collapsible defaultValue={["install"]}>
  <AccordionItem value="install">
    <AccordionItemTrigger>
      How do I install a component?
      <AccordionItemIndicator>
        <ChevronDown />
      </AccordionItemIndicator>
    </AccordionItemTrigger>
    <AccordionItemContent>Point the CLI at the registry and run add.</AccordionItemContent>
  </AccordionItem>
</Accordion>
```

```vue
<template>
  <Accordion collapsible :default-value="['install']">
    <AccordionItem value="install">
      <AccordionItemTrigger>
        How do I install a component?
        <AccordionItemIndicator>
          <ChevronDown />
        </AccordionItemIndicator>
      </AccordionItemTrigger>
      <AccordionItemContent>Point the CLI at the registry and run add.</AccordionItemContent>
    </AccordionItem>
  </Accordion>
</template>
```

## Anatomy

| Part                     | Element  | Role                                        |
| ------------------------ | -------- | ------------------------------------------- |
| `Accordion`              | `div`    | Holds the state machine and the open values |
| `AccordionItem`          | `div`    | One section, keyed by a unique `value`      |
| `AccordionItemTrigger`   | `button` | Opens and closes the section                |
| `AccordionItemIndicator` | `div`    | Rotates when the section is open            |
| `AccordionItemContent`   | `div`    | The panel                                   |

## One open or many

By default one section is open at a time and clicking the open one does nothing. `collapsible`
lets that click close it, and `multiple` lets several stay open at once, which turns the value
from a single entry into a list.

The value is always an array in both modes, so the controlled prop has the same shape either way.

## Indentation and rules

The recipe puts a hairline under every item except the last and no border around the group, so an
accordion sits inside a page without drawing a box. Give the root a class if you want it boxed.

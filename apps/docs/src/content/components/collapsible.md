---
name: Collapsible
key: collapsible
module: collapsible
order: 9
summary: One trigger and the panel it opens, across three variants and three sizes, with a collapsed height that turns it into a show-more.
---

A Collapsible is Accordion's row without the accordion around it. It wears the same
three variants, the same three sizes and the same slot names on purpose, so the two look
like siblings on a page and a `ui` override written for one reads on the other.

```tsx
<Collapsible label="What is 75NeoUI?">One set of styles, shipped for React and Vue.</Collapsible>
```

```vue
<Collapsible label="What is 75NeoUI?">
  One set of styles, shipped for React and Vue.
</Collapsible>
```

What is different is that nothing coordinates it. There is no set of rows taking turns,
so there is no `value` to identify a row by and no `multiple` to allow a second one open.
Reach for Accordion when the rows belong together; reach for this when one panel stands
on its own.

### The content

The panel holds whatever the framework calls children, rather than a string prop. A
collapsible usually holds markup, and a prop would only get in the way. The trigger is
the other way round: `label` is a string, with a `label` slot in Vue and `renderLabel` in
React for anything richer.

### Open and closed

Open is not a recipe variant. Ark writes `data-state` on the trigger and the panel, and
the recipe styles itself off that, so one resolved class string covers both states.

React takes `open` with `onOpenChange`, or `defaultOpen` to leave the state alone. Vue
takes `v-model:open`, with `defaultOpen` as the uncontrolled counterpart.

```tsx
const [open, setOpen] = useState(false);

<Collapsible label="Controlled" open={open} onOpenChange={(details) => setOpen(details.open)}>
  The button that opens this one lives somewhere else.
</Collapsible>;
```

```vue
<script setup lang="ts">
const open = ref(false);
</script>

<template>
  <Collapsible v-model:open="open" label="Controlled">
    The button that opens this one lives somewhere else.
  </Collapsible>
</template>
```

### A show more

`collapsedHeight` leaves the panel clipped rather than hidden, so the first lines stay on
the page and the rest slides in behind them. It takes a CSS length or a number of pixels.

```tsx
<Collapsible label="Show more" collapsedHeight="3rem">
  <p>The first lines are readable before anyone opens anything.</p>
  <p>The rest arrives when they do.</p>
</Collapsible>
```

```vue
<Collapsible label="Show more" collapsed-height="3rem">
  <p>The first lines are readable before anyone opens anything.</p>
  <p>The rest arrives when they do.</p>
</Collapsible>
```

### The animation

The panel measures itself, and the `content` slot hands both of Ark's measurements to
keyframes shared with Accordion. `--height` is the panel's natural size and
`--collapsed-height` is whatever `collapsedHeight` asked it to shrink to, defaulting to
nothing. That default is why the same keyframes serve Accordion, which always closes all
the way shut.

`unmountOnExit` takes the panel out of the DOM once it has finished closing, and
`lazyMount` keeps it out until it is opened the first time. Both are off by default,
because a panel that stays mounted is the one that keeps its scroll position and its
form state.

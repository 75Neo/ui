---
name: Collapsible
key: collapsible
module: collapsible
summary: One trigger and the panel it opens, on its own.
---

This is Accordion's row without the accordion around it. It wears the same three
variants and the same three sizes, so the two read as siblings on a page, but nothing
coordinates it: there is no set of rows taking turns, so no value and no multiple.

```tsx
<Collapsible defaultOpen>
  <CollapsibleTrigger>What is a design token?</CollapsibleTrigger>
  <CollapsibleContent>A named value for a design decision.</CollapsibleContent>
</Collapsible>
```

```vue
<Collapsible :default-open="true">
  <CollapsibleTrigger>What is a design token?</CollapsibleTrigger>
  <CollapsibleContent>A named value for a design decision.</CollapsibleContent>
</Collapsible>
```

`leadingIcon` on the trigger puts a glyph before the label and `trailingIcon` replaces
the chevron. `collapsedHeight` turns the component into a show-more: the panel is
clipped rather than hidden, so the text underneath keeps its place in the tab order.
The panel snaps rather than sliding.

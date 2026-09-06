---
name: Accordion
key: accordion
module: accordion
summary: Composed anatomy parts around Ark UI for keyboard and ARIA behaviour.
---

Rows are markup rather than data. Compose the parts and the accordion renders them,
so keyboard navigation and ARIA wiring come with it. The root publishes `variant`
and `size` through context; every part reads them into its own styles.

```tsx
<Accordion>
  <AccordionItem value="shipping">
    <AccordionItemTrigger>Shipping</AccordionItemTrigger>
    <AccordionItemContent>Two to four working days.</AccordionItemContent>
  </AccordionItem>
  <AccordionItem value="returns">
    <AccordionItemTrigger>Returns</AccordionItemTrigger>
    <AccordionItemContent>Thirty days, no questions.</AccordionItemContent>
  </AccordionItem>
</Accordion>
```

```vue
<Accordion>
  <AccordionItem value="shipping">
    <AccordionItemTrigger>Shipping</AccordionItemTrigger>
    <AccordionItemContent>Two to four working days.</AccordionItemContent>
  </AccordionItem>
  <AccordionItem value="returns">
    <AccordionItemTrigger>Returns</AccordionItemTrigger>
    <AccordionItemContent>Thirty days, no questions.</AccordionItemContent>
  </AccordionItem>
</Accordion>
```

`multiple` allows more than one row open at a time. `collapsible` allows closing the open
row and leaving none open. An `AccordionItem` carries its own `disabled`. The trigger
owns its indicator: `leadingIcon` puts a glyph before the label and `trailingIcon`
replaces the chevron, and both are glyphs rather than parts.

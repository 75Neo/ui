---
name: Footer
key: footer
module: footer
order: 26
summary: Three regions in a row plus two full-bleed bands, reordered so a phone stacks the links above the copyright.
---

The Footer is one row of three regions, with two optional bands above and below it that
render only when something is put in them.

```tsx
<Footer left={<Copyright />} right={<SocialLinks />}>
  <Wordmark />
</Footer>
```

```vue
<Footer>
  <template #left><Copyright /></template>
  <Wordmark />
  <template #right><SocialLinks /></template>
</Footer>
```

### The row is written backwards on purpose

The three regions go into the DOM in the order right, centre, left, and are put back in
reading order by `lg:order-*`. That is deliberate rather than an accident of the flex
direction: stacked on a phone, the links people came for should be above the copyright,
and reversing the source is the only way to get that without duplicating the markup.
Reading order is restored the moment there is a row to sit in.

### The bands

`top` and `bottom` are full-bleed and have no horizontal gutter, so a newsletter band or
a wide grid of columns can run to the edge of the screen. Put a Container inside one to
bring it back to the page measure.

```tsx
<Footer
  top={
    <Container>
      <FooterColumns />
    </Container>
  }
  bottom={<Licence />}
/>
```

```vue
<Footer>
  <template #top><Container><FooterColumns /></Container></template>
  <template #bottom><Licence /></template>
</Footer>
```

The row itself holds the page measure and the gutters directly rather than rendering a
Container, so that the element carries `data-slot="container"` and can be reached through
`ui.container`. The measure is `max-w-page` in both places, so the Footer, the Header and
a Container around the page body still move together.

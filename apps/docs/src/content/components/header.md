---
name: Header
key: header
module: header
summary: The bar across the top of a page, and the fullscreen menu it opens where there is no room for a navigation.
---

The bar is three regions: a wordmark at the start, a navigation in the middle, and
actions at the end. Below `lg` the middle is hidden and a button appears that opens the
same content as a fullscreen menu.

```tsx
<Header title="Acme" to="/" right={<Button size="sm">Sign in</Button>} body={<MobileNav />}>
  <DesktopNav />
</Header>
```

```vue
<Header title="Acme" to="/">
  <DesktopNav />
  <template #right><Button size="sm">Sign in</Button></template>
  <template #body><MobileNav /></template>
</Header>
```

The default slot is the centre of the bar. That is the region a navigation goes in, and
it is the one that disappears on a phone, so whatever matters there belongs in `body` as
well.

### The menu

`body` is what the menu holds, and it is also the switch that decides whether there is a
menu at all: with nothing in it there is nothing to open, so no toggle is drawn.

The wordmark and the actions are rendered twice, once in the bar and once at the top of
the menu, so the menu opens over the page without the page appearing to lose its header.
The toggle is in both and is the same button in both, which is why it is a plain `button`
driving the component's own state rather than one of Ark UI's triggers: a trigger inside
a modal panel is inert.

`toggleSide` puts the button at either end, and is spelled `start` and `end` rather than
`left` and `right` because the bar mirrors under a right-to-left locale and the button
should mirror with it.

```tsx
<Header title="Acme" toggleSide="start" body={<MobileNav />} />
```

```vue
<Header title="Acme" toggle-side="start">
  <template #body><MobileNav /></template>
</Header>
```

The open state is controllable. React takes `open` with `onOpenChange`, or `defaultOpen`
to leave it alone; Vue takes `v-model:open`.

### Height

The bar is `h-header`, which is `--ui-header-height` behind a utility name. The Main and
the Error subtract the same number from the viewport, so all three agree. Changing the
height means changing that token, not the class, or the two of them fall out of step.

The bar is sticky and translucent, with a backdrop blur behind it. A page that wants it
to scroll away passes `class="static"`, which tailwind-merge resolves against the
recipe's own `sticky`.

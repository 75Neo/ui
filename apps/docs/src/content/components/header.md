---
name: Header
key: header
module: header
summary: The bar across the top of a page, and the menu it opens.
---

Three regions divide the row: the two ends claim a flex share and the centre takes what
it needs, which is what centres a navigation between a wordmark and a set of actions
whatever their widths.

```tsx
<Header title="75NeoUI" href="/" end={<Button>Sign in</Button>} menu={<Nav />}>
  <Nav />
</Header>
```

```vue
<Header title="75NeoUI" href="/">
  <Nav />
  <template #end><Button>Sign in</Button></template>
  <template #menu><Nav /></template>
</Header>
```

Below the wide breakpoint the centre is hidden and its content belongs in the menu
instead. The wordmark and the actions render twice, once in the bar and once at the top
of the menu, so the menu opens over the page without the page appearing to lose its
header.

`toggleSide` is start and end rather than left and right, because the bar mirrors under
a right-to-left locale and the button should mirror with it.

The bar's height is a token, because the Main and the Error subtract the same number
from the viewport. Making the bar taller has to move them with it, and only a token
can.

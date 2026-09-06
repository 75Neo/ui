---
name: Swap
key: swap
module: swap
summary: One icon shown while on, another while off.
---

Which icon the reader sees is chosen by presence: Ark hides the other one behind the
hidden attribute, so one class string covers both states.

```tsx
<Swap swapped={dark} onIcon={<Moon />} offIcon={<Sun />} />
```

```vue
<Swap :swapped="dark" :on-icon="Moon" :off-icon="Sun" />
```

The state is display-only. Nothing inside a swap flips it, so the prop is a plain one
rather than a model, and there is no change event: put the swap inside a button and
let the button own the state.

The prop is spelled `swapped` rather than `swap`, because a prop matching the
component's own name would read as a typo at every call site.

There is no color. A swap borrows its meaning from whatever it sits in, so it paints
nothing of its own.

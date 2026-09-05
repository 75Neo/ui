---
name: Avatar
key: avatar
module: avatar
summary: Nine sizes across two shapes and seven colors, with an image, a fallback, and a slot for a framework image component.
---

An avatar shows `src` when it loads and its fallback until then. Without a `src` it shows
the fallback outright, so the two cases need no branching at the call site.

```tsx
<Avatar src="/ada.jpg" alt="Ada Lovelace" name="Ada Lovelace" />
<Avatar name="Ada Lovelace" />
<Avatar name="Ada Lovelace" shape="square" color="primary" />
```

```vue
<Avatar src="/ada.jpg" alt="Ada Lovelace" name="Ada Lovelace" />
<Avatar name="Ada Lovelace" />
<Avatar name="Ada Lovelace" shape="square" color="primary" />
```

The fallback resolves in three steps. An explicit `fallback` wins outright, `null`
included. Otherwise a `name` gives its initials. Otherwise the avatar renders empty.

### A framework image component

`next/image` and `NuxtImg` have to merge Ark UI's own image props rather than be handed a
`src`, so both adapters hand those props back out: `renderImage` in React, the `image`
slot in Vue.

Spread `props` onto your element, and apply the class and `data-slot="image"` too, or
theme overrides will miss it. Honour `hidden` yourself. Ark hides the image until it
loads, and a component that drops the attribute needs `visibility` applied instead.

---
name: Editable
key: editable
module: editable
summary: Text that turns into a field where it stands.
---

The input and the preview stack in one grid cell and Ark hides whichever is not
showing, so the field never moves when it is entered. The buttons swap with the
edit state, which only Ark's context knows: pencil at rest, check and cross while
editing.

```tsx
<Editable label="Name" defaultValue="Ada Lovelace" />
```

```vue
<Editable label="Name" default-value="Ada Lovelace" />
```

`activationMode` decides what touch starts editing, `submitMode` decides what
commits it, and the committed text arrives through `onValueChange` in React and
`v-model` in Vue.

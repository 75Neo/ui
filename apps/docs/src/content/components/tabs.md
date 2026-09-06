---
name: Tabs
key: tabs
module: tabs
summary: Triggers and panels, as pills or as links.
---

Pass the tabs and the component renders triggers over panels. A pill keeps its
indicator behind the selected trigger; a link draws a rule under it, tinted with
the color. Either way the indicator snaps — positional transitions never ship.

```tsx
<Tabs
  items={[
    { value: "account", label: "Account", content: "Make changes here." },
    { value: "password", label: "Password", content: "Change it here." },
  ]}
/>
```

```vue
<Tabs
  :items="[
    { value: 'account', label: 'Account', content: 'Make changes here.' },
    { value: 'password', label: 'Password', content: 'Change it here.' },
  ]"
/>
```

Anything richer than strings composes `TabsTrigger` and `TabsContent` directly, each
naming its tab by `value`. The selected value arrives through `onValueChange` in
React and `v-model` in Vue.

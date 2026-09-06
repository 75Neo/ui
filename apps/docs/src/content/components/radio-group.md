---
name: RadioGroup
key: radioGroup
module: radio-group
summary: One choice out of several, each with room for a second line.
---

Pass the options and the group maps them to rows. Each row is a control, a dot that
fades in when checked, and text with an optional second line.

```tsx
<RadioGroup
  items={[
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS" },
  ]}
  legend="Notify me"
/>
```

```vue
<RadioGroup
  :items="[
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
  ]"
  legend="Notify me"
/>
```

Orientation styles off the attribute Ark sets rather than a variant, and the legend
hides itself in a horizontal row — a heading above a wrap names nothing. The choice
arrives through `onValueChange` in React and `v-model` in Vue.

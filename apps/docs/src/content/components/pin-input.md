---
name: PinInput
key: pinInput
module: pin-input
summary: One box per character for codes and OTPs.
---

`length` draws the boxes and reaches Ark's ARIA, so a screen reader knows which box
is which. Each box takes the index it sits at; there is no part that renders them
for you.

```tsx
<PinInput label="Code" length={6} />
```

```vue
<PinInput label="Code" :length="6" />
```

The value is an array of characters in both frameworks. `type` decides what a box
accepts, `otp` tells the browser a one-time code is coming, and `mask` hides each
character the way a password field does.

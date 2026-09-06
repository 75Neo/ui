---
name: PasswordInput
key: passwordInput
module: password-input
summary: A secret field with a visibility toggle.
---

The field is uncontrolled: there is no value prop, because Ark's root takes none.
The secret shows or hides behind the trigger, and Ark swaps the glyph itself — the
adapter never reads the state.

```tsx
<PasswordInput label="Password" />
```

```vue
<PasswordInput label="Password" />
```

`visibleIcon` and `hiddenIcon` replace the two glyphs, `leadingIcon` puts a lock
before the field, and `defaultVisible` starts the secret shown. Password managers
stay out unless invited.

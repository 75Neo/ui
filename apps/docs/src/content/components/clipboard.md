---
name: Clipboard
key: clipboard
module: clipboard
summary: A read-only field holding a value and a button that copies it, across three sizes and seven colors.
---

The value is shown rather than hidden behind the button, because the thing a reader is
about to paste is worth reading first. The field is an input rather than a paragraph, so
the text can still be selected a word at a time.

```tsx
<Clipboard value="pnpm add @75neo/react" />
<Clipboard label="Registry URL" value="https://75neo.dev/r/button.json" color="primary" />
```

```vue
<Clipboard value="pnpm add @75neo/vue" />
<Clipboard label="Registry URL" value="https://75neo.dev/r/button.json" color="primary" />
```

The install command at the top of this site's setup guide is this component.

### The copied state

Copying swaps the icon for a check and swaps it back after `timeout`, three seconds by
default. That is the whole confirmation: no color changes, so the component spends no
extra strength on a state that lasts three seconds.

`copyIcon` and `copiedIcon` replace either icon. In Vue the `copyIcon` and `copiedIcon`
slots take arbitrary markup and win over the props of the same name.

### The value

`value` is required and one-way. Ark takes a controlled value, but nothing inside the
component writes one back, because the field is read-only. Passing a new `value` is the
only thing that changes what gets copied.

Ark spells it `modelValue` in Vue and `value` in React. The adapter maps the shared
prop onto whichever the framework wants, so `value` is the name in both.

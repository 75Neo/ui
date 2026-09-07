---
title: Field
description: Labels, helper text and error text wired to one control.
category: Forms
registryItem: field
---

## Installation

```sh
npx shadcn@latest add @75neo/field
```

```sh
npx shadcn-vue@latest add @75neo/field
```

## Usage

```tsx
<Field required>
  <FieldLabel>
    Registry URL
    <FieldRequiredIndicator>*</FieldRequiredIndicator>
  </FieldLabel>
  <FieldInput placeholder="https://75neo-ui.pages.dev/r/vue/{name}.json" />
  <FieldHelperText>The CLI reads this from your components.json.</FieldHelperText>
</Field>
```

```vue
<template>
  <Field required>
    <FieldLabel>
      Registry URL
      <FieldRequiredIndicator>*</FieldRequiredIndicator>
    </FieldLabel>
    <FieldInput placeholder="https://75neo-ui.pages.dev/r/vue/{name}.json" />
    <FieldHelperText>The CLI reads this from your components.json.</FieldHelperText>
  </Field>
</template>
```

## What it does for you

The field generates the ids and wires `htmlFor`, `aria-describedby` and `aria-invalid` between the
label, the control and whichever of the helper and error text is present. That is the part everyone
forgets, and it is the reason to reach for this rather than a label and an input side by side.

`disabled`, `invalid`, `readOnly` and `required` set on the field reach every part inside it, so
one prop moves the label colour, the ring and the native attribute together.

## With the other inputs

The field also provides context to the other form components in this registry. Wrap a
[number input](/docs/components/number-input) or a [slider](/docs/components/slider) in a field and
they pick up its disabled and invalid state without being told twice.

## Error text

`FieldErrorText` renders only while the field is invalid, so it can stay in the tree and does not
need a conditional of its own. Say what to do rather than what went wrong.

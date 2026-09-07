---
title: Checkbox
description: A three state checkbox with a label, over a real hidden input.
category: Forms
registryItem: checkbox
---

## Installation

```sh
npx shadcn@latest add @75neo/checkbox
```

```sh
npx shadcn-vue@latest add @75neo/checkbox
```

## Usage

```tsx
<Checkbox name="terms" defaultChecked>
  <CheckboxControl>
    <CheckboxIndicator>
      <Check />
    </CheckboxIndicator>
  </CheckboxControl>
  <CheckboxLabel>Accept the terms</CheckboxLabel>
  <CheckboxHiddenInput />
</Checkbox>
```

```vue
<template>
  <Checkbox name="terms" default-checked>
    <CheckboxControl>
      <CheckboxIndicator>
        <Check />
      </CheckboxIndicator>
    </CheckboxControl>
    <CheckboxLabel>Accept the terms</CheckboxLabel>
    <CheckboxHiddenInput />
  </Checkbox>
</template>
```

## Anatomy

| Part                  | Element | Role                                                   |
| --------------------- | ------- | ------------------------------------------------------ |
| `Checkbox`            | `label` | Wraps the whole control so the label text is clickable |
| `CheckboxControl`     | `div`   | The box that draws the state                           |
| `CheckboxIndicator`   | `div`   | Holds the tick, hidden while unchecked                 |
| `CheckboxLabel`       | `span`  | The text                                               |
| `CheckboxHiddenInput` | `input` | The real input a form submits                          |

Keep the hidden input in the tree. It is what carries `name` and `value` into a form submission
and what native validation attaches to.

## Three states

`checked` takes `true`, `false` or `"indeterminate"`, which is the state a parent checkbox sits in
when only some of its children are ticked. Render a different glyph for it rather than leaving the
box empty, since an empty box reads as "none selected".

## Sizes

`size` accepts `sm`, `md` and `lg`, and moves the box and the label text together.

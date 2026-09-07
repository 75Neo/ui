---
title: Editable
description: Text that turns into an input when you click or focus it.
category: Forms
registryItem: editable
---

## Installation

```sh
npx shadcn@latest add @75neo/editable
```

```sh
npx shadcn-vue@latest add @75neo/editable
```

## Usage

```tsx
<Editable defaultValue="Primary action" placeholder="Name this component">
  <EditableLabel>Component title</EditableLabel>
  <EditableArea>
    <EditablePreview />
    <EditableInput />
  </EditableArea>
  <EditableControl>
    <EditableEditTrigger>Edit</EditableEditTrigger>
    <EditableSubmitTrigger>Save</EditableSubmitTrigger>
    <EditableCancelTrigger>Cancel</EditableCancelTrigger>
  </EditableControl>
</Editable>
```

```vue
<template>
  <Editable default-value="Primary action" placeholder="Name this component">
    <EditableLabel>Component title</EditableLabel>
    <EditableArea>
      <EditablePreview />
      <EditableInput />
    </EditableArea>
    <EditableControl>
      <EditableEditTrigger>Edit</EditableEditTrigger>
      <EditableSubmitTrigger>Save</EditableSubmitTrigger>
      <EditableCancelTrigger>Cancel</EditableCancelTrigger>
    </EditableControl>
  </Editable>
</template>
```

The three triggers swap themselves: the edit trigger shows while reading and the submit and cancel
pair while editing, so all three can sit in the tree unconditionally.

## Entering and leaving

`activationMode` picks what starts an edit: `click`, `dblclick`, `focus` or `none` when only the
edit button should. `submitMode` picks what ends it: `enter`, `blur`, both, or neither.

Pair a click activation with an enter submit for a title in a list. Pair a double click activation
with an explicit save for anything where an accidental edit would be costly.

Escape always cancels and restores the previous value, whatever the modes are.

## Sizing

`autoResize` grows the input to fit its content, which keeps the text from jumping when the preview
turns into a field. Without it the input takes its own width and the swap is visible.

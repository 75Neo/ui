---
title: Toggle Group
description: A row of toggles that share one selection, single or multiple.
category: Actions
registryItem: toggle-group
---

## Usage

```tsx
<ToggleGroup defaultValue={["center"]}>
  <ToggleGroupItem value="left" aria-label="Align left">
    <AlignLeft className="size-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align centre">
    <AlignCenter className="size-4" />
  </ToggleGroupItem>
</ToggleGroup>
```

```vue
<template>
  <ToggleGroup :default-value="['center']">
    <ToggleGroupItem value="left" aria-label="Align left">
      <AlignLeft class="size-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="center" aria-label="Align centre">
      <AlignCenter class="size-4" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>
```

## One or several

The value is a list in both modes. Without `multiple` the list holds at most one entry, which keeps
the controlled prop the same shape whichever mode you are in. `deselectable` decides whether
clicking the pressed item clears it.

## Focus

`rovingFocus` is on by default, so the group is one tab stop and the arrow keys move within it.
That is the right behaviour for a formatting toolbar. Turn it off when the items are far enough
apart that the user would not expect them to be one control.

## Sizes

`size` on the root sets the height, the padding and the text size for every item, so the group
stays even without sizing each one.

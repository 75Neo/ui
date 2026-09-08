---
title: Listbox
description: An always visible list of options with typeahead and multi select.
category: Forms
registryItem: listbox
---

## Usage

```vue
<template>
  <Listbox :collection="collection" selection-mode="multiple" :default-value="['button']">
    <ListboxLabel>Items to install</ListboxLabel>
    <ListboxContent>
      <ListboxItem v-for="item in collection.items" :key="item.value" :item="item">
        <ListboxItemText>{{ item.label }}</ListboxItemText>
        <ListboxItemIndicator>
          <Check />
        </ListboxItemIndicator>
      </ListboxItem>
    </ListboxContent>
  </Listbox>
</template>
```

## Against the select

A listbox is the same list without the trigger. Use it when the options should be visible without
an interaction: a short set of choices in a panel, or a picker that fills a whole column.

## Selection modes

`selectionMode` takes `single`, `multiple`, `extended` or `none`. `extended` is the file manager
behaviour, where shift picks a range and the modifier key adds one at a time. `none` leaves the
list navigable but not selectable, which is what you want when highlighting alone drives a preview.

`selectOnHighlight` commits as the arrow keys move, which suits a live preview and is wrong for
anything with a cost.

## Filtering

`ListboxInput` filters the list from what is typed. Pair it with `ListboxEmpty`, which renders only
when nothing matches, so the empty case does not need a conditional of your own.

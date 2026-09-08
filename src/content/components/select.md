---
title: Select
description: A trigger that opens a list of options and reports the chosen one.
category: Forms
registryItem: select
---

## Installation

```sh
npx shadcn@latest add @75neo/select
```

```sh
npx shadcn-vue@latest add @75neo/select
```

## Usage

The options come from a collection rather than from the markup, so the machine can do typeahead and
keyboard navigation without walking the DOM.

```tsx
const collection = createListCollection({
  items: [
    { label: "Blue", value: "blue" },
    { label: "Teal", value: "teal" },
  ],
});

<Select collection={collection} defaultValue={["teal"]}>
  <SelectLabel>Primary colour</SelectLabel>
  <SelectControl>
    <SelectTrigger>
      <SelectValueText placeholder="Pick a colour" />
      <SelectIndicator>
        <ChevronDown />
      </SelectIndicator>
    </SelectTrigger>
  </SelectControl>

  <SelectPositioner>
    <SelectContent>
      <SelectList>
        {collection.items.map((item) => (
          <SelectItem key={item.value} item={item}>
            <SelectItemText>{item.label}</SelectItemText>
            <SelectItemIndicator>
              <Check />
            </SelectItemIndicator>
          </SelectItem>
        ))}
      </SelectList>
    </SelectContent>
  </SelectPositioner>
  <SelectHiddenSelect />
</Select>;
```

```vue
<template>
  <Select :collection="collection" :default-value="['teal']">
    <SelectLabel>Primary colour</SelectLabel>
    <SelectControl>
      <SelectTrigger>
        <SelectValueText placeholder="Pick a colour" />
        <SelectIndicator>
          <ChevronDown />
        </SelectIndicator>
      </SelectTrigger>
    </SelectControl>

    <SelectPositioner>
      <SelectContent>
        <SelectList>
          <SelectItem v-for="item in collection.items" :key="item.value" :item="item">
            <SelectItemText>{{ item.label }}</SelectItemText>
            <SelectItemIndicator>
              <Check />
            </SelectItemIndicator>
          </SelectItem>
        </SelectList>
      </SelectContent>
    </SelectPositioner>
    <SelectHiddenSelect />
  </Select>
</template>
```

## The collection

`createListCollection` takes your items and, if they are not already shaped as `label` and `value`,
the functions that read those out of them. Everything else reads from the collection: the value
text, the typeahead, the disabled state of an item.

## The value is a list

Single or multiple, `value` is an array. `multiple` lets more than one entry in and `deselectable`
decides whether clicking the selected option clears it.

## Against the native select

A native `select` cannot be styled inside its list, and that is the only reason to reach for this.
Everything else about the native one is better, so keep `SelectHiddenSelect` in the tree: it is
what carries the value into a form and gives the browser something real to autofill.

## Width

The content sizes itself to the trigger through the `--reference-width` property the positioner
sets. Give the content a class if you want it wider than the control it hangs from.

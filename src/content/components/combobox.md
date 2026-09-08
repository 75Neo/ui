---
title: Combobox
description: A text field that filters a list and commits one of its options.
category: Forms
registryItem: combobox
---

## Usage

The list is filtered by you, in response to what was typed. `useListCollection` gives you a
collection and a filter function that does the usual matching.

```vue
<script setup lang="ts">
const { collection, filter } = useListCollection({ initialItems: components });
</script>

<template>
  <Combobox :collection="collection" @input-value-change="filter($event.inputValue)">
    <ComboboxLabel>Find a component</ComboboxLabel>
    <ComboboxControl>
      <ComboboxInput placeholder="Start typing" />
      <ComboboxTrigger aria-label="Open">
        <ChevronDown />
      </ComboboxTrigger>
    </ComboboxControl>

    <ComboboxPositioner>
      <ComboboxContent>
        <ComboboxEmpty>Nothing matches that.</ComboboxEmpty>
        <ComboboxList>
          <ComboboxItem v-for="item in collection.items" :key="item" :item="item">
            <ComboboxItemText>{{ item }}</ComboboxItemText>
          </ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </ComboboxPositioner>
  </Combobox>
</template>
```

## Against the select

Reach for a combobox when the list is long enough that scrolling it is worse than typing at it.
Under about a dozen options a [select](/docs/components/select) is calmer, because it does not ask
the person to guess what the field will accept.

## Custom values

`allowCustomValue` lets the input commit text that is not in the list, which turns the combobox
into a field with suggestions rather than a picker. Without it, anything unmatched is discarded on
blur.

## Input behaviour

`inputBehavior` chooses what happens as you type. `autohighlight` marks the first match so enter
takes it. `autocomplete` fills the rest of the match inline. `none` leaves the input alone, which
is the right default when custom values are allowed.

## Asynchronous lists

The filtering is yours, so the items can come from anywhere. Fetch on `inputValueChange`, replace
the collection when the response lands, and use `ComboboxEmpty` for both the no results and the
still loading case.

---
title: Tags Input
description: A field that turns what you type into removable, editable tags.
category: Forms
registryItem: tags-input
---

## Installation

```sh
npx shadcn@latest add @75neo/tags-input
```

```sh
npx shadcn-vue@latest add @75neo/tags-input
```

## Usage

The items come from the current value, so read it from the context component rather than keeping a
copy of your own.

```vue
<template>
  <TagsInput editable :default-value="['button', 'table']">
    <TagsInputControl>
      <TagsInputContext v-slot="tags">
        <TagsInputItem
          v-for="(value, index) in tags.value"
          :key="value"
          :index="index"
          :value="value"
        >
          <TagsInputItemPreview>
            <TagsInputItemText>{{ value }}</TagsInputItemText>
            <TagsInputItemDeleteTrigger aria-label="Remove">
              <X />
            </TagsInputItemDeleteTrigger>
          </TagsInputItemPreview>
          <TagsInputItemInput />
        </TagsInputItem>
      </TagsInputContext>

      <TagsInputInput placeholder="Add an item" />
    </TagsInputControl>
    <TagsInputHiddenInput />
  </TagsInput>
</template>
```

## Adding and editing

Enter commits what is typed. `delimiter` adds a second character that does the same, usually a
comma, and `addOnPaste` splits a pasted list on it. `editable` lets a double click turn a tag back
into an input, which is what `TagsInputItemInput` is for.

## Limits

`max` caps how many tags there can be. `allowOverflow` decides whether going past it is blocked
outright or allowed and marked invalid, which is friendlier when the person is pasting a list they
will then trim.

`allowDuplicates` is off by default, so a repeat is rejected rather than silently added twice.

## Backspace

An empty input plus backspace highlights the last tag, and a second backspace deletes it. That two
step is deliberate, so a stray keypress does not lose work.

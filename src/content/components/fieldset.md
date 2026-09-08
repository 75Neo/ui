---
title: Fieldset
description: A group of related fields with one legend and one disabled state.
category: Forms
registryItem: fieldset
---

## Installation

```sh
npx shadcn@latest add @75neo/fieldset
```

```sh
npx shadcn-vue@latest add @75neo/fieldset
```

## Usage

```vue
<template>
  <Fieldset>
    <FieldsetLegend>Registry</FieldsetLegend>
    <FieldsetHelperText>Both values go into your components.json.</FieldsetHelperText>

    <Field>
      <FieldLabel>Namespace</FieldLabel>
      <FieldInput />
    </Field>
  </Fieldset>
</template>
```

## Against the field

A [field](/docs/components/field) wraps one control. A fieldset wraps several that belong together,
and it renders the real `fieldset` and `legend` elements, so a screen reader announces the group
name before each control inside it.

Setting `disabled` on the fieldset disables everything in it, including controls that are not from
this registry, because that is native behaviour rather than something we pass down.

## When to reach for one

Use it when a group needs a name that is not a heading: an address, a date split across three
inputs, a set of radios. A form with one obvious purpose does not need a fieldset around all of it.

---
title: Switch
description: An on and off control that commits its change immediately.
category: Forms
registryItem: switch
---

## Usage

```tsx
<Switch name="notifications" defaultChecked>
  <SwitchControl>
    <SwitchThumb />
  </SwitchControl>
  <SwitchLabel>Email me about releases</SwitchLabel>
  <SwitchHiddenInput />
</Switch>
```

```vue
<template>
  <Switch name="notifications" default-checked>
    <SwitchControl>
      <SwitchThumb />
    </SwitchControl>
    <SwitchLabel>Email me about releases</SwitchLabel>
    <SwitchHiddenInput />
  </Switch>
</template>
```

## Against the checkbox

A switch takes effect the moment it moves. A checkbox waits for a submit. If your form has a save
button, the rows inside it are checkboxes, not switches, however much nicer the switch looks.

Label a switch with the thing it turns on, not with a question. "Email me about releases" reads
correctly in both positions; "Send email?" does not.

## Sizes

`size` accepts `sm`, `md` and `lg`. The thumb travel is derived from the track, so the three sizes
stay in proportion without any per size positioning.

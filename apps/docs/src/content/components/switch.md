---
name: Switch
key: switch
module: switch
order: 15
summary: A track the thumb slides along, across five sizes and seven colors, with a label, a description and an icon per state.
---

A switch is a track, a thumb that slides along it, and the text beside it. Like the
Checkbox it is one component rather than a control and a label wired together by hand,
so clicking the text flips the switch with no `for` attribute to keep in sync.

```tsx
<Switch label="Airplane mode" />
<Switch label="Weekly digest" description="One email on Monday." color="success" />
```

```vue
<Switch label="Airplane mode" />
<Switch label="Weekly digest" description="One email on Monday." color="success" />
```

Reach for it over a Checkbox when the change takes effect immediately. A checkbox states
an intention that something else will act on, usually a form being submitted; a switch is
the action.

### On and off

Neither state is a recipe variant. Ark writes `data-state` on the control and on the
thumb, and the recipe styles itself off that attribute, so one resolved class string
covers both states and flipping a switch never re-resolves it.

React takes `checked` with `onCheckedChange`, or `defaultChecked` to leave the state
alone. Vue takes `v-model:checked`, with `defaultChecked` as the uncontrolled
counterpart.

```tsx
const [enabled, setEnabled] = useState(false);

<Switch
  label={enabled ? "On" : "Off"}
  checked={enabled}
  onCheckedChange={(details) => setEnabled(details.checked)}
/>;
```

```vue
<script setup lang="ts">
const enabled = ref(false);
</script>

<template>
  <Switch v-model:checked="enabled" :label="enabled ? 'On' : 'Off'" />
</template>
```

### The thumb's two icons

`checkedIcon` and `uncheckedIcon` ride the thumb, and both stay mounted. The recipe hides
whichever the state does not call for, rather than the component picking one, because an
uncontrolled switch never tells the component which state it is in.

```tsx
<Switch label="Theme" checkedIcon={<Moon />} uncheckedIcon={<Sun />} />
```

```vue
<Switch label="Theme" :checked-icon="Moon" :unchecked-icon="Sun" />
```

Passing only one is fine. The other side of the flip then shows a plain thumb.

### While something is in flight

`loading` spins whichever icon the thumb is showing and stops the switch responding, so
a change that has to reach a server can show that it has not landed yet. `loadingIcon`
replaces the spinner. Both icon slots hold it, and the recipe still shows the one the
state calls for.

```tsx
<Switch label="Saving" checked={enabled} loading />
```

```vue
<Switch v-model:checked="enabled" label="Saving" loading />
```

### In a form

The switch renders a real hidden checkbox, so `name` and `value` submit with the form
around it and `form` associates one rendered outside it. `required` and `invalid` mark it
the way the Checkbox does, and `invalid` draws the track's ring in the error color
whatever the switch's own color is.

### Sizes line up on their own

Every size is the same three numbers. The track is the thumb plus its padding on both
sides, and the thumb travels what is left. That is why a switch never has to be told how
far to move, and why `size` alone keeps the geometry right.

The track's own alignment is worth knowing about: `container` gives it a box of the
label's line height, so the switch lines up with the first line of a label rather than
with the top of a two-line block with a description under it.

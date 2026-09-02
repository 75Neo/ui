---
name: DatePicker
key: datePicker
module: date-picker
order: 13
summary: A field with a calendar behind it, taking one date, several, or a range, across three sizes and seven accents.
---

A date picker is a text field with a calendar behind it. The field takes a date typed out;
the calendar takes one chosen from a grid, which is what a reader wants when the answer
depends on the day of the week or on what is nearby.

```tsx
<DatePicker label="Due" defaultValue={parseDate(["2026-03-14"])} />
```

```vue
<DatePicker label="Due" :default-value="parseDate(['2026-03-14'])" />
```

### The value is a DateValue, not a string

The picker holds `DateValue` objects rather than strings. `parseDate` builds them from ISO
strings or `Date` objects and is re-exported from both adapters, so reaching for it does
not mean adding Ark UI to your own dependencies.

It is always an array, whatever the selection mode: one entry for a single date, two for a
range, as many as were picked for a multiple selection. One shape beats converting between
three.

React takes `value` with `onValueChange`, or `defaultValue` to leave the state alone. Vue
takes `v-model`, with `defaultValue` as the uncontrolled counterpart.

```tsx
const [date, setDate] = useState(() => parseDate(["2026-03-14"]));

<DatePicker value={date} onValueChange={(details) => setDate(details.value)} />;
```

```vue
<script setup lang="ts">
import { DatePicker, parseDate } from "@75neo/vue";

const date = ref(parseDate(["2026-03-14"]));
</script>

<template>
  <DatePicker v-model="date" />
</template>
```

### Three ways to select

`selectionMode` is `"single"`, `"multiple"` or `"range"`. A range draws two fields with a
separator between them and tints the days between the endpoints; `rangeSeparator` replaces
the en dash. A multiple selection keeps the calendar open, since `closeOnSelect` cannot
know when a reader is finished.

The field shows one date per input, which is one for a single selection and two for a
range. A multiple selection has no fixed number of them, so the field shows the first
date and the calendar is where the rest are read. Render the value alongside it if the
whole list has to be visible.

```tsx
<DatePicker label="Stay" selectionMode="range" />
```

```vue
<DatePicker label="Stay" selection-mode="range" />
```

### Three views, one grid

The heading between the arrows is a button. Pressing it climbs from days to months, and
again to years, which is how a reader reaches a date eight decades back without pressing
the arrow ninety-six times. All three views are one table, one header row and one cell
trigger, so a theme that restyles `tableCellTrigger` restyles the calendar rather than a
third of it. Each view carries `data-view` for the cases where they should differ.

`numOfMonths` shows several months side by side, `fixedWeeks` always draws six weeks so
the popup does not change height between months, and `startOfWeek` overrides the locale's
first day.

### The bounds

`min` and `max` refuse a date outside them, and `isDateUnavailable` refuses one your own
rule rejects, such as a weekend or a day already booked. An unavailable day is struck
through rather than hidden, so a reader can tell "not this one" from "not shown". Both are
adapter props rather than shared ones, because they are `DateValue` and that type comes
from each framework's own copy of Ark.

### Where the calendar lives

The calendar is rendered at the end of the document rather than where the component is
written, so a card, a dialog or a toolbar that clips its overflow cannot cut it off. The
move is delayed until the component mounts, which keeps the server-rendered markup and the
first client render identical. The `positioner` slot carries the stacking context, and
`ui.positioner` is where to raise it above something.

### Forms

The component renders a hidden input, so a picker inside a `form` submits like any other
field. `name` names it. `required` and `invalid` do what they do on any input, and
`readOnly` shows a date without letting anyone change it, which is different from
`disabled`: a read-only field still takes focus.

---
name: DateInput
key: dateInput
module: date-input
summary: A date typed a segment at a time, with no format to explain, across three sizes and seven accents.
---

A date input is a date typed one part at a time. The year, the month and the day are each
their own focusable element, taking digits, arrow keys and page keys, so there is no free
text to parse and no format to explain. A reader cannot type February the thirtieth.

```tsx
<DateInput label="Published" defaultValue={parseDate(["2026-03-14"])} />
```

```vue
<DateInput label="Published" :default-value="parseDate(['2026-03-14'])" />
```

### The value is a DateValue, not a string

The field holds `DateValue` objects rather than strings, because a segment is arithmetic
on a calendar and a string would be reparsed on every keystroke. `parseDate` builds them
from ISO strings or `Date` objects and is re-exported from both adapters, so reaching for
it does not mean adding Ark UI to your own dependencies.

It is always an array, one entry long unless the field is a range. One shape for both
selection modes beats converting between them.

React takes `value` with `onValueChange`, or `defaultValue` to leave the state alone. Vue
takes `v-model`, with `defaultValue` as the uncontrolled counterpart. Both change handlers
receive the dates twice over: `value` is the objects, and `valueAsString` is them written
out.

```tsx
const [date, setDate] = useState(() => parseDate(["2026-03-14"]));

<DateInput value={date} onValueChange={(details) => setDate(details.value)} />;
```

```vue
<script setup lang="ts">
import { DateInput, parseDate } from "@75neo/vue";

const date = ref(parseDate(["2026-03-14"]));
</script>

<template>
  <DateInput v-model="date" />
</template>
```

### The segments are not fixed

How many segments there are, and what order they come in, is decided by `granularity` and
`locale`. A `"day"` field asks for three parts; `"minute"` asks for five. `"en-US"` puts
the month first and separates with slashes; `"de-DE"` puts the day first and separates
with dots. Nothing in the recipe names a day segment or a month segment, only a segment,
for exactly that reason.

`shouldForceLeadingZeros` pads the month, day and hour to two digits rather than following
the locale, for a field that has to line up in a column.

### Ranges

`selectionMode="range"` draws two sets of segments with a separator between them, and the
value grows to two entries. `rangeSeparator` replaces the en dash.

```tsx
<DateInput label="Stay" selectionMode="range" />
```

```vue
<DateInput label="Stay" selection-mode="range" />
```

### The bounds

`min` and `max` refuse a date outside them, and `isDateUnavailable` refuses one your own
rule rejects, such as a weekend or a date already taken. Both are adapter props rather than
shared ones, because they are `DateValue` and that type comes from each framework's own
copy of Ark.

### Forms

The component renders a hidden input per date, so a field inside a `form` submits like any
other. `name` names it. `required` and `invalid` do what they do on any input, and
`readOnly` shows a date without letting anyone change it, which is different from
`disabled`: a read-only field still takes focus.

### When to reach for the DatePicker instead

This component has no calendar. That is the point: a birth date or a well-known date is
faster typed than found in a grid. Reach for the DatePicker when the reader is choosing
rather than recalling, and needs to see the days of the week to do it.

---
name: DatePicker
key: datePicker
module: date-picker
summary: A field with a calendar behind it, taking one date or a range.
---

Day, month and year grids share one view control: the month name with two arrows
around it. The trigger in the middle climbs a view on every press, which is how a
reader reaches a year eight decades back without pressing the arrow ninety-six
times.

```tsx
<DatePicker label="Birthday" placeholder="Pick a date" />
```

```vue
<DatePicker label="Birthday" placeholder="Pick a date" />
```

A range is two dates and so two fields, each editable on its own. Date values are
Ark's `DateValue` in both frameworks — the package re-exports the type and
`parseDate`, so callers add no new dependency for them. The calendar portals to the
body, so no ancestor's overflow can clip it.

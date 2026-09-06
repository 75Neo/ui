---
name: DateInput
key: dateInput
module: date-input
summary: A date typed a segment at a time, with no format to explain.
---

One group per date, so a range is two of them. A literal segment's text is rewritten
on the way in, because ICU's idea of the space before AM and PM differs between the
runtime that renders the page and the one that hydrates it — both adapters call the
same helper so the two runs agree.

```tsx
<DateInput label="Birthday" />
```

```vue
<DateInput label="Birthday" />
```

`granularity` decides whether time segments appear at all. Like its sibling, the
field trades in Ark's `DateValue` in both frameworks.

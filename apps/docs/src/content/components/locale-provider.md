---
name: LocaleProvider
key: localeProvider
module: locale-provider
summary: The locale and the reading direction, published to a page.
---

One of these wraps an application and does two things no component below it can do for
itself: it tells Ark which locale to format dates and numbers in, and it writes the
reading direction onto the DOM where every `rtl:` utility in the library can read it.
Ark keeps its own direction in context, where Tailwind cannot see it.

```tsx
<LocaleProvider locale="ar-EG">
  <App />
</LocaleProvider>
```

```vue
<LocaleProvider locale="ar-EG">
  <App />
</LocaleProvider>
```

The direction follows from the locale. Pass `dir` to override it for a page that mixes
the two or has already decided elsewhere.

`isolate` is the whole of its styling. It opens a stacking context, so the Header and
the Sidebar are ordered against each other and against nothing else on the page.
Anything that must escape the ordering is portalled to the body and is outside this
element to begin with, which is why a Dialog still covers a Header.

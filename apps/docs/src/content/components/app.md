---
name: App
key: app
module: app
summary: The element an application is wrapped in, publishing a theme, a locale, and the reading direction every right-to-left utility depends on.
---

One of these goes at the top of an application. It does three things nothing below it
can do for itself: it publishes a theme, it tells Ark UI which locale to format dates and
numbers in, and it writes the reading direction onto the DOM where the `rtl:` utilities
inside every recipe can see it.

```tsx
<App locale="en-US" theme={{ button: { ui: { base: "rounded-full" } } }}>
  <Header title="Acme" />
  <Main>{children}</Main>
  <Footer />
</App>
```

```vue
<App locale="en-US" :theme="{ button: { ui: { base: 'rounded-full' } } }">
  <Header title="Acme" />
  <Main><slot /></Main>
  <Footer />
</App>
```

### It is not the same thing as Theme, and both exist

`Theme` restyles a subtree and nests, so one section of a page can look different from
the rest of it. The App is the one at the top, and adds the locale and the direction
that only make sense once. An App with no `theme` publishes nothing and leaves any
`Theme` above it alone.

The theme an App publishes reaches the App itself, so `theme.app` restyles its own root
element. That is worth knowing because it is not how a component normally works: every
other component reads the theme above it, and this one reads the theme it just made.

### Direction

`locale` is a BCP 47 tag. The direction is derived from it — Arabic, Hebrew, Persian,
Urdu and the rest read right to left — and written to the root element as `dir`, which
is what Tailwind's `rtl:` variant matches on. Ark derives its own direction from the same
tag and keeps it in context, where a utility cannot reach it, so the App writes it out.

`dir` overrides the derivation, for a page that mixes the two or has already decided
elsewhere.

```tsx
<App locale="ar-EG" />
<App locale="ar-EG" dir="ltr" />
```

```vue
<App locale="ar-EG" />
<App locale="ar-EG" dir="ltr" />
```

### The root element

The one class is `isolate`, which opens a stacking context. The Header's `z-50` and the
Sidebar's `z-10` are then ordered against each other and against nothing else on the
page. Anything that has to escape that ordering is portalled to the body and is outside
this element to begin with, which is why a Dialog still covers a Header.

No height is set. A page that wants one puts it on the Main, which is the component that
knows what the Header leaves behind.

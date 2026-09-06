---
name: Sidebar
key: sidebar
module: sidebar
summary: A column beside the page that collapses, and slides in over it.
---

Two elements do the work. The panel is what people see and it is fixed, so a long body
scrolls under a header that stays put. A spacer in normal flow is exactly as wide as
the panel, so the content beside it starts in the right place.

```tsx
<Sidebar title="75NeoUI" collapsible="icon" rail>
  <Nav />
</Sidebar>
```

```vue
<Sidebar title="75NeoUI" collapsible="icon" rail>
  <Nav />
</Sidebar>
```

`collapsible` decides what collapsing means: `offcanvas` takes the whole column away,
`icon` leaves a strip wide enough for the icons in the body, and `none` never collapses
and puts the sidebar back into normal flow. `variant` sets how the surface sits against
the page, and `rail` draws the strip along the outer edge that toggles it.

One state serves both viewports. Entering the narrow one remembers where the wide one
was and closes the panel; leaving it puts the remembered value back. Without that, a
sidebar expanded by design would cover a phone's content the moment the page loaded.

There is one width and one collapsed width, both custom properties on the root, so a
call-site class can redefine either.

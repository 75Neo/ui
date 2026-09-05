---
name: Sidebar
key: sidebar
module: sidebar
summary: A collapsing column beside the page across three looks and three collapse modes, sliding in over the page on a phone.
---

A column beside the page that collapses to a strip or disappears, and slides in over the
page where there is no room beside it.

```tsx
<div className="flex">
  <Sidebar title="Acme" description="Workspace" close rail footer={<Account />}>
    <Nav />
  </Sidebar>
  <Main>{children}</Main>
</div>
```

```vue
<div class="flex">
  <Sidebar title="Acme" description="Workspace" close rail>
    <Nav />
    <template #footer><Account /></template>
  </Sidebar>
  <Main><slot /></Main>
</div>
```

The default slot is the body, not a trigger. A Sidebar has no trigger — it is part of the
page rather than something summoned onto it — so the default slot goes to the one region
that is always there.

### Two elements, and which is which

The panel people see is `fixed`, so a long page scrolls under a sidebar that stays put
and the sidebar's own body scrolls independently. Beside it, an empty spacer in normal
flow is exactly as wide as the panel, and that is what keeps the page content from
starting underneath it. Collapsing animates both, and they have to agree.

There is one width, `--sidebar-width`, and one collapsed width, `--sidebar-width-icon`,
both declared on the root. A `class` can redefine either without touching the recipe.

```tsx
<Sidebar className="[--sidebar-width:20rem]" />
```

```vue
<Sidebar class="[--sidebar-width:20rem]" />
```

### Collapsing

`collapsible` decides what collapsing means. `offcanvas` takes the whole column away,
`icon` leaves a strip wide enough for the icons in the body, and `none` never collapses
and puts the sidebar back into normal flow.

`variant` decides how the surface sits against the page: `sidebar` is flush against it,
`floating` lifts a rounded card off it, and `inset` insets the surface and drops the
rules between its regions.

`side` docks it to the `start` or the `end`, mirroring under a right-to-left locale.

Two controls collapse it, and both are opt-in. `rail` draws a wide hit area with a
hairline in it along the outer edge, from `lg` up. `close` puts a button in the header.

### One state, two viewports

Below `lg` the spacer is hidden and the panel is off-canvas unless it is open. That is
the whole of the narrow behaviour, and the state that drives it is the same one the wide
viewport uses: crossing into the narrow viewport remembers where the wide one was and
closes the panel, and crossing back puts the remembered value back. Without that, a
sidebar expanded by design would cover a phone's content the moment the page loaded.

The state is controllable. React takes `open` with `onOpenChange`, or `defaultOpen` to
leave it alone; Vue takes `v-model:open`.

Nuxt UI reaches for a Slideover on a phone and renders the sidebar's content a second
time inside it. This one keeps a single tree and moves it, so the body's scroll position
and any open disclosure inside it survive a viewport change. The cost is that the narrow
panel is not a focus trap, which is a trade a layout element can afford and a Dialog
cannot.

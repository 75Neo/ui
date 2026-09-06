---
name: FloatingPanel
key: floatingPanel
module: floating-panel
summary: A draggable window with stage controls and resize handles.
---

Pass the heading and the body as data, and the trigger as children. The header
arrives composed — grip, title, stage buttons, cross — and `header` replaces the
whole row when the default is not enough.

```tsx
<FloatingPanel
  title="Notes"
  body="Drag the header, stage the window, pull a corner to resize."
  defaultOpen
>
  <button type="button">Notes</button>
</FloatingPanel>
```

```vue
<FloatingPanel
  title="Notes"
  body="Drag the header, stage the window, pull a corner to resize."
  default-open
>
  <button type="button">Notes</button>
</FloatingPanel>
```

The pixel size reaches Ark as `size`, so the contract names it `panelSize` and the
`sm` in the room stays the variant. `stages` picks which stage buttons to offer,
`close` drops the cross, and the resize handles render on all eight axes whenever
`resizable` is on. Only opacity ever animates.

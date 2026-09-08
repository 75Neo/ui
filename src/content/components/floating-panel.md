---
title: Floating Panel
description: A window that can be dragged, resized, minimised and maximised.
category: Overlays
registryItem: floating-panel
---

## Installation

```sh
npx shadcn@latest add @75neo/floating-panel
```

```sh
npx shadcn-vue@latest add @75neo/floating-panel
```

## Usage

```vue
<template>
  <FloatingPanel :default-size="{ width: 300, height: 200 }">
    <FloatingPanelTrigger as-child>
      <Button variant="outline">Open the inspector</Button>
    </FloatingPanelTrigger>

    <Teleport to="body">
      <FloatingPanelPositioner>
        <FloatingPanelContent>
          <FloatingPanelHeader>
            <FloatingPanelDragTrigger>
              <FloatingPanelTitle>Inspector</FloatingPanelTitle>
            </FloatingPanelDragTrigger>
            <FloatingPanelControl>
              <FloatingPanelStageTrigger stage="minimized"><Minus /></FloatingPanelStageTrigger>
              <FloatingPanelCloseTrigger><X /></FloatingPanelCloseTrigger>
            </FloatingPanelControl>
          </FloatingPanelHeader>
          <FloatingPanelBody>Drag the header to move this.</FloatingPanelBody>
        </FloatingPanelContent>
      </FloatingPanelPositioner>
    </Teleport>
  </FloatingPanel>
</template>
```

## Against the dialog

A [dialog](/docs/components/dialog) blocks the page and expects an answer. A floating panel does
not: it stays out of the way while the person works underneath it, which is the right shape for an
inspector, a chat window or a set of tools.

Because it does not block, do not put a decision in one. There is nothing stopping the person
ignoring it forever.

## Dragging and resizing

The header is the drag handle by default, and `FloatingPanelDragTrigger` narrows that to part of it
when the header also holds controls. `resizable` adds the edge and corner handles, and
`lockAspectRatio` keeps their ratio.

`gridSize` snaps both the position and the size, which is what makes several panels line up instead
of drifting a pixel apart.

## Staging

`FloatingPanelStageTrigger` moves the panel between `minimized`, `maximized` and `default`. The
content reports the current stage, so a minimised panel can show only its header without a
conditional of your own.

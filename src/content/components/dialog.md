---
title: Dialog
description: A modal window that traps focus until it is dismissed.
category: Overlays
registryItem: dialog
---

## Installation

```sh
npx shadcn@latest add @75neo/dialog
```

```sh
npx shadcn-vue@latest add @75neo/dialog
```

## Usage

The panel belongs in a portal so it escapes any ancestor that clips or stacks. React takes Ark's
`Portal`; Vue uses its own `Teleport`.

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Remove the button</Button>
  </DialogTrigger>

  <Portal>
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Remove the button?</DialogTitle>
        <DialogDescription>This deletes the adapter and the recipe.</DialogDescription>
        <DialogCloseTrigger aria-label="Close">
          <X />
        </DialogCloseTrigger>
      </DialogContent>
    </DialogPositioner>
  </Portal>
</Dialog>
```

```vue
<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">Remove the button</Button>
    </DialogTrigger>

    <Teleport to="body">
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Remove the button?</DialogTitle>
          <DialogDescription>This deletes the adapter and the recipe.</DialogDescription>
          <DialogCloseTrigger aria-label="Close">
            <X />
          </DialogCloseTrigger>
        </DialogContent>
      </DialogPositioner>
    </Teleport>
  </Dialog>
</template>
```

## The root renders nothing

`Dialog` is a provider. It holds the machine and renders no element of its own, which is why it
takes no class. Everything visible is a part inside it.

## Trigger and close as your own button

Both triggers accept `asChild`, so wrap a [button](/docs/components/button) and the trigger hands
its behaviour to it instead of rendering a second element. Without `asChild` you get a bare button
that you style yourself.

## Title and description

Ark wires `aria-labelledby` and `aria-describedby` from whichever of `DialogTitle` and
`DialogDescription` are present. A dialog with neither announces as an unlabelled group, so include
at least the title.

## Alert dialogs

`role="alertdialog"` marks a dialog that interrupts, and turns off dismissal by clicking the
backdrop. Use it when discarding the dialog would lose work, and pair it with an explicit cancel
button.

---
title: Toast
description: A queue of short messages that stack in a corner and dismiss themselves.
category: Feedback
registryItem: toast
---

## Installation

```sh
npx shadcn@latest add @75neo/toast
```

```sh
npx shadcn-vue@latest add @75neo/toast
```

## Usage

A toaster is a store rather than a component tree. Create one, render it once near the root of the
application, and call it from anywhere.

```ts
const toaster = createToaster({ placement: "bottom-end", overlap: true, gap: 12 });
```

```vue
<template>
  <Toaster :toaster="toaster" v-slot="toast">
    <Toast>
      <ToastTitle>{{ toast.title }}</ToastTitle>
      <ToastDescription>{{ toast.description }}</ToastDescription>
      <ToastCloseTrigger aria-label="Dismiss">
        <X />
      </ToastCloseTrigger>
    </Toast>
  </Toaster>
</template>
```

```ts
toaster.create({
  title: "Button installed",
  description: "Two files written to src/components/ui/button.",
});
```

## Stacking

`overlap` piles the toasts on top of each other with the newest in front, and expands them on
hover. Turn it off and they list downward instead. The transforms come from the machine as inline
styles, so the recipe only carries the surface and a transition for them to move along.

## What belongs in one

Something that happened, briefly, that the person does not have to act on. If they must act, it is
a [dialog](/docs/components/dialog). If it must be readable later, it belongs on the page.

Keep the title to a few words and let the description carry the detail. A toast that needs two
sentences is the wrong shape for the message.

## Errors

An error that stops the user should not be a toast, because it disappears. Use one for a failure
they can ignore, such as a background save that will retry, and give it an action trigger if there
is something to do about it.

## Timing

`duration` is per toast and defaults to a few seconds. Raise it for anything with an action, since
the toast has to outlive the time it takes to read and reach it.

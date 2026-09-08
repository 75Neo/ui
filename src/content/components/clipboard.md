---
title: Clipboard
description: A copy control that reports success for a moment afterwards.
category: Data display
registryItem: clipboard
---

## Usage

```tsx
<Clipboard defaultValue="npx shadcn@latest add @75neo/button">
  <ClipboardLabel>Install command</ClipboardLabel>
  <ClipboardControl>
    <ClipboardInput />
    <ClipboardTrigger>
      <ClipboardIndicator fallback={<Copy />}>
        <Check />
      </ClipboardIndicator>
      Copy
    </ClipboardTrigger>
  </ClipboardControl>
</Clipboard>
```

```vue
<template>
  <Clipboard default-value="npx shadcn-vue@latest add @75neo/button">
    <ClipboardLabel>Install command</ClipboardLabel>
    <ClipboardControl>
      <ClipboardInput />
      <ClipboardTrigger>
        <ClipboardIndicator>
          <template #fallback>
            <Copy />
          </template>
          <Check />
        </ClipboardIndicator>
        Copy
      </ClipboardTrigger>
    </ClipboardControl>
  </Clipboard>
</template>
```

## The confirmation

`ClipboardIndicator` swaps to its children for `timeout` milliseconds after a successful copy and
shows its fallback the rest of the time. That momentary tick is the whole point: a copy button with
no feedback leaves people clicking it twice.

## Without the field

The input is optional. Drop it and keep the trigger when the text being copied is already on screen,
such as a code block with a button in its corner.

## When it fails

The clipboard API needs a secure context and a real user gesture. On a page served over plain HTTP
the copy will not happen, so keep the text selectable rather than relying on the button alone.

---
title: Avatar
description: A circular image that falls back to initials while loading or on error.
category: Data display
registryItem: avatar
---

## Usage

```tsx
<Avatar size="lg">
  <AvatarImage src={user.photo} alt="" />
  <AvatarFallback>{initials}</AvatarFallback>
</Avatar>
```

```vue
<template>
  <Avatar size="lg">
    <AvatarImage :src="user.photo" alt="" />
    <AvatarFallback>{{ initials }}</AvatarFallback>
  </Avatar>
</template>
```

## The fallback

The fallback is not a placeholder that the image covers. Ark tracks the image's load state and
shows exactly one of the two, so there is no flash of initials behind a loaded photo and no empty
circle when the source is broken.

Leave out the image entirely and the fallback stands on its own, which is what you want for a user
who has never uploaded a photo.

## Sizes

`size` moves the circle and the text together, so initials stay proportional at every step.

## Alt text

An avatar next to the person's name is decorative, so pass an empty `alt` and let the name carry
the meaning. Give it real alt text only when the image is the only thing identifying the person.

---
name: Avatar
key: avatar
module: avatar
summary: A picture of a person, with their initials underneath it.
---

Compose the two children yourself. Ark renders both and hides the image until it
loads, so the fallback is what shows first and what stays when there is no picture.

```tsx
<Avatar>
  <AvatarImage src="/ada.jpg" alt="Ada Lovelace" />
  <AvatarFallback name="Ada Lovelace" />
</Avatar>
```

```vue
<Avatar>
  <AvatarImage src="/ada.jpg" alt="Ada Lovelace" />
  <AvatarFallback name="Ada Lovelace" />
</Avatar>
```

`name` on the fallback becomes initials: one word gives its first two letters, several
give the first and last. Pass content instead and it wins outright.

`color` only ever shows through the fallback, since a loaded image covers it, and it is
the cheapest way to tell two sets of initials apart in a stack. `shape` switches between
a circle and a rounded square, and the square tightens its corners below `lg`, where a
full radius would read as a circle again.

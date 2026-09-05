---
name: RatingGroup
key: ratingGroup
module: rating-group
summary: A row of stars across three sizes and seven accents, with half stars cut from the same shape rather than a second icon.
---

A row of stars to give a score with. Clicking one sets the rating, the arrow keys move it,
and hovering shows what a click would do.

```tsx
<RatingGroup label="How was it?" allowHalf defaultValue={3.5} />
```

```vue
<RatingGroup label="How was it?" allow-half :default-value="3.5" />
```

### A star is two icons

The lower one is the empty outline and is always there. The upper one is the filled star,
inside a box clipped to nothing, to half, or to the whole width. So a half star is the
same shape cut down the middle rather than a different icon that happens to look like one,
and replacing the star through `icon` replaces both halves at once.

The clip fills from the start of the row, so under a right-to-left locale a half star
fills from the right, which is the direction it is read in.

```tsx
<RatingGroup icon={<Heart />} color="error" defaultValue={4} />
```

```vue
<RatingGroup :icon="Heart" color="error" :default-value="4" />
```

### Amber is the default

The default accent is `warning`, not `primary`, which is the only component in the library
where that is true. A star is amber wherever it appears, and a reader knows what an amber
star means before reading a word. That is worth more than the accent matching the rest of
the page.

### The value

A `number`, which makes this one of the few values here that is not a string or an array
of them: a rating is a quantity and nothing else. With `allowHalf` it can land on a half.

Controllable the usual way: React takes `value` with `onValueChange`, or `defaultValue` to
leave it alone; Vue takes `v-model`.

`count` is how many stars there are, five by default. `readOnly` shows a score without
offering to change it, which is what a rating printed beside a review wants.

---
name: RatingGroup
key: ratingGroup
module: rating-group
summary: Stars that fill whole or half.
---

`count` draws the stars and the value fills them. A half star is the same star
clipped down the middle rather than a different icon, filling from the inline start
so right-to-left locales mirror it for free.

```tsx
<RatingGroup label="Quality" count={5} />
```

```vue
<RatingGroup label="Quality" :count="5" />
```

The value is a number in both frameworks, fractional when `allowHalf` is set. `icon`
replaces the star everywhere at once.

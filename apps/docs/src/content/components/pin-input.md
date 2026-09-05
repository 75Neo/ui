---
name: PinInput
key: pinInput
module: pin-input
summary: A row of one-character boxes holding a short code, across three sizes and seven accents, in digits or letters.
---

A row of boxes, one character each, for the short code that arrives by text message or
sits in an authenticator. Typing moves forward, backspace moves back, and pasting a whole
code fills the row.

```tsx
<PinInput label="Verification code" otp length={6} />
```

```vue
<PinInput label="Verification code" otp :length="6" />
```

`otp` is worth setting whenever the code really is a one-time one. It tells the browser
so, and a phone will then offer the code from the message that just arrived.

### Each box is its own input

That is what makes the caret land in one box and the arrow keys move between them, and it
is why the focus ring is drawn on a box rather than around the row. Every other field here
draws its ring on the control with `focus-within`, because a control is one thing. A row
of boxes is not one thing, and a ring around all of it would say otherwise.

`length` is how many to draw, six by default. `type` is what one will take: `numeric`,
`alphanumeric` or `alphabetic`. `pattern` narrows it further.

```tsx
<PinInput type="alphanumeric" length={5} />
<PinInput mask length={4} />
```

```vue
<PinInput type="alphanumeric" :length="5" />
<PinInput mask :length="4" />
```

`mask` hides the characters the way a password field does. `placeholder` is what an empty
box shows, a small circle by default; pass an empty string for a blank one.

### The value

The value is a `string[]`, one entry per box, with `""` for an empty one. It is an array
rather than the joined code because a box is addressed by its index, which is how a
character finds the box it belongs to and how the caret knows where to go next. The joined
code arrives beside it as `valueAsString`, on both events.

The code stays contiguous. Removing a character in the middle pulls the ones after it
back rather than leaving a hole, because a code with a gap in it is not a code.

It is controllable: React takes `value` with `onValueChange`, or `defaultValue` to leave
it alone; Vue takes `v-model`. `onValueChange` fires on every character, `onValueComplete`
once, when the last box is filled.

### Styling a code as it lands

Ark writes `data-filled` on a box that has a character and `data-complete` on every box
once they all do. Neither is styled here, and both are on the boxes rather than only on
the row so that a caller can reach them.

```tsx
<PinInput ui={{ input: "data-complete:ring-success" }} length={4} />
```

```vue
<PinInput :ui="{ input: 'data-complete:ring-success' }" :length="4" />
```

### Colour

The accent reaches the focus ring on a box and nothing else. An invalid row rings every
box in the error color, which is set by `invalid` and does not go through the accent.

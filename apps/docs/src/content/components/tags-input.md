---
name: TagsInput
key: tagsInput
module: tags-input
order: 32
summary: A field whose answers stay in it as chips, across three sizes and seven accents, with a limit and a rule about what counts.
---

A field where each answer stays behind as a chip. Typing and pressing Enter or a comma
makes a tag, backspace on an empty field takes the last one back, and the arrow keys walk
along them.

```tsx
<TagsInput label="Topics" defaultValue={["design", "typography"]} placeholder="Add a tag" />
```

```vue
<TagsInput label="Topics" :default-value="['design', 'typography']" placeholder="Add a tag" />
```

### It grows rather than scrolls

The control wraps, so a long list of tags makes the field taller instead of hiding the
ones that came first. Its height is a minimum rather than a height, and that is the one
place its measurements differ from the Combobox's, which they otherwise match exactly.

### A tag has two states

Each tag is a chip and, while it is being rewritten, a small field in the chip's place.
Double-clicking a tag or pressing Enter on it swaps one for the other, and both carry the
same measurements so nothing around them moves. `editable={false}` takes the second state
away and leaves a tag as something to keep or delete.

### What counts as a tag

`delimiter` is what ends one, a comma by default, and what a pasted string is split on
when `addOnPaste` is set. `maxLength` bounds a single tag's text; `max` bounds how many
there may be.

`max` refuses further tags. With `allowOverflow` it accepts them and marks the field
invalid instead, which is the right shape when the limit is something to warn about
rather than to enforce.

`allowDuplicates` accepts a tag that is already there. `validate` decides the rest: it is
handed the candidate text and the tags so far, and returns whether the tag may be added.

```tsx
<TagsInput max={3} />
<TagsInput max={2} allowOverflow />
<TagsInput validate={(details) => details.inputValue === details.inputValue.toLowerCase()} />
```

```vue
<TagsInput :max="3" />
<TagsInput :max="2" allow-overflow />
<TagsInput :validate="(details) => details.inputValue === details.inputValue.toLowerCase()" />
```

### The value

The tags are a `string[]`, controllable the usual way: React takes `value` with
`onValueChange`, or `defaultValue` to leave them alone; Vue takes `v-model`.

The half-typed text is not a prop. It is the component's own business, the same way the
Combobox's query is: it becomes a tag or it is thrown away, and a caller who needs to
drive it drives the tags instead. `blurBehavior` says which of the two happens when the
field loses focus with something half typed in it.

### Colour

The accent reaches the focus ring on the control and a tag under the arrow keys, and
nothing else. A chip at rest stays `bg-elevated` whatever the accent, because a field
holding eight tags in the accent colour is a field nobody can read.

---
name: FileUpload
key: fileUpload
module: file-upload
order: 35
summary: The area files are dropped on and the list of what landed, across three sizes and seven accents, with thumbnails.
---

An area to drop files on, and the list of what landed.

```tsx
<FileUpload
  label="Attachments"
  accept="image/*"
  maxFiles={4}
  description="PNG, JPG or WebP, up to 5 MB"
  maxFileSize={5_000_000}
/>
```

```vue
<FileUpload
  label="Attachments"
  accept="image/*"
  :max-files="4"
  description="PNG, JPG or WebP, up to 5 MB"
  :max-file-size="5_000_000"
/>
```

### The dropzone is the control

Not a strip beside a button. The whole area is focusable and clickable, so a keyboard
reaches it without the button, and the button inside it is a second way in rather than the
only one. Dragging a file anywhere over the window puts the accent on it, which is the one
moment the component has something to say.

The accent arrives as a ring rather than as a border colour. That is a real constraint
rather than a preference: interpolated classes have to be safelisted by hand, and a ring
is one more prefix on a line the safelist already carries where a border colour would be a
whole new family of them.

### What it will take

`accept` is MIME types or extensions, `maxFiles` how many may be held at once, and
`maxFileSize` and `minFileSize` bound each one in bytes. A file that fails any of them is
turned away and reported through `onFileReject`, and never joins the list.

`directory` accepts a whole folder in Webkit browsers. `capture` opens a particular camera
on a phone. `allowDrop` can be turned off to leave only the button.

### The list

Every file that landed is a row with its name, its size and a button that removes it. The
size is written by Ark in the locale the App publishes, so a megabyte reads the way the
reader expects.

A thumbnail is drawn only for an image, which is a rule the component module owns rather
than either adapter — a list whose two halves disagreed about which rows get a picture
would be two components. It reads the MIME type rather than the extension, because that is
what the browser fills in and what a renamed file cannot lie about.

`preview={false}` leaves the rows plain. `list={false}` takes the list away entirely, for a
caller who would rather draw it themselves from the value.

### The value

`File[]` in both frameworks, which is what a form body wants and what a thumbnail can be
read from without a round trip. React takes `acceptedFiles` with `onFileChange`, or
`defaultAcceptedFiles` to leave it alone; Vue takes `v-model`.

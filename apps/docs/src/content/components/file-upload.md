---
name: FileUpload
key: fileUpload
module: file-upload
summary: The area files are dropped on, and the list of what landed.
---

The dropzone is the whole control, not a strip beside a button. It is focusable and
clickable in its own right, so a keyboard reaches it without the button, and the
button inside it is a second way in rather than the only one.

```tsx
<FileUpload label="Attachment" accept="image/*" maxFileSize={2_000_000} />
```

```vue
<FileUpload label="Attachment" accept="image/*" :max-file-size="2000000" />
```

`maxFiles` raises the limit above one, `accept` takes MIME types or extensions,
`directory` accepts a whole folder and `capture` opens a phone camera.

A file in the list is a row whatever it is, and the thumbnail is the only part that
knows the difference: it is drawn for an image and skipped for anything else, so a
row's height comes from its text and does not jump between kinds. `preview` turns the
thumbnails off and `list` hides the list altogether.

The accent shows while a file is over the window, which is the one moment the
component has something to say.

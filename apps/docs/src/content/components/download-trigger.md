---
name: DownloadTrigger
key: downloadTrigger
module: download-trigger
summary: A button that saves a blob to disk.
---

Hand it bytes, a file name and a mime type, and it downloads on press. The contract
spells blobs structurally, because the themes package typechecks without the DOM
library — a real `Blob` or `File` satisfies both spellings.

```tsx
<DownloadTrigger data={blob} fileName="report.csv" mimeType="text/csv">
  Export
</DownloadTrigger>
```

```vue
<DownloadTrigger :data="blob" file-name="report.csv" mime-type="text/csv">
  Export
</DownloadTrigger>
```

Four weights across seven colors, with icons fore and aft. It is a button in every
respect except the one that matters.

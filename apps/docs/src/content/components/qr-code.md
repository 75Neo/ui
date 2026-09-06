---
name: QrCode
key: qrCode
module: qr-code
summary: A scannable code on a card carrying its quiet zone.
---

Pass the value and the code renders on a card whose padding is the quiet zone the
scanner needs, so it grows with the size rather than staying fixed.

```tsx
<QrCode defaultValue="https://github.com/75Neo/ui" />
```

```vue
<QrCode default-value="https://github.com/75Neo/ui" />
```

There is no color. The modules are drawn in the inverted tone and the card behind them
is the page, so the code scans the same in either theme.

Compose the parts to put a logo over the code or a button beside it. An overlay sits
inside the frame; a download trigger takes the file name it saves under.

```tsx
<QrCode defaultValue="https://github.com/75Neo/ui">
  <QrCodeFrame>
    <QrCodeOverlay>
      <img src="/logo.svg" alt="" />
    </QrCodeOverlay>
  </QrCodeFrame>
  <QrCodeDownloadTrigger fileName="75neo.png">Download</QrCodeDownloadTrigger>
</QrCode>
```

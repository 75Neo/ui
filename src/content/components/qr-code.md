---
title: QR Code
description: A generated QR code with an optional logo and a download control.
category: Data display
registryItem: qr-code
---

## Usage

```vue
<template>
  <QrCode default-value="https://75neo-ui.pages.dev">
    <QrCodeFrame>
      <QrCodePattern />
    </QrCodeFrame>
    <QrCodeDownloadTrigger file-name="75neo-ui.png" mime-type="image/png">
      <Download />
      Download
    </QrCodeDownloadTrigger>
  </QrCode>
</template>
```

The code is generated in the browser as an SVG, so there is no service to call and nothing to cache.

## Contrast

A QR code is read by contrast, not by colour. The frame keeps a light background and the pattern
stays dark in both themes for that reason. If you retheme it, keep the ratio high and leave the
quiet zone around the pattern alone.

## Logos

`QrCodeOverlay` sits in the middle of the pattern. Error correction covers a small obstruction, but
not a large one. Keep the overlay to about a fifth of the width and test the result with a phone
before shipping it.

## Downloading

`QrCodeDownloadTrigger` rasterises the SVG to the `mimeType` you ask for. Give it a `fileName` that
means something to whoever saves it, since that is the name they will see.

---
title: Color Picker
description: An area, channel sliders and swatches behind a swatch trigger.
category: Forms
registryItem: color-picker
---

## Usage

```vue
<template>
  <ColorPicker :default-value="parseColor('#2563eb')">
    <ColorPickerLabel>Primary</ColorPickerLabel>
    <ColorPickerControl>
      <ColorPickerTrigger>
        <ColorPickerValueSwatch />
      </ColorPickerTrigger>
      <ColorPickerValueText />
    </ColorPickerControl>

    <ColorPickerPositioner>
      <ColorPickerContent>
        <ColorPickerArea>
          <ColorPickerAreaBackground />
          <ColorPickerAreaThumb />
        </ColorPickerArea>
        <ColorPickerChannelSlider channel="hue">
          <ColorPickerChannelSliderTrack />
          <ColorPickerChannelSliderThumb />
        </ColorPickerChannelSlider>
      </ColorPickerContent>
    </ColorPickerPositioner>
    <ColorPickerHiddenInput />
  </ColorPicker>
</template>
```

## The value is a colour object

`parseColor` builds one from any CSS colour string. The object knows its own format, so switching
between hex, RGB and HSL is a view change rather than a conversion you write.

## Views and channels

`ColorPickerView` scopes the parts inside it to one format, so a channel input marked `red` only
renders while the picker is in an RGB format. The area and the hue slider work in any format and
belong outside a view: asking an RGB view for a hue channel is an error rather than a conversion.

## Only the parts you need

The area and a hue slider are enough for most pickers. Add an alpha channel slider when
transparency matters, channel inputs when someone needs to type an exact value, and the eye dropper
where the browser supports it.

`ColorPickerSwatchGroup` alone, with no area at all, is the right shape when the palette is fixed.
Most product colour pickers should be that.

## Transparency

`ColorPickerTransparencyGrid` draws the chequerboard behind a translucent swatch. Without it a
half transparent colour reads as a lighter opaque one.

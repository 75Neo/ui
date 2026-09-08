---
title: Menu
description: A list of actions anchored to a trigger, with typeahead and roving focus.
category: Overlays
registryItem: menu
---

## Usage

```tsx
<Menu>
  <MenuTrigger asChild>
    <Button variant="outline">Registry</Button>
  </MenuTrigger>

  <MenuPositioner>
    <MenuContent>
      <MenuItemGroup>
        <MenuItemGroupLabel>Adapter</MenuItemGroupLabel>
        <MenuItem value="react">
          <MenuItemText>React</MenuItemText>
        </MenuItem>
      </MenuItemGroup>
      <MenuSeparator />
      <MenuItem value="copy">
        <MenuItemText>Copy the install command</MenuItemText>
      </MenuItem>
    </MenuContent>
  </MenuPositioner>
</Menu>
```

```vue
<template>
  <Menu>
    <MenuTrigger as-child>
      <Button variant="outline">Registry</Button>
    </MenuTrigger>

    <MenuPositioner>
      <MenuContent>
        <MenuItemGroup>
          <MenuItemGroupLabel>Adapter</MenuItemGroupLabel>
          <MenuItem value="react">
            <MenuItemText>React</MenuItemText>
          </MenuItem>
        </MenuItemGroup>
        <MenuSeparator />
        <MenuItem value="copy">
          <MenuItemText>Copy the install command</MenuItemText>
        </MenuItem>
      </MenuContent>
    </MenuPositioner>
  </Menu>
</template>
```

## Actions, not navigation

A menu holds things that happen. A list of links to other pages is a
[navigation menu](/docs/components/navigation-menu), which announces itself differently and does
not steal the arrow keys from the page.

Every item needs a unique `value`. It is what the selection callback reports and what typeahead
matches against, so make it meaningful rather than an index.

## Keyboard

The trigger opens on enter, space and the down arrow. Inside, the arrow keys move the highlight,
typing jumps to the item that starts with those letters, and escape closes and returns focus to the
trigger. `loopFocus` decides whether the highlight wraps at the ends.

## Submenus

`MenuTriggerItem` is an item that opens a nested menu. It carries the same styling as an ordinary
item, so add a trailing chevron to show that it goes somewhere.

## Right click menus

`MenuContextTrigger` swaps the trigger for a region that opens the menu on right click and on long
press. Everything else about the menu stays the same.

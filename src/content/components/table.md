---
title: Table
description: Composable table parts over native table elements, inside a container that scrolls sideways.
category: Data display
registryItem: table
---

## Installation

```sh
npx shadcn@latest add @75neo/table
```

```sh
npx shadcn-vue@latest add @75neo/table
```

No Ark UI dependency. A table has no interaction model to speak of, so this is our own markup with
a recipe applied.

## Usage

```tsx
import Table from "@/components/ui/table/Table";
import TableBody from "@/components/ui/table/TableBody";
import TableCell from "@/components/ui/table/TableCell";
import TableHead from "@/components/ui/table/TableHead";
import TableHeader from "@/components/ui/table/TableHeader";
import TableRow from "@/components/ui/table/TableRow";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV-0114</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell className="text-right">1,284.50</TableCell>
    </TableRow>
  </TableBody>
</Table>;
```

```vue
<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead class="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>INV-0114</TableCell>
        <TableCell>Paid</TableCell>
        <TableCell class="text-right">1,284.50</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
```

## Anatomy

| Part           | Element                    |
| -------------- | -------------------------- |
| `Table`        | `div` wrapper plus `table` |
| `TableHeader`  | `thead`                    |
| `TableBody`    | `tbody`                    |
| `TableFooter`  | `tfoot`                    |
| `TableRow`     | `tr`                       |
| `TableHead`    | `th`                       |
| `TableCell`    | `td`                       |
| `TableCaption` | `caption`                  |

The parts are deliberately thin. Sorting, pagination, selection and virtualisation are not here,
because a headless table library does them better. Pair these parts with
[TanStack Table](https://tanstack.com/table) and use them as the render target.

## The container

`Table` renders a wrapper `div` with `overflow-x-auto` around the `table`. A wide table scrolls
inside its own box instead of pushing the page sideways, which is the failure mode that shows up
first on a phone.

The wrapper takes its own class prop, kept separate from the one that lands on the table:

```tsx
<Table containerClassName="max-h-96 overflow-y-auto" />
```

```vue
<Table container-class="max-h-96 overflow-y-auto" />
```

## Whitespace

Header cells never wrap, so a column label stays on one line and sets a sensible minimum width.
Body cells do wrap, which is what you want for descriptions and error messages. Add
`whitespace-nowrap` to a cell when a value must stay intact, such as an identifier or a timestamp.

## Selected rows

`TableRow` takes a `selected` boolean that writes `data-state="selected"` and applies the selected
background. It carries no selection logic of its own, so drive it from wherever your selection
state actually lives.

```tsx
<TableRow selected={selection.has(row.id)}>{/* ... */}</TableRow>
```

## Alignment

Cells align to the top of the middle line by default. Right align numeric columns on both the
header and the cells so the digits line up:

```tsx
<TableHead className="text-right">Amount</TableHead>
<TableCell className="text-right font-mono">{amount}</TableCell>
```

A monospace font on numeric columns keeps the digits in fixed columns, which makes magnitudes
readable at a glance.

## Caption

`TableCaption` renders a real `caption` element, positioned below the table by `caption-bottom` on
the table itself. Screen readers announce it when they enter the table, so it is the right place
for the sentence that explains what the rows are.

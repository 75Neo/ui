<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/vue";

const rows = [
  { item: "button", framework: "React and Vue", files: 2 },
  { item: "container", framework: "React and Vue", files: 2 },
  { item: "navigation-menu", framework: "React and Vue", files: 12 },
  { item: "table", framework: "React and Vue", files: 16 },
];
</script>

<template>
  <Table>
    <TableCaption>Registry items and the number of source files each one installs.</TableCaption>

    <TableHeader>
      <TableRow>
        <TableHead>Item</TableHead>
        <TableHead>Adapters</TableHead>
        <TableHead class="text-right">Files</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow v-for="row in rows" :key="row.item">
        <TableCell class="font-mono text-xs text-default">{{ row.item }}</TableCell>
        <TableCell class="text-muted">{{ row.framework }}</TableCell>
        <TableCell class="text-right font-mono text-xs text-muted">{{ row.files }}</TableCell>
      </TableRow>
    </TableBody>

    <TableFooter>
      <TableRow>
        <TableCell class="text-default">Total</TableCell>
        <TableCell />
        <TableCell class="text-right font-mono text-xs text-default">32</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</template>

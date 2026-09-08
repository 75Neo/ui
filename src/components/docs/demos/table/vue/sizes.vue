<script setup lang="ts">
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/vue";

const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
  <div class="flex flex-col gap-8">
    <Table v-for="size in sizes" :key="size" :size="size">
      <TableHeader>
        <TableRow>
          <TableHead>{{ size }}</TableHead>
          <TableHead>Adapters</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell class="font-mono text-xs text-default">button</TableCell>
          <TableCell class="text-muted">React and Vue</TableCell>
        </TableRow>
        <TableRow>
          <TableCell class="font-mono text-xs text-default">table</TableCell>
          <TableCell class="text-muted">React and Vue</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

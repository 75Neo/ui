<script setup lang="ts">
import { MarkdownDocument } from "@comark/vue";
import type { MarkdownDocument as ParsedDocument } from "comark";
import Table from "@/registry/vue/ui/table/Table.vue";
import TableBody from "@/registry/vue/ui/table/TableBody.vue";
import TableCell from "@/registry/vue/ui/table/TableCell.vue";
import TableHead from "@/registry/vue/ui/table/TableHead.vue";
import TableHeader from "@/registry/vue/ui/table/TableHeader.vue";
import TableRow from "@/registry/vue/ui/table/TableRow.vue";
import ProseCodeBlock from "@/components/docs/ProseCodeBlock.vue";
import PackageManagerTabs from "@/components/docs/PackageManagerTabs.vue";

const props = defineProps<{ value: ParsedDocument }>();

const components = {
  pre: ProseCodeBlock,
  "pm-command": PackageManagerTabs,
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
};
</script>

<template>
  <MarkdownDocument :value="props.value" :components="components" />
</template>

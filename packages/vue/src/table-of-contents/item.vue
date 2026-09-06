<script setup lang="ts">
import { Toc as Ark } from "@ark-ui/vue/toc";
import { cn, type TableOfContentsEntry } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
  item: TableOfContentsEntry;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Item
    :item="props.item"
    data-slot="table-of-contents-item"
    :class="
      cn(
        'min-w-0 data-[depth=\'3\']:ps-3 data-[depth=\'4\']:ps-6 data-[depth=\'5\']:ps-6 data-[depth=\'6\']:ps-6',
        props.class as string | undefined,
      )
    "
  >
    <slot />
  </Ark.Item>
</template>

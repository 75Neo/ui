<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Toc as Ark } from "@ark-ui/vue/toc";
import { cn } from "cn";
import { tocStyles as styles } from "@/registry/shared/lib/toc.styles";

interface TocLinkProps {
  href: string;
  class?: HTMLAttributes["class"];
}

const props = defineProps<TocLinkProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Link :href="props.href" :class="cn(styles.link(), props.class)">
    <slot />
  </Ark.Link>
</template>

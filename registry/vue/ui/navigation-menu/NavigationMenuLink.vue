<script setup lang="ts">
import type { AnchorHTMLAttributes, HTMLAttributes } from "vue";
import { NavigationMenu as Ark } from "@ark-ui/vue/navigation-menu";
import { cn } from "cn";
import { navigationMenu } from "@/registry/shared/lib/navigation-menu.styles";

interface NavigationMenuLinkProps {
  href?: string;
  target?: AnchorHTMLAttributes["target"];
  rel?: string;
  current?: boolean;
  closeOnClick?: boolean;
  value?: string;
  class?: HTMLAttributes["class"];
}

const props = defineProps<NavigationMenuLinkProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = navigationMenu();
</script>

<template>
  <Ark.Link
    :href="props.href"
    :target="props.target"
    :rel="props.rel"
    :current="props.current"
    :close-on-click="props.closeOnClick"
    :value="props.value"
    :class="cn(styles.link(), props.class)"
  >
    <slot />
  </Ark.Link>
</template>

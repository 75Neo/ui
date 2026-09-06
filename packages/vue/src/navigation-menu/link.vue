<script setup lang="ts">
import { type Component, computed } from "vue";
import { NavigationMenu as Ark } from "@ark-ui/vue/navigation-menu";
import { cva } from "class-variance-authority";
import {
  cn,
  navigationMenuDefaults,
  navigationMenuLinkCompoundData,
  navigationMenuSizeData,
  type NavigationMenuLinkProps,
} from "@75neo/themes";
import { useNavigationMenuVariants } from "./variants";

const navigationMenuLink = cva(
  "flex cursor-pointer items-center gap-2.5 rounded-md text-toned no-underline transition-colors outline-none select-none hover:bg-elevated hover:text-highlighted focus-visible:bg-elevated data-current:font-medium data-current:text-highlighted",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: navigationMenuSizeData.link,
    },
    compoundVariants: navigationMenuLinkCompoundData,
    defaultVariants: navigationMenuDefaults,
  },
);

const props = defineProps<
  NavigationMenuLinkProps<Component> & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useNavigationMenuVariants();
const linkClass = computed(() =>
  cn(navigationMenuLink(variants), props.class as string | undefined),
);
const iconClass = computed(() =>
  cn("shrink-0 text-dimmed [&>svg]:size-full", navigationMenuSizeData.linkIcon[variants.size]),
);
const titleClass = computed(() =>
  cn("truncate font-medium text-highlighted", navigationMenuSizeData.linkTitle[variants.size]),
);
const descriptionClass = computed(() =>
  cn("truncate text-muted", navigationMenuSizeData.linkDescription[variants.size]),
);
</script>

<template>
  <Ark.Link
    :href="props.href"
    :current="props.current"
    data-slot="navigation-menu-link"
    :class="linkClass"
  >
    <span v-if="props.leadingIcon" data-slot="navigation-menu-link-icon" :class="iconClass">
      <component :is="props.leadingIcon" />
    </span>
    <span
      v-if="props.title != null"
      data-slot="navigation-menu-link-body"
      class="flex min-w-0 flex-1 flex-col gap-0.5"
    >
      <span data-slot="navigation-menu-link-title" :class="titleClass">{{ props.title }}</span>
      <span
        v-if="props.description != null"
        data-slot="navigation-menu-link-description"
        :class="descriptionClass"
      >
        {{ props.description }}
      </span>
    </span>
    <slot v-else />
  </Ark.Link>
</template>

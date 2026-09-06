<script setup lang="ts">
import { computed, provide, reactive } from "vue";
import { Avatar as Ark } from "@ark-ui/vue/avatar";
import { cva } from "class-variance-authority";
import {
  avatarColorData,
  avatarDefaults,
  avatarRootCompoundData,
  avatarShapeData,
  avatarSizeData,
  cn,
  type AvatarRootProps,
} from "@75neo/themes";
import { avatarVariantsKey } from "./variants";

const avatarRoot = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden align-middle select-none",
  {
    variants: {
      color: avatarColorData.root,
      size: avatarSizeData.root,
      shape: avatarShapeData.root,
    },
    compoundVariants: avatarRootCompoundData,
    defaultVariants: avatarDefaults,
  },
);

const props = defineProps<
  AvatarRootProps & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? avatarDefaults.color;
  },
  get size() {
    return props.size ?? avatarDefaults.size;
  },
  get shape() {
    return props.shape ?? avatarDefaults.shape;
  },
});
provide(avatarVariantsKey, resolved);

const rootClass = computed(() => cn(avatarRoot(resolved), props.class as string | undefined));
</script>

<template>
  <Ark.Root
    data-slot="avatar"
    :data-color="resolved.color"
    :data-size="resolved.size"
    :data-shape="resolved.shape"
    :class="rootClass"
  >
    <slot />
  </Ark.Root>
</template>

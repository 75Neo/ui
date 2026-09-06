<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Dialog as Ark } from "@ark-ui/vue/dialog";
import { cva } from "class-variance-authority";
import { cn, dialogDefaults, dialogSizeData, type DialogContentProps } from "@75neo/themes";
import { useDialogVariants } from "./variants";

const dialogContent = cva("relative flex w-full flex-col overflow-hidden bg-default outline-none", {
  variants: {
    size: dialogSizeData.base,
    transition: {
      true: "data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
      false: "",
    },
    fullscreen: {
      true: "h-dvh max-h-dvh max-w-none rounded-none",
      false: "max-h-[calc(100dvh-2rem)] rounded-xl shadow-2xl ring ring-accented",
    },
  },
  defaultVariants: dialogDefaults,
});

const props = withDefaults(
  defineProps<
    DialogContentProps & {
      class?: unknown;
      /** Render the panel at the end of `body`. @defaultValue `true` */
      portal?: boolean;
    }
  >(),
  { transition: true, fullscreen: false, portal: true },
);

defineSlots<{
  default?: () => unknown;
}>();

const variants = useDialogVariants();
const contentClass = computed(() =>
  cn(
    dialogContent({ ...variants, transition: props.transition, fullscreen: props.fullscreen }),
    props.class as string | undefined,
  ),
);
const positionerClass = computed(() =>
  cn("fixed inset-0 flex items-center justify-center", props.fullscreen ? "p-0" : "p-4"),
);

/*
 * Gates the teleport below. Vue casts an absent Teleport target to nothing during the
 * server pass, so the popup is left in place until the component is mounted.
 */
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});
</script>

<template>
  <Teleport to="body" :disabled="!props.portal || !mounted">
    <Ark.Positioner data-slot="dialog-positioner" :class="positionerClass">
      <Ark.Content data-slot="dialog-content" :class="contentClass">
        <slot />
      </Ark.Content>
    </Ark.Positioner>
  </Teleport>
</template>

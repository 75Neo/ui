<script setup lang="ts">
import { type Component, computed, provide, reactive, ref } from "vue";
import { Dialog as Ark } from "@ark-ui/vue/dialog";
import { cn, headerClasses, headerDefaults, type HeaderRootProps } from "@75neo/themes";
import { headerVariantsKey } from "./variants";
import HeaderCenter from "./center.vue";
import HeaderEnd from "./end.vue";
import HeaderMenu from "./menu.vue";
import HeaderRow from "./row.vue";
import HeaderStart from "./start.vue";
import HeaderTitle from "./title.vue";
import HeaderToggle from "./toggle.vue";

/*
 * `toggle`, `overlay` and `portal` default to on, so each is declared: without the
 * declaration Vue casts an absent boolean to `false` and the menu button, the scrim
 * and the teleport all vanish from a bare header.
 */
const props = withDefaults(
  defineProps<
    HeaderRootProps<Component> & {
      class?: unknown;
    }
  >(),
  { toggle: true, overlay: true, portal: true, toggleSide: headerDefaults.toggleSide },
);

const open = defineModel<boolean>("open", { default: false });

const slots = defineSlots<{
  /** The middle of the bar, usually a navigation. Hidden on a narrow viewport. */
  default?: () => unknown;
  /** The start of the bar. Falls back to the wordmark. */
  start?: () => unknown;
  /** The end of the bar, usually a set of actions. */
  end?: () => unknown;
  /** The menu's content on a narrow viewport. Without it there is no menu. */
  menu?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get toggleSide() {
    return props.toggleSide;
  },
  get open() {
    return open.value;
  },
  setOpen: (next: boolean) => {
    open.value = next;
  },
  get title() {
    return props.title;
  },
});
provide(headerVariantsKey, resolved);

const rootClass = computed(() => cn(headerClasses.root, props.class as string | undefined));
const hasMenu = computed(() => props.toggle && slots.menu != null);
const lazy = ref(true);
</script>

<template>
  <Ark.Root v-model:open="open" :lazy-mount="lazy">
    <header data-slot="header" :class="rootClass">
      <HeaderRow>
        <HeaderStart>
          <HeaderToggle
            v-if="hasMenu && resolved.toggleSide === 'start'"
            :open-icon="props.toggleIcon"
            :close-icon="props.toggleCloseIcon"
          />
          <slot v-if="$slots.start" name="start" />
          <HeaderTitle v-else-if="props.title != null" :href="props.href">
            {{ props.title }}
          </HeaderTitle>
        </HeaderStart>
        <HeaderCenter>
          <slot />
        </HeaderCenter>
        <HeaderEnd>
          <slot name="end" />
          <HeaderToggle
            v-if="hasMenu && resolved.toggleSide === 'end'"
            :open-icon="props.toggleIcon"
            :close-icon="props.toggleCloseIcon"
          />
        </HeaderEnd>
      </HeaderRow>
    </header>

    <HeaderMenu
      v-if="hasMenu"
      :overlay="props.overlay"
      :portal="props.portal"
      :label="props.title ?? 'Menu'"
    >
      <template #header>
        <HeaderStart>
          <HeaderToggle
            v-if="resolved.toggleSide === 'start'"
            :open-icon="props.toggleIcon"
            :close-icon="props.toggleCloseIcon"
          />
          <slot v-if="$slots.start" name="start" />
          <HeaderTitle v-else-if="props.title != null" :href="props.href">
            {{ props.title }}
          </HeaderTitle>
        </HeaderStart>
        <HeaderEnd>
          <slot name="end" />
          <HeaderToggle
            v-if="resolved.toggleSide === 'end'"
            :open-icon="props.toggleIcon"
            :close-icon="props.toggleCloseIcon"
          />
        </HeaderEnd>
      </template>
      <slot name="menu" />
    </HeaderMenu>
  </Ark.Root>
</template>

<script setup lang="ts">
import { type Component, computed, onMounted, ref } from "vue";
import { Dialog as Ark } from "@ark-ui/vue/dialog";
import { cn, headerClasses, type HeaderMenuProps } from "@75neo/themes";

/*
 * `overlay` and `portal` default to on, so each is declared: without the declaration
 * Vue casts an absent boolean to `false` and the scrim and the teleport both vanish.
 */
const props = withDefaults(
  defineProps<
    HeaderMenuProps<Component> & {
      class?: unknown;
    }
  >(),
  { overlay: true, portal: true, label: "Menu" },
);

defineSlots<{
  /** The scrolling body of the menu, usually a navigation. */
  default?: () => unknown;
  /** What the bar shows at the top of the menu, usually the two end regions. */
  header?: () => unknown;
}>();

const menuClass = computed(() => cn(headerClasses.menu, props.class as string | undefined));

/*
 * Gates the teleport below. Vue casts an absent Teleport target to nothing during the
 * server pass, so the menu is left in place until the component is mounted.
 */
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});
</script>

<template>
  <!--
    Ark's Dialog rather than this library's, so everything a Header draws stays
    reachable through the header's own parts. Every class here is hidden at the wide
    breakpoint, so a wide viewport never renders it even if it were left open.
  -->
  <Teleport to="body" :disabled="!props.portal || !mounted">
    <Ark.Backdrop
      v-if="props.overlay"
      data-slot="header-backdrop"
      :class="headerClasses.backdrop"
    />
    <Ark.Positioner data-slot="header-positioner" :class="headerClasses.positioner">
      <Ark.Content data-slot="header-menu" :class="menuClass">
        <Ark.Title data-slot="header-menu-title" :class="headerClasses.menuTitle">
          {{ props.label }}
        </Ark.Title>
        <div v-if="$slots.header" data-slot="header-menu-header" :class="headerClasses.menuHeader">
          <slot name="header" />
        </div>
        <div data-slot="header-menu-body" :class="headerClasses.menuBody">
          <slot />
        </div>
      </Ark.Content>
    </Ark.Positioner>
  </Teleport>
</template>

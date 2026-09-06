<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { NavigationMenu as Ark } from "@ark-ui/vue/navigation-menu";
import { cn, navigationMenuDefaults, type NavigationMenuRootProps } from "@75neo/themes";
import { navigationMenuVariantsKey } from "./variants";
import NavigationMenuContent from "./content.vue";
import NavigationMenuItem from "./item.vue";
import NavigationMenuLink from "./link.vue";
import NavigationMenuList from "./list.vue";
import NavigationMenuTrigger from "./trigger.vue";

const props = defineProps<
  NavigationMenuRootProps<Component> & {
    class?: unknown;
  }
>();

const value = defineModel<string | undefined>({ default: undefined });

defineSlots<{
  default?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? navigationMenuDefaults.color;
  },
  get size() {
    return props.size ?? navigationMenuDefaults.size;
  },
  get orientation() {
    return props.orientation ?? navigationMenuDefaults.orientation;
  },
});
provide(navigationMenuVariantsKey, resolved);

const rootClass = computed(() =>
  cn("relative flex w-full min-w-0", props.class as string | undefined),
);
const items = computed(() => props.items ?? []);
</script>

<template>
  <Ark.Root
    v-model="value"
    :orientation="props.orientation"
    data-slot="navigation-menu"
    :data-color="resolved.color"
    :data-size="resolved.size"
    :class="rootClass"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <NavigationMenuList v-else>
      <NavigationMenuItem
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
      >
        <template v-if="item.links != null">
          <NavigationMenuTrigger :leading-icon="item.icon" :trailing-icon="props.trailingIcon">
            {{ item.label }}
          </NavigationMenuTrigger>
          <NavigationMenuContent :value="item.value">
            <NavigationMenuLink
              v-for="link in item.links"
              :key="link.href"
              :href="link.href"
              :title="link.title"
              :description="link.description"
              :leading-icon="link.icon"
              :current="link.current"
            />
          </NavigationMenuContent>
        </template>
        <NavigationMenuLink
          v-else
          :href="item.href ?? '#'"
          :leading-icon="item.icon"
          :current="item.current"
        >
          {{ item.label }}
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </Ark.Root>
</template>

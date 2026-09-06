<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { Tabs as Ark } from "@ark-ui/vue/tabs";
import { cn, tabsDefaults, tabsSizeData, type TabsRootProps } from "@75neo/themes";
import { tabsVariantsKey } from "./variants";
import TabsContent from "./content.vue";
import TabsIndicator from "./indicator.vue";
import TabsList from "./list.vue";
import TabsTrigger from "./trigger.vue";

const props = defineProps<
  TabsRootProps<Component> & {
    class?: unknown;
  }
>();

const emit = defineEmits<{
  /** Fired when the selected tab changes. */
  valueChange: [details: { value: string | null }];
}>();

defineSlots<{
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the tabs, leaving `defaultValue` idle.
 */
const value = defineModel<string | undefined>({ default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get variant() {
    return props.variant ?? tabsDefaults.variant;
  },
  get color() {
    return props.color ?? tabsDefaults.color;
  },
  get size() {
    return props.size ?? tabsDefaults.size;
  },
});
provide(tabsVariantsKey, resolved);

const rootClass = computed(() =>
  cn(
    "group/tabs flex min-w-0 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row",
    props.class as string | undefined,
  ),
);
const leadingClass = computed(() =>
  cn("shrink-0 [&>svg]:size-full", tabsSizeData.leadingIcon[resolved.size]),
);
</script>

<template>
  <Ark.Root
    data-slot="tabs"
    :class="rootClass"
    :data-variant="resolved.variant"
    :data-color="resolved.color"
    :data-size="resolved.size"
    v-model="value"
    @value-change="emit('valueChange', $event)"
    :activation-mode="props.activationMode"
    :orientation="props.orientation"
    :unmount-on-exit="props.unmountOnExit"
    :lazy-mount="props.lazyMount"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else-if="props.items != null">
      <TabsList>
        <TabsTrigger
          v-for="tab in props.items"
          :key="tab.value"
          :value="tab.value"
          :disabled="tab.disabled"
        >
          <span v-if="tab.icon != null" data-slot="tabs-leading-icon" :class="leadingClass">
            <component :is="tab.icon" />
          </span>
          <span data-slot="tabs-label" :class="cn('min-w-0 truncate')">{{ tab.label }}</span>
        </TabsTrigger>
        <TabsIndicator />
      </TabsList>
      <TabsContent v-for="tab in props.items" :key="tab.value" :value="tab.value">
        {{ tab.content }}
      </TabsContent>
    </template>
  </Ark.Root>
</template>

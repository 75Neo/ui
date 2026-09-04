<script setup lang="ts">
import { type Component, computed, onMounted, ref } from "vue";
import { createListCollection, Select as Ark } from "@ark-ui/vue/select";
import { Check, ChevronDown, X } from "@lucide/vue";
import { select, type SelectItem, type SelectProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The selection lives outside the shared contract, because React and Vue spell a
 * controlled value too differently to share one type. Here it is `v-model`, holding an
 * array of item values whatever the selection mode.
 */
const props = withDefaults(
  defineProps<
    SelectProps<Component> & {
      defaultValue?: string[];
      class?: unknown;
    }
  >(),
  /*
   * The two props here whose default is `true`, and both are exactly what Vue's Boolean
   * casting would get wrong: an absent Boolean-typed prop arrives as `false`, so the
   * clear button would never render and the chevron would never turn over unless a
   * caller asked for each by name. Every other boolean below defaults to off, which is
   * what the cast produces anyway.
   */
  { clearable: true, spin: true },
);

const emit = defineEmits<{
  /** Fired when the selection changes. */
  valueChange: [details: { value: string[]; items: SelectItem<Component>[] }];
  /** Fired when the list opens or closes. */
  openChange: [details: { open: boolean }];
}>();

defineSlots<{
  /** Replaces the caption above the control. Falls back to `label`. */
  label?: () => unknown;
  /** Replaces an option's text with arbitrary markup. Falls back to `item.label`. */
  item?: (props: { item: SelectItem<Component> }) => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the select to a controlled selection, which would
 * leave `defaultValue` with nothing to do.
 */
const value = defineModel<string[] | undefined>({ default: undefined });

/*
 * Gates the teleport below. Vue casts an absent Teleport target to nothing during the
 * server pass, so the popup is left in place until the component is mounted.
 */
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

/*
 * The item shape is exactly what Ark's collection reads by default — `value`, `label`
 * and `disabled` — so no accessors are passed. Rebuilt only when the options change,
 * which is the whole of the work: unlike the Combobox there is no filter to fold in.
 */
const collection = computed(() => createListCollection({ items: props.items }));

const theme = useResolvedTheme(
  select,
  "select",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model="value"
    :collection="collection"
    data-slot="base"
    :class="theme.class.base"
    :default-value="props.defaultValue"
    :multiple="props.multiple"
    :deselectable="props.deselectable"
    :loop-focus="props.loopFocus"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
    @value-change="emit('valueChange', $event)"
    @open-change="emit('openChange', $event)"
  >
    <Ark.Label
      v-if="props.label != null || $slots.label"
      data-slot="label"
      :class="theme.class.label"
    >
      <slot name="label">{{ props.label }}</slot>
    </Ark.Label>

    <Ark.Control data-slot="control" :class="theme.class.control">
      <Ark.Trigger data-slot="trigger" :class="theme.class.trigger">
        <Ark.ValueText
          data-slot="valueText"
          :class="theme.class.valueText"
          :placeholder="props.placeholder"
        />
      </Ark.Trigger>

      <!--
        Floated over the trigger's trailing edge rather than placed inside it: the
        trigger is a `button`, and a browser will not keep the clear button nested in
        one. The box ignores the pointer so a click beside an icon still opens the
        list, and the clear button takes it back for itself.
      -->
      <span data-slot="indicators" :class="theme.class.indicators">
        <Ark.ClearTrigger
          v-if="props.clearable"
          data-slot="clearTrigger"
          :class="theme.class.clearTrigger"
        >
          <component :is="props.clearIcon ?? X" />
        </Ark.ClearTrigger>
        <Ark.Indicator data-slot="trailingIcon" :class="theme.class.trailingIcon">
          <component :is="props.trailingIcon ?? ChevronDown" />
        </Ark.Indicator>
      </span>
    </Ark.Control>

    <!--
      Teleported so an ancestor with `overflow: hidden` cannot clip it. The teleport
      is disabled until mount, which keeps the server pass and the first client render
      identical and leaves nothing for hydration to reconcile — the same thing Ark's
      React Portal does on the other adapter.
    -->
    <Teleport to="body" :disabled="!mounted">
      <Ark.Positioner data-slot="positioner" :class="theme.class.positioner">
        <Ark.Content data-slot="content" :class="theme.class.content">
          <Ark.List data-slot="list" :class="theme.class.list">
            <Ark.Item
              v-for="item in props.items"
              :key="item.value"
              :item="item"
              data-slot="item"
              :class="theme.class.item"
            >
              <span v-if="item.icon" data-slot="leadingIcon" :class="theme.class.leadingIcon">
                <component :is="item.icon" />
              </span>
              <Ark.ItemText data-slot="itemText" :class="theme.class.itemText">
                <slot name="item" :item="item">{{ item.label }}</slot>
              </Ark.ItemText>
              <Ark.ItemIndicator data-slot="itemIndicator" :class="theme.class.itemIndicator">
                <component :is="props.selectedIcon ?? Check" />
              </Ark.ItemIndicator>
            </Ark.Item>
          </Ark.List>
        </Ark.Content>
      </Ark.Positioner>
    </Teleport>

    <!--
      The one part with no slot of its own: it is `display: none` by contract, so a
      class on it would style nothing. It is what puts the selection into a form.
    -->
    <Ark.HiddenSelect />
  </Ark.Root>
</template>

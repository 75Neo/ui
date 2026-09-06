<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { DateInput as Ark, type DateInputDateValue as DateValue } from "@ark-ui/vue/date-input";
import {
  cn,
  dateInputDefaults,
  dateInputLiteralText,
  dateInputSizeData,
  type DateInputRootProps,
} from "@75neo/themes";
import { dateInputVariantsKey } from "./variants";
import DateInputControl from "./control.vue";
import DateInputLabel from "./label.vue";
import DateInputSegment from "./segment.vue";
import DateInputSegmentGroup from "./segment-group.vue";

export type { DateValue };

const props = defineProps<
  DateInputRootProps<Component> & {
    class?: unknown;
    min?: DateValue;
    max?: DateValue;
    isDateUnavailable?: (date: DateValue) => boolean;
    placeholderValue?: DateValue;
  }
>();

const emit = defineEmits<{
  /** Fired when the date changes. */
  valueChange: [details: { value: DateValue[] }];
}>();

defineSlots<{
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the field, leaving `defaultValue` idle.
 */
const value = defineModel<DateValue[] | undefined>({ default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? dateInputDefaults.color;
  },
  get size() {
    return props.size ?? dateInputDefaults.size;
  },
});
provide(dateInputVariantsKey, resolved);

const range = computed(() => props.selectionMode === "range");
const leadingClass = computed(() =>
  cn("shrink-0 text-dimmed [&>svg]:size-full", dateInputSizeData.leadingIcon[resolved.size]),
);
const separatorClass = computed(() =>
  cn("shrink-0 text-dimmed", dateInputSizeData.separator[resolved.size]),
);

const rootClass = computed(() =>
  cn("flex min-w-0 flex-col gap-1.5", props.class as string | undefined),
);
</script>

<template>
  <Ark.Root
    data-slot="date-input"
    :class="rootClass"
    :data-color="resolved.color"
    :data-size="resolved.size"
    v-model="value"
    @value-change="emit('valueChange', $event)"
    :min="props.min"
    :max="props.max"
    :is-date-unavailable="props.isDateUnavailable"
    :granularity="props.granularity"
    :locale="props.locale"
    :time-zone="props.timeZone"
    :should-force-leading-zeros="props.shouldForceLeadingZeros"
    :hide-time-zone="props.hideTimeZone"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
  >
    <DateInputLabel v-if="props.label != null">{{ props.label }}</DateInputLabel>
    <DateInputControl>
      <span
        v-if="props.leadingIcon != null"
        data-slot="date-input-leading-icon"
        :class="leadingClass"
      >
        <component :is="props.leadingIcon" />
      </span>
      <DateInputSegmentGroup :index="0">
        <Ark.SegmentContext v-slot="segment">
          <DateInputSegment
            :segment="
              segment.type === 'literal'
                ? { ...segment, text: dateInputLiteralText(segment.text) }
                : segment
            "
          />
        </Ark.SegmentContext>
      </DateInputSegmentGroup>
      <template v-if="range">
        <span data-slot="date-input-separator" :class="separatorClass">
          {{ props.rangeSeparator ?? "–" }}
        </span>
        <DateInputSegmentGroup :index="1">
          <Ark.SegmentContext v-slot="segment">
            <DateInputSegment
              :segment="
                segment.type === 'literal'
                  ? { ...segment, text: dateInputLiteralText(segment.text) }
                  : segment
              "
            />
          </Ark.SegmentContext>
        </DateInputSegmentGroup>
      </template>
    </DateInputControl>
    <Ark.HiddenInput :index="0" />
    <Ark.HiddenInput v-if="range" :index="1" />
  </Ark.Root>
</template>

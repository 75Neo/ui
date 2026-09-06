<script setup lang="ts">
import { type Component, computed, onMounted, provide, reactive, ref } from "vue";
import { DatePicker as Ark, type DateValue } from "@ark-ui/vue/date-picker";
import {
  Calendar as CalendarIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  X as XIcon,
} from "@lucide/vue";
import {
  cn,
  datePickerDefaults,
  datePickerSizeData,
  type DatePickerRootProps,
} from "@75neo/themes";
import { datePickerVariantsKey } from "./variants";
import DatePickerClearTrigger from "./clear-trigger.vue";
import DatePickerContent from "./content.vue";
import DatePickerControl from "./control.vue";
import DatePickerInput from "./input.vue";
import DatePickerLabel from "./label.vue";
import DatePickerTrigger from "./trigger.vue";
import DayView from "./day-view.vue";
import GridView from "./grid-view.vue";

export type { DateValue };

const props = defineProps<
  DatePickerRootProps<Component> & {
    class?: unknown;
    min?: DateValue;
    max?: DateValue;
    isDateUnavailable?: (date: DateValue) => boolean;
  }
>();

const emit = defineEmits<{
  /** Fired when the date changes. */
  valueChange: [details: { value: DateValue[] }];
  /** Fired when the calendar opens or closes. */
  openChange: [details: { open: boolean }];
}>();

defineSlots<{
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps absent `v-model`s absent. Without them the declared
 * props would reach Ark as values and pin the field, leaving the defaults idle.
 */
const value = defineModel<DateValue[] | undefined>({ default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? datePickerDefaults.color;
  },
  get size() {
    return props.size ?? datePickerDefaults.size;
  },
});
provide(datePickerVariantsKey, resolved);

const range = computed(() => props.selectionMode === "range");
const separatorClass = computed(() =>
  cn("shrink-0 text-dimmed", datePickerSizeData.separator[resolved.size]),
);

/*
 * Gates the teleport in the content below. Vue casts an absent Teleport target to
 * nothing during the server pass, so the popup is left in place until mounted.
 */
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

const rootClass = computed(() =>
  cn("flex w-full min-w-0 flex-col gap-1.5", props.class as string | undefined),
);
</script>

<template>
  <Ark.Root
    data-slot="date-picker"
    :class="rootClass"
    :data-color="resolved.color"
    :data-size="resolved.size"
    v-model="value"
    @value-change="emit('valueChange', $event)"
    @open-change="emit('openChange', $event)"
    :selection-mode="props.selectionMode"
    :locale="props.locale"
    :time-zone="props.timeZone"
    :num-of-months="props.numOfMonths"
    :start-of-week="props.startOfWeek"
    :fixed-weeks="props.fixedWeeks"
    :close-on-select="props.closeOnSelect"
    :open-on-click="props.openOnClick"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
    :min="props.min"
    :max="props.max"
    :is-date-unavailable="props.isDateUnavailable"
  >
    <DatePickerLabel v-if="props.label != null">{{ props.label }}</DatePickerLabel>
    <DatePickerControl>
      <DatePickerInput :index="0" :placeholder="props.placeholder" />
      <template v-if="range">
        <span data-slot="date-picker-separator" :class="separatorClass">
          {{ props.rangeSeparator ?? "–" }}
        </span>
        <DatePickerInput :index="1" :placeholder="props.placeholder" />
      </template>
      <DatePickerClearTrigger v-if="props.clearable ?? true">
        <component :is="props.clearIcon ?? XIcon" />
      </DatePickerClearTrigger>
      <DatePickerTrigger>
        <component :is="props.trailingIcon ?? CalendarIcon" />
      </DatePickerTrigger>
    </DatePickerControl>
    <DatePickerContent :mounted="mounted">
      <DayView
        :prev-icon="props.prevIcon ?? ChevronLeftIcon"
        :next-icon="props.nextIcon ?? ChevronRightIcon"
      />
      <GridView
        view="month"
        :rows="(api) => api.getMonthsGrid({ columns: 4, format: 'short' })"
        :prev-icon="props.prevIcon ?? ChevronLeftIcon"
        :next-icon="props.nextIcon ?? ChevronRightIcon"
      />
      <GridView
        view="year"
        :rows="(api) => api.getYearsGrid({ columns: 4 })"
        :prev-icon="props.prevIcon ?? ChevronLeftIcon"
        :next-icon="props.nextIcon ?? ChevronRightIcon"
      />
    </DatePickerContent>
  </Ark.Root>
</template>

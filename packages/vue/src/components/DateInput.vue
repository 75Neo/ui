<script setup lang="ts">
import type { Component } from "vue";
import {
  DateInput as Ark,
  type DateInputDateValue as DateValue,
  type DateInputSegmentProps,
} from "@ark-ui/vue/date-input";
import { dateInput, dateInputLiteralText, type DateInputProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The date lives outside the shared contract, because React and Vue spell a controlled
 * value too differently to share one type. Here it is `v-model`, with `defaultValue` as
 * the uncontrolled counterpart Ark's root already takes. Both hold an array of
 * `DateValue`, one entry long unless the field is a range; `parseDate`, re-exported
 * from this package, builds one.
 *
 * `min` and `max` are declared here too, because `DateValue` comes from this package's
 * own copy of Ark rather than from `@75neo/themes`.
 */
const props = defineProps<
  DateInputProps<Component> & {
    defaultValue?: DateValue[];
    min?: DateValue;
    max?: DateValue;
    placeholderValue?: DateValue;
    class?: unknown;
  }
>();

const emit = defineEmits<{
  /** Fired when a committed date changes. */
  valueChange: [details: { value: DateValue[]; valueAsString: string[] }];
}>();

defineSlots<{
  /** Replaces the caption above the field. Falls back to `label`. */
  label?: () => unknown;
  /** Replaces the icon before the segments. Falls back to `leadingIcon`. */
  leadingIcon?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the field to a controlled date, which would leave
 * `defaultValue` with nothing to do.
 */
const value = defineModel<DateValue[] | undefined>({ default: undefined });

/** One segment as `SegmentContext` hands it over, which is Ark's own plus its position. */
type Segment = DateInputSegmentProps["segment"] & { index?: number };

/**
 * Hands a literal segment on with its whitespace settled; every other kind unchanged.
 *
 * @remarks
 * Dropping `index` is what makes the rewrite stick. Ark's Vue segment prefers the
 * segment it can look up by that index over the one it was handed, so a copy carrying
 * the index would be thrown away and the original rendered instead. Only the group's
 * index reaches the machine, so the segment's own is not missed.
 */
function settle(segment: Segment): Segment {
  if (segment.type !== "literal") return segment;

  return { ...segment, index: undefined, text: dateInputLiteralText(segment.text) };
}

const theme = useResolvedTheme(
  dateInput,
  "dateInput",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model="value"
    data-slot="base"
    :class="theme.class.base"
    :default-value="props.defaultValue"
    :selection-mode="props.selectionMode"
    :granularity="props.granularity"
    :locale="props.locale"
    :time-zone="props.timeZone"
    :should-force-leading-zeros="props.shouldForceLeadingZeros"
    :hide-time-zone="props.hideTimeZone"
    :min="props.min"
    :max="props.max"
    :placeholder-value="props.placeholderValue"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
    @value-change="emit('valueChange', $event)"
  >
    <Ark.Label
      v-if="props.label != null || $slots.label"
      data-slot="label"
      :class="theme.class.label"
    >
      <slot name="label">{{ props.label }}</slot>
    </Ark.Label>

    <Ark.Control data-slot="control" :class="theme.class.control">
      <span
        v-if="props.leadingIcon || $slots.leadingIcon"
        data-slot="leadingIcon"
        :class="theme.class.leadingIcon"
      >
        <slot name="leadingIcon">
          <component :is="props.leadingIcon" />
        </slot>
      </span>

      <!--
        One group per date, so a range is two of them. `SegmentContext` reads its index
        off the group it sits in, which is why the segments are written out twice rather
        than pulled into a child component.

        A literal segment's text is rewritten on the way in, because ICU's idea of the
        space before AM and PM differs between the runtime that renders the page and the
        one that hydrates it. `dateInputLiteralText` says why, and both adapters call it
        so the two runs agree.
      -->
      <Ark.SegmentGroup :index="0" data-slot="segmentGroup" :class="theme.class.segmentGroup">
        <Ark.SegmentContext v-slot="segment">
          <Ark.Segment
            :segment="settle(segment)"
            data-slot="segment"
            :class="theme.class.segment"
          />
        </Ark.SegmentContext>
      </Ark.SegmentGroup>

      <template v-if="props.selectionMode === 'range'">
        <span data-slot="separator" :class="theme.class.separator">
          {{ props.rangeSeparator ?? "–" }}
        </span>

        <Ark.SegmentGroup :index="1" data-slot="segmentGroup" :class="theme.class.segmentGroup">
          <Ark.SegmentContext v-slot="segment">
            <Ark.Segment
              :segment="settle(segment)"
              data-slot="segment"
              :class="theme.class.segment"
            />
          </Ark.SegmentContext>
        </Ark.SegmentGroup>
      </template>
    </Ark.Control>

    <Ark.HiddenInput :index="0" />
    <Ark.HiddenInput v-if="props.selectionMode === 'range'" :index="1" />
  </Ark.Root>
</template>

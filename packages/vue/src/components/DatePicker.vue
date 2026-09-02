<script setup lang="ts">
import { type Component, onMounted, ref, type UnwrapRef } from "vue";
import {
  DatePicker as Ark,
  type DateValue,
  type UseDatePickerContext,
} from "@ark-ui/vue/date-picker";
import { Calendar, ChevronLeft, ChevronRight, X } from "@lucide/vue";
import { datePicker, type DatePickerProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The date lives outside the shared contract, because React and Vue spell a controlled
 * value too differently to share one type. Here it is `v-model`, with `defaultValue` as
 * the uncontrolled counterpart Ark's root already takes. Both hold an array of
 * `DateValue`, whatever the selection mode; `parseDate`, re-exported from this package,
 * builds one.
 *
 * `min` and `max` are declared here too, because `DateValue` comes from this package's
 * own copy of Ark rather than from `@75neo/themes`.
 */
const props = withDefaults(
  defineProps<
    DatePickerProps<Component> & {
      defaultValue?: DateValue[];
      min?: DateValue;
      max?: DateValue;
      isDateUnavailable?: (date: DateValue, locale: string) => boolean;
      class?: unknown;
    }
  >(),
  /*
   * `clearable` and `closeOnSelect` are the props here whose default is `true`, and
   * they are exactly the props Vue's Boolean casting would get wrong: an absent
   * Boolean-typed prop arrives as `false`, so the clear button would never render and
   * the calendar would stay open after a pick. Every other boolean below defaults to
   * off, which is what the cast produces anyway.
   */
  { clearable: true, closeOnSelect: true },
);

const emit = defineEmits<{
  /** Fired when the selection changes. */
  valueChange: [details: { value: DateValue[]; valueAsString: string[] }];
  /** Fired when the calendar opens or closes. */
  openChange: [details: { open: boolean }];
}>();

defineSlots<{
  /** Replaces the caption above the field. Falls back to `label`. */
  label?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the calendar to a controlled date, which would
 * leave `defaultValue` with nothing to do.
 */
const value = defineModel<DateValue[] | undefined>({ default: undefined });

const theme = useResolvedTheme(
  datePicker,
  "datePicker",
  () => props,
  () => props.class as string | undefined,
);

/*
 * Gates the teleport below. Vue casts an absent Teleport target to nothing during the
 * server pass, so the calendar is left in place until the component is mounted.
 */
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

/** The two views that are a plain grid of labels rather than a calendar. */
const gridViews = ["month", "year"] as const;

/**
 * The cells of the month or year view, four to a row.
 *
 * @remarks
 * The two views differ only in where their labels come from, so the markup is written
 * once and this chooses the grid. React reaches the same place with a local component;
 * a single-file component has no such thing, so the choice is made here.
 */
function gridRows(api: UnwrapRef<UseDatePickerContext>, view: "month" | "year") {
  return view === "month"
    ? api.getMonthsGrid({ columns: 4, format: "short" })
    : api.getYearsGrid({ columns: 4 });
}
</script>

<template>
  <Ark.Root
    v-model="value"
    data-slot="base"
    :class="theme.class.base"
    :default-value="props.defaultValue"
    :selection-mode="props.selectionMode"
    :locale="props.locale"
    :time-zone="props.timeZone"
    :num-of-months="props.numOfMonths"
    :start-of-week="props.startOfWeek"
    :fixed-weeks="props.fixedWeeks"
    :close-on-select="props.closeOnSelect"
    :open-on-click="props.openOnClick"
    :placeholder="props.placeholder"
    :min="props.min"
    :max="props.max"
    :is-date-unavailable="props.isDateUnavailable"
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
      <!-- A range is two dates and so two fields, each editable on its own. -->
      <Ark.Input :index="0" data-slot="input" :class="theme.class.input" />
      <template v-if="props.selectionMode === 'range'">
        <span data-slot="separator" :class="theme.class.separator">
          {{ props.rangeSeparator ?? "–" }}
        </span>
        <Ark.Input :index="1" data-slot="input" :class="theme.class.input" />
      </template>

      <Ark.ClearTrigger
        v-if="props.clearable"
        data-slot="clearTrigger"
        :class="theme.class.clearTrigger"
      >
        <component :is="props.clearIcon ?? X" />
      </Ark.ClearTrigger>
      <Ark.Trigger data-slot="trigger" :class="theme.class.trigger">
        <component :is="props.trailingIcon ?? Calendar" />
      </Ark.Trigger>
    </Ark.Control>

    <!--
      Teleported so an ancestor with `overflow: hidden` cannot clip it. The teleport is
      disabled until mount, which keeps the server pass and the first client render
      identical and leaves nothing for hydration to reconcile — the same thing Ark's
      React Portal does on the other adapter.
    -->
    <Teleport to="body" :disabled="!mounted">
      <Ark.Positioner data-slot="positioner" :class="theme.class.positioner">
        <Ark.Content data-slot="content" :class="theme.class.content">
          <Ark.View view="day" data-slot="view" :class="theme.class.view">
            <Ark.Context v-slot="api">
              <Ark.ViewControl data-slot="viewControl" :class="theme.class.viewControl">
                <Ark.PrevTrigger data-slot="prevTrigger" :class="theme.class.prevTrigger">
                  <component :is="props.prevIcon ?? ChevronLeft" />
                </Ark.PrevTrigger>
                <Ark.ViewTrigger data-slot="viewTrigger" :class="theme.class.viewTrigger">
                  <Ark.RangeText />
                </Ark.ViewTrigger>
                <Ark.NextTrigger data-slot="nextTrigger" :class="theme.class.nextTrigger">
                  <component :is="props.nextIcon ?? ChevronRight" />
                </Ark.NextTrigger>
              </Ark.ViewControl>

              <Ark.Table data-slot="table" :class="theme.class.table">
                <Ark.TableHead data-slot="tableHead" :class="theme.class.tableHead">
                  <Ark.TableRow data-slot="tableRow" :class="theme.class.tableRow">
                    <Ark.TableHeader
                      v-for="weekDay in api.weekDays"
                      :key="weekDay.long"
                      data-slot="tableHeader"
                      :class="theme.class.tableHeader"
                    >
                      {{ weekDay.narrow }}
                    </Ark.TableHeader>
                  </Ark.TableRow>
                </Ark.TableHead>
                <Ark.TableBody data-slot="tableBody" :class="theme.class.tableBody">
                  <Ark.TableRow
                    v-for="(week, index) in api.weeks"
                    :key="index"
                    data-slot="tableRow"
                    :class="theme.class.tableRow"
                  >
                    <Ark.TableCell
                      v-for="day in week"
                      :key="day.toString()"
                      :value="day"
                      data-slot="tableCell"
                      :class="theme.class.tableCell"
                    >
                      <Ark.TableCellTrigger
                        data-slot="tableCellTrigger"
                        :class="theme.class.tableCellTrigger"
                      >
                        {{ day.day }}
                      </Ark.TableCellTrigger>
                    </Ark.TableCell>
                  </Ark.TableRow>
                </Ark.TableBody>
              </Ark.Table>
            </Ark.Context>
          </Ark.View>

          <Ark.View
            v-for="grid in gridViews"
            :key="grid"
            :view="grid"
            data-slot="view"
            :class="theme.class.view"
          >
            <Ark.Context v-slot="api">
              <Ark.ViewControl data-slot="viewControl" :class="theme.class.viewControl">
                <Ark.PrevTrigger data-slot="prevTrigger" :class="theme.class.prevTrigger">
                  <component :is="props.prevIcon ?? ChevronLeft" />
                </Ark.PrevTrigger>
                <Ark.ViewTrigger data-slot="viewTrigger" :class="theme.class.viewTrigger">
                  <Ark.RangeText />
                </Ark.ViewTrigger>
                <Ark.NextTrigger data-slot="nextTrigger" :class="theme.class.nextTrigger">
                  <component :is="props.nextIcon ?? ChevronRight" />
                </Ark.NextTrigger>
              </Ark.ViewControl>

              <Ark.Table data-slot="table" :class="theme.class.table">
                <Ark.TableBody data-slot="tableBody" :class="theme.class.tableBody">
                  <Ark.TableRow
                    v-for="(row, index) in gridRows(api, grid)"
                    :key="index"
                    data-slot="tableRow"
                    :class="theme.class.tableRow"
                  >
                    <Ark.TableCell
                      v-for="cell in row"
                      :key="cell.value"
                      :value="cell.value"
                      data-slot="tableCell"
                      :class="theme.class.tableCell"
                    >
                      <Ark.TableCellTrigger
                        data-slot="tableCellTrigger"
                        :class="theme.class.tableCellTrigger"
                      >
                        {{ cell.label }}
                      </Ark.TableCellTrigger>
                    </Ark.TableCell>
                  </Ark.TableRow>
                </Ark.TableBody>
              </Ark.Table>
            </Ark.Context>
          </Ark.View>
        </Ark.Content>
      </Ark.Positioner>
    </Teleport>
  </Ark.Root>
</template>

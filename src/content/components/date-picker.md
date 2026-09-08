---
title: Date Picker
description: A calendar in a popover that reads and writes one date or a range.
category: Forms
registryItem: date-picker
---

## Usage

The weeks and the weekday names come from the context, so the grid is yours to render and the
calendar arithmetic is not.

```vue
<template>
  <DatePicker :default-value="[parseDate('2026-09-08')]">
    <DatePickerLabel>Release date</DatePickerLabel>
    <DatePickerControl>
      <DatePickerInput />
      <DatePickerTrigger aria-label="Open the calendar">
        <CalendarDays />
      </DatePickerTrigger>
    </DatePickerControl>

    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerView view="day">
          <DatePickerContext v-slot="picker">
            <DatePickerViewControl>
              <DatePickerPrevTrigger><ChevronLeft /></DatePickerPrevTrigger>
              <DatePickerViewTrigger>{{ picker.visibleRangeText.start }}</DatePickerViewTrigger>
              <DatePickerNextTrigger><ChevronRight /></DatePickerNextTrigger>
            </DatePickerViewControl>

            <DatePickerTable>
              <DatePickerTableBody>
                <DatePickerTableRow v-for="(week, index) in picker.weeks" :key="index">
                  <DatePickerTableCell v-for="day in week" :key="day.toString()" :value="day">
                    <DatePickerTableCellTrigger>{{ day.day }}</DatePickerTableCellTrigger>
                  </DatePickerTableCell>
                </DatePickerTableRow>
              </DatePickerTableBody>
            </DatePickerTable>
          </DatePickerContext>
        </DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
</template>
```

## Dates, not Date

Values are `DateValue` objects from the internationalised date library Ark uses, built with
`parseDate` rather than the platform `Date`. That is deliberate: a calendar date has no time and no
zone, and using `Date` for one is how off by a day bugs get in. Convert at the edge, when you send
it.

## Selection

`selectionMode` takes `single`, `multiple` or `range`. In range mode the cells report where they
sit through `data-range-start`, `data-in-range` and their hover equivalents, so the band across the
selection is styling rather than logic.

## Three views

`DatePickerView` takes `day`, `month` or `year`, and the view trigger walks up through them. Render
all three and someone picking a birthday gets there in two clicks instead of forty.

## Availability

`isDateUnavailable` marks dates that cannot be chosen, and those cells report `data-unavailable`
rather than being hidden, so the person can see the shape of what is taken.

<script setup lang="ts">
import { useListCollection } from "@ark-ui/vue/collection";
import { Check, ChevronDown, X } from "@lucide/vue";
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxList,
  ComboboxPositioner,
  ComboboxTrigger,
} from "@/components/vue";

const items = [
  "Accordion",
  "Avatar",
  "Button",
  "Checkbox",
  "Dialog",
  "Popover",
  "Table",
  "Tabs",
  "Tooltip",
];

const { collection, filter } = useListCollection({ initialItems: items });
</script>

<template>
  <div class="max-w-72">
    <Combobox :collection="collection" @input-value-change="filter($event.inputValue)">
      <ComboboxLabel>Find a component</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="Start typing" />
        <ComboboxClearTrigger aria-label="Clear">
          <X />
        </ComboboxClearTrigger>
        <ComboboxTrigger aria-label="Open">
          <ChevronDown />
        </ComboboxTrigger>
      </ComboboxControl>

      <ComboboxPositioner>
        <ComboboxContent>
          <ComboboxEmpty>Nothing matches that.</ComboboxEmpty>
          <ComboboxList>
            <ComboboxItem v-for="item in collection.items" :key="item" :item="item">
              <ComboboxItemText>{{ item }}</ComboboxItemText>
              <ComboboxItemIndicator>
                <Check />
              </ComboboxItemIndicator>
            </ComboboxItem>
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>
  </div>
</template>

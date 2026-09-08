<script setup lang="ts">
import { createListCollection } from "@ark-ui/vue/collection";
import { Check, ChevronDown } from "@lucide/vue";
import {
  Select,
  SelectContent,
  SelectControl,
  SelectHiddenSelect,
  SelectIndicator,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectList,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
} from "@/components/vue";

const collection = createListCollection({
  items: [
    { label: "Blue", value: "blue" },
    { label: "Teal", value: "teal" },
    { label: "Violet", value: "violet" },
    { label: "Rose", value: "rose" },
  ],
});
</script>

<template>
  <div class="max-w-64">
    <Select :collection="collection" :default-value="['teal']">
      <SelectLabel>Primary colour</SelectLabel>
      <SelectControl>
        <SelectTrigger>
          <SelectValueText placeholder="Pick a colour" />
          <SelectIndicator>
            <ChevronDown />
          </SelectIndicator>
        </SelectTrigger>
      </SelectControl>

      <SelectPositioner>
        <SelectContent>
          <SelectList>
            <SelectItem v-for="item in collection.items" :key="item.value" :item="item">
              <SelectItemText>{{ item.label }}</SelectItemText>
              <SelectItemIndicator>
                <Check />
              </SelectItemIndicator>
            </SelectItem>
          </SelectList>
        </SelectContent>
      </SelectPositioner>
      <SelectHiddenSelect />
    </Select>
  </div>
</template>

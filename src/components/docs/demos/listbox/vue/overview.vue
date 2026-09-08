<script setup lang="ts">
import { createListCollection } from "@ark-ui/vue/collection";
import { Check } from "@lucide/vue";
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
} from "@/components/vue";

const collection = createListCollection({
  items: [
    { label: "Accordion", value: "accordion" },
    { label: "Button", value: "button" },
    { label: "Dialog", value: "dialog" },
    { label: "Table", value: "table" },
    { label: "Tabs", value: "tabs" },
  ],
});
</script>

<template>
  <div class="max-w-64">
    <Listbox :collection="collection" selection-mode="multiple" :default-value="['button']">
      <ListboxLabel>Items to install</ListboxLabel>
      <ListboxContent>
        <ListboxItem v-for="item in collection.items" :key="item.value" :item="item">
          <ListboxItemText>{{ item.label }}</ListboxItemText>
          <ListboxItemIndicator>
            <Check />
          </ListboxItemIndicator>
        </ListboxItem>
      </ListboxContent>
    </Listbox>
  </div>
</template>

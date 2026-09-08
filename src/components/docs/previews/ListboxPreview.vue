<script setup lang="ts">
import { Check } from "@lucide/vue";
import { createListCollection } from "@ark-ui/vue/collection";
import Listbox from "@/registry/vue/ui/listbox/Listbox.vue";
import ListboxContent from "@/registry/vue/ui/listbox/ListboxContent.vue";
import ListboxItem from "@/registry/vue/ui/listbox/ListboxItem.vue";
import ListboxItemIndicator from "@/registry/vue/ui/listbox/ListboxItemIndicator.vue";
import ListboxItemText from "@/registry/vue/ui/listbox/ListboxItemText.vue";
import ListboxLabel from "@/registry/vue/ui/listbox/ListboxLabel.vue";

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

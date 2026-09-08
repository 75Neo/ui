<script setup lang="ts">
import { ref } from "vue";
import { Check, ChevronDown, X } from "@lucide/vue";
import { useListCollection } from "@ark-ui/vue/collection";
import Combobox from "@/registry/vue/ui/combobox/Combobox.vue";
import ComboboxClearTrigger from "@/registry/vue/ui/combobox/ComboboxClearTrigger.vue";
import ComboboxContent from "@/registry/vue/ui/combobox/ComboboxContent.vue";
import ComboboxControl from "@/registry/vue/ui/combobox/ComboboxControl.vue";
import ComboboxEmpty from "@/registry/vue/ui/combobox/ComboboxEmpty.vue";
import ComboboxInput from "@/registry/vue/ui/combobox/ComboboxInput.vue";
import ComboboxItem from "@/registry/vue/ui/combobox/ComboboxItem.vue";
import ComboboxItemIndicator from "@/registry/vue/ui/combobox/ComboboxItemIndicator.vue";
import ComboboxItemText from "@/registry/vue/ui/combobox/ComboboxItemText.vue";
import ComboboxLabel from "@/registry/vue/ui/combobox/ComboboxLabel.vue";
import ComboboxList from "@/registry/vue/ui/combobox/ComboboxList.vue";
import ComboboxPositioner from "@/registry/vue/ui/combobox/ComboboxPositioner.vue";
import ComboboxTrigger from "@/registry/vue/ui/combobox/ComboboxTrigger.vue";

const items = ref([
  "Accordion",
  "Avatar",
  "Button",
  "Checkbox",
  "Dialog",
  "Popover",
  "Table",
  "Tabs",
  "Tooltip",
]);

const { collection, filter } = useListCollection({ initialItems: items.value });
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

<script setup lang="ts">
import { Check, ChevronDown } from "@lucide/vue";
import { createListCollection } from "@ark-ui/vue/collection";
import Select from "@/registry/vue/ui/select/Select.vue";
import SelectContent from "@/registry/vue/ui/select/SelectContent.vue";
import SelectControl from "@/registry/vue/ui/select/SelectControl.vue";
import SelectHiddenSelect from "@/registry/vue/ui/select/SelectHiddenSelect.vue";
import SelectIndicator from "@/registry/vue/ui/select/SelectIndicator.vue";
import SelectItem from "@/registry/vue/ui/select/SelectItem.vue";
import SelectItemIndicator from "@/registry/vue/ui/select/SelectItemIndicator.vue";
import SelectItemText from "@/registry/vue/ui/select/SelectItemText.vue";
import SelectLabel from "@/registry/vue/ui/select/SelectLabel.vue";
import SelectList from "@/registry/vue/ui/select/SelectList.vue";
import SelectPositioner from "@/registry/vue/ui/select/SelectPositioner.vue";
import SelectTrigger from "@/registry/vue/ui/select/SelectTrigger.vue";
import SelectValueText from "@/registry/vue/ui/select/SelectValueText.vue";

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

<script setup lang="ts">
import { ref } from "vue";
import { Check, Minus } from "@lucide/vue";
import Checkbox from "@/registry/vue/ui/checkbox/Checkbox.vue";
import CheckboxControl from "@/registry/vue/ui/checkbox/CheckboxControl.vue";
import CheckboxHiddenInput from "@/registry/vue/ui/checkbox/CheckboxHiddenInput.vue";
import CheckboxIndicator from "@/registry/vue/ui/checkbox/CheckboxIndicator.vue";
import CheckboxLabel from "@/registry/vue/ui/checkbox/CheckboxLabel.vue";

const all = ref<boolean | "indeterminate">("indeterminate");
const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
  <div class="flex flex-col gap-5">
    <Checkbox v-model:checked="all">
      <CheckboxControl>
        <CheckboxIndicator>
          <Check v-if="all === true" />
          <Minus v-else />
        </CheckboxIndicator>
      </CheckboxControl>
      <CheckboxLabel>Select every registry item</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>

    <div class="flex flex-wrap items-center gap-6">
      <Checkbox v-for="size in sizes" :key="size" :size="size" default-checked>
        <CheckboxControl>
          <CheckboxIndicator>
            <Check />
          </CheckboxIndicator>
        </CheckboxControl>
        <CheckboxLabel>{{ size }}</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>

      <Checkbox disabled>
        <CheckboxControl>
          <CheckboxIndicator>
            <Check />
          </CheckboxIndicator>
        </CheckboxControl>
        <CheckboxLabel>disabled</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
    </div>
  </div>
</template>

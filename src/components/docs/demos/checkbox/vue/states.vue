<script setup lang="ts">
import { Check, Minus } from "@lucide/vue";
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/vue";
</script>

<template>
  <div class="flex flex-col gap-4">
    <Checkbox>
      <CheckboxControl>
        <CheckboxIndicator>
          <Check />
        </CheckboxIndicator>
      </CheckboxControl>
      <CheckboxLabel>Unchecked</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>

    <Checkbox default-checked>
      <CheckboxControl>
        <CheckboxIndicator>
          <Check />
        </CheckboxIndicator>
      </CheckboxControl>
      <CheckboxLabel>Checked</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>

    <Checkbox default-checked="indeterminate">
      <CheckboxControl>
        <CheckboxIndicator indeterminate>
          <Minus />
        </CheckboxIndicator>
      </CheckboxControl>
      <CheckboxLabel>Indeterminate</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>

    <Checkbox disabled default-checked>
      <CheckboxControl>
        <CheckboxIndicator>
          <Check />
        </CheckboxIndicator>
      </CheckboxControl>
      <CheckboxLabel>Disabled</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  </div>
</template>

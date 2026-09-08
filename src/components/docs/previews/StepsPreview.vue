<script setup lang="ts">
import { Check } from "@lucide/vue";
import Steps from "@/registry/vue/ui/steps/Steps.vue";
import StepsCompletedContent from "@/registry/vue/ui/steps/StepsCompletedContent.vue";
import StepsContent from "@/registry/vue/ui/steps/StepsContent.vue";
import StepsIndicator from "@/registry/vue/ui/steps/StepsIndicator.vue";
import StepsItem from "@/registry/vue/ui/steps/StepsItem.vue";
import StepsList from "@/registry/vue/ui/steps/StepsList.vue";
import StepsNextTrigger from "@/registry/vue/ui/steps/StepsNextTrigger.vue";
import StepsPrevTrigger from "@/registry/vue/ui/steps/StepsPrevTrigger.vue";
import StepsSeparator from "@/registry/vue/ui/steps/StepsSeparator.vue";
import StepsTrigger from "@/registry/vue/ui/steps/StepsTrigger.vue";

const stages = [
  { title: "Register", body: "Add the registry to your components.json." },
  { title: "Install", body: "Run add with the item name you want." },
  { title: "Theme", body: "Import the stylesheet the CLI wrote to your project root." },
];
</script>

<template>
  <Steps :count="stages.length" class="w-full">
    <StepsList>
      <StepsItem v-for="(stage, index) in stages" :key="stage.title" :index="index">
        <StepsTrigger>
          <StepsIndicator>
            <Check class="hidden" />
            {{ index + 1 }}
          </StepsIndicator>
          {{ stage.title }}
        </StepsTrigger>
        <StepsSeparator v-if="index < stages.length - 1" />
      </StepsItem>
    </StepsList>

    <StepsContent v-for="(stage, index) in stages" :key="stage.title" :index="index">
      {{ stage.body }}
    </StepsContent>
    <StepsCompletedContent>Everything is in place.</StepsCompletedContent>

    <div class="flex gap-2">
      <StepsPrevTrigger>Back</StepsPrevTrigger>
      <StepsNextTrigger>Next</StepsNextTrigger>
    </div>
  </Steps>
</template>

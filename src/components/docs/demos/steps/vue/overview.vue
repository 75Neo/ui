<script setup lang="ts">
import {
  Steps,
  StepsCompletedContent,
  StepsContent,
  StepsIndicator,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsSeparator,
  StepsTrigger,
} from "@/components/vue";

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
          <StepsIndicator>{{ index + 1 }}</StepsIndicator>
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

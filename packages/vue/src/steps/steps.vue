<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { Steps as Ark } from "@ark-ui/vue/steps";
import { Check as CheckIcon } from "@lucide/vue";
import { cn, stepsDefaults, stepsSizeData, type StepsRootProps } from "@75neo/themes";
import { stepsVariantsKey } from "./variants";
import StepsCompletedContent from "./completed-content.vue";
import StepsContent from "./content.vue";
import StepsIndicator from "./indicator.vue";
import StepsItem from "./item.vue";
import StepsList from "./list.vue";
import StepsNextTrigger from "./next-trigger.vue";
import StepsPrevTrigger from "./prev-trigger.vue";
import StepsProgress from "./progress.vue";
import StepsSeparator from "./separator.vue";
import StepsTrigger from "./trigger.vue";

const props = withDefaults(
  defineProps<
    StepsRootProps<Component> & {
      class?: unknown;
      /** Controlled step. Falls through to Ark; absent leaves `defaultStep` to work. */
      step?: number;
      /** Initial step. Falls through to Ark. */
      defaultStep?: number;
    }
  >(),
  { linear: false, prevLabel: "Back", nextLabel: "Next" },
);

defineSlots<{
  default?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get size() {
    return props.size ?? stepsDefaults.size;
  },
  get color() {
    return props.color ?? stepsDefaults.color;
  },
});
provide(stepsVariantsKey, resolved);

const titleClass = (size: typeof resolved.size) =>
  cn("font-medium text-highlighted", stepsSizeData.title[size]);
const descriptionClass = (size: typeof resolved.size) =>
  cn("text-dimmed", stepsSizeData.description[size]);
const count = computed(() => props.items.length);
</script>

<template>
  <Ark.Root
    data-slot="steps"
    :data-size="resolved.size"
    :data-color="resolved.color"
    :class="cn('flex w-full flex-col gap-4', props.class as string | undefined)"
    :count="count"
    :step="props.step"
    :default-step="props.defaultStep"
    :linear="props.linear"
    :orientation="props.orientation"
  >
    <StepsList>
      <StepsItem v-for="(item, index) in props.items" :key="item.title" :index="index">
        <StepsTrigger>
          <StepsIndicator>
            <component :is="item.icon" v-if="item.icon !== undefined" />
            <template v-else>
              <span
                data-slot="steps-indicator-number"
                class="group-data-complete/steps-indicator:hidden"
              >
                {{ index + 1 }}
              </span>
              <component
                :is="CheckIcon"
                data-slot="steps-indicator-check"
                class="hidden size-[1em] group-data-complete/steps-indicator:inline-block"
              />
            </template>
          </StepsIndicator>
          <span
            data-slot="steps-trigger-text"
            class="flex min-w-0 flex-col items-start gap-0.5 text-start"
          >
            <span data-slot="steps-trigger-title" :class="titleClass(resolved.size)">
              {{ item.title }}
            </span>
            <span
              v-if="item.description != null"
              data-slot="steps-trigger-description"
              :class="descriptionClass(resolved.size)"
            >
              {{ item.description }}
            </span>
          </span>
        </StepsTrigger>
        <StepsSeparator />
      </StepsItem>
    </StepsList>
    <StepsProgress />
    <StepsContent v-for="(item, index) in props.items" :key="item.title" :index="index">
      {{ item.title }}<template v-if="item.description != null"> — {{ item.description }}</template>
    </StepsContent>
    <StepsCompletedContent v-if="props.completedContent != null">
      <component :is="props.completedContent" />
    </StepsCompletedContent>
    <div data-slot="steps-actions" class="flex items-center justify-end gap-2">
      <StepsPrevTrigger>{{ props.prevLabel }}</StepsPrevTrigger>
      <StepsNextTrigger>{{ props.nextLabel }}</StepsNextTrigger>
    </div>
    <slot />
  </Ark.Root>
</template>

<script setup lang="ts">
import { Steps as Ark } from "@ark-ui/vue/steps";
import { steps, type StepsItem, type StepsProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The current step lives outside the shared contract, because React and Vue spell a
 * controlled value too differently to share one type. Here it is `v-model:step`,
 * with `defaultStep` as the uncontrolled counterpart Ark's root already takes.
 */
const props = withDefaults(
  defineProps<
    StepsProps & {
      class?: unknown;
      defaultStep?: number;
    }
  >(),
  { prevLabel: "Back", nextLabel: "Next" },
);

const emit = defineEmits<{
  /** Fired whenever the current step changes. */
  stepChange: [details: { step: number }];
  /** Fired once the last step completes. */
  stepComplete: [];
  /** Fired when navigation is blocked in linear mode. */
  stepInvalid: [details: { step: number }];
}>();

defineSlots<{
  /**
   * A step's panel. Falls back to the item's `content` string.
   */
  content?: (props: { item: StepsItem; index: number }) => unknown;
  /** The completion panel. Falls back to `completedContent`. */
  completed?: () => unknown;
}>();

const step = defineModel<number | undefined>("step", { default: undefined });

const theme = useResolvedTheme(
  steps,
  "steps",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model:step="step"
    data-slot="base"
    :class="theme.class.base"
    :orientation="props.orientation"
    :linear="props.linear"
    :default-step="props.defaultStep"
    @step-change="emit('stepChange', $event)"
    @step-complete="emit('stepComplete')"
    @step-invalid="emit('stepInvalid', $event)"
  >
    <Ark.List data-slot="list" :class="theme.class.list">
      <Ark.Item
        v-for="(item, index) in props.items"
        :key="index"
        :index="index"
        data-slot="item"
        :class="theme.class.item"
      >
        <Ark.Trigger data-slot="trigger" :class="theme.class.trigger">
          <Ark.Indicator data-slot="indicator" :class="theme.class.indicator">
            {{ index + 1 }}
          </Ark.Indicator>
          <span data-slot="wrapper" :class="theme.class.wrapper">
            <span data-slot="title" :class="theme.class.title">{{ item.title }}</span>
            <span
              v-if="item.description != null"
              data-slot="description"
              :class="theme.class.description"
            >
              {{ item.description }}
            </span>
          </span>
        </Ark.Trigger>
        <Ark.Separator
          v-if="index < props.items.length - 1"
          data-slot="separator"
          :class="theme.class.separator"
        />
      </Ark.Item>
    </Ark.List>

    <template v-for="(item, index) in props.items" :key="index">
      <Ark.Content
        v-if="item.content != null || $slots.content"
        :index="index"
        data-slot="content"
        :class="theme.class.content"
      >
        <slot name="content" :item="item" :index="index">{{ item.content }}</slot>
      </Ark.Content>
    </template>

    <Ark.CompletedContent
      v-if="props.completedContent != null || $slots.completed"
      data-slot="completedContent"
      :class="theme.class.completedContent"
    >
      <slot name="completed">{{ props.completedContent }}</slot>
    </Ark.CompletedContent>

    <div data-slot="actions" :class="theme.class.actions">
      <Ark.PrevTrigger data-slot="prevTrigger" :class="theme.class.prevTrigger">
        {{ props.prevLabel }}
      </Ark.PrevTrigger>
      <Ark.NextTrigger data-slot="nextTrigger" :class="theme.class.nextTrigger">
        {{ props.nextLabel }}
      </Ark.NextTrigger>
    </div>
  </Ark.Root>
</template>

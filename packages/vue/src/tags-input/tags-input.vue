<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { X as XIcon } from "@lucide/vue";
import { cn, tagsInputDefaults, type TagsInputRootProps } from "@75neo/themes";
import { tagsInputVariantsKey } from "./variants";
import TagsInputClearTrigger from "./clear-trigger.vue";
import TagsInputControl from "./control.vue";
import TagsInputInput from "./input.vue";
import TagsInputItem from "./item.vue";
import TagsInputItemDeleteTrigger from "./item-delete-trigger.vue";
import TagsInputItemInput from "./item-input.vue";
import TagsInputItemPreview from "./item-preview.vue";
import TagsInputItemText from "./item-text.vue";
import TagsInputLabel from "./label.vue";

const props = withDefaults(
  defineProps<
    TagsInputRootProps<Component> & {
      class?: unknown;
    }
  >(),
  { editable: true, clearable: true },
);

const emit = defineEmits<{
  /** Fired whenever a tag is added, rewritten or removed. */
  valueChange: [details: { value: string[] }];
}>();

defineSlots<{
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the field, leaving `defaultValue` idle.
 */
const value = defineModel<string[] | undefined>({ default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? tagsInputDefaults.color;
  },
  get size() {
    return props.size ?? tagsInputDefaults.size;
  },
});
provide(tagsInputVariantsKey, resolved);

const rootClass = computed(() =>
  cn("flex w-full min-w-0 flex-col gap-1.5", props.class as string | undefined),
);
</script>

<template>
  <Ark.Root
    data-slot="tags-input"
    :class="rootClass"
    :data-color="resolved.color"
    :data-size="resolved.size"
    v-model="value"
    @value-change="emit('valueChange', $event)"
    :max="props.max"
    :max-length="props.maxLength"
    :delimiter="props.delimiter"
    :add-on-paste="props.addOnPaste"
    :allow-duplicates="props.allowDuplicates"
    :allow-overflow="props.allowOverflow"
    :editable="props.editable"
    :blur-behavior="props.blurBehavior"
    :auto-focus="props.autoFocus"
    :validate="props.validate"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
  >
    <TagsInputLabel v-if="props.label != null">{{ props.label }}</TagsInputLabel>
    <TagsInputControl>
      <Ark.Context v-slot="api">
        <TagsInputItem
          v-for="(tag, index) in api.value"
          :key="`${tag}-${index}`"
          :index="index"
          :value="tag"
        >
          <TagsInputItemPreview>
            <TagsInputItemText>{{ tag }}</TagsInputItemText>
            <TagsInputItemDeleteTrigger>
              <component :is="props.deleteIcon ?? XIcon" />
            </TagsInputItemDeleteTrigger>
          </TagsInputItemPreview>
          <TagsInputItemInput />
        </TagsInputItem>
      </Ark.Context>
      <TagsInputInput :placeholder="props.placeholder" />
      <TagsInputClearTrigger v-if="props.clearable">
        <component :is="props.clearIcon ?? XIcon" />
      </TagsInputClearTrigger>
    </TagsInputControl>
  </Ark.Root>
</template>

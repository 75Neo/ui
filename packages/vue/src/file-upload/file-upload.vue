<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cn, fileUploadDefaults, type FileUploadRootProps } from "@75neo/themes";
import { fileUploadVariantsKey } from "./variants";
import FileUploadDropzone from "./dropzone.vue";
import FileUploadItem from "./item.vue";
import FileUploadItemGroup from "./item-group.vue";
import FileUploadLabel from "./label.vue";
import FileUploadTrigger from "./trigger.vue";

/*
 * `preview` and `list` default to on, so each is declared: without the declaration
 * Vue casts an absent boolean to `false` and both the thumbnails and the whole list
 * disappear from a bare uploader.
 */
const props = withDefaults(
  defineProps<
    FileUploadRootProps<Component> & {
      class?: unknown;
    }
  >(),
  { preview: true, list: true },
);

const files = defineModel<File[] | undefined>({ default: undefined });

defineSlots<{
  default?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? fileUploadDefaults.color;
  },
  get size() {
    return props.size ?? fileUploadDefaults.size;
  },
});
provide(fileUploadVariantsKey, resolved);

const rootClass = computed(() =>
  cn("flex w-full min-w-0 flex-col gap-1.5", props.class as string | undefined),
);
</script>

<template>
  <Ark.Root
    v-model="files"
    :accept="props.accept"
    :max-files="props.maxFiles"
    :max-file-size="props.maxFileSize"
    :min-file-size="props.minFileSize"
    :allow-drop="props.allowDrop"
    :directory="props.directory"
    :capture="props.capture"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
    :locale="props.locale"
    data-slot="file-upload"
    :data-color="resolved.color"
    :data-size="resolved.size"
    :class="rootClass"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      <FileUploadLabel v-if="props.label != null">{{ props.label }}</FileUploadLabel>
      <FileUploadDropzone :title="props.title" :description="props.description" :icon="props.icon">
        <FileUploadTrigger>
          {{ props.triggerLabel ?? "Choose a file" }}
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadItemGroup v-if="props.list">
        <Ark.Context v-slot="api">
          <FileUploadItem
            v-for="file in api.acceptedFiles"
            :key="`${file.name}-${file.size}-${file.lastModified}`"
            :file="file"
            :preview="props.preview"
            :delete-icon="props.deleteIcon"
          />
        </Ark.Context>
      </FileUploadItemGroup>
    </template>
    <Ark.HiddenInput />
  </Ark.Root>
</template>

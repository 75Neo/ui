<script setup lang="ts">
import type { Component } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { UploadCloud, X } from "@lucide/vue";
import { fileUpload, type FileUploadProps, isPreviewableFile } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The files live outside the shared contract, because React and Vue spell a controlled
 * value too differently to share one type. Here they are `v-model`, holding `File[]`.
 */
const props = withDefaults(
  defineProps<
    FileUploadProps<Component> & {
      defaultAcceptedFiles?: File[];
      class?: unknown;
    }
  >(),
  /*
   * The three props here whose default is `true`, and all three are exactly what Vue's
   * Boolean casting would get wrong: an absent Boolean-typed prop arrives as `false`, so
   * dropping would be off, the list would never render and no thumbnail would be drawn
   * unless a caller asked for each by name. Every other boolean below defaults to off,
   * which is what the cast produces anyway.
   */
  { allowDrop: true, preview: true, list: true },
);

const emit = defineEmits<{
  /** Fired whenever the held files change, whether accepted or rejected. */
  fileChange: [details: { acceptedFiles: File[]; rejectedFiles: unknown[] }];
  /** Fired when a file is turned away. */
  fileReject: [details: { files: unknown[] }];
}>();

defineSlots<{
  /** Replaces the caption above the dropzone. Falls back to `label`. */
  label?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the control to a controlled set of files, which
 * would leave `defaultAcceptedFiles` with nothing to do.
 *
 * The caller writes a plain `v-model`, and it is bound to Ark's `acceptedFiles` model
 * below. This is the one component in the library where Ark's model is not called
 * `modelValue`, and translating it here is what keeps the library's own API the same
 * everywhere: every other component takes `v-model` too, and a caller should not have
 * to know which of them wraps a machine that spells it differently.
 */
const files = defineModel<File[] | undefined>({ default: undefined });

const theme = useResolvedTheme(
  fileUpload,
  "fileUpload",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model:accepted-files="files"
    data-slot="base"
    :class="theme.class.base"
    :default-accepted-files="props.defaultAcceptedFiles"
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
    @file-change="emit('fileChange', $event)"
    @file-reject="emit('fileReject', $event)"
  >
    <Ark.Label
      v-if="props.label != null || $slots.label"
      data-slot="label"
      :class="theme.class.label"
    >
      <slot name="label">{{ props.label }}</slot>
    </Ark.Label>

    <!--
      The dropzone is the control, and the button inside it is a second way in rather
      than the only one — which is why `disable-click` is not set: clicking anywhere on
      the area opens the picker.
    -->
    <Ark.Dropzone data-slot="dropzone" :class="theme.class.dropzone">
      <span data-slot="leadingIcon" :class="theme.class.leadingIcon">
        <component :is="props.icon ?? UploadCloud" />
      </span>
      <p data-slot="title" :class="theme.class.title">
        {{ props.title ?? "Drop a file here" }}
      </p>
      <p v-if="props.description != null" data-slot="description" :class="theme.class.description">
        {{ props.description }}
      </p>
      <Ark.Trigger data-slot="trigger" :class="theme.class.trigger">
        {{ props.triggerLabel ?? "Choose a file" }}
      </Ark.Trigger>
    </Ark.Dropzone>

    <Ark.ItemGroup v-if="props.list" data-slot="list" :class="theme.class.list">
      <Ark.Context v-slot="api">
        <Ark.Item
          v-for="file in api.acceptedFiles"
          :key="`${file.name}-${file.size}-${file.lastModified}`"
          :file="file"
          data-slot="item"
          :class="theme.class.item"
        >
          <!--
            Drawn for an image and skipped for anything else, so a row's height comes
            from its text and does not jump between kinds.
          -->
          <Ark.ItemPreview
            v-if="props.preview && isPreviewableFile(file)"
            type="image/*"
            data-slot="itemPreview"
            :class="theme.class.itemPreview"
          >
            <Ark.ItemPreviewImage
              data-slot="itemPreviewImage"
              :class="theme.class.itemPreviewImage"
            />
          </Ark.ItemPreview>
          <div data-slot="wrapper" :class="theme.class.wrapper">
            <Ark.ItemName data-slot="itemName" :class="theme.class.itemName">
              {{ file.name }}
            </Ark.ItemName>
            <Ark.ItemSizeText data-slot="itemSizeText" :class="theme.class.itemSizeText" />
          </div>
          <Ark.ItemDeleteTrigger
            data-slot="itemDeleteTrigger"
            :class="theme.class.itemDeleteTrigger"
          >
            <component :is="props.deleteIcon ?? X" />
          </Ark.ItemDeleteTrigger>
        </Ark.Item>
      </Ark.Context>
    </Ark.ItemGroup>

    <!--
      The one part with no slot of its own: it is hidden by contract, so a class on it
      would style nothing. It is what puts the files into a form.
    -->
    <Ark.HiddenInput />
  </Ark.Root>
</template>

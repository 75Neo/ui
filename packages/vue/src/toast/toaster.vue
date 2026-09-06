<script setup lang="ts">
import { type Component, computed, onMounted, provide, reactive, ref } from "vue";
import { Toast as Ark, Toaster as ArkToaster, type CreateToasterReturn } from "@ark-ui/vue/toast";
import { X as XIcon } from "@lucide/vue";
import { cn, toastDefaults, type ToasterProps as ToasterContract } from "@75neo/themes";
import { toastVariantsKey } from "./variants";
import ToastActionTrigger from "./action-trigger.vue";
import ToastCloseTrigger from "./close-trigger.vue";
import ToastDescription from "./description.vue";
import ToastRoot from "./root.vue";
import ToastTitle from "./title.vue";

/*
 * `close` and `portal` default to on, so both are declared: without the
 * declaration Vue casts an absent boolean to `false` and the cross vanishes and
 * the stack renders inline on a bare toaster.
 */
const props = withDefaults(
  defineProps<
    ToasterContract<Component, CreateToasterReturn> & {
      class?: unknown;
    }
  >(),
  { close: true, portal: true },
);

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get size() {
    return props.size ?? toastDefaults.size;
  },
});
provide(toastVariantsKey, resolved);

/*
 * Gates the teleport below. Vue casts an absent Teleport target to nothing during the
 * server pass, so the stack is left in place until the component is mounted.
 */
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

const toasterClass = computed(() => cn("z-50", props.class as string | undefined));
</script>

<template>
  <Teleport to="body" :disabled="!props.portal || !mounted">
    <ArkToaster
      data-slot="toast-toaster"
      :data-size="resolved.size"
      :toaster="props.toaster"
      :class="toasterClass"
    >
      <template #default="toast">
        <ToastRoot :key="toast.id">
          <ToastTitle v-if="toast.title != null">{{ toast.title }}</ToastTitle>
          <ToastDescription v-if="toast.description != null">
            {{ toast.description }}
          </ToastDescription>
          <ToastActionTrigger v-if="toast.action != null" @click="toast.action.onClick">
            {{ toast.action.label }}
          </ToastActionTrigger>
          <ToastCloseTrigger v-if="props.close" aria-label="Close toast">
            <component :is="props.closeIcon ?? XIcon" />
          </ToastCloseTrigger>
        </ToastRoot>
      </template>
    </ArkToaster>
  </Teleport>
</template>

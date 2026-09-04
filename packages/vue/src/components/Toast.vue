<script setup lang="ts">
import { type Component, onMounted, ref } from "vue";
import {
  Toaster as ArkToaster,
  Toast as ArkToast,
  type CreateToasterReturn,
} from "@ark-ui/vue/toast";
import { CircleAlert, CircleCheck, Info, LoaderCircle, TriangleAlert, X } from "@lucide/vue";
import { toast, type ToastProps, type ToastType } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

const defaultIcons: Record<ToastType, Component> = {
  success: CircleCheck,
  error: CircleAlert,
  warning: TriangleAlert,
  info: Info,
  loading: LoaderCircle,
};

const props = withDefaults(
  defineProps<
    ToastProps<Component> & {
      toaster: CreateToasterReturn<any>;
      class?: unknown;
    }
  >(),
  {
    portal: true,
  },
);

const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

function resolveIcon(type?: string): Component | undefined {
  if (!type) return undefined;
  const t = type as ToastType;
  return props.icons?.[t] ?? defaultIcons[t];
}

const theme = useResolvedTheme(
  toast,
  "toast",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Teleport to="body" :disabled="!props.portal || !mounted">
    <ArkToaster :toaster="props.toaster" data-slot="group" :class="theme.class.group">
      <template #default="t">
        <ArkToast.Root :key="t.id" data-slot="base" :class="theme.class.base">
          <ArkToast.Title
            v-if="t.title != null || resolveIcon(t.type)"
            data-slot="title"
            :class="theme.class.title"
          >
            <span
              v-if="resolveIcon(t.type)"
              data-slot="leadingIcon"
              :class="theme.class.leadingIcon"
            >
              <component :is="resolveIcon(t.type)" />
            </span>
            <component :is="t.title" v-if="typeof t.title === 'object'" />
            <template v-else>{{ t.title }}</template>
          </ArkToast.Title>
          <ArkToast.Description
            v-if="t.description != null"
            data-slot="description"
            :class="theme.class.description"
          >
            <component :is="t.description" v-if="typeof t.description === 'object'" />
            <template v-else>{{ t.description }}</template>
          </ArkToast.Description>
          <ArkToast.ActionTrigger
            v-if="t.action"
            data-slot="actionTrigger"
            :class="theme.class.actionTrigger"
          >
            {{ t.action.label }}
          </ArkToast.ActionTrigger>
          <ArkToast.CloseTrigger
            v-if="t.closable !== false"
            data-slot="closeTrigger"
            :class="theme.class.closeTrigger"
            aria-label="Close"
          >
            <component :is="props.closeIcon ?? X" />
          </ArkToast.CloseTrigger>
        </ArkToast.Root>
      </template>
    </ArkToaster>
  </Teleport>
</template>

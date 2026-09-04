<script setup lang="ts">
import { type Component } from "vue";
import { NavigationMenu as Ark } from "@ark-ui/vue/navigation-menu";
import { ChevronDown } from "@lucide/vue";
import { navigationMenu, type NavigationMenuItem, type NavigationMenuProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The open row lives outside the shared contract, because React and Vue spell a
 * controlled value too differently to share one type. Here it is `v-model`, holding
 * the open row's value, with `defaultValue` as the uncontrolled counterpart Ark's
 * root already takes.
 */
const props = defineProps<
  NavigationMenuProps<Component> & {
    defaultValue?: string;
    class?: unknown;
    ids?: { root?: string; list?: string; item?: string };
  }
>();

const emit = defineEmits<{
  /** Fired when the open row changes. */
  valueChange: [details: { value: string }];
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the bar to a controlled row, which would leave
 * `defaultValue` with nothing to do.
 */
const value = defineModel<string | undefined>({ default: undefined });

const theme = useResolvedTheme(
  navigationMenu,
  "navigationMenu",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model="value"
    data-slot="base"
    :class="theme.class.base"
    :default-value="props.defaultValue"
    :orientation="props.orientation ?? 'horizontal'"
    :ids="props.ids"
    @value-change="emit('valueChange', $event)"
  >
    <Ark.List data-slot="list" :class="theme.class.list">
      <template v-for="item in props.items as NavigationMenuItem<Component>[]" :key="item.value">
        <Ark.Item
          v-if="item.links != null"
          :value="item.value"
          :disabled="item.disabled"
          data-slot="item"
          :class="theme.class.item"
        >
          <Ark.Trigger :disabled="item.disabled" data-slot="trigger" :class="theme.class.trigger">
            <span v-if="item.icon" data-slot="leadingIcon" :class="theme.class.leadingIcon">
              <component :is="item.icon" />
            </span>
            {{ item.label }}
            <span data-slot="trailingIcon" :class="theme.class.trailingIcon">
              <component :is="props.trailingIcon ?? ChevronDown" />
            </span>
          </Ark.Trigger>

          <Ark.Content :value="item.value" data-slot="content" :class="theme.class.content">
            <Ark.Link
              v-for="link in item.links"
              :key="link.href"
              :href="link.href"
              data-slot="link"
              :class="theme.class.link"
              :close-on-click="link.closeOnClick"
              :current="link.current"
              @select="link.onSelect?.()"
            >
              <span v-if="link.icon" data-slot="linkIcon" :class="theme.class.linkIcon">
                <component :is="link.icon" />
              </span>
              <span data-slot="linkContent" :class="theme.class.linkContent">
                <span data-slot="linkTitle" :class="theme.class.linkTitle">
                  {{ link.title }}
                </span>
                <span
                  v-if="link.description != null"
                  data-slot="linkDescription"
                  :class="theme.class.linkDescription"
                >
                  {{ link.description }}
                </span>
              </span>
            </Ark.Link>
          </Ark.Content>
        </Ark.Item>

        <Ark.Item
          v-else
          :value="item.value"
          :disabled="item.disabled"
          data-slot="item"
          :class="theme.class.item"
        >
          <Ark.Link
            :href="item.href"
            data-slot="link"
            :class="theme.class.link"
            :current="item.current"
          >
            <span v-if="item.icon" data-slot="linkIcon" :class="theme.class.linkIcon">
              <component :is="item.icon" />
            </span>
            {{ item.label }}
          </Ark.Link>
        </Ark.Item>
      </template>
    </Ark.List>
  </Ark.Root>
</template>

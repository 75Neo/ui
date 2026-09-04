<script setup lang="ts">
import type { Component } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";
import type { ResolvedTheme } from "@75neo/core";
import { groupMenuItems, type menu, type MenuItem, menuItemValue } from "@75neo/themes";

/**
 * The rows of one menu panel, and the panels their submenus open.
 *
 * @remarks
 * This is the library's one component that is not a component: nothing exports it and
 * no caller reaches it. It exists because a submenu is another Menu, to any depth, and
 * a `<script setup>` file is the only thing in Vue that can render itself — which is
 * what the recursion needs. React has no such constraint, so its half of this lives as
 * a local function inside `Menu.tsx` and there is no matching file there.
 *
 * Everything the rows need in order to look the same at every depth is handed down
 * rather than read from a provider, because there is exactly one consumer and a
 * provider would be a second way to say the same thing.
 */
const props = defineProps<{
  items: MenuItem<Component>[];
  theme: ResolvedTheme<typeof menu>;
  /** Drawn on a row that opens a submenu. */
  trailingIcon: Component;
  /** Drawn on a checked row. */
  checkedIcon: Component;
  /** Whether a submenu's panel goes to the end of `body`, as the top one's does. */
  portal: boolean;
}>();

/** A row opens a submenu when it has rows of its own. */
function opens(item: MenuItem<Component>): boolean {
  return item.children != null && item.children.length > 0;
}
</script>

<template>
  <Ark.ItemGroup
    v-for="(section, index) in groupMenuItems(props.items)"
    :key="section.label ?? index"
    data-slot="group"
    :class="props.theme.class.group"
  >
    <Ark.ItemGroupLabel
      v-if="section.label != null"
      data-slot="groupLabel"
      :class="props.theme.class.groupLabel"
    >
      {{ section.label }}
    </Ark.ItemGroupLabel>

    <template v-for="(item, position) in section.items" :key="menuItemValue(item, position)">
      <Ark.Separator
        v-if="item.type === 'separator'"
        data-slot="separator"
        :class="props.theme.class.separator"
      />

      <!--
        A submenu is another Menu, nested inside this one's panel, with a row for its
        trigger. That is Ark's own shape, and it is why one recipe styles every level:
        the panel a submenu opens is the same `base` slot as the panel above it.
      -->
      <Ark.Root v-else-if="opens(item)">
        <Ark.TriggerItem data-slot="item" :class="props.theme.class.item">
          <span v-if="item.icon" data-slot="leadingIcon" :class="props.theme.class.leadingIcon">
            <component :is="item.icon" />
          </span>
          <Ark.ItemText data-slot="itemText" :class="props.theme.class.itemText">
            {{ item.label }}
          </Ark.ItemText>
          <span data-slot="trailingIcon" :class="props.theme.class.trailingIcon">
            <component :is="props.trailingIcon" />
          </span>
        </Ark.TriggerItem>

        <Teleport to="body" :disabled="!props.portal">
          <Ark.Positioner data-slot="positioner" :class="props.theme.class.positioner">
            <Ark.Content data-slot="base" :class="props.theme.class.base">
              <MenuRows
                :items="item.children!"
                :theme="props.theme"
                :trailing-icon="props.trailingIcon"
                :checked-icon="props.checkedIcon"
                :portal="props.portal"
              />
            </Ark.Content>
          </Ark.Positioner>
        </Teleport>
      </Ark.Root>

      <Ark.CheckboxItem
        v-else-if="item.type === 'checkbox'"
        :value="menuItemValue(item, position)"
        :checked="item.checked ?? false"
        :disabled="item.disabled"
        :close-on-select="item.closeOnSelect"
        data-slot="item"
        :class="props.theme.class.item"
        @checked-change="item.onCheckedChange?.($event)"
      >
        <span v-if="item.icon" data-slot="leadingIcon" :class="props.theme.class.leadingIcon">
          <component :is="item.icon" />
        </span>
        <Ark.ItemText data-slot="itemText" :class="props.theme.class.itemText">
          {{ item.label }}
        </Ark.ItemText>
        <kbd v-if="item.shortcut != null" data-slot="shortcut" :class="props.theme.class.shortcut">
          {{ item.shortcut }}
        </kbd>
        <Ark.ItemIndicator data-slot="itemIndicator" :class="props.theme.class.itemIndicator">
          <component :is="props.checkedIcon" />
        </Ark.ItemIndicator>
      </Ark.CheckboxItem>

      <!--
        A link row is the anchor itself rather than an anchor inside a row, so the whole
        width is clickable and a middle click opens a tab. `as-child` is what moves
        Ark's own props onto it, which means the classes have to move with them.
      -->
      <Ark.Item
        v-else-if="item.href != null"
        :value="menuItemValue(item, position)"
        :disabled="item.disabled"
        :close-on-select="item.closeOnSelect"
        as-child
        @select="item.onSelect?.()"
      >
        <a :href="item.href" :target="item.target" data-slot="item" :class="props.theme.class.item">
          <span v-if="item.icon" data-slot="leadingIcon" :class="props.theme.class.leadingIcon">
            <component :is="item.icon" />
          </span>
          <Ark.ItemText data-slot="itemText" :class="props.theme.class.itemText">
            {{ item.label }}
          </Ark.ItemText>
          <kbd
            v-if="item.shortcut != null"
            data-slot="shortcut"
            :class="props.theme.class.shortcut"
          >
            {{ item.shortcut }}
          </kbd>
        </a>
      </Ark.Item>

      <Ark.Item
        v-else
        :value="menuItemValue(item, position)"
        :disabled="item.disabled"
        :close-on-select="item.closeOnSelect"
        data-slot="item"
        :class="props.theme.class.item"
        @select="item.onSelect?.()"
      >
        <span v-if="item.icon" data-slot="leadingIcon" :class="props.theme.class.leadingIcon">
          <component :is="item.icon" />
        </span>
        <Ark.ItemText data-slot="itemText" :class="props.theme.class.itemText">
          {{ item.label }}
        </Ark.ItemText>
        <kbd v-if="item.shortcut != null" data-slot="shortcut" :class="props.theme.class.shortcut">
          {{ item.shortcut }}
        </kbd>
      </Ark.Item>
    </template>
  </Ark.ItemGroup>
</template>

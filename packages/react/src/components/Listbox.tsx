import type React from "react";
import { useMemo } from "react";
import { Listbox as Ark, createListCollection, type ListboxRootProps } from "@ark-ui/react/listbox";
import { Check } from "lucide-react";
import { listbox, type ListboxItem, type ListboxProps as ListboxContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/** The item shape this adapter builds its collection from. */
type Item = ListboxItem<React.ReactNode>;

/**
 * Props for the Listbox.
 *
 * @remarks
 * `color` is dropped from the HTML attributes, because the legacy presentational
 * attribute would collide with the variant of the same name. `defaultValue` goes with
 * it, since the attribute admits a string where Ark's root takes an array of them,
 * and `onSelect` because Ark's is called with a selection rather than with a DOM
 * event.
 *
 * The selection props come from Ark, because React and Vue spell a controlled value
 * too differently to share one type.
 */
export interface ListboxProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir" | "onSelect">,
    Pick<
      ListboxRootProps<Item>,
      "value" | "defaultValue" | "onValueChange" | "onHighlightChange" | "onSelect" | "ids"
    >,
    ListboxContract<React.ReactNode> {}

export function Listbox({
  ui,
  color,
  size,
  items,
  label,
  emptyMessage,
  selectionMode,
  deselectable,
  loopFocus,
  disabled,
  selectedIcon,
  value,
  defaultValue,
  onValueChange,
  onHighlightChange,
  onSelect,
  ids,
  className,
  ...rest
}: ListboxProps) {
  const theme = useResolvedTheme(listbox, "listbox", { ui, color, size }, className);

  /*
   * The item shape is exactly what Ark's collection reads by default — `value`,
   * `label` and `disabled` — so no accessors are passed. Rebuilt whenever the options
   * change, which keeps a changed `items` prop honest.
   */
  const collection = useMemo(() => createListCollection({ items }), [items]);

  return (
    <Ark.Root
      {...rest}
      collection={collection}
      data-slot="base"
      className={theme.class.base}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      onHighlightChange={onHighlightChange}
      onSelect={onSelect}
      selectionMode={selectionMode}
      deselectable={deselectable}
      loopFocus={loopFocus}
      disabled={disabled}
      ids={ids}
    >
      {label != null && (
        <Ark.Label data-slot="label" className={theme.class.label}>
          {label}
        </Ark.Label>
      )}

      <Ark.Content data-slot="content" className={theme.class.content}>
        {/* Ark renders this only while the collection is empty, so the message and the
            rows never appear together. */}
        <Ark.Empty data-slot="empty" className={theme.class.empty}>
          {emptyMessage ?? "No options."}
        </Ark.Empty>

        {collection.items.map((item) => (
          <Ark.Item key={item.value} item={item} data-slot="item" className={theme.class.item}>
            {item.icon != null && (
              <span data-slot="leadingIcon" className={theme.class.leadingIcon}>
                {item.icon}
              </span>
            )}
            <Ark.ItemText data-slot="itemText" className={theme.class.itemText}>
              {item.label}
            </Ark.ItemText>
            <Ark.ItemIndicator data-slot="itemIndicator" className={theme.class.itemIndicator}>
              {selectedIcon ?? <Check />}
            </Ark.ItemIndicator>
          </Ark.Item>
        ))}
      </Ark.Content>
    </Ark.Root>
  );
}

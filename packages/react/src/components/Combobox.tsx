import { useMemo, useState } from "react";
import type React from "react";
import {
  Combobox as Ark,
  type ComboboxInputValueChangeDetails,
  type ComboboxRootProps,
  createListCollection,
} from "@ark-ui/react/combobox";
import { Portal } from "@ark-ui/react/portal";
import { Check, ChevronDown, X } from "lucide-react";
import {
  combobox,
  type ComboboxItem,
  comboboxFilterText,
  type ComboboxProps as ComboboxContract,
  filterComboboxItems,
} from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/** The item shape this adapter builds its collection from. */
type Item = ComboboxItem<React.ReactNode>;

/**
 * Props for the Combobox.
 *
 * @remarks
 * `color` is dropped from the HTML attributes, because the legacy presentational
 * attribute would collide with the variant of the same name. `defaultValue` goes with
 * it, since the attribute admits a string where Ark's root takes an array of them, and
 * `onSelect` because Ark's is called with a selection rather than with a DOM event.
 *
 * The selection props come from Ark, because React and Vue spell a controlled value too
 * differently to share one type.
 */
export interface ComboboxProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir" | "onSelect">,
    Pick<
      ComboboxRootProps<Item>,
      "value" | "defaultValue" | "onValueChange" | "onOpenChange" | "ids"
    >,
    ComboboxContract<React.ReactNode> {}

export function Combobox({
  ui,
  color,
  size,
  items,
  label,
  placeholder,
  emptyMessage,
  multiple,
  clearable,
  openOnClick,
  allowCustomValue,
  disabled,
  readOnly,
  invalid,
  required,
  name,
  trailingIcon,
  clearIcon,
  selectedIcon,
  value,
  defaultValue,
  onValueChange,
  onOpenChange,
  ids,
  className,
  ...rest
}: ComboboxProps) {
  const theme = useResolvedTheme(combobox, "combobox", { ui, color, size }, className);
  const [query, setQuery] = useState("");

  /*
   * The item shape is exactly what Ark's collection reads by default — `value`,
   * `label` and `disabled` — so no accessors are passed. Rebuilt whenever the options
   * or the query change, which is why filtering here rather than inside Ark's own
   * `useListCollection` keeps a changed `items` prop honest.
   */
  const collection = useMemo(
    () => createListCollection({ items: filterComboboxItems(items, query) }),
    [items, query],
  );

  return (
    <Ark.Root
      {...rest}
      collection={collection}
      data-slot="base"
      className={theme.class.base}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      onOpenChange={onOpenChange}
      onInputValueChange={(details: ComboboxInputValueChangeDetails) => {
        setQuery(comboboxFilterText(details.inputValue, details.reason));
      }}
      multiple={multiple}
      openOnClick={openOnClick}
      allowCustomValue={allowCustomValue}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      invalid={invalid}
      required={required}
      name={name}
      ids={ids}
    >
      {label != null && (
        <Ark.Label data-slot="label" className={theme.class.label}>
          {label}
        </Ark.Label>
      )}

      <Ark.Control data-slot="control" className={theme.class.control}>
        <Ark.Input data-slot="input" className={theme.class.input} />
        {(clearable ?? true) && (
          <Ark.ClearTrigger data-slot="clearTrigger" className={theme.class.clearTrigger}>
            {clearIcon ?? <X />}
          </Ark.ClearTrigger>
        )}
        <Ark.Trigger data-slot="trigger" className={theme.class.trigger}>
          {trailingIcon ?? <ChevronDown />}
        </Ark.Trigger>
      </Ark.Control>

      {/* Portalled so an ancestor with `overflow: hidden` cannot clip the list. Ark's
          Portal renders inline on the server and moves the list on mount, so nothing
          about the first paint changes. */}
      <Portal>
        <Ark.Positioner data-slot="positioner" className={theme.class.positioner}>
          <Ark.Content data-slot="content" className={theme.class.content}>
            {/* Ark renders this only while the collection is empty, so the message and the
              list never appear together. */}
            <Ark.Empty data-slot="empty" className={theme.class.empty}>
              {emptyMessage ?? "No results found."}
            </Ark.Empty>

            <Ark.List data-slot="list" className={theme.class.list}>
              {collection.items.map((item) => (
                <Ark.Item
                  key={item.value}
                  item={item}
                  data-slot="item"
                  className={theme.class.item}
                >
                  {item.icon != null && (
                    <span data-slot="leadingIcon" className={theme.class.leadingIcon}>
                      {item.icon}
                    </span>
                  )}
                  <Ark.ItemText data-slot="itemText" className={theme.class.itemText}>
                    {item.label}
                  </Ark.ItemText>
                  <Ark.ItemIndicator
                    data-slot="itemIndicator"
                    className={theme.class.itemIndicator}
                  >
                    {selectedIcon ?? <Check />}
                  </Ark.ItemIndicator>
                </Ark.Item>
              ))}
            </Ark.List>
          </Ark.Content>
        </Ark.Positioner>
      </Portal>
    </Ark.Root>
  );
}

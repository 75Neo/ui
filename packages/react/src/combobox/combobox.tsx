import { useMemo, useState } from "react";
import type React from "react";
import {
  createListCollection,
  Combobox as Ark,
  type ComboboxInputValueChangeDetails,
} from "@ark-ui/react/combobox";
import { Portal } from "@ark-ui/react/portal";
import {
  cn,
  comboboxDefaults,
  comboboxFilterText,
  filterComboboxItems,
  type ComboboxOption,
  type ComboboxRootProps as ComboboxContract,
} from "@75neo/themes";
import { ComboboxVariantsContext } from "./variants";
import { ComboboxClearTrigger } from "./clear-trigger";
import { ComboboxContent } from "./content";
import { ComboboxControl } from "./control";
import { ComboboxEmpty } from "./empty";
import { ComboboxInput } from "./input";
import { ComboboxItem } from "./item";
import { ComboboxItemText } from "./item-text";
import { ComboboxLabel } from "./label";
import { ComboboxList } from "./list";
import { ComboboxTrigger } from "./trigger";

/** The item shape this adapter builds its collection from. */
type Item = ComboboxOption<React.ReactNode>;

/**
 * Props for the Combobox.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name. `defaultValue` goes with it, since
 * the attribute admits a string where Ark's root takes an array of them, and
 * `onSelect` because Ark's is called with a selection rather than with a DOM event.
 *
 * The selection props come from Ark, because React and Vue spell a controlled value
 * too differently to share one type.
 */
export interface ComboboxProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir" | "onSelect">,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      "value" | "defaultValue" | "onValueChange" | "onOpenChange" | "ids"
    >,
    ComboboxContract<React.ReactNode> {
  /** A caller-built collection. Hands the rows to the caller to compose. */
  collection?: React.ComponentProps<typeof Ark.Root>["collection"];
  children?: React.ReactNode;
}

export function Combobox({
  color,
  size,
  items,
  collection: collectionProp,
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
  children,
  ...rest
}: ComboboxProps) {
  const resolved = {
    color: color ?? comboboxDefaults.color,
    size: size ?? comboboxDefaults.size,
  };
  const [query, setQuery] = useState("");

  /*
   * The item shape is exactly what Ark's collection reads by default — `value`,
   * `label` and `disabled` — so no accessors are passed. Filtering here rather than
   * inside Ark's own `useListCollection` keeps a changed `items` prop honest.
   */
  const collection = useMemo(
    () =>
      (collectionProp ??
        createListCollection({
          items: filterComboboxItems(items ?? ([] as Item[]), query),
        })) as React.ComponentProps<typeof Ark.Root>["collection"],
    [collectionProp, items, query],
  );

  // The caller-built branch of the union carries Ark's generic collection type;
  // normalize once so the rows below draw from this adapter's item shape.
  const rows = collection.items as Item[];

  return (
    <ComboboxVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        collection={collection}
        data-slot="combobox"
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn("flex w-full min-w-0 flex-col gap-1.5", className)}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        onOpenChange={onOpenChange}
        inputValue={query}
        onInputValueChange={(details: ComboboxInputValueChangeDetails) => {
          setQuery(comboboxFilterText(details.inputValue, details.reason));
        }}
        multiple={multiple}
        openOnClick={openOnClick}
        allowCustomValue={allowCustomValue}
        disabled={disabled}
        readOnly={readOnly}
        invalid={invalid}
        required={required}
        name={name}
        ids={ids}
      >
        {children ??
          (items != null && (
            <>
              {label != null && <ComboboxLabel>{label}</ComboboxLabel>}
              <ComboboxControl>
                <ComboboxInput placeholder={placeholder} />
                {(clearable ?? true) && <ComboboxClearTrigger>{clearIcon}</ComboboxClearTrigger>}
                <ComboboxTrigger>{trailingIcon}</ComboboxTrigger>
              </ComboboxControl>
              {/* Portalled so an ancestor with `overflow: hidden` cannot clip the list.
                  Ark's Portal renders inline on the server and moves the list on mount,
                  so nothing about the first paint changes. */}
              <Portal>
                <ComboboxContent>
                  <ComboboxEmpty>{emptyMessage ?? "No results found."}</ComboboxEmpty>
                  <ComboboxList>
                    {rows.map((item) => (
                      <ComboboxItem key={item.value} item={item} selectedIcon={selectedIcon}>
                        <ComboboxItemText>{item.label}</ComboboxItemText>
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Portal>
            </>
          ))}
      </Ark.Root>
    </ComboboxVariantsContext.Provider>
  );
}

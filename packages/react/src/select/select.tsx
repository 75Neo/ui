import { useMemo } from "react";
import type React from "react";
import { createListCollection, Select as Ark } from "@ark-ui/react/select";
import { Portal } from "@ark-ui/react/portal";
import {
  cn,
  selectDefaults,
  selectSizeData,
  type SelectRootProps as SelectContract,
} from "@75neo/themes";
import { SelectVariantsContext } from "./variants";
import { SelectClearTrigger } from "./clear-trigger";
import { SelectContent } from "./content";
import { SelectControl } from "./control";
import { SelectIndicator } from "./indicator";
import { SelectItem } from "./item";
import { SelectItemText } from "./item-text";
import { SelectLabel } from "./label";
import { SelectList } from "./list";
import { SelectTrigger } from "./trigger";
import { SelectValueText } from "./value-text";

/** The item shape this adapter builds its collection from. */

/**
 * Props for the Select.
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
export interface SelectProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir" | "onSelect">,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      "value" | "defaultValue" | "onValueChange" | "onOpenChange" | "open" | "defaultOpen" | "ids"
    >,
    SelectContract<React.ReactNode> {
  /** A caller-built collection. Hands the rows to the caller to compose. */
  collection?: React.ComponentProps<typeof Ark.Root>["collection"];
  children?: React.ReactNode;
}

export function Select({
  color,
  size,
  items,
  collection: collectionProp,
  label,
  placeholder,
  multiple,
  clearable,
  deselectable,
  loopFocus,
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
  open,
  defaultOpen,
  ids,
  className,
  children,
  ...rest
}: SelectProps) {
  const resolved = {
    color: color ?? selectDefaults.color,
    size: size ?? selectDefaults.size,
  };

  /*
   * The item shape is exactly what Ark's collection reads by default — `value`,
   * `label` and `disabled` — so no accessors are passed. Rebuilt only when the
   * options change. A caller-built collection hands the rows to the caller instead.
   */
  const collection = useMemo(
    () =>
      (collectionProp ?? createListCollection({ items: items ?? [] })) as React.ComponentProps<
        typeof Ark.Root
      >["collection"],
    [collectionProp, items],
  );

  return (
    <SelectVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        collection={collection}
        data-slot="select"
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn("flex w-full min-w-0 flex-col gap-1.5", className)}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        onOpenChange={onOpenChange}
        open={open}
        defaultOpen={defaultOpen}
        multiple={multiple}
        deselectable={deselectable}
        loopFocus={loopFocus}
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
              {label != null && <SelectLabel>{label}</SelectLabel>}
              <SelectControl>
                <SelectTrigger>
                  <SelectValueText placeholder={placeholder} />
                </SelectTrigger>
                <span
                  data-slot="select-indicators"
                  className={cn(
                    "pointer-events-none absolute inset-e-0 flex items-center",
                    selectSizeData.indicators[resolved.size],
                  )}
                >
                  {(clearable ?? true) && <SelectClearTrigger>{clearIcon}</SelectClearTrigger>}
                  <SelectIndicator>{trailingIcon}</SelectIndicator>
                </span>
              </SelectControl>
              {/* Portalled so an ancestor with `overflow: hidden` cannot clip the list.
                  Ark's Portal renders inline on the server and moves the list on mount,
                  so nothing about the first paint changes. */}
              <Portal>
                <SelectContent>
                  <SelectList>
                    {items.map((item) => (
                      <SelectItem key={item.value} item={item} selectedIcon={selectedIcon}>
                        <SelectItemText>{item.label}</SelectItemText>
                      </SelectItem>
                    ))}
                  </SelectList>
                </SelectContent>
              </Portal>
              {/* The one part with no slot of its own: it is `display: none` by
                  contract, so a class on it would style nothing. It is what puts the
                  selection into a form. */}
              <Ark.HiddenSelect />
            </>
          ))}
      </Ark.Root>
    </SelectVariantsContext.Provider>
  );
}

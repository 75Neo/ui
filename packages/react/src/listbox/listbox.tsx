import { useMemo } from "react";
import type React from "react";
import { createListCollection, Listbox as Ark } from "@ark-ui/react/listbox";
import { cn, listboxDefaults, type ListboxRootProps as ListboxContract } from "@75neo/themes";
import { ListboxVariantsContext } from "./variants";
import { ListboxContent } from "./content";
import { ListboxEmpty } from "./empty";
import { ListboxItem } from "./item";
import { ListboxItemText } from "./item-text";
import { ListboxLabel } from "./label";

/** The item shape this adapter builds its collection from. */

/**
 * Props for the Listbox.
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
export interface ListboxProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir" | "onSelect">,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      "value" | "defaultValue" | "onValueChange" | "onHighlightChange" | "onSelect" | "ids"
    >,
    ListboxContract<React.ReactNode> {
  /** A caller-built collection. Hands the rows to the caller to compose. */
  collection?: React.ComponentProps<typeof Ark.Root>["collection"];
  children?: React.ReactNode;
}

export function Listbox({
  color,
  size,
  items,
  collection: collectionProp,
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
  children,
  ...rest
}: ListboxProps) {
  const resolved = {
    color: color ?? listboxDefaults.color,
    size: size ?? listboxDefaults.size,
  };

  /*
   * The item shape is exactly what Ark's collection reads by default — `value`,
   * `label` and `disabled` — so no accessors are passed. A caller-built collection
   * hands the rows to the caller instead.
   */
  const collection = useMemo(
    () =>
      (collectionProp ?? createListCollection({ items: items ?? [] })) as React.ComponentProps<
        typeof Ark.Root
      >["collection"],
    [collectionProp, items],
  );

  return (
    <ListboxVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        collection={collection}
        data-slot="listbox"
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn("flex w-full min-w-0 flex-col gap-1.5", className)}
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
        {children ??
          (items != null && (
            <>
              {label != null && <ListboxLabel>{label}</ListboxLabel>}
              <ListboxContent>
                <ListboxEmpty>{emptyMessage ?? "No options."}</ListboxEmpty>
                {items.map((item) => (
                  <ListboxItem key={item.value} item={item} selectedIcon={selectedIcon}>
                    <ListboxItemText>{item.label}</ListboxItemText>
                  </ListboxItem>
                ))}
              </ListboxContent>
            </>
          ))}
      </Ark.Root>
    </ListboxVariantsContext.Provider>
  );
}

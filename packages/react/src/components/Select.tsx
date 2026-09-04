import { useMemo } from "react";
import type React from "react";
import { createListCollection, Select as Ark, type SelectRootProps } from "@ark-ui/react/select";
import { Portal } from "@ark-ui/react/portal";
import { Check, ChevronDown, X } from "lucide-react";
import { select, type SelectItem, type SelectProps as SelectContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/** The item shape this adapter builds its collection from. */
type Item = SelectItem<React.ReactNode>;

/**
 * Props for the Select.
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
export interface SelectProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir" | "onSelect">,
    Pick<
      SelectRootProps<Item>,
      "value" | "defaultValue" | "onValueChange" | "onOpenChange" | "open" | "defaultOpen" | "ids"
    >,
    SelectContract<React.ReactNode> {}

export function Select({
  ui,
  color,
  size,
  spin,
  items,
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
  ...rest
}: SelectProps) {
  const theme = useResolvedTheme(select, "select", { ui, color, size, spin }, className);

  /*
   * The item shape is exactly what Ark's collection reads by default — `value`,
   * `label` and `disabled` — so no accessors are passed. Rebuilt only when the options
   * change, which is the whole of the work: unlike the Combobox there is no filter to
   * fold in.
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
      {label != null && (
        <Ark.Label data-slot="label" className={theme.class.label}>
          {label}
        </Ark.Label>
      )}

      <Ark.Control data-slot="control" className={theme.class.control}>
        <Ark.Trigger data-slot="trigger" className={theme.class.trigger}>
          <Ark.ValueText
            data-slot="valueText"
            className={theme.class.valueText}
            placeholder={placeholder}
          />
        </Ark.Trigger>

        {/* Floated over the trigger's trailing edge rather than placed inside it: the
            trigger is a `button`, and a browser will not keep the clear button nested
            in one. The box ignores the pointer so a click beside an icon still opens
            the list, and the clear button takes it back for itself. */}
        <span data-slot="indicators" className={theme.class.indicators}>
          {(clearable ?? true) && (
            <Ark.ClearTrigger data-slot="clearTrigger" className={theme.class.clearTrigger}>
              {clearIcon ?? <X />}
            </Ark.ClearTrigger>
          )}
          <Ark.Indicator data-slot="trailingIcon" className={theme.class.trailingIcon}>
            {trailingIcon ?? <ChevronDown />}
          </Ark.Indicator>
        </span>
      </Ark.Control>

      {/* Portalled so an ancestor with `overflow: hidden` cannot clip the list. Ark's
          Portal renders inline on the server and moves the list on mount, so nothing
          about the first paint changes. */}
      <Portal>
        <Ark.Positioner data-slot="positioner" className={theme.class.positioner}>
          <Ark.Content data-slot="content" className={theme.class.content}>
            <Ark.List data-slot="list" className={theme.class.list}>
              {items.map((item) => (
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

      {/* The one part with no slot of its own: it is `display: none` by contract, so a
          class on it would style nothing. It is what puts the selection into a form. */}
      <Ark.HiddenSelect />
    </Ark.Root>
  );
}

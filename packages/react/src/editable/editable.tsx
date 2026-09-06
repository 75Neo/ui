import type React from "react";
import { Editable as Ark } from "@ark-ui/react/editable";
import { cn, editableDefaults, type EditableRootProps as EditableContract } from "@75neo/themes";
import { EditableVariantsContext } from "./variants";
import { EditableArea } from "./area";
import { EditableCancelTrigger } from "./cancel-trigger";
import { EditableControl } from "./control";
import { EditableEditTrigger } from "./edit-trigger";
import { EditableInput } from "./input";
import { EditableLabel } from "./label";
import { EditablePreview } from "./preview";
import { EditableSubmitTrigger } from "./submit-trigger";

/**
 * Props for the Editable.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name. `defaultValue` goes with it, since
 * the attribute admits a string where Ark's root takes the text, and `dir` because
 * direction belongs to the locale provider.
 *
 * The selection props come from Ark, because React and Vue spell a controlled value
 * too differently to share one type.
 */
export interface EditableProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir">,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      "value" | "defaultValue" | "onValueChange" | "onValueCommit" | "onValueRevert" | "ids"
    >,
    EditableContract<React.ReactNode> {
  /** Whether the field starts editing. */
  defaultEdit?: boolean;
}

export function Editable({
  color,
  size,
  label,
  placeholder,
  activationMode,
  submitMode,
  autoResize,
  maxLength,
  selectOnFocus,
  disabled,
  readOnly,
  invalid,
  required,
  name,
  form,
  editIcon,
  submitIcon,
  cancelIcon,
  value,
  defaultValue,
  defaultEdit,
  onValueChange,
  onValueCommit,
  onValueRevert,
  ids,
  className,
  ...rest
}: EditableProps) {
  const resolved = {
    color: color ?? editableDefaults.color,
    size: size ?? editableDefaults.size,
  };

  return (
    <EditableVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        data-slot="editable"
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn("flex w-full min-w-0 flex-col gap-1.5", className)}
        value={value}
        defaultValue={defaultValue}
        defaultEdit={defaultEdit}
        onValueChange={onValueChange}
        onValueCommit={onValueCommit}
        onValueRevert={onValueRevert}
        activationMode={activationMode}
        submitMode={submitMode}
        autoResize={autoResize}
        maxLength={maxLength}
        selectOnFocus={selectOnFocus}
        disabled={disabled}
        readOnly={readOnly}
        invalid={invalid}
        required={required}
        name={name}
        form={form}
        ids={ids}
      >
        {label != null && <EditableLabel>{label}</EditableLabel>}
        <EditableArea>
          {/* The input and the preview stack in the area's first cell, and Ark hides
              whichever one is not showing, so the field never moves when entered. */}
          <EditableInput placeholder={placeholder} />
          <EditablePreview />
          {/* The buttons swap with the edit state, which only Ark's context knows. */}
          <Ark.Context>
            {(api) => (
              <EditableControl>
                {api.editing ? (
                  <>
                    <EditableSubmitTrigger>{submitIcon}</EditableSubmitTrigger>
                    <EditableCancelTrigger>{cancelIcon}</EditableCancelTrigger>
                  </>
                ) : (
                  <EditableEditTrigger>{editIcon}</EditableEditTrigger>
                )}
              </EditableControl>
            )}
          </Ark.Context>
        </EditableArea>
      </Ark.Root>
    </EditableVariantsContext.Provider>
  );
}

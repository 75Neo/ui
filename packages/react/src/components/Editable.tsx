import type React from "react";
import { Editable as Ark, type EditableRootProps } from "@ark-ui/react/editable";
import { Check, Pencil, X } from "lucide-react";
import { editable, type EditableProps as EditableContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Editable.
 *
 * @remarks
 * `color` is dropped from the HTML attributes, because the legacy presentational
 * attribute would collide with the variant of the same name. `defaultValue` goes with
 * it, since the attribute admits a string where Ark's root takes the field's text
 * under a controlled-or-not of its own, and `onSelect` because Ark's listboxes call
 * theirs with a selection rather than with a DOM event.
 *
 * The text and the edit state come from Ark, because React and Vue spell a controlled
 * value too differently to share one type.
 */
export interface EditableProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir" | "onSelect">,
    Pick<
      EditableRootProps,
      | "value"
      | "defaultValue"
      | "onValueChange"
      | "onValueCommit"
      | "onValueRevert"
      | "edit"
      | "defaultEdit"
      | "onEditChange"
      | "ids"
    >,
    EditableContract<React.ReactNode> {}

export function Editable({
  ui,
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
  onValueChange,
  onValueCommit,
  onValueRevert,
  edit,
  defaultEdit,
  onEditChange,
  ids,
  className,
  ...rest
}: EditableProps) {
  const theme = useResolvedTheme(editable, "editable", { ui, color, size }, className);

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      onValueCommit={onValueCommit}
      onValueRevert={onValueRevert}
      edit={edit}
      defaultEdit={defaultEdit}
      onEditChange={onEditChange}
      placeholder={placeholder}
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
      {label != null && (
        <Ark.Label data-slot="label" className={theme.class.label}>
          {label}
        </Ark.Label>
      )}

      <Ark.Area data-slot="area" className={theme.class.area}>
        {/* The input and the preview stack in the area's first cell, and Ark hides
            whichever one is not showing, so the field never moves when it is entered. */}
        <Ark.Input data-slot="input" className={theme.class.input} />
        <Ark.Preview data-slot="preview" className={theme.class.preview} />

        {/* The buttons swap with the edit state, which only Ark's context knows. */}
        <Ark.Context>
          {(api) => (
            <Ark.Control data-slot="control" className={theme.class.control}>
              {api.editing ? (
                <>
                  <Ark.SubmitTrigger
                    data-slot="submitTrigger"
                    className={theme.class.submitTrigger}
                  >
                    {submitIcon ?? <Check />}
                  </Ark.SubmitTrigger>
                  <Ark.CancelTrigger
                    data-slot="cancelTrigger"
                    className={theme.class.cancelTrigger}
                  >
                    {cancelIcon ?? <X />}
                  </Ark.CancelTrigger>
                </>
              ) : (
                <Ark.EditTrigger data-slot="editTrigger" className={theme.class.editTrigger}>
                  {editIcon ?? <Pencil />}
                </Ark.EditTrigger>
              )}
            </Ark.Control>
          )}
        </Ark.Context>
      </Ark.Area>
    </Ark.Root>
  );
}

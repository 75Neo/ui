import type React from "react";
import { TagsInput as Ark, type TagsInputRootProps } from "@ark-ui/react/tags-input";
import { X } from "lucide-react";
import { tagsInput, type TagsInputProps as TagsInputContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the TagsInput.
 *
 * @remarks
 * `color` is dropped from the HTML attributes, because the legacy presentational
 * attribute would collide with the variant of the same name. `defaultValue` goes with
 * it, since the attribute admits a string where Ark's root takes an array of them.
 *
 * The tag props come from Ark, because React and Vue spell a controlled value too
 * differently to share one type.
 */
export interface TagsInputProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir">,
    Pick<TagsInputRootProps, "value" | "defaultValue" | "onValueChange" | "ids">,
    TagsInputContract<React.ReactNode> {}

export function TagsInput({
  ui,
  color,
  size,
  label,
  placeholder,
  max,
  maxLength,
  delimiter,
  addOnPaste,
  allowDuplicates,
  allowOverflow,
  editable,
  blurBehavior,
  autoFocus,
  clearable,
  validate,
  disabled,
  readOnly,
  invalid,
  required,
  name,
  deleteIcon,
  clearIcon,
  value,
  defaultValue,
  onValueChange,
  ids,
  className,
  ...rest
}: TagsInputProps) {
  const theme = useResolvedTheme(tagsInput, "tagsInput", { ui, color, size }, className);

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      max={max}
      maxLength={maxLength}
      delimiter={delimiter}
      addOnPaste={addOnPaste}
      allowDuplicates={allowDuplicates}
      allowOverflow={allowOverflow}
      editable={editable ?? true}
      blurBehavior={blurBehavior}
      autoFocus={autoFocus}
      validate={validate}
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
        {/* Ark hands back the tags it is holding, so the chips come from its context
            rather than from the prop — which is what keeps an uncontrolled field's
            chips in step with the tags it actually has. */}
        <Ark.Context>
          {(api) =>
            api.value.map((tag, index) => (
              <Ark.Item
                key={`${tag}-${index}`}
                index={index}
                value={tag}
                data-slot="item"
                className={theme.class.item}
              >
                {/* The chip and the field it becomes while being edited. Ark shows one
                    or the other, and both carry the chip's measurements so the swap
                    moves nothing around it. */}
                <Ark.ItemPreview data-slot="itemPreview" className={theme.class.itemPreview}>
                  <Ark.ItemText data-slot="itemText" className={theme.class.itemText}>
                    {tag}
                  </Ark.ItemText>
                  <Ark.ItemDeleteTrigger
                    data-slot="itemDeleteTrigger"
                    className={theme.class.itemDeleteTrigger}
                  >
                    {deleteIcon ?? <X />}
                  </Ark.ItemDeleteTrigger>
                </Ark.ItemPreview>
                <Ark.ItemInput data-slot="itemInput" className={theme.class.itemInput} />
              </Ark.Item>
            ))
          }
        </Ark.Context>

        <Ark.Input data-slot="input" className={theme.class.input} placeholder={placeholder} />

        {(clearable ?? true) && (
          <Ark.ClearTrigger data-slot="clearTrigger" className={theme.class.clearTrigger}>
            {clearIcon ?? <X />}
          </Ark.ClearTrigger>
        )}
      </Ark.Control>

      {/* The one part with no slot of its own: it is hidden by contract, so a class on
          it would style nothing. It is what puts the tags into a form. */}
      <Ark.HiddenInput />
    </Ark.Root>
  );
}

import type React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cn, tagsInputDefaults, type TagsInputRootProps as TagsInputContract } from "@75neo/themes";
import { TagsInputVariantsContext } from "./variants";
import { TagsInputClearTrigger } from "./clear-trigger";
import { TagsInputControl } from "./control";
import { TagsInputInput } from "./input";
import { TagsInputItem } from "./item";
import { TagsInputItemDeleteTrigger } from "./item-delete-trigger";
import { TagsInputItemInput } from "./item-input";
import { TagsInputItemPreview } from "./item-preview";
import { TagsInputItemText } from "./item-text";
import { TagsInputLabel } from "./label";

/**
 * Props for the TagsInput.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name. `defaultValue` goes with it, since
 * the attribute admits a string where Ark's root takes an array of them.
 *
 * The selection props come from Ark, because React and Vue spell a controlled value
 * too differently to share one type.
 */
export interface TagsInputProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue">,
    Pick<React.ComponentProps<typeof Ark.Root>, "value" | "defaultValue" | "onValueChange" | "ids">,
    TagsInputContract<React.ReactNode> {}

export function TagsInput({
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
  deleteIcon,
  clearIcon,
  disabled,
  readOnly,
  invalid,
  required,
  name,
  value,
  defaultValue,
  onValueChange,
  ids,
  className,
  ...rest
}: TagsInputProps) {
  const resolved = {
    color: color ?? tagsInputDefaults.color,
    size: size ?? tagsInputDefaults.size,
  };

  return (
    <TagsInputVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        data-slot="tags-input"
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn("flex w-full min-w-0 flex-col gap-1.5", className)}
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
        {label != null && <TagsInputLabel>{label}</TagsInputLabel>}
        <TagsInputControl>
          {/* Ark hands back the tags it is holding, so the chips come from its context
              rather than from the prop — which is what keeps an uncontrolled field's
              chips in step with the tags it actually has. */}
          <Ark.Context>
            {(api) =>
              api.value.map((tag, index) => (
                <TagsInputItem key={`${tag}-${index}`} index={index} value={tag}>
                  <TagsInputItemPreview>
                    <TagsInputItemText>{tag}</TagsInputItemText>
                    <TagsInputItemDeleteTrigger>{deleteIcon}</TagsInputItemDeleteTrigger>
                  </TagsInputItemPreview>
                  <TagsInputItemInput />
                </TagsInputItem>
              ))
            }
          </Ark.Context>
          <TagsInputInput placeholder={placeholder} />
          {(clearable ?? true) && <TagsInputClearTrigger>{clearIcon}</TagsInputClearTrigger>}
        </TagsInputControl>
      </Ark.Root>
    </TagsInputVariantsContext.Provider>
  );
}

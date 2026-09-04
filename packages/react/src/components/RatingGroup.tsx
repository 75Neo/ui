import type React from "react";
import { RatingGroup as Ark, type RatingGroupRootProps } from "@ark-ui/react/rating-group";
import { Star } from "lucide-react";
import {
  ratingFill,
  ratingGroup,
  type RatingGroupProps as RatingGroupContract,
} from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the RatingGroup.
 *
 * @remarks
 * `color` is dropped from the HTML attributes, because the legacy presentational
 * attribute would collide with the variant of the same name, and `defaultValue` because
 * the attribute admits a string where Ark's root takes a number.
 *
 * The value props come from Ark, because React and Vue spell a controlled value too
 * differently to share one type.
 */
export interface RatingGroupProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir">,
    Pick<RatingGroupRootProps, "value" | "defaultValue" | "onValueChange" | "ids">,
    RatingGroupContract<React.ReactNode> {}

export function RatingGroup({
  ui,
  color,
  size,
  count = 5,
  label,
  allowHalf,
  disabled,
  readOnly,
  required,
  name,
  icon,
  value,
  defaultValue,
  onValueChange,
  ids,
  className,
  ...rest
}: RatingGroupProps) {
  const theme = useResolvedTheme(ratingGroup, "ratingGroup", { ui, color, size }, className);
  const star = icon ?? <Star />;

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      count={count}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      allowHalf={allowHalf}
      disabled={disabled}
      readOnly={readOnly}
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
        {Array.from({ length: count }, (_, index) => (
          <Ark.Item key={index} index={index + 1} data-slot="item" className={theme.class.item}>
            {/* The empty outline underneath, and the filled star on top inside a box
                clipped to nothing, half, or the whole width. */}
            <span data-slot="icon" className={theme.class.icon}>
              {star}
            </span>
            <Ark.ItemContext>
              {(item) => (
                <span
                  data-slot="fill"
                  data-state={ratingFill(item.highlighted, item.half)}
                  className={theme.class.fill}
                >
                  <span data-slot="icon" className={theme.class.icon}>
                    {star}
                  </span>
                </span>
              )}
            </Ark.ItemContext>
          </Ark.Item>
        ))}
      </Ark.Control>

      {/* The one part with no slot of its own: it is hidden by contract, so a class on
          it would style nothing. It is what puts the rating into a form. */}
      <Ark.HiddenInput />
    </Ark.Root>
  );
}

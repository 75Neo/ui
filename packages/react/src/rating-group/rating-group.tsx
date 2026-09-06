import type React from "react";
import { RatingGroup as Ark } from "@ark-ui/react/rating-group";
import { Star } from "lucide-react";
import { cva } from "class-variance-authority";
import {
  cn,
  ratingFill,
  ratingGroupDefaults,
  ratingGroupFillCompoundData,
  ratingGroupSizeData,
  type RatingGroupRootProps as RatingGroupContract,
} from "@75neo/themes";
import { RatingGroupVariantsContext } from "./variants";
import { RatingGroupControl } from "./control";
import { RatingGroupItem } from "./item";
import { RatingGroupLabel } from "./label";

const ratingGroupFill = cva(
  "pointer-events-none absolute inset-s-0 top-0 h-full w-0 overflow-hidden data-[state=full]:w-full data-[state=half]:w-1/2",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
    },
    compoundVariants: ratingGroupFillCompoundData,
    defaultVariants: ratingGroupDefaults,
  },
);

/**
 * Props for the RatingGroup.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name. `defaultValue` goes with it, since
 * the attribute admits a string where Ark's root takes a number.
 *
 * The value comes from Ark, because React and Vue spell a controlled value too
 * differently to share one type. It is a number in both, possibly fractional when
 * halves are allowed.
 */
export interface RatingGroupProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue">,
    Pick<React.ComponentProps<typeof Ark.Root>, "value" | "defaultValue" | "onValueChange" | "ids">,
    RatingGroupContract<React.ReactNode> {}

export function RatingGroup({
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
  const resolved = {
    color: color ?? ratingGroupDefaults.color,
    size: size ?? ratingGroupDefaults.size,
  };
  const star = icon ?? <Star />;
  const fill = ratingGroupFill({ color: resolved.color });

  return (
    <RatingGroupVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        data-slot="rating-group"
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn("flex flex-col gap-1.5", className)}
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
        {label != null && <RatingGroupLabel>{label}</RatingGroupLabel>}
        <RatingGroupControl>
          {Array.from({ length: count }, (_, position) => (
            <RatingGroupItem key={position} index={position + 1}>
              <span
                data-slot="rating-group-icon"
                className={cn(
                  "block shrink-0 [&>svg]:size-full",
                  ratingGroupSizeData.icon[resolved.size],
                )}
              >
                {star}
              </span>
              <Ark.ItemContext>
                {(item) => (
                  <span
                    data-slot="rating-group-fill"
                    data-state={ratingFill(item.highlighted, item.half)}
                    className={cn(fill)}
                  >
                    <span
                      data-slot="rating-group-icon"
                      className={cn(
                        "block shrink-0 [&>svg]:size-full",
                        ratingGroupSizeData.icon[resolved.size],
                      )}
                    >
                      {star}
                    </span>
                  </span>
                )}
              </Ark.ItemContext>
            </RatingGroupItem>
          ))}
        </RatingGroupControl>
        {/* The one part with no slot of its own: it is hidden by contract, so a class
            on it would style nothing. It is what puts the rating into a form. */}
        <Ark.HiddenInput />
      </Ark.Root>
    </RatingGroupVariantsContext.Provider>
  );
}

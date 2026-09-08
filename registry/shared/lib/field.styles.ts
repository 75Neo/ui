import { tv } from "tailwind-variants/lite";

const control =
  "w-full min-w-0 rounded-md bg-default text-default ring ring-default transition-colors outline-none placeholder:text-dimmed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-disabled:pointer-events-none data-disabled:opacity-75 data-invalid:ring-error";

const lineHeight =
  "group-data-[size=lg]/field:h-10 group-data-[size=lg]/field:px-3.5 group-data-[size=lg]/field:text-base group-data-[size=md]/field:h-9 group-data-[size=md]/field:px-3 group-data-[size=md]/field:text-sm group-data-[size=sm]/field:h-8 group-data-[size=sm]/field:px-2.5 group-data-[size=sm]/field:text-xs";

export const field = tv({
  slots: {
    root: "group/field flex w-full min-w-0 flex-col gap-1.5",
    label:
      "flex items-center gap-1 text-sm font-medium text-default data-disabled:opacity-75 data-invalid:text-error",
    requiredIndicator: "text-error",
    input: `${control} ${lineHeight}`,
    textarea: `${control} leading-6 group-data-[size=lg]/field:min-h-24 group-data-[size=lg]/field:px-3.5 group-data-[size=lg]/field:py-2.5 group-data-[size=lg]/field:text-base group-data-[size=md]/field:min-h-20 group-data-[size=md]/field:px-3 group-data-[size=md]/field:py-2 group-data-[size=md]/field:text-sm group-data-[size=sm]/field:min-h-16 group-data-[size=sm]/field:px-2.5 group-data-[size=sm]/field:py-1.5 group-data-[size=sm]/field:text-xs`,
    select: `${control} ${lineHeight} cursor-pointer appearance-none`,
    helperText: "text-xs leading-5 text-muted",
    errorText: "flex items-center gap-1.5 text-xs leading-5 text-error [&>svg]:size-3.5",
  },
});

export type FieldSize = "sm" | "md" | "lg";

import { tv, type VariantProps } from "tailwind-variants";

const accordion = tv({
  slots: {
    root: "w-full",
    item: "border-default border-b last:border-b-0",
    header: "flex",
    trigger:
      "group outline-primary/25 flex min-w-0 flex-1 items-center gap-1.5 rounded-md py-3.5 text-sm font-medium focus-visible:outline-3",
    content:
      "focus:outline-none data-[state=closed]:animate-[accordion-up_200ms_ease-out] data-[state=closed]:overflow-hidden data-[state=open]:animate-[accordion-down_200ms_ease-out]",
    body: "text-muted pb-3.5 text-sm",
    leadingIcon: "size-5 shrink-0",
    trailingIcon:
      "ms-auto size-5 shrink-0 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180 motion-reduce:transition-none",
    label: "text-default text-start wrap-break-word",
  },
  variants: {
    disabled: {
      true: {
        trigger: "cursor-not-allowed opacity-75",
      },
    },
  },
});

type AccordionVariants = VariantProps<typeof accordion>;

export { accordion, type AccordionVariants };

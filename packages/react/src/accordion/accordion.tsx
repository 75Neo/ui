import { cx } from "@75neo/styles/css";
import { accordion, type AccordionVariantProps } from "@75neo/styles/recipes";
import { Accordion as Ark } from "@ark-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";
import { createContext, useContext } from "react";

/**
 * The shared `accordion` slot recipe wearing Ark's accordion.
 *
 * `Root` resolves the recipe once and publishes the resulting slot class names on a
 * context, so `size`, `variant` and `colorPalette` are set in one place and every part
 * below picks up its own class without the caller threading props down the tree.
 */
type AccordionSlots = ReturnType<typeof accordion>;

const StyleContext = createContext<AccordionSlots | null>(null);

const useSlots = (part: string): AccordionSlots => {
  const slots = useContext(StyleContext);

  if (!slots) {
    throw new Error(`<Accordion.${part} /> must be rendered inside <Accordion.Root />`);
  }

  return slots;
};

export interface RootProps extends Ark.RootProps, AccordionVariantProps {}

export const Root = (props: RootProps) => {
  const [variantProps, { className, ...rest }] = accordion.splitVariantProps(props);
  const slots = accordion(variantProps);

  return (
    <StyleContext.Provider value={slots}>
      <Ark.Root className={cx(slots.root, className)} {...rest} />
    </StyleContext.Provider>
  );
};

Root.displayName = "Accordion.Root";

/** `Root`'s counterpart for the `useAccordion` hook — same styling, external state. */
export interface RootProviderProps extends Ark.RootProviderProps, AccordionVariantProps {}

export const RootProvider = (props: RootProviderProps) => {
  const [variantProps, { className, ...rest }] = accordion.splitVariantProps(props);
  const slots = accordion(variantProps);

  return (
    <StyleContext.Provider value={slots}>
      <Ark.RootProvider className={cx(slots.root, className)} {...rest} />
    </StyleContext.Provider>
  );
};

RootProvider.displayName = "Accordion.RootProvider";

export interface ItemProps extends Ark.ItemProps {}

export const Item = ({ className, ...rest }: ItemProps) => {
  const slots = useSlots("Item");

  return <Ark.Item className={cx(slots.item, className)} {...rest} />;
};

Item.displayName = "Accordion.Item";

export interface ItemTriggerProps extends Ark.ItemTriggerProps {}

export const ItemTrigger = ({ className, ...rest }: ItemTriggerProps) => {
  const slots = useSlots("ItemTrigger");

  return <Ark.ItemTrigger className={cx(slots.itemTrigger, className)} {...rest} />;
};

ItemTrigger.displayName = "Accordion.ItemTrigger";

export interface ItemIndicatorProps extends Ark.ItemIndicatorProps {}

export const ItemIndicator = ({ className, children, ...rest }: ItemIndicatorProps) => {
  const slots = useSlots("ItemIndicator");

  return (
    <Ark.ItemIndicator className={cx(slots.itemIndicator, className)} {...rest}>
      {children ?? <ChevronDownIcon aria-hidden="true" focusable="false" />}
    </Ark.ItemIndicator>
  );
};

ItemIndicator.displayName = "Accordion.ItemIndicator";

export interface ItemContentProps extends Ark.ItemContentProps {}

/**
 * Renders the recipe's `itemBody` wrapper around its children. The panel's height is
 * what animates, and a padded element cannot collapse below its own padding — so the
 * padding lives one level in, and callers never have to know that.
 */
export const ItemContent = ({ className, children, ...rest }: ItemContentProps) => {
  const slots = useSlots("ItemContent");

  return (
    <Ark.ItemContent className={cx(slots.itemContent, className)} {...rest}>
      <div className={slots.itemBody}>{children}</div>
    </Ark.ItemContent>
  );
};

ItemContent.displayName = "Accordion.ItemContent";

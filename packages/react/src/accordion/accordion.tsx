import type { AccordionSlots, AccordionVariants, Themes } from "@75neo/styles";
import { Accordion as Ark } from "@ark-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";
import { createContext, useContext, useMemo } from "react";
import { useComponentTheme } from "../theme";

/**
 * The shared `accordion` theme wearing Ark's accordion.
 *
 * `Root` resolves the theme once and publishes the resulting slot functions — together
 * with whatever `ui` it was given — on a context. `size`, `variant`, `colorPalette` and
 * every per-slot override are therefore set in one place, and each part below picks up
 * its own class without the caller threading props down the tree.
 */
type AccordionStyles = {
  slots: ReturnType<Themes["accordion"]>;
  ui: AccordionSlots | undefined;
};

const StyleContext = createContext<AccordionStyles | null>(null);

const useStyles = (part: string): AccordionStyles => {
  const styles = useContext(StyleContext);

  if (!styles) {
    throw new Error(`<Accordion.${part} /> must be rendered inside <Accordion.Root />`);
  }

  return styles;
};

/** The variant props and `ui` bag both roots take. */
interface AccordionOwnProps extends AccordionVariants {
  /**
   * Per-slot class overrides for the whole accordion — `{ itemTrigger: "text-lg" }`
   * reaches every trigger below, without the parts having to be given props one by one.
   */
  ui?: AccordionSlots;
}

export interface RootProps extends Ark.RootProps, AccordionOwnProps {}

export const Root = ({ variant, size, colorPalette, ui, className, ...rest }: RootProps) => {
  const theme = useComponentTheme("accordion");
  const slots = theme({ variant, size, colorPalette });
  const styles = useMemo(() => ({ slots, ui }), [slots, ui]);

  return (
    <StyleContext.Provider value={styles}>
      <Ark.Root className={slots.root({ class: [ui?.root, className] })} {...rest} />
    </StyleContext.Provider>
  );
};

Root.displayName = "Accordion.Root";

/** `Root`'s counterpart for the `useAccordion` hook — same styling, external state. */
export interface RootProviderProps extends Ark.RootProviderProps, AccordionOwnProps {}

export const RootProvider = ({
  variant,
  size,
  colorPalette,
  ui,
  className,
  ...rest
}: RootProviderProps) => {
  const theme = useComponentTheme("accordion");
  const slots = theme({ variant, size, colorPalette });
  const styles = useMemo(() => ({ slots, ui }), [slots, ui]);

  return (
    <StyleContext.Provider value={styles}>
      <Ark.RootProvider className={slots.root({ class: [ui?.root, className] })} {...rest} />
    </StyleContext.Provider>
  );
};

RootProvider.displayName = "Accordion.RootProvider";

export interface ItemProps extends Ark.ItemProps {}

export const Item = ({ className, ...rest }: ItemProps) => {
  const { slots, ui } = useStyles("Item");

  return <Ark.Item className={slots.item({ class: [ui?.item, className] })} {...rest} />;
};

Item.displayName = "Accordion.Item";

export interface ItemTriggerProps extends Ark.ItemTriggerProps {}

export const ItemTrigger = ({ className, ...rest }: ItemTriggerProps) => {
  const { slots, ui } = useStyles("ItemTrigger");

  return (
    <Ark.ItemTrigger
      className={slots.itemTrigger({ class: [ui?.itemTrigger, className] })}
      {...rest}
    />
  );
};

ItemTrigger.displayName = "Accordion.ItemTrigger";

export interface ItemIndicatorProps extends Ark.ItemIndicatorProps {}

export const ItemIndicator = ({ className, children, ...rest }: ItemIndicatorProps) => {
  const { slots, ui } = useStyles("ItemIndicator");

  return (
    <Ark.ItemIndicator
      className={slots.itemIndicator({ class: [ui?.itemIndicator, className] })}
      {...rest}
    >
      {children ?? <ChevronDownIcon aria-hidden="true" focusable="false" />}
    </Ark.ItemIndicator>
  );
};

ItemIndicator.displayName = "Accordion.ItemIndicator";

export interface ItemContentProps extends Ark.ItemContentProps {}

/**
 * Renders the theme's `itemBody` wrapper around its children. The panel's height is what
 * animates, and a padded element cannot collapse below its own padding — so the padding
 * lives one level in, and callers never have to know that.
 */
export const ItemContent = ({ className, children, ...rest }: ItemContentProps) => {
  const { slots, ui } = useStyles("ItemContent");

  return (
    <Ark.ItemContent
      className={slots.itemContent({ class: [ui?.itemContent, className] })}
      {...rest}
    >
      <div className={slots.itemBody({ class: ui?.itemBody })}>{children}</div>
    </Ark.ItemContent>
  );
};

ItemContent.displayName = "Accordion.ItemContent";

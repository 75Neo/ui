import { cx } from "@75neo/styles/css";
import { button, type ButtonVariantProps } from "@75neo/styles/recipes";
import { ark, type HTMLArkProps } from "@ark-ui/react/factory";

export interface ButtonProps extends HTMLArkProps<"button">, ButtonVariantProps {}

/**
 * Ark's polymorphic `button` (so `asChild` works) wearing the shared `button` recipe.
 */
export const Button = (props: ButtonProps) => {
  const [variantProps, { className, ...rest }] = button.splitVariantProps(props);

  return <ark.button className={cx(button(variantProps), className)} {...rest} />;
};

Button.displayName = "Button";

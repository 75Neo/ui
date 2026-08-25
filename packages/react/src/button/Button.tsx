import { button, type ButtonVariants } from "@75neo/styles";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">, ButtonVariants {}

function Button({ variant, size, color, className, ...props }: ButtonProps) {
  return <button className={button({ variant, size, color, className })} {...props} />;
}

export { Button, type ButtonProps };

import { button, type ButtonVariants } from "@75neo/styles";
import type React from "react";

interface ButtonProps extends React.PropsWithChildren<ButtonVariants> {
  ui?: string;
}

function Button({ variant, size, color, ui, children }: ButtonProps) {
  return <button className={button({ variant, size, color, className: ui })}>{children}</button>;
}

export { Button, type ButtonProps };

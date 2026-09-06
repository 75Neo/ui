import type React from "react";
import { NavigationMenu as Ark } from "@ark-ui/react/navigation-menu";
import { cva } from "class-variance-authority";
import {
  cn,
  navigationMenuDefaults,
  navigationMenuLinkCompoundData,
  navigationMenuSizeData,
  type NavigationMenuLinkProps as NavigationMenuLinkContract,
} from "@75neo/themes";
import { useNavigationMenuVariants } from "./variants";

const navigationMenuLink = cva(
  "flex cursor-pointer items-center gap-2.5 rounded-md text-toned no-underline transition-colors outline-none select-none hover:bg-elevated hover:text-highlighted focus-visible:bg-elevated data-current:font-medium data-current:text-highlighted",
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
      size: navigationMenuSizeData.link,
    },
    compoundVariants: navigationMenuLinkCompoundData,
    defaultVariants: navigationMenuDefaults,
  },
);

export interface NavigationMenuLinkProps
  extends
    Omit<React.ComponentProps<typeof Ark.Link>, "href" | "title" | "current">,
    NavigationMenuLinkContract<React.ReactNode> {}

export function NavigationMenuLink({
  href,
  title,
  description,
  leadingIcon,
  current,
  className,
  children,
  ...rest
}: NavigationMenuLinkProps) {
  const variants = useNavigationMenuVariants();

  return (
    <Ark.Link
      {...rest}
      href={href}
      current={current}
      data-slot="navigation-menu-link"
      className={cn(navigationMenuLink(variants), className)}
    >
      {leadingIcon != null && (
        <span
          data-slot="navigation-menu-link-icon"
          className={cn(
            "shrink-0 text-dimmed [&>svg]:size-full",
            navigationMenuSizeData.linkIcon[variants.size],
          )}
        >
          {leadingIcon}
        </span>
      )}
      {title != null ? (
        <span
          data-slot="navigation-menu-link-body"
          className="flex min-w-0 flex-1 flex-col gap-0.5"
        >
          <span
            data-slot="navigation-menu-link-title"
            className={cn(
              "truncate font-medium text-highlighted",
              navigationMenuSizeData.linkTitle[variants.size],
            )}
          >
            {title}
          </span>
          {description != null && (
            <span
              data-slot="navigation-menu-link-description"
              className={cn(
                "truncate text-muted",
                navigationMenuSizeData.linkDescription[variants.size],
              )}
            >
              {description}
            </span>
          )}
        </span>
      ) : (
        children
      )}
    </Ark.Link>
  );
}

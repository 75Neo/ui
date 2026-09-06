import type React from "react";
import { LocaleProvider as ArkLocaleProvider } from "@ark-ui/react/locale";
import {
  cn,
  localeDirection,
  localeProviderDefaults,
  type LocaleProviderRootProps as LocaleProviderContract,
} from "@75neo/themes";

/**
 * Props for the LocaleProvider.
 *
 * @remarks
 * `dir` is dropped from the HTML attributes because this component writes it itself,
 * from the locale or from the prop of the same name.
 */
export interface LocaleProviderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "dir">, LocaleProviderContract {
  /** Everything the application renders. */
  children?: React.ReactNode;
}

/**
 * The element an application is wrapped in: a locale, and the reading direction every
 * `rtl:` utility in the library depends on.
 */
export function LocaleProvider({
  locale = localeProviderDefaults.locale,
  dir,
  className,
  children,
  ...rest
}: LocaleProviderProps) {
  return (
    <ArkLocaleProvider locale={locale}>
      <div
        {...rest}
        dir={dir ?? localeDirection(locale)}
        data-slot="locale-provider"
        className={cn("isolate", className)}
      >
        {children}
      </div>
    </ArkLocaleProvider>
  );
}

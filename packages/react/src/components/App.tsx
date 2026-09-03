import type React from "react";
import { useContext, useMemo } from "react";
import { LocaleProvider } from "@ark-ui/react/locale";
import { layerTheme, resolveTheme } from "@75neo/core";
import { app, type AppProps as AppContract, localeDirection } from "@75neo/themes";
import { ThemeContext } from "../context/ThemeContext";

/**
 * Props for the App.
 *
 * @remarks
 * `dir` is dropped from the HTML attributes because this component writes it itself,
 * from the locale or from the prop of the same name in the shared contract.
 */
export interface AppProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "dir">, AppContract {
  /** Everything the application renders. */
  children?: React.ReactNode;
}

/**
 * The element an application is wrapped in: a theme, a locale, and the reading
 * direction every `rtl:` utility in the library depends on.
 *
 * @remarks
 * The theme is resolved against the config this component publishes rather than the one
 * above it, so an App can restyle itself through its own `theme` prop. That is why the
 * cascade is folded here by hand instead of by rendering a `Theme` around a second
 * component: a `useContext` inside this function would read the provider above it, not
 * the one it is about to render.
 */
export function App({
  ui,
  theme: config,
  locale = "en-US",
  dir,
  className,
  children,
  ...rest
}: AppProps) {
  const parent = useContext(ThemeContext);
  const folded = useMemo(
    () => (config ? (parent ? layerTheme(parent, config) : config) : parent),
    [parent, config],
  );

  const resolved = resolveTheme(app, folded?.app, { ui }, className);

  return (
    <ThemeContext.Provider value={folded}>
      <LocaleProvider locale={locale}>
        <div
          {...rest}
          dir={dir ?? localeDirection(locale)}
          data-slot="base"
          className={resolved.class.base}
        >
          {children}
        </div>
      </LocaleProvider>
    </ThemeContext.Provider>
  );
}

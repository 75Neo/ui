import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { type ReactNode } from "react";
import { useComponentUI } from "../useComponentUI";
import { ThemeProvider } from "../../context/ThemeContext";
import type { SlotClass } from "@75neo/styles";

function wrapper(ui?: Record<string, Record<string, SlotClass>>) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider ui={ui}>{children}</ThemeProvider>;
  };
}

describe("useComponentUI", () => {
  const baseSlots = {
    base: (...args: unknown[]) => `base-${args[0] as string}`,
    label: (...args: unknown[]) => `label-${args[0] as string}`,
  };

  it("returns slot functions that produce base classes when no overrides exist", () => {
    const { result } = renderHook(() => useComponentUI("button", baseSlots), {
      wrapper: wrapper(),
    });

    expect(result.current.base("md")).toBe("base-md");
    expect(result.current.label("ok")).toBe("label-ok");
  });

  it("applies string override from uiProp via twMerge (preserves base)", () => {
    const { result } = renderHook(
      () =>
        useComponentUI("button", baseSlots, {
          base: "override-base",
        }),
      { wrapper: wrapper() },
    );

    expect(result.current.base("md")).toBe("base-md override-base");
    expect(result.current.label("ok")).toBe("label-ok");
  });

  it("applies function override from uiProp", () => {
    const { result } = renderHook(
      () =>
        useComponentUI("button", baseSlots, {
          base: (cls: string) => `${cls}--custom`,
        }),
      { wrapper: wrapper() },
    );

    expect(result.current.base("md")).toBe("base-md--custom");
  });

  it("applies string override from theme context via twMerge", () => {
    const { result } = renderHook(() => useComponentUI("button", baseSlots), {
      wrapper: wrapper({
        button: { base: "ctx-base" },
      }),
    });

    expect(result.current.base("md")).toBe("base-md ctx-base");
  });

  it("applies function override from theme context", () => {
    const { result } = renderHook(() => useComponentUI("button", baseSlots), {
      wrapper: wrapper({
        button: { base: (cls: string) => `${cls}--ctx` },
      }),
    });

    expect(result.current.base("md")).toBe("base-md--ctx");
  });

  it("uiProp overrides theme context", () => {
    const { result } = renderHook(
      () =>
        useComponentUI("button", baseSlots, {
          base: "prop-wins",
        }),
      {
        wrapper: wrapper({
          button: { base: "ctx-loses" },
        }),
      },
    );

    expect(result.current.base("md")).toBe("base-md prop-wins");
    expect(result.current.base("md")).not.toContain("ctx-loses");
  });

  it("resolves different component names independently", () => {
    const { result } = renderHook(() => useComponentUI("button", baseSlots), {
      wrapper: wrapper({
        button: { base: "btn-ctx" },
      }),
    });

    expect(result.current.base("md")).toBe("base-md btn-ctx");

    const { result: result2 } = renderHook(() => useComponentUI("input", baseSlots), {
      wrapper: wrapper({
        input: { base: "input-ctx" },
      }),
    });

    expect(result2.current.base("md")).toBe("base-md input-ctx");
  });

  it("merges string override with tailwind-merge (conflicting utilities deduplicated)", () => {
    const twSlots = {
      base: () => "p-2 bg-red-500",
      label: () => "text-sm",
    };
    const { result } = renderHook(
      () =>
        useComponentUI("button", twSlots, {
          base: "p-4",
        }),
      { wrapper: wrapper() },
    );

    expect(result.current.base()).toBe("bg-red-500 p-4");
    expect(result.current.base()).not.toContain("p-2");
  });

  it("deep merges nested ThemeProviders via defu (child slot does not discard parent slots)", () => {
    function nestedWrapper(
      outer: Record<string, Record<string, SlotClass>>,
      inner: Record<string, Record<string, SlotClass>>,
    ) {
      return function Wrapper({ children }: { children: ReactNode }) {
        return (
          <ThemeProvider ui={outer}>
            <ThemeProvider ui={inner}>{children}</ThemeProvider>
          </ThemeProvider>
        );
      };
    }

    const { result } = renderHook(() => useComponentUI("button", baseSlots), {
      wrapper: nestedWrapper(
        { button: { base: "p-base", label: "p-label" } },
        { button: { base: "c-base" } },
      ),
    });

    expect(result.current.base("md")).toBe("base-md c-base");
    expect(result.current.label("ok")).toBe("label-ok p-label");
  });

  it("deep merges nested providers when child overrides label only", () => {
    function nestedWrapper(
      outer: Record<string, Record<string, SlotClass>>,
      inner: Record<string, Record<string, SlotClass>>,
    ) {
      return function Wrapper({ children }: { children: ReactNode }) {
        return (
          <ThemeProvider ui={outer}>
            <ThemeProvider ui={inner}>{children}</ThemeProvider>
          </ThemeProvider>
        );
      };
    }

    const { result } = renderHook(() => useComponentUI("button", baseSlots), {
      wrapper: nestedWrapper(
        { button: { base: "p-base", label: "p-label" } },
        { button: { label: "c-label" } },
      ),
    });

    expect(result.current.base("md")).toBe("base-md p-base");
    expect(result.current.label("ok")).toBe("label-ok c-label");
  });
});

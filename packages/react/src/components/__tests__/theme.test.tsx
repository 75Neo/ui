import type React from "react";
import { useEffect } from "react";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import type { ThemeConfig, ThemeOverrideOf } from "@75neo/core";
import { useComponentTheme } from "../../hooks/useComponentTheme";
import { Button } from "../Button";
import { Theme } from "../Theme";

async function mount(ui: React.ReactElement): Promise<HTMLElement> {
  const { container } = await render(ui);
  return container;
}

function slot(container: HTMLElement, name: string): HTMLElement | null {
  return container.querySelector<HTMLElement>(`[data-slot='${name}']`);
}

function base(container: HTMLElement): HTMLButtonElement {
  return slot(container, "base") as HTMLButtonElement;
}

describe("Theme", () => {
  it("applies a theme's ui override to a component below it", async () => {
    const container = await mount(
      <Theme theme={{ button: { ui: { base: "p-2" } } }}>
        <Button>Button</Button>
      </Theme>,
    );

    expect(base(container).className).toContain("p-2");
  });

  it("lets the component's ui prop beat the theme", async () => {
    const container = await mount(
      <Theme theme={{ button: { ui: { base: "p-2" } } }}>
        <Button ui={{ base: "p-5" }}>Button</Button>
      </Theme>,
    );

    const cls = base(container).className;
    expect(cls).toContain("p-5");
    expect(cls).not.toContain("p-2");
  });

  it("resolves nested themes nearest-first and merges per slot", async () => {
    const outer: ThemeConfig = { button: { ui: { base: "p-2 rounded-sm", leading: "mr-2" } } };
    const inner: ThemeConfig = { button: { ui: { base: "p-5" } } };

    const container = await mount(
      <Theme theme={outer}>
        <Theme theme={inner}>
          <Button leading>Button</Button>
        </Theme>
      </Theme>,
    );

    const cls = base(container).className;
    expect(cls).toContain("rounded-sm");
    expect(cls).toContain("p-5");
    expect(cls).not.toContain("p-2");
    expect(cls).not.toContain("rounded-md");
    expect(slot(container, "leading")!.className).toContain("mr-2");
  });

  it("keeps classes from every layer that do not conflict", async () => {
    const outer: ThemeConfig = { button: { ui: { base: "rounded-sm" } } };
    const inner: ThemeConfig = { button: { ui: { base: "font-bold" } } };

    const container = await mount(
      <Theme theme={outer}>
        <Theme theme={inner}>
          <Button ui={{ base: "p-5" }}>Button</Button>
        </Theme>
      </Theme>,
    );

    const cls = base(container).className;
    expect(cls).toContain("rounded-sm");
    expect(cls).toContain("font-bold");
    expect(cls).toContain("p-5");
    expect(cls).not.toContain("rounded-md");
  });

  it("merges theme props with the nearest theme winning", async () => {
    let resolved: ThemeOverrideOf<"button">["props"];

    function Probe() {
      const theme = useComponentTheme("button");
      useEffect(() => {
        resolved = theme.props;
      }, [theme]);
      return null;
    }

    await mount(
      <Theme theme={{ button: { props: { size: "lg", color: "error" } } }}>
        <Theme theme={{ button: { props: { color: "primary" } } }}>
          <Probe />
        </Theme>
      </Theme>,
    );

    expect(resolved).toEqual({ size: "lg", color: "primary" });
  });

  it("leaves components outside any Theme untouched", async () => {
    const container = await mount(<Button>Button</Button>);

    const cls = base(container).className;
    expect(cls).toContain("inline-flex");
    expect(cls).toContain("bg-primary");
    expect(cls).toContain("h-8");
    expect(slot(container, "label")).not.toBeNull();
  });
});

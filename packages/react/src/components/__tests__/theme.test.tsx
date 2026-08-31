import type React from "react";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { ButtonKey, type ThemeConfig } from "@75neo/core";
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
      <Theme theme={{ [ButtonKey]: { ui: { base: "p-2" } } }}>
        <Button>Button</Button>
      </Theme>,
    );

    expect(base(container).className).toBe("p-2");
  });

  it("lets the component's ui prop beat the theme", async () => {
    const container = await mount(
      <Theme theme={{ [ButtonKey]: { ui: { base: "p-2" } } }}>
        <Button ui={{ base: "p-5" }}>Button</Button>
      </Theme>,
    );

    expect(base(container).className).toBe("p-5");
  });

  it("resolves nested themes nearest-first and merges per slot", async () => {
    const outer: ThemeConfig = { [ButtonKey]: { ui: { base: "outer", leading: "mr-2" } } };
    const inner: ThemeConfig = {
      [ButtonKey]: { ui: { base: "inner" }, props: { size: "lg", leading: true } },
    };

    const container = await mount(
      <Theme theme={outer}>
        <Theme theme={inner}>
          <Button>Button</Button>
        </Theme>
      </Theme>,
    );

    expect(base(container).className).toBe("inner");
    expect(slot(container, "leading")!.className).toBe("mr-2");
  });

  it("hands a functional override the classes produced by the layers beneath it", async () => {
    const outer: ThemeConfig = { [ButtonKey]: { ui: { base: "outer" } } };
    const inner: ThemeConfig = { [ButtonKey]: { ui: { base: (classes) => `${classes} inner` } } };

    const container = await mount(
      <Theme theme={outer}>
        <Theme theme={inner}>
          <Button ui={{ base: (classes) => `${classes} local` }}>Button</Button>
        </Theme>
      </Theme>,
    );

    expect(base(container).className).toBe("outer inner local");
  });

  it("applies theme props as defaults that explicit props override", async () => {
    const theme: ThemeConfig = { [ButtonKey]: { props: { disabled: true } } };

    const themed = await mount(
      <Theme theme={theme}>
        <Button>Button</Button>
      </Theme>,
    );
    expect(base(themed).disabled).toBe(true);

    const explicit = await mount(
      <Theme theme={theme}>
        <Button disabled={false}>Button</Button>
      </Theme>,
    );
    expect(base(explicit).disabled).toBe(false);
  });

  it("leaves components outside any Theme untouched", async () => {
    const container = await mount(<Button>Button</Button>);

    expect(base(container).className).toBe("");
    expect(slot(container, "label")).not.toBeNull();
  });
});

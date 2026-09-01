import type React from "react";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import type { ThemeConfig } from "@75neo/core";
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

/**
 * The cascade itself is tested in `@75neo/core`, against the resolver. What is left
 * here is the wiring only this adapter can get wrong: that `Theme` reaches a component
 * through context, that nesting composes, and that React's `className` arrives at the
 * resolver as the strongest layer.
 */
describe("Theme", () => {
  it("renders the recipe's own classes with no Theme above it", async () => {
    const container = await mount(<Button>Button</Button>);

    const cls = base(container).className;
    expect(cls).toContain("inline-flex");
    expect(cls).toContain("bg-primary");
    expect(cls).toContain("h-8");
    expect(slot(container, "label")).not.toBeNull();
  });

  it("reaches a component below it through context", async () => {
    const container = await mount(
      <Theme theme={{ button: { ui: { base: "p-2" } } }}>
        <Button>Button</Button>
      </Theme>,
    );

    expect(base(container).className).toContain("p-2");
  });

  it("composes with a Theme nested inside it", async () => {
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
    expect(slot(container, "leading")!.className).toContain("mr-2");
  });

  it("lets className beat the theme", async () => {
    const container = await mount(
      <Theme theme={{ button: { ui: { base: "p-2" } } }}>
        <Button className="p-9">Button</Button>
      </Theme>,
    );

    const cls = base(container).className;
    expect(cls).toContain("p-9");
    expect(cls).not.toContain("p-2");
  });
});

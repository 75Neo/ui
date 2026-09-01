import { describe, expect, it } from "vitest";
import { h } from "vue";
import { render } from "vitest-browser-vue";
import type { ThemeConfig } from "@75neo/core";
import Button from "../Button.vue";
import Theme from "../Theme.vue";

function slot(container: HTMLElement, name: string): HTMLElement | null {
  return container.querySelector<HTMLElement>(`[data-slot='${name}']`);
}

function base(container: HTMLElement): HTMLElement {
  return slot(container, "base")!;
}

/**
 * The cascade itself is tested in `@75neo/core`, against the resolver. What is left
 * here is the wiring only this adapter can get wrong: that `Theme` reaches a component
 * through provide/inject, that nesting composes, and that Vue's `class` arrives at the
 * resolver as the strongest layer.
 */
describe("Theme", () => {
  it("renders the recipe's own classes with no Theme above it", () => {
    const { container } = render(Button, { slots: { default: () => "Button" } });

    const cls = base(container).className;
    expect(cls).toContain("inline-flex");
    expect(cls).toContain("bg-primary");
    expect(cls).toContain("h-8");
    expect(slot(container, "label")).not.toBeNull();
  });

  it("reaches a component below it through provide/inject", () => {
    const { container } = render(Theme, {
      props: { theme: { button: { ui: { base: "p-2" } } } },
      slots: { default: () => h(Button, null, () => "Button") },
    });

    expect(base(container).className).toContain("p-2");
  });

  it("composes with a Theme nested inside it", () => {
    const outer: ThemeConfig = { button: { ui: { base: "p-2 rounded-sm", leading: "mr-2" } } };
    const inner: ThemeConfig = { button: { ui: { base: "p-5" } } };

    const { container } = render(Theme, {
      props: { theme: outer },
      slots: {
        default: () =>
          h(
            Theme,
            { theme: inner },
            { default: () => h(Button, { leading: true }, () => "Button") },
          ),
      },
    });

    const cls = base(container).className;
    expect(cls).toContain("rounded-sm");
    expect(cls).toContain("p-5");
    expect(cls).not.toContain("p-2");
    expect(slot(container, "leading")!.className).toContain("mr-2");
  });

  it("lets class beat the theme", () => {
    const { container } = render(Theme, {
      props: { theme: { button: { ui: { base: "p-2" } } } },
      slots: { default: () => h(Button, { class: "p-9" }, () => "Button") },
    });

    const cls = base(container).className;
    expect(cls).toContain("p-9");
    expect(cls).not.toContain("p-2");
  });
});

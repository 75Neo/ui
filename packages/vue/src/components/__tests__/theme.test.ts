import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";
import { render } from "vitest-browser-vue";
import type { ThemeConfig, ThemeOverrideOf } from "@75neo/core";
import { useComponentTheme } from "../../composables/useComponentTheme.ts";
import Button from "../Button.vue";
import Theme from "../Theme.vue";

function base(container: HTMLElement): HTMLElement {
  return container.querySelector<HTMLElement>("[data-slot='base']")!;
}

function slot(container: HTMLElement, name: string): HTMLElement | null {
  return container.querySelector<HTMLElement>(`[data-slot='${name}']`);
}

describe("Theme", () => {
  it("applies a theme's ui override to a component below it", () => {
    const { container } = render(Theme, {
      props: { theme: { button: { ui: { base: "p-2" } } } },
      slots: { default: () => h(Button, null, () => "Button") },
    });

    expect(base(container).className).toContain("p-2");
  });

  it("lets the component's ui prop beat the theme", () => {
    const { container } = render(Theme, {
      props: { theme: { button: { ui: { base: "p-2" } } } },
      slots: { default: () => h(Button, { ui: { base: "p-5" } }, () => "Button") },
    });

    const cls = base(container).className;
    expect(cls).toContain("p-5");
    expect(cls).not.toContain("p-2");
  });

  it("resolves nested themes nearest-first and merges per slot", () => {
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
    expect(cls).not.toContain("rounded-md");
    expect(slot(container, "leading")!.className).toContain("mr-2");
  });

  it("keeps classes from every layer that do not conflict", () => {
    const outer: ThemeConfig = { button: { ui: { base: "rounded-sm" } } };
    const inner: ThemeConfig = { button: { ui: { base: "font-bold" } } };

    const { container } = render(Theme, {
      props: { theme: outer },
      slots: {
        default: () =>
          h(
            Theme,
            { theme: inner },
            { default: () => h(Button, { ui: { base: "p-5" } }, () => "Button") },
          ),
      },
    });

    const cls = base(container).className;
    expect(cls).toContain("rounded-sm");
    expect(cls).toContain("font-bold");
    expect(cls).toContain("p-5");
    expect(cls).not.toContain("rounded-md");
  });

  it("merges theme props with the nearest theme winning", () => {
    let resolved: ThemeOverrideOf<"button">["props"];

    const Probe = defineComponent(() => {
      resolved = useComponentTheme("button").value.props;
      return () => null;
    });

    render(Theme, {
      props: { theme: { button: { props: { size: "lg", color: "error" } } } },
      slots: {
        default: () =>
          h(
            Theme,
            { theme: { button: { props: { color: "primary" } } } },
            { default: () => h(Probe) },
          ),
      },
    });

    expect(resolved).toEqual({ size: "lg", color: "primary" });
  });

  it("leaves components outside any Theme untouched", () => {
    const { container } = render(Button, { slots: { default: () => "Button" } });

    const cls = base(container).className;
    expect(cls).toContain("inline-flex");
    expect(cls).toContain("bg-primary");
    expect(cls).toContain("h-8");
    expect(slot(container, "label")).not.toBeNull();
  });
});

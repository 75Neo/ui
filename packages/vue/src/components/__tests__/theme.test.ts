import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";
import { render } from "vitest-browser-vue";
import { ButtonKey, type ThemeConfig, type ThemeOverrideOf } from "@75neo/core";
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
      props: { theme: { [ButtonKey]: { ui: { base: "p-2" } } } },
      slots: { default: () => h(Button, null, () => "Button") },
    });

    expect(base(container).className).toBe("p-2");
  });

  it("lets the component's ui prop beat the theme", () => {
    const { container } = render(Theme, {
      props: { theme: { [ButtonKey]: { ui: { base: "p-2" } } } },
      slots: { default: () => h(Button, { ui: { base: "p-5" } }, () => "Button") },
    });

    expect(base(container).className).toBe("p-5");
  });

  it("resolves nested themes nearest-first and merges per slot", () => {
    const outer: ThemeConfig = { [ButtonKey]: { ui: { base: "p-2 rounded-sm", leading: "mr-2" } } };
    const inner: ThemeConfig = { [ButtonKey]: { ui: { base: "p-5" } } };

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

    expect(base(container).className).toBe("rounded-sm p-5");
    expect(slot(container, "leading")!.className).toBe("mr-2");
  });

  it("keeps classes from every layer that do not conflict", () => {
    const outer: ThemeConfig = { [ButtonKey]: { ui: { base: "rounded-sm" } } };
    const inner: ThemeConfig = { [ButtonKey]: { ui: { base: "font-bold" } } };

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

    expect(base(container).className).toBe("rounded-sm font-bold p-5");
  });

  it("merges theme props with the nearest theme winning", () => {
    let resolved: ThemeOverrideOf<typeof ButtonKey>["props"];

    const Probe = defineComponent(() => {
      resolved = useComponentTheme(ButtonKey).value.props;
      return () => null;
    });

    render(Theme, {
      props: { theme: { [ButtonKey]: { props: { size: "lg", color: "error" } } } },
      slots: {
        default: () =>
          h(
            Theme,
            { theme: { [ButtonKey]: { props: { color: "primary" } } } },
            { default: () => h(Probe) },
          ),
      },
    });

    expect(resolved).toEqual({ size: "lg", color: "primary" });
  });

  it("leaves components outside any Theme untouched", () => {
    const { container } = render(Button, { slots: { default: () => "Button" } });

    expect(base(container).className).toBe("");
    expect(slot(container, "label")).not.toBeNull();
  });
});

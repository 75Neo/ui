import { describe, expect, it } from "vitest";
import { h } from "vue";
import { render } from "vitest-browser-vue";
import { ButtonKey, type ThemeConfig } from "@75neo/core";
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
    const outer: ThemeConfig = { [ButtonKey]: { ui: { base: "outer", leading: "mr-2" } } };
    const inner: ThemeConfig = {
      [ButtonKey]: { ui: { base: "inner" }, props: { size: "lg", leading: true } },
    };

    const { container } = render(Theme, {
      props: { theme: outer },
      slots: {
        default: () =>
          h(Theme, { theme: inner }, { default: () => h(Button, null, () => "Button") }),
      },
    });

    expect(base(container).className).toBe("inner");
    expect(slot(container, "leading")!.className).toBe("mr-2");
  });

  it("hands a functional override the classes produced by the layers beneath it", () => {
    const outer: ThemeConfig = { [ButtonKey]: { ui: { base: "outer" } } };
    const inner: ThemeConfig = {
      [ButtonKey]: { ui: { base: (classes) => `${classes} inner` } },
    };

    const { container } = render(Theme, {
      props: { theme: outer },
      slots: {
        default: () =>
          h(
            Theme,
            { theme: inner },
            {
              default: () =>
                h(
                  Button,
                  { ui: { base: (classes: string) => `${classes} local` } },
                  () => "Button",
                ),
            },
          ),
      },
    });

    expect(base(container).className).toBe("outer inner local");
  });

  it("applies theme props as defaults that explicit props override", () => {
    const theme: ThemeConfig = { [ButtonKey]: { props: { disabled: true } } };

    const { container: themed } = render(Theme, {
      props: { theme },
      slots: { default: () => h(Button, null, () => "Button") },
    });
    expect((base(themed) as HTMLButtonElement).disabled).toBe(true);

    const { container: explicit } = render(Theme, {
      props: { theme },
      slots: { default: () => h(Button, { disabled: false }, () => "Button") },
    });
    expect((base(explicit) as HTMLButtonElement).disabled).toBe(false);
  });

  it("leaves components outside any Theme untouched", () => {
    const { container } = render(Button, { slots: { default: () => "Button" } });

    expect(base(container).className).toBe("");
    expect(slot(container, "label")).not.toBeNull();
  });
});

import { describe, expect, it } from "vitest";
import { h } from "vue";
import { userEvent } from "vitest/browser";
import { Circle } from "@lucide/vue";
import { render } from "vitest-browser-vue";
import type { ThemeConfig } from "@75neo/core";
import { accordion, angleSlider } from "@75neo/themes";
import Accordion from "../Accordion.vue";
import AngleSlider from "../AngleSlider.vue";
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
    expect(cls).toContain("px-2.5");
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
    const outer: ThemeConfig = { button: { ui: { base: "p-2 rounded-sm", leadingIcon: "mr-2" } } };
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
    expect(slot(container, "leadingIcon")!.className).toContain("mr-2");
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

// Every item carries an icon so the slot sweep below sees `leadingIcon`, which is
// otherwise only rendered for rows that have one.
const items = [
  { value: "one", label: "First", content: "The first body.", icon: Circle },
  { value: "two", label: "Second", content: "The second body.", icon: Circle },
];

/**
 * Accordion is the first component to wrap Ark UI, so what is worth testing here is the
 * wiring between Ark's parts and this adapter's slots -- not the cascade, which
 * `@75neo/core` already covers against the resolver.
 *
 * Expansion is asserted through `aria-expanded` rather than a `data-state` attribute:
 * Ark stamps `data-state` on the content only while it is closed, so it is absent, not
 * `"open"`, once the item expands.
 */
describe("Accordion", () => {
  it("renders every slot the recipe declares", () => {
    const { container } = render(Accordion, { props: { items } });

    for (const name of Object.keys(accordion.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("expands the item whose trigger is activated", async () => {
    const { container } = render(Accordion, { props: { items } });
    const trigger = slot(container, "trigger")!;

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    await userEvent.click(trigger);

    await expect.poll(() => trigger.getAttribute("aria-expanded")).toBe("true");
  });
});

/**
 * The dial's thumb and markers are full-size overlays that Ark rotates, with the visible
 * dot drawn as a `::before` -- so what is worth testing is that the geometry did not cost
 * the thumb its keyboard wiring. The optional parts are all passed so the slot sweep sees
 * every slot the recipe declares.
 */
describe("AngleSlider", () => {
  it("renders every slot the recipe declares", () => {
    const { container } = render(AngleSlider, {
      props: { label: "Rotation", showValue: true, markers: [0, 90, 180, 270] },
    });

    for (const name of Object.keys(angleSlider.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("advances the angle by one step per arrow key", async () => {
    const { container } = render(AngleSlider, { props: { defaultValue: 0, step: 15 } });
    const thumb = slot(container, "thumb")!;

    expect(thumb.getAttribute("aria-valuenow")).toBe("0");
    thumb.focus();
    await userEvent.keyboard("{ArrowRight}");

    await expect.poll(() => thumb.getAttribute("aria-valuenow")).toBe("15");
  });
});

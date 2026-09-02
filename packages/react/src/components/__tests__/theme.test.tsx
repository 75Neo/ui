import type React from "react";
import { describe, expect, it } from "vitest";
import { userEvent } from "vitest/browser";
import { Circle } from "lucide-react";
import { render } from "vitest-browser-react";
import type { ThemeConfig } from "@75neo/core";
import { accordion, angleSlider, combobox } from "@75neo/themes";
import { Accordion } from "../Accordion";
import { AngleSlider } from "../AngleSlider";
import { Button } from "../Button";
import { Combobox } from "../Combobox";
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
 * The Combobox's list is portalled to the document body, so a query scoped to the render
 * container would miss it. One component is rendered per test and unmounted after it,
 * so the document is as narrow a scope as the container.
 */
function anywhere(name: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[data-slot='${name}']`);
}

function everywhere(name: string): HTMLElement[] {
  return [...document.querySelectorAll<HTMLElement>(`[data-slot='${name}']`)];
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
    expect(cls).toContain("px-2.5");
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
    const outer: ThemeConfig = { button: { ui: { base: "p-2 rounded-sm", leadingIcon: "mr-2" } } };
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
    expect(slot(container, "leadingIcon")!.className).toContain("mr-2");
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

// Every item carries an icon so the slot sweep below sees `leadingIcon`, which is
// otherwise only rendered for rows that have one.
const items = [
  { value: "one", label: "First", content: "The first body.", icon: <Circle /> },
  { value: "two", label: "Second", content: "The second body.", icon: <Circle /> },
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
  it("renders every slot the recipe declares", async () => {
    const container = await mount(<Accordion items={items} />);

    for (const name of Object.keys(accordion.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("expands the item whose trigger is activated", async () => {
    const container = await mount(<Accordion items={items} />);
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
  it("renders every slot the recipe declares", async () => {
    const container = await mount(
      <AngleSlider label="Rotation" showValue markers={[0, 90, 180, 270]} />,
    );

    for (const name of Object.keys(angleSlider.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("advances the angle by one step per arrow key", async () => {
    const container = await mount(<AngleSlider defaultValue={0} step={15} />);
    const thumb = slot(container, "thumb")!;

    expect(thumb.getAttribute("aria-valuenow")).toBe("0");
    thumb.focus();
    await userEvent.keyboard("{ArrowRight}");

    await expect.poll(() => thumb.getAttribute("aria-valuenow")).toBe("15");
  });
});

// Every option carries an icon so the slot sweep below sees `leadingIcon`, which is
// otherwise only rendered for options that have one.
const options = [
  { value: "react", label: "React", icon: <Circle /> },
  { value: "vue", label: "Vue", icon: <Circle /> },
  { value: "svelte", label: "Svelte", icon: <Circle /> },
];

/**
 * The Combobox owns its filter rather than handing the job to Ark, so what is worth
 * testing is that typing narrows the collection and that an unmatched query reaches the
 * empty message. The popup is not portalled, so every part of it is inside the rendered
 * container.
 */
describe("Combobox", () => {
  it("renders every slot the recipe declares", async () => {
    await mount(<Combobox items={options} label="Framework" />);

    for (const name of Object.keys(combobox.slots)) {
      // Ark mounts the empty message only while nothing matches, which is the next test.
      if (name === "empty") continue;
      expect(anywhere(name), name).not.toBeNull();
    }
  });

  it("narrows the list to what has been typed", async () => {
    const container = await mount(<Combobox items={options} />);
    const input = slot(container, "input")!;

    expect(everywhere("item")).toHaveLength(3);

    input.focus();
    await userEvent.keyboard("vu");

    await expect.poll(() => everywhere("item").length).toBe(1);
  });

  it("shows the empty message when nothing matches", async () => {
    const container = await mount(<Combobox items={options} emptyMessage="Nothing here." />);

    slot(container, "input")!.focus();
    await userEvent.keyboard("zzz");

    await expect.poll(() => anywhere("empty")?.textContent).toBe("Nothing here.");
  });
});

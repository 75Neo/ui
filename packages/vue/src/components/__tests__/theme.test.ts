import { describe, expect, it } from "vitest";
import { h } from "vue";
import { userEvent } from "vitest/browser";
import { Circle } from "@lucide/vue";
import { render } from "vitest-browser-vue";
import type { ThemeConfig } from "@75neo/core";
import {
  accordion,
  angleSlider,
  combobox,
  dateInput,
  datePicker,
  dialog,
  popover,
  switch as switchRecipe,
  tooltip,
} from "@75neo/themes";
import Accordion from "../Accordion.vue";
import AngleSlider from "../AngleSlider.vue";
import Button from "../Button.vue";
import Combobox from "../Combobox.vue";
import DateInput from "../DateInput.vue";
import DatePicker from "../DatePicker.vue";
import Dialog from "../Dialog.vue";
import Popover from "../Popover.vue";
import Switch from "../Switch.vue";
import Theme from "../Theme.vue";
import Tooltip from "../Tooltip.vue";

function slot(container: HTMLElement, name: string): HTMLElement | null {
  return container.querySelector<HTMLElement>(`[data-slot='${name}']`);
}

function base(container: HTMLElement): HTMLElement {
  return slot(container, "base")!;
}

/**
 * The popup half of the Combobox and the DatePicker is teleported to the document body,
 * so a query scoped to the render container would miss it. One component is rendered
 * per test and unmounted after it, so the document is as narrow a scope as the
 * container.
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

// Every option carries an icon so the slot sweep below sees `leadingIcon`, which is
// otherwise only rendered for options that have one.
const options = [
  { value: "react", label: "React", icon: Circle },
  { value: "vue", label: "Vue", icon: Circle },
  { value: "svelte", label: "Svelte", icon: Circle },
];

/**
 * The Combobox owns its filter rather than handing the job to Ark, so what is worth
 * testing is that typing narrows the collection and that an unmatched query reaches the
 * empty message. The popup is not teleported, so every part of it is inside the rendered
 * container.
 */
describe("Combobox", () => {
  it("renders every slot the recipe declares", () => {
    render(Combobox, { props: { items: options, label: "Framework" } });

    for (const name of Object.keys(combobox.slots)) {
      // Ark mounts the empty message only while nothing matches, which is the next test.
      if (name === "empty") continue;
      expect(anywhere(name), name).not.toBeNull();
    }
  });

  it("narrows the list to what has been typed", async () => {
    const { container } = render(Combobox, { props: { items: options } });

    expect(everywhere("item")).toHaveLength(3);

    slot(container, "input")!.focus();
    await userEvent.keyboard("vu");

    await expect.poll(() => everywhere("item").length).toBe(1);
  });

  it("shows the empty message when nothing matches", async () => {
    const { container } = render(Combobox, {
      props: { items: options, emptyMessage: "Nothing here." },
    });

    slot(container, "input")!.focus();
    await userEvent.keyboard("zzz");

    await expect.poll(() => anywhere("empty")?.textContent?.trim()).toBe("Nothing here.");
  });
});

/**
 * The DateInput has no free text to parse: each part of the date is its own focusable
 * element. So what is worth testing is that a digit lands in the segment holding the
 * caret. The range mode and the icon are passed so the slot sweep sees the separator and
 * the leading icon, which are drawn for nothing else.
 */
describe("DateInput", () => {
  it("renders every slot the recipe declares", () => {
    const { container } = render(DateInput, {
      props: { label: "Stay", selectionMode: "range", leadingIcon: Circle },
    });

    for (const name of Object.keys(dateInput.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("takes a digit into the segment holding the caret", async () => {
    const { container } = render(DateInput);
    const month = container.querySelector<HTMLElement>("[data-slot='segment'][data-type='month']")!;

    month.focus();
    await userEvent.keyboard("7");

    await expect.poll(() => month.textContent).toContain("7");
  });
});

/**
 * The calendar renders all three views at once and hides the two that are not showing,
 * so the slot sweep needs no interaction. What does need it is the selection: a day
 * chosen in the grid has to reach the field the reader can see.
 */
describe("DatePicker", () => {
  it("renders every slot the recipe declares", () => {
    render(DatePicker, { props: { label: "Due", selectionMode: "range" } });

    for (const name of Object.keys(datePicker.slots)) {
      expect(anywhere(name), name).not.toBeNull();
    }
  });

  it("writes the day it is given into the field", async () => {
    const { container } = render(DatePicker);
    await userEvent.click(slot(container, "trigger")!);

    const fifteenth = everywhere("tableCellTrigger").find(
      (cell) => cell.textContent?.trim() === "15",
    )!;
    await userEvent.click(fifteenth);

    await expect.poll(() => (slot(container, "input") as HTMLInputElement).value).toContain("15");
  });
});

/**
 * The Dialog is the first component whose `base` slot is a panel rather than a root
 * element, and whose default slot is the trigger rather than the content.
 *
 * The panel is selected through Ark's own part attributes rather than `data-slot`,
 * because `data-slot="base"` is on every component's root and the Button inside the
 * footer carries one too.
 *
 * Three of these guard the Boolean prop cast rather than the feature. `overlay`,
 * `close` and `dismissible` all default on, and Vue turns an absent Boolean prop into
 * `false` unless a default is named -- which would drop the overlay, drop the close
 * button, and hand Ark an explicit `false` that kills Escape, all of it only in Vue and
 * none of it visible to the type checker.
 */
const panel = () =>
  document.querySelector<HTMLElement>(
    '[data-scope="dialog"][data-part="content"][data-state="open"]',
  );

describe("Dialog", () => {
  it("renders every slot the recipe declares once it is open", async () => {
    render(Dialog, {
      props: { title: "Title", description: "Description", defaultOpen: true },
      slots: { body: () => "Body", footer: () => "Footer" },
    });

    for (const name of Object.keys(dialog.slots)) {
      await expect.poll(() => anywhere(name), { timeout: 2000 }).not.toBeNull();
    }
  });

  it("makes the caller's own element the trigger", () => {
    const { container } = render(Dialog, {
      props: { title: "Title" },
      slots: { default: () => h("button", { type: "button", class: "underline" }, "Open") },
    });

    // asChild, so the trigger *is* the caller's button rather than one wrapping it.
    const trigger = container.querySelector<HTMLElement>(
      '[data-scope="dialog"][data-part="trigger"]',
    )!;
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger.className).toContain("underline");
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
  });

  it("sends a call-site class to the panel", async () => {
    render(Dialog, { props: { title: "Title", class: "w-[33rem]", defaultOpen: true } });

    await expect.poll(() => panel()?.className).toContain("w-[33rem]");
  });

  it("draws the overlay and the close button without being asked", async () => {
    render(Dialog, { props: { title: "Title", defaultOpen: true } });

    await expect.poll(() => anywhere("overlay")).not.toBeNull();
    expect(anywhere("closeTrigger")).not.toBeNull();
  });

  it("closes on Escape by default", async () => {
    render(Dialog, { props: { title: "Title", defaultOpen: true } });

    await expect.poll(() => panel()).not.toBeNull();
    await userEvent.keyboard("{Escape}");

    await expect.poll(() => panel(), { timeout: 2000 }).toBeNull();
  });

  it("leaves Escape alone when it is not dismissible", async () => {
    render(Dialog, { props: { title: "Title", dismissible: false, defaultOpen: true } });

    await expect.poll(() => panel()).not.toBeNull();
    await userEvent.keyboard("{Escape}");

    // Still there a beat later, where a dismissible one would have gone.
    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(panel()).not.toBeNull();
  });
});

/**
 * The Switch keeps both thumb icons mounted and lets the recipe decide which one is
 * seen, because an uncontrolled switch does not tell the adapter its state.
 *
 * The last two tests guard Vue's Boolean cast. An absent Boolean prop arrives as
 * `false`, so a `v-model` that did not default to `undefined` would pin every switch
 * to a controlled off and leave `defaultChecked` with nothing to do, and an absent
 * `loading` would still have to leave the control alone.
 */
describe("Switch", () => {
  it("renders every slot the recipe declares", () => {
    const { container } = render(Switch, {
      props: {
        label: "Label",
        description: "Description",
        checkedIcon: Circle,
        uncheckedIcon: Circle,
      },
    });

    for (const name of Object.keys(switchRecipe.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("keeps both thumb icons mounted and leaves the choice to CSS", () => {
    const { container } = render(Switch, {
      props: { checkedIcon: Circle, uncheckedIcon: Circle, defaultChecked: true },
    });

    expect(slot(container, "checkedIcon")!.className).toContain(
      "group-data-[state=checked]/thumb:block",
    );
    expect(slot(container, "uncheckedIcon")!.className).toContain(
      "group-data-[state=checked]/thumb:hidden",
    );
  });

  it("spins both icon slots and stops responding while loading", () => {
    const { container } = render(Switch, { props: { label: "Label", loading: true } });

    expect(slot(container, "checkedIcon")!.className).toContain("animate-spin");
    expect(slot(container, "uncheckedIcon")!.className).toContain("animate-spin");
    expect(container.querySelector<HTMLInputElement>("input")!.disabled).toBe(true);
  });

  it("starts on when defaultChecked says so", () => {
    const { container } = render(Switch, { props: { label: "Label", defaultChecked: true } });

    expect(slot(container, "control")!.dataset.state).toBe("checked");
  });

  it("still responds when loading is left out", async () => {
    const { container } = render(Switch, { props: { label: "Wi-Fi" } });
    expect(container.querySelector<HTMLInputElement>("input")!.disabled).toBe(false);

    await userEvent.click(container.querySelector<HTMLElement>("[data-slot='label']")!);

    await expect.poll(() => slot(container, "control")!.dataset.state).toBe("checked");
  });
});

/**
 * The Tooltip is the first popper this library wraps, so what is asserted here is the
 * arrangement the rest of the family will copy: the default slot is the trigger, the
 * bubble is `base`, and `placement` reaches the positioner rather than being styled in.
 *
 * Every assertion opens the tooltip with `defaultOpen` rather than by hovering. A
 * synthetic pointer has to move onto an element from somewhere, and the first move
 * after a page loads has no somewhere to come from, so hover is the one thing a test
 * cannot ask of a fresh document.
 *
 * The last one guards Vue's Boolean cast: `portal` defaults on, so an absent one cast
 * to `false` would leave the bubble inside whatever overflow the trigger sits in.
 */
const bubble = () =>
  document.querySelector<HTMLElement>(
    '[data-scope="tooltip"][data-part="content"][data-state="open"]',
  );

describe("Tooltip", () => {
  it("renders every slot the recipe declares once it is open", async () => {
    render(Tooltip, {
      props: { text: "Text", arrow: true, defaultOpen: true },
      slots: { default: () => h("button", { type: "button" }, "Trigger") },
    });

    for (const name of Object.keys(tooltip.slots)) {
      await expect.poll(() => anywhere(name), { timeout: 2000 }).not.toBeNull();
    }
  });

  it("makes the caller's own element the trigger", () => {
    const { container } = render(Tooltip, {
      props: { text: "Text" },
      slots: { default: () => h("button", { type: "button", class: "underline" }, "Trigger") },
    });

    // asChild, so the trigger *is* the caller's button rather than one wrapping it.
    const trigger = container.querySelector<HTMLElement>(
      '[data-scope="tooltip"][data-part="trigger"]',
    )!;
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger.className).toContain("underline");
  });

  it("lets the content slot beat text", async () => {
    render(Tooltip, {
      props: { text: "Plain", defaultOpen: true },
      slots: {
        default: () => h("button", { type: "button" }, "Trigger"),
        content: () => h("em", "Markup"),
      },
    });

    await expect.poll(() => bubble()?.textContent).toBe("Markup");
  });

  it("hands placement to the positioner", async () => {
    render(Tooltip, {
      props: { text: "Text", placement: "right", defaultOpen: true },
      slots: { default: () => h("button", { type: "button" }, "Trigger") },
    });

    /*
     * A side with room, because a placement is a preference: Ark moves the bubble when
     * the side it was asked for would put it off screen, so asserting a corner here
     * would be asserting the size of the test's own viewport.
     */
    await expect.poll(() => bubble()?.dataset.placement).toBe("right");
  });

  it("teleports the bubble when portal is left out", async () => {
    const { container } = render(Tooltip, {
      props: { text: "Text", defaultOpen: true },
      slots: { default: () => h("button", { type: "button" }, "Trigger") },
    });

    await expect.poll(() => bubble()).not.toBeNull();
    expect(container.contains(bubble())).toBe(false);
  });
});

/**
 * The Popover is the Dialog's anatomy on the Tooltip's geometry, so what is asserted
 * here is the seam between them: the panel's parts are addressed by name, the trigger
 * is the caller's own element, and dismissal is one prop over Ark's two.
 *
 * The last two guard Vue's Boolean cast. `dismissible` and `portal` both default on, so
 * an absent one cast to `false` would kill Escape and leave the panel un-teleported.
 */
const anchoredPanel = () =>
  document.querySelector<HTMLElement>(
    '[data-scope="popover"][data-part="content"][data-state="open"]',
  );

describe("Popover", () => {
  it("renders every slot the recipe declares once it is open", async () => {
    render(Popover, {
      props: {
        title: "Title",
        description: "Description",
        arrow: true,
        close: true,
        defaultOpen: true,
      },
      slots: {
        default: () => h("button", { type: "button" }, "Open"),
        body: () => "Body",
      },
    });

    for (const name of Object.keys(popover.slots)) {
      await expect.poll(() => anywhere(name), { timeout: 2000 }).not.toBeNull();
    }
  });

  it("makes the caller's own element the trigger", () => {
    const { container } = render(Popover, {
      props: { title: "Title" },
      slots: { default: () => h("button", { type: "button", class: "underline" }, "Open") },
    });

    // asChild, so the trigger *is* the caller's button rather than one wrapping it.
    const trigger = container.querySelector<HTMLElement>(
      '[data-scope="popover"][data-part="trigger"]',
    )!;
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger.className).toContain("underline");
  });

  it("keeps room for the close button only when there is one", async () => {
    render(Popover, {
      props: { title: "Title", close: true, defaultOpen: true },
      slots: { default: () => h("button", { type: "button" }, "Open") },
    });

    await expect.poll(() => anywhere("title")?.className).toContain("pe-6");
  });

  it("closes on Escape by default", async () => {
    render(Popover, {
      props: { title: "Title", defaultOpen: true },
      slots: { default: () => h("button", { type: "button" }, "Open") },
    });

    await expect.poll(() => anchoredPanel()).not.toBeNull();
    await userEvent.keyboard("{Escape}");

    await expect.poll(() => anchoredPanel(), { timeout: 2000 }).toBeNull();
  });

  it("teleports the panel when portal is left out", async () => {
    const { container } = render(Popover, {
      props: { title: "Title", defaultOpen: true },
      slots: { default: () => h("button", { type: "button" }, "Open") },
    });

    await expect.poll(() => anchoredPanel()).not.toBeNull();
    expect(container.contains(anchoredPanel())).toBe(false);
  });
});

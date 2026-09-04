import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { h } from "vue";
import { page, userEvent } from "vitest/browser";
import { Circle } from "@lucide/vue";
import { render } from "vitest-browser-vue";
import type { ThemeConfig } from "@75neo/core";
import {
  accordion,
  angleSlider,
  container as containerRecipe,
  error as errorRecipe,
  footer as footerRecipe,
  header as headerRecipe,
  main as mainRecipe,
  sidebar,
  combobox,
  numberInput,
  pinInput,
  select,
  dateInput,
  datePicker,
  dialog,
  popover,
  progress,
  radioGroup,
  slider,
  switch as switchRecipe,
  tabs,
  tagsInput,
  tooltip,
} from "@75neo/themes";
import Accordion from "../Accordion.vue";
import AngleSlider from "../AngleSlider.vue";
import App from "../App.vue";
import Button from "../Button.vue";
import Container from "../Container.vue";
import ErrorPage from "../Error.vue";
import Footer from "../Footer.vue";
import Header from "../Header.vue";
import Main from "../Main.vue";
import Combobox from "../Combobox.vue";
import DateInput from "../DateInput.vue";
import DatePicker from "../DatePicker.vue";
import Dialog from "../Dialog.vue";
import NumberInput from "../NumberInput.vue";
import PinInput from "../PinInput.vue";
import Popover from "../Popover.vue";
import Progress from "../Progress.vue";
import RadioGroup from "../RadioGroup.vue";
import Select from "../Select.vue";
import Sidebar from "../Sidebar.vue";
import Slider from "../Slider.vue";
import Switch from "../Switch.vue";
import Tabs from "../Tabs.vue";
import TagsInput from "../TagsInput.vue";
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
 * The Select hands every list decision to Ark, so what is left to this adapter is the
 * control: that the trigger shows the placeholder until there is an answer and the
 * chosen label after, and that the clear button is the one indicator a caller can drop.
 * The popup is teleported, so its parts are found on the document rather than in the
 * container.
 */
/**
 * Both arrangements come from the same three elements, so what is worth testing is that
 * the recipe moves them rather than the adapter swapping markup, and that the range
 * disables the button that would leave it.
 */
describe("NumberInput", () => {
  it("renders every slot the recipe declares", () => {
    const { container } = render(NumberInput, {
      props: { label: "Guests", defaultValue: "2" },
    });

    for (const name of Object.keys(numberInput.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("renders the same elements in both arrangements", () => {
    const rowwise = render(NumberInput, { props: { defaultValue: "2" } });
    const columnwise = render(NumberInput, {
      props: { orientation: "vertical", defaultValue: "2" },
    });

    expect(slot(rowwise.container, "incrementTrigger")!.className).toContain("order-3");
    expect(slot(columnwise.container, "incrementTrigger")!.className).toContain("row-start-1");
    expect(slot(columnwise.container, "incrementTrigger")!.className).not.toContain("order-3");
  });

  it("disables the button that would leave the range", () => {
    const { container } = render(NumberInput, {
      props: { min: 1, max: 3, defaultValue: "3" },
    });

    expect((slot(container, "incrementTrigger") as HTMLButtonElement).disabled).toBe(true);
    expect((slot(container, "decrementTrigger") as HTMLButtonElement).disabled).toBe(false);
  });

  it("steps the value by the step it is given", async () => {
    const { container } = render(NumberInput, { props: { step: 5, defaultValue: "10" } });

    // A press, not a click: Ark steps on pointer down so that holding the button can
    // keep spinning, and a synthesized click never gets there.
    await userEvent.click(slot(container, "incrementTrigger")!);

    await expect.poll(() => (slot(container, "input") as HTMLInputElement).value).toBe("15");
  });
});

/**
 * The row is drawn by the adapter rather than by Ark, so what is worth testing is that
 * `length` decides how many boxes there are and that typing walks the caret along them
 * — the behaviour a single input would not have.
 */
describe("PinInput", () => {
  it("renders every slot the recipe declares", () => {
    const { container } = render(PinInput, { props: { label: "Code", length: 4 } });

    for (const name of Object.keys(pinInput.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("draws a box per character asked for", () => {
    const four = render(PinInput, { props: { length: 4 } });
    expect(four.container.querySelectorAll("[data-slot='input']")).toHaveLength(4);

    const fallback = render(PinInput, { props: {} });
    expect(fallback.container.querySelectorAll("[data-slot='input']")).toHaveLength(6);
  });

  it("moves the caret to the next box as characters are typed", async () => {
    const { container } = render(PinInput, { props: { length: 4 } });
    const boxes = [...container.querySelectorAll<HTMLInputElement>("[data-slot='input']")];

    boxes[0].focus();
    await userEvent.keyboard("12");

    expect(boxes[0].value).toBe("1");
    expect(boxes[1].value).toBe("2");
    await expect.poll(() => document.activeElement).toBe(boxes[2]);
  });

  it("keeps the code contiguous when a character is removed", async () => {
    const { container } = render(PinInput, {
      props: { length: 4, defaultValue: ["1", "2", "3", "4"] },
    });
    const boxes = [...container.querySelectorAll<HTMLInputElement>("[data-slot='input']")];

    boxes[1].focus();
    await userEvent.keyboard("{Backspace}");

    // The characters after the deleted one move back rather than leaving a hole, which
    // is what makes the row read as one code rather than four independent fields.
    await expect.poll(() => boxes.map((box) => box.value).join("")).toBe("134");
  });
});

describe("Select", () => {
  it("renders every slot the recipe declares", () => {
    render(Select, { props: { items: options, label: "Framework", placeholder: "Pick one" } });

    for (const name of Object.keys(select.slots)) {
      expect(anywhere(name), name).not.toBeNull();
    }
  });

  it("shows the placeholder until an option is chosen", () => {
    const empty = render(Select, { props: { items: options, placeholder: "Pick one" } });
    expect(slot(empty.container, "valueText")!.textContent).toBe("Pick one");

    const chosen = render(Select, {
      props: { items: options, placeholder: "Pick one", defaultValue: ["vue"] },
    });
    expect(slot(chosen.container, "valueText")!.textContent).toBe("Vue");
  });

  it("leaves the clear button out when it is turned off", () => {
    const { container } = render(Select, { props: { items: options, clearable: false } });

    expect(slot(container, "clearTrigger")).toBeNull();
    expect(slot(container, "trailingIcon")).not.toBeNull();
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

/**
 * The Tabs takes its content as items and renders a trigger and a panel for each, so
 * what is asserted here is that the two halves stay in step and that the call site's
 * own escape hatch beats the item.
 */
const tabItems = [
  { value: "one", label: "One", content: "First", icon: Circle },
  { value: "two", label: "Two", content: "Second" },
  { value: "three", label: "Three", content: "Third", disabled: true },
];

describe("Tabs", () => {
  it("renders every slot the recipe declares", () => {
    const { container } = render(Tabs, { props: { items: tabItems, defaultValue: "one" } });

    for (const name of Object.keys(tabs.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("swaps the panel when another trigger is picked", async () => {
    const { container } = render(Tabs, { props: { items: tabItems, defaultValue: "one" } });
    const shown = () =>
      [...container.querySelectorAll<HTMLElement>("[data-slot='content']")].find(
        (panel) => !panel.hidden,
      );

    expect(shown()?.textContent).toBe("First");

    await userEvent.click(container.querySelectorAll("[data-slot='trigger']")[1]!);

    await expect.poll(() => shown()?.textContent).toBe("Second");
  });

  it("lets the content slot beat the item's own string", () => {
    const { container } = render(Tabs, {
      props: { items: tabItems, defaultValue: "one" },
      slots: { content: ({ item }: { item: { value: string } }) => h("em", item.value) },
    });

    expect(slot(container, "content")!.textContent).toBe("one");
  });

  it("disables the item that asked to be", () => {
    const { container } = render(Tabs, { props: { items: tabItems, defaultValue: "one" } });

    const triggers = container.querySelectorAll<HTMLButtonElement>("[data-slot='trigger']");
    expect(triggers[1]!.disabled).toBe(false);
    expect(triggers[2]!.disabled).toBe(true);
  });
});

/**
 * The RadioGroup repeats the Checkbox's anatomy per option, so what is asserted here is
 * the part that is its own: that the dot is a real element reading the control's state,
 * and that a horizontal group keeps its legend for a screen reader rather than dropping
 * it.
 */
const radioItems = [
  { value: "free", label: "Free", description: "No card needed." },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team", disabled: true },
];

describe("RadioGroup", () => {
  it("renders every slot the recipe declares", () => {
    const { container } = render(RadioGroup, {
      props: { legend: "Plan", items: radioItems, defaultValue: "free" },
    });

    for (const name of Object.keys(radioGroup.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("picks the option that is clicked", async () => {
    const { container } = render(RadioGroup, {
      props: { legend: "Plan", items: radioItems, defaultValue: "free" },
    });
    const checked = () =>
      [...container.querySelectorAll<HTMLElement>("[data-slot='control']")].findIndex(
        (control) => control.dataset.state === "checked",
      );

    expect(checked()).toBe(0);

    await userEvent.click(container.querySelectorAll("[data-slot='item']")[1]!);

    await expect.poll(checked).toBe(1);
  });

  it("marks the option that asked to be disabled", () => {
    const { container } = render(RadioGroup, {
      props: { legend: "Plan", items: radioItems, defaultValue: "free" },
    });

    const options = container.querySelectorAll<HTMLElement>("[data-slot='item']");
    expect(options[1]!.hasAttribute("data-disabled")).toBe(false);
    expect(options[2]!.hasAttribute("data-disabled")).toBe(true);
  });

  it("keeps a horizontal group's legend for a screen reader only", () => {
    const { container } = render(RadioGroup, {
      props: { legend: "Plan", items: radioItems, orientation: "horizontal" },
    });

    expect(slot(container, "legend")!.textContent).toBe("Plan");
    expect(slot(container, "legend")!.className).toContain("sr-only");
  });
});

/**
 * A Progress is a track and the part of it that is done, so the two things worth
 * asserting are that the header appears only when there is something to put in it, and
 * that a null value survives Vue's model as the indeterminate state rather than being
 * read as an absent one.
 */
describe("Progress", () => {
  it("renders every slot the recipe declares", () => {
    const { container } = render(Progress, {
      props: { label: "Uploading", showValue: true, defaultValue: 45 },
    });

    for (const name of Object.keys(progress.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("leaves the header out when there is nothing to head", () => {
    const { container } = render(Progress, { props: { defaultValue: 45 } });

    expect(slot(container, "header")).toBeNull();
    expect(slot(container, "track")).not.toBeNull();
  });

  it("reads a null model as indeterminate rather than as zero", () => {
    const { container } = render(Progress, { props: { modelValue: null } });

    expect(slot(container, "range")!.dataset.state).toBe("indeterminate");
  });

  it("measures against max rather than against a hundred", () => {
    const { container } = render(Progress, { props: { showValue: true, modelValue: 7, max: 12 } });

    expect(slot(container, "valueText")!.textContent).toBe("58%");
  });
});

/**
 * A range slider is the same component with two values, so the assertion that matters is
 * that the adapter renders a thumb per entry rather than a fixed one or two.
 */
const sliderMarks = [
  { value: 0, label: "0" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

describe("Slider", () => {
  it("renders every slot the recipe declares", () => {
    const { container } = render(Slider, {
      props: { label: "Volume", showValue: true, marks: sliderMarks, defaultValue: [40] },
    });

    for (const name of Object.keys(slider.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("renders a thumb per value", () => {
    const one = render(Slider, { props: { defaultValue: [40] } });
    expect(one.container.querySelectorAll("[data-slot='thumb']")).toHaveLength(1);

    const two = render(Slider, { props: { defaultValue: [20, 80] } });
    expect(two.container.querySelectorAll("[data-slot='thumb']")).toHaveLength(2);
  });

  it("leaves the marker group out when there are no marks", () => {
    const { container } = render(Slider, { props: { defaultValue: [40] } });

    expect(slot(container, "markerGroup")).toBeNull();
    expect(slot(container, "track")).not.toBeNull();
  });

  it("measures the value against min and max", () => {
    const { container } = render(Slider, {
      props: { showValue: true, min: -50, max: 50, defaultValue: [-20] },
    });

    expect(slot(container, "valueText")!.textContent).toBe("-20");
  });
});

/**
 * The chips come from Ark's own context rather than from the prop, so what is worth
 * testing is that an uncontrolled field draws the tags it actually has, that typing a
 * delimiter makes one, and that a limit is enforced or merely reported.
 */
describe("TagsInput", () => {
  it("renders every slot the recipe declares", () => {
    const { container } = render(TagsInput, {
      props: { label: "Topics", defaultValue: ["one"] },
    });

    for (const name of Object.keys(tagsInput.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("draws a chip per tag it holds", () => {
    const { container } = render(TagsInput, {
      props: { defaultValue: ["one", "two", "three"] },
    });

    expect(container.querySelectorAll("[data-slot='item']")).toHaveLength(3);
    expect(slot(container, "itemText")!.textContent!.trim()).toBe("one");
  });

  it("turns typed text into a tag at the delimiter", async () => {
    const { container } = render(TagsInput, { props: {} });

    slot(container, "input")!.focus();
    await userEvent.keyboard("rust,");

    await expect.poll(() => container.querySelectorAll("[data-slot='item']").length).toBe(1);
  });

  it("refuses a tag past the limit", async () => {
    const { container } = render(TagsInput, { props: { max: 1, defaultValue: ["one"] } });

    slot(container, "input")!.focus();
    await userEvent.keyboard("two,");

    await expect.poll(() => container.querySelectorAll("[data-slot='item']").length).toBe(1);
  });

  it("takes the tag and marks the field invalid when overflow is allowed", async () => {
    const { container } = render(TagsInput, {
      props: { max: 1, allowOverflow: true, defaultValue: ["one"] },
    });

    slot(container, "input")!.focus();
    await userEvent.keyboard("two,");

    await expect.poll(() => container.querySelectorAll("[data-slot='item']").length).toBe(2);
    expect(slot(container, "control")!.dataset.invalid).toBeDefined();
  });
});

describe("App", () => {
  it("publishes its theme to everything below it", () => {
    const { container } = render(App, {
      props: { theme: { button: { ui: { base: "rounded-full" } } } },
      slots: { default: () => h(Button, null, () => "Send") },
    });

    expect(container.querySelector("button")!.className).toContain("rounded-full");
  });

  it("restyles itself through the theme it publishes", () => {
    const { container } = render(App, { props: { theme: { app: { ui: { base: "contents" } } } } });

    expect(slot(container, "base")!.className).toContain("contents");
  });

  it("writes the reading direction the locale implies", () => {
    const ltr = render(App, { props: { locale: "en-US" } });
    expect(slot(ltr.container, "base")!.dir).toBe("ltr");

    const rtl = render(App, { props: { locale: "ar-EG" } });
    expect(slot(rtl.container, "base")!.dir).toBe("rtl");
  });

  it("lets an explicit direction beat the locale", () => {
    const { container } = render(App, { props: { locale: "ar-EG", dir: "ltr" } });

    expect(slot(container, "base")!.dir).toBe("ltr");
  });
});

describe("Container", () => {
  it("renders the recipe's own measure", () => {
    const { container } = render(Container, { slots: { default: () => "Body" } });

    expect(slot(container, "base")!.className).toContain(containerRecipe().base());
  });

  it("lets a call-site class beat the recipe", () => {
    const { container } = render(Container, {
      props: { class: "px-0" },
      slots: { default: () => "Body" },
    });

    expect(slot(container, "base")!.className).toContain("px-0");
    expect(slot(container, "base")!.className).not.toContain("px-5");
  });
});

describe("Main", () => {
  it("renders a main landmark carrying the recipe's height", () => {
    const { container } = render(Main, { slots: { default: () => "Body" } });
    const root = slot(container, "base")!;

    expect(root.tagName).toBe("MAIN");
    expect(root.className).toContain(mainRecipe().base());
  });
});

describe("Footer", () => {
  it("renders every slot the recipe declares", () => {
    const { container } = render(Footer, {
      slots: {
        default: () => "Navigation",
        top: () => "Newsletter",
        left: () => "© 2026",
        right: () => "Links",
        bottom: () => "Legal",
      },
    });

    for (const name of Object.keys(footerRecipe.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("leaves the two bands out when nothing is put in them", () => {
    const { container } = render(Footer, { slots: { left: () => "© 2026" } });

    expect(slot(container, "top")).toBeNull();
    expect(slot(container, "bottom")).toBeNull();
    expect(slot(container, "container")).not.toBeNull();
  });

  it("writes the row in reverse so a phone stacks the links first", () => {
    const { container } = render(Footer, {
      slots: { left: () => "© 2026", right: () => "Links" },
    });
    const order = [...slot(container, "container")!.children].map((el) =>
      el.getAttribute("data-slot"),
    );

    expect(order).toEqual(["right", "center", "left"]);
  });
});

describe("Header", () => {
  it("renders every slot the recipe declares", () => {
    render(Header, {
      props: { title: "75NeoUI", to: "/", open: true },
      slots: { default: () => "Navigation", body: () => "Menu contents" },
    });

    for (const name of Object.keys(headerRecipe.slots)) {
      expect(anywhere(name), name).not.toBeNull();
    }
  });

  it("draws no toggle when there is nothing to open", () => {
    const { container } = render(Header, {
      props: { title: "75NeoUI" },
      slots: { default: () => "Navigation" },
    });

    expect(slot(container, "toggle")).toBeNull();
    expect(anywhere("menu")).toBeNull();
  });

  it("opens the menu from the toggle", async () => {
    const { container } = render(Header, {
      props: { title: "75NeoUI" },
      slots: { body: () => "Menu contents" },
    });

    expect(anywhere("menu")).toBeNull();
    await userEvent.click(slot(container, "toggle")!);

    expect(anywhere("menu")).not.toBeNull();
    expect(anywhere("menuBody")!.textContent).toBe("Menu contents");
  });

  it("makes the wordmark a link only when there is somewhere to go", () => {
    const plain = render(Header, { props: { title: "75NeoUI" } });
    expect(slot(plain.container, "title")!.tagName).toBe("SPAN");

    const linked = render(Header, { props: { title: "75NeoUI", to: "/" } });
    expect(slot(linked.container, "title")!.tagName).toBe("A");
  });
});

describe("Error", () => {
  it("renders every slot the recipe declares", () => {
    const { container } = render(ErrorPage, {
      props: {
        icon: Circle,
        statusCode: 404,
        statusMessage: "Page not found",
        message: "Nothing answers at that address.",
      },
      slots: { default: () => h(Button, null, () => "Go home") },
    });

    for (const name of Object.keys(errorRecipe.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("prints a message that merely repeats the status once", () => {
    const { container } = render(ErrorPage, {
      props: { statusMessage: "Page not found", message: "Page not found" },
    });

    expect(slot(container, "message")).toBeNull();
    expect(slot(container, "statusMessage")!.textContent).toBe("Page not found");
  });

  it("leaves out every row it was given nothing for", () => {
    const { container } = render(ErrorPage, { props: { statusCode: 500 } });

    expect(slot(container, "statusCode")!.textContent).toBe("500");
    expect(slot(container, "leading")).toBeNull();
    expect(slot(container, "statusMessage")).toBeNull();
    expect(slot(container, "links")).toBeNull();
  });
});

describe("Sidebar", () => {
  /*
   * The suite runs in a 414px frame, which is the narrow viewport as far as the
   * Sidebar is concerned, so every test about collapsing has to widen it first. The
   * frame is put back afterwards, because the Tooltip's placement tests read it too.
   */
  let frame = { width: 0, height: 0 };

  beforeAll(() => {
    frame = { width: window.innerWidth, height: window.innerHeight };
  });

  afterAll(async () => {
    await page.viewport(frame.width, frame.height);
  });

  beforeEach(async () => {
    await page.viewport(1280, 800);
  });

  it("renders every slot the recipe declares", async () => {
    /*
     * The scrim is drawn only while the panel is over the page, so the one test that
     * has to see every slot is the one held open on a narrow viewport.
     */
    await page.viewport(414, 896);

    render(Sidebar, {
      props: {
        /*
         * Bound with a listener, so `defineModel` treats it as controlled and the
         * viewport watcher's own close is discarded rather than kept locally.
         */
        open: true,
        "onUpdate:open": () => {},
        title: "Workspace",
        description: "Acme",
        close: true,
        rail: true,
      },
      slots: { default: () => "Navigation", footer: () => "Account" },
    });

    /*
     * The narrow viewport reaches the component through a ref set on mount, so the
     * scrim appears one tick after the first render rather than in it.
     */
    await expect.poll(() => anywhere("overlay")).not.toBeNull();

    for (const name of Object.keys(sidebar.slots)) {
      expect(anywhere(name), name).not.toBeNull();
    }
  });

  it("says which state it is in on every element that moves", () => {
    const { container } = render(Sidebar, {
      props: { open: false },
      slots: { default: () => "Navigation" },
    });

    for (const name of ["base", "gap", "container"]) {
      expect(slot(container, name)!.dataset.state, name).toBe("collapsed");
    }
  });

  it("collapses from the close button", async () => {
    const { container } = render(Sidebar, {
      props: { title: "Workspace", close: true },
      slots: { default: () => "Navigation" },
    });

    expect(slot(container, "base")!.dataset.state).toBe("expanded");
    await userEvent.click(slot(container, "close")!);

    expect(slot(container, "base")!.dataset.state).toBe("collapsed");
  });

  it("draws neither rail nor close button when it cannot collapse", () => {
    const { container } = render(Sidebar, {
      props: { collapsible: "none", title: "Workspace", close: true, rail: true },
      slots: { default: () => "Navigation" },
    });

    expect(slot(container, "rail")).toBeNull();
    expect(slot(container, "close")).toBeNull();
    expect(slot(container, "base")!.dataset.state).toBe("expanded");
  });

  it("toggles from the rail", async () => {
    const { container } = render(Sidebar, {
      props: { rail: true },
      slots: { default: () => "Navigation" },
    });

    await userEvent.click(slot(container, "rail")!);
    expect(slot(container, "base")!.dataset.state).toBe("collapsed");

    await userEvent.click(slot(container, "rail")!);
    expect(slot(container, "base")!.dataset.state).toBe("expanded");
  });

  it("closes itself when the viewport can no longer hold it beside the page", async () => {
    const { container } = render(Sidebar, { slots: { default: () => "Navigation" } });
    expect(slot(container, "base")!.dataset.state).toBe("expanded");

    await page.viewport(414, 896);
    await expect.poll(() => slot(container, "base")!.dataset.state).toBe("collapsed");

    await page.viewport(1280, 800);
    await expect.poll(() => slot(container, "base")!.dataset.state).toBe("expanded");
  });
});

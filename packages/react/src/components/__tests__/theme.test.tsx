import type React from "react";
import { describe, expect, it } from "vitest";
import { userEvent } from "vitest/browser";
import { Circle } from "lucide-react";
import { render } from "vitest-browser-react";
import type { ThemeConfig } from "@75neo/core";
import {
  accordion,
  angleSlider,
  combobox,
  dateInput,
  datePicker,
  dialog,
  popover,
  progress,
  radioGroup,
  switch as switchRecipe,
  tabs,
  tooltip,
} from "@75neo/themes";
import { Accordion } from "../Accordion";
import { AngleSlider } from "../AngleSlider";
import { Button } from "../Button";
import { Combobox } from "../Combobox";
import { DateInput } from "../DateInput";
import { DatePicker } from "../DatePicker";
import { Dialog } from "../Dialog";
import { Popover } from "../Popover";
import { Progress } from "../Progress";
import { RadioGroup } from "../RadioGroup";
import { Switch } from "../Switch";
import { Tabs } from "../Tabs";
import { Theme } from "../Theme";
import { Tooltip } from "../Tooltip";

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
 * The popup half of the Combobox and the DatePicker is portalled to the document body,
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

/**
 * The DateInput has no free text to parse: each part of the date is its own focusable
 * element. So what is worth testing is that a digit lands in the segment holding the
 * caret. The range mode and the icon are passed so the slot sweep sees the separator and
 * the leading icon, which are drawn for nothing else.
 */
describe("DateInput", () => {
  it("renders every slot the recipe declares", async () => {
    const container = await mount(
      <DateInput label="Stay" selectionMode="range" leadingIcon={<Circle />} />,
    );

    for (const name of Object.keys(dateInput.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("takes a digit into the segment holding the caret", async () => {
    const container = await mount(<DateInput />);
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
  it("renders every slot the recipe declares", async () => {
    await mount(<DatePicker label="Due" selectionMode="range" />);

    for (const name of Object.keys(datePicker.slots)) {
      expect(anywhere(name), name).not.toBeNull();
    }
  });

  it("writes the day it is given into the field", async () => {
    const container = await mount(<DatePicker />);
    await userEvent.click(slot(container, "trigger")!);

    const fifteenth = everywhere("tableCellTrigger").find((cell) => cell.textContent === "15")!;
    await userEvent.click(fifteenth);

    await expect.poll(() => (slot(container, "input") as HTMLInputElement).value).toContain("15");
  });
});

/**
 * The Dialog is the first component whose `base` slot is a panel rather than a root
 * element, and whose default children are the trigger rather than the content. Both of
 * those are wiring only this adapter can get wrong, so both are asserted here.
 *
 * The panel is selected through Ark's own part attributes rather than `data-slot`,
 * because `data-slot="base"` is on every component's root and the Button inside the
 * footer carries one too.
 */
const panel = () =>
  document.querySelector<HTMLElement>(
    '[data-scope="dialog"][data-part="content"][data-state="open"]',
  );

describe("Dialog", () => {
  it("renders every slot the recipe declares once it is open", async () => {
    const container = await mount(
      <Dialog title="Title" description="Description" body="Body" footer="Footer">
        <button type="button">Open</button>
      </Dialog>,
    );

    await userEvent.click(container.querySelector("button")!);

    for (const name of Object.keys(dialog.slots)) {
      await expect.poll(() => anywhere(name), { timeout: 2000 }).not.toBeNull();
    }
  });

  it("makes the caller's own element the trigger", async () => {
    const container = await mount(
      <Dialog title="Title">
        <button type="button" className="underline">
          Open
        </button>
      </Dialog>,
    );

    // asChild, so the trigger *is* the caller's button rather than one wrapping it.
    const trigger = container.querySelector<HTMLElement>(
      '[data-scope="dialog"][data-part="trigger"]',
    )!;
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger.className).toContain("underline");
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
  });

  it("sends a call-site className to the panel", async () => {
    const container = await mount(
      <Dialog title="Title" className="w-[33rem]" defaultOpen>
        <button type="button">Open</button>
      </Dialog>,
    );

    expect(container).not.toBeNull();
    await expect.poll(() => panel()?.className).toContain("w-[33rem]");
  });

  it("leaves Escape alone when it is not dismissible", async () => {
    await mount(
      <Dialog title="Title" dismissible={false} defaultOpen>
        <button type="button">Open</button>
      </Dialog>,
    );

    await expect.poll(() => panel()).not.toBeNull();
    await userEvent.keyboard("{Escape}");

    // Still there a beat later, where a dismissible one would have gone.
    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(panel()).not.toBeNull();
  });

  it("closes on Escape by default", async () => {
    await mount(
      <Dialog title="Title" defaultOpen>
        <button type="button">Open</button>
      </Dialog>,
    );

    await expect.poll(() => panel()).not.toBeNull();
    await userEvent.keyboard("{Escape}");

    await expect.poll(() => panel(), { timeout: 2000 }).toBeNull();
  });
});

/**
 * The Switch keeps both thumb icons mounted and lets the recipe decide which one is
 * seen, because an uncontrolled switch does not tell the adapter its state. That, and
 * what `loading` does to the control, is the wiring only this adapter can get wrong.
 */
describe("Switch", () => {
  it("renders every slot the recipe declares", async () => {
    const container = await mount(
      <Switch
        label="Label"
        description="Description"
        checkedIcon={<Circle />}
        uncheckedIcon={<Circle />}
      />,
    );

    for (const name of Object.keys(switchRecipe.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("keeps both thumb icons mounted and leaves the choice to CSS", async () => {
    const container = await mount(
      <Switch checkedIcon={<Circle />} uncheckedIcon={<Circle />} defaultChecked />,
    );

    expect(slot(container, "checkedIcon")!.className).toContain(
      "group-data-[state=checked]/thumb:block",
    );
    expect(slot(container, "uncheckedIcon")!.className).toContain(
      "group-data-[state=checked]/thumb:hidden",
    );
  });

  it("spins both icon slots and stops responding while loading", async () => {
    const container = await mount(<Switch label="Label" loading />);

    expect(slot(container, "checkedIcon")!.className).toContain("animate-spin");
    expect(slot(container, "uncheckedIcon")!.className).toContain("animate-spin");
    expect(container.querySelector<HTMLInputElement>("input")!.disabled).toBe(true);
  });

  it("flips when its label is clicked", async () => {
    const container = await mount(<Switch label="Wi-Fi" />);
    const control = slot(container, "control")!;
    expect(control.dataset.state).toBe("unchecked");

    await userEvent.click(container.querySelector<HTMLElement>("[data-slot='label']")!);

    await expect.poll(() => slot(container, "control")!.dataset.state).toBe("checked");
  });
});

/**
 * The Tooltip is the first popper this library wraps, so what is asserted here is the
 * arrangement the rest of the family will copy: the caller's own element is the
 * trigger, the bubble is `base`, and `placement` reaches the positioner rather than
 * being styled in.
 *
 * Every assertion opens the tooltip with `defaultOpen` rather than by hovering. A
 * synthetic pointer has to move onto an element from somewhere, and the first move
 * after a page loads has no somewhere to come from, so hover is the one thing a test
 * cannot ask of a fresh document.
 */
const bubble = () =>
  document.querySelector<HTMLElement>(
    '[data-scope="tooltip"][data-part="content"][data-state="open"]',
  );

describe("Tooltip", () => {
  it("renders every slot the recipe declares once it is open", async () => {
    await mount(
      <Tooltip text="Text" arrow defaultOpen>
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    for (const name of Object.keys(tooltip.slots)) {
      await expect.poll(() => anywhere(name), { timeout: 2000 }).not.toBeNull();
    }
  });

  it("makes the caller's own element the trigger", async () => {
    const container = await mount(
      <Tooltip text="Text">
        <button type="button" className="underline">
          Trigger
        </button>
      </Tooltip>,
    );

    // asChild, so the trigger *is* the caller's button rather than one wrapping it.
    const trigger = container.querySelector<HTMLElement>(
      '[data-scope="tooltip"][data-part="trigger"]',
    )!;
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger.className).toContain("underline");
  });

  it("lets content beat text", async () => {
    await mount(
      <Tooltip text="Plain" content={<em>Markup</em>} defaultOpen>
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    await expect.poll(() => bubble()?.textContent).toBe("Markup");
  });

  it("hands placement to the positioner", async () => {
    await mount(
      <Tooltip text="Text" placement="right" defaultOpen>
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    /*
     * A side with room, because a placement is a preference: Ark moves the bubble when
     * the side it was asked for would put it off screen, so asserting a corner here
     * would be asserting the size of the test's own viewport.
     */
    await expect.poll(() => bubble()?.dataset.placement).toBe("right");
  });

  it("sends a call-site className to the bubble", async () => {
    await mount(
      <Tooltip text="Text" className="max-w-md" defaultOpen>
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    await expect.poll(() => bubble()?.className).toContain("max-w-md");
  });
});

/**
 * The Popover is the Dialog's anatomy on the Tooltip's geometry, so what is asserted
 * here is the seam between them: the panel's parts are addressed by name, the trigger
 * is the caller's own element, and dismissal is one prop over Ark's two.
 */
const anchoredPanel = () =>
  document.querySelector<HTMLElement>(
    '[data-scope="popover"][data-part="content"][data-state="open"]',
  );

describe("Popover", () => {
  it("renders every slot the recipe declares once it is open", async () => {
    await mount(
      <Popover title="Title" description="Description" body="Body" arrow close defaultOpen>
        <button type="button">Open</button>
      </Popover>,
    );

    for (const name of Object.keys(popover.slots)) {
      await expect.poll(() => anywhere(name), { timeout: 2000 }).not.toBeNull();
    }
  });

  it("makes the caller's own element the trigger", async () => {
    const container = await mount(
      <Popover title="Title">
        <button type="button" className="underline">
          Open
        </button>
      </Popover>,
    );

    // asChild, so the trigger *is* the caller's button rather than one wrapping it.
    const trigger = container.querySelector<HTMLElement>(
      '[data-scope="popover"][data-part="trigger"]',
    )!;
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger.className).toContain("underline");
  });

  it("keeps room for the close button only when there is one", async () => {
    await mount(
      <Popover title="Title" close defaultOpen>
        <button type="button">Open</button>
      </Popover>,
    );

    await expect.poll(() => anywhere("title")?.className).toContain("pe-6");
  });

  it("leaves Escape alone when it is not dismissible", async () => {
    await mount(
      <Popover title="Title" dismissible={false} defaultOpen>
        <button type="button">Open</button>
      </Popover>,
    );

    await expect.poll(() => anchoredPanel()).not.toBeNull();
    await userEvent.keyboard("{Escape}");

    // Still there a beat later, where a dismissible one would have gone.
    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(anchoredPanel()).not.toBeNull();
  });

  it("closes on Escape by default", async () => {
    await mount(
      <Popover title="Title" defaultOpen>
        <button type="button">Open</button>
      </Popover>,
    );

    await expect.poll(() => anchoredPanel()).not.toBeNull();
    await userEvent.keyboard("{Escape}");

    await expect.poll(() => anchoredPanel(), { timeout: 2000 }).toBeNull();
  });
});

/**
 * The Tabs takes its content as items and renders a trigger and a panel for each, so
 * what is asserted here is that the two halves stay in step and that the call site's
 * own escape hatch beats the item.
 */
const tabItems = [
  { value: "one", label: "One", content: "First", icon: <Circle /> },
  { value: "two", label: "Two", content: "Second" },
  { value: "three", label: "Three", content: "Third", disabled: true },
];

describe("Tabs", () => {
  it("renders every slot the recipe declares", async () => {
    const container = await mount(<Tabs items={tabItems} defaultValue="one" />);

    for (const name of Object.keys(tabs.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("swaps the panel when another trigger is picked", async () => {
    const container = await mount(<Tabs items={tabItems} defaultValue="one" />);
    const shown = () =>
      [...container.querySelectorAll<HTMLElement>("[data-slot='content']")].find(
        (panel) => !panel.hidden,
      );

    expect(shown()?.textContent).toBe("First");

    await userEvent.click(container.querySelectorAll("[data-slot='trigger']")[1]!);

    await expect.poll(() => shown()?.textContent).toBe("Second");
  });

  it("lets renderContent beat the item's own string", async () => {
    const container = await mount(
      <Tabs items={tabItems} defaultValue="one" renderContent={(item) => <em>{item.value}</em>} />,
    );

    expect(slot(container, "content")!.textContent).toBe("one");
  });

  it("disables the item that asked to be", async () => {
    const container = await mount(<Tabs items={tabItems} defaultValue="one" />);

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
  it("renders every slot the recipe declares", async () => {
    const container = await mount(
      <RadioGroup legend="Plan" items={radioItems} defaultValue="free" />,
    );

    for (const name of Object.keys(radioGroup.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("picks the option that is clicked", async () => {
    const container = await mount(
      <RadioGroup legend="Plan" items={radioItems} defaultValue="free" />,
    );
    const checked = () =>
      [...container.querySelectorAll<HTMLElement>("[data-slot='control']")].findIndex(
        (control) => control.dataset.state === "checked",
      );

    expect(checked()).toBe(0);

    await userEvent.click(container.querySelectorAll("[data-slot='item']")[1]!);

    await expect.poll(checked).toBe(1);
  });

  it("marks the option that asked to be disabled", async () => {
    const container = await mount(
      <RadioGroup legend="Plan" items={radioItems} defaultValue="free" />,
    );

    const options = container.querySelectorAll<HTMLElement>("[data-slot='item']");
    expect(options[1]!.hasAttribute("data-disabled")).toBe(false);
    expect(options[2]!.hasAttribute("data-disabled")).toBe(true);
  });

  it("keeps a horizontal group's legend for a screen reader only", async () => {
    const container = await mount(
      <RadioGroup legend="Plan" items={radioItems} orientation="horizontal" />,
    );

    expect(slot(container, "legend")!.textContent).toBe("Plan");
    expect(slot(container, "legend")!.className).toContain("sr-only");
  });
});

/**
 * A Progress is a track and the part of it that is done, so the two things worth
 * asserting are that the header appears only when there is something to put in it, and
 * that a null value reaches Ark as the indeterminate state rather than as zero.
 */
describe("Progress", () => {
  it("renders every slot the recipe declares", async () => {
    const container = await mount(<Progress label="Uploading" showValue defaultValue={45} />);

    for (const name of Object.keys(progress.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("leaves the header out when there is nothing to head", async () => {
    const container = await mount(<Progress defaultValue={45} />);

    expect(slot(container, "header")).toBeNull();
    expect(slot(container, "track")).not.toBeNull();
  });

  it("reads a null value as indeterminate rather than as zero", async () => {
    const container = await mount(<Progress value={null} />);

    expect(slot(container, "range")!.dataset.state).toBe("indeterminate");
  });

  it("measures against max rather than against a hundred", async () => {
    const container = await mount(<Progress showValue value={7} max={12} />);

    expect(slot(container, "valueText")!.textContent).toBe("58%");
  });
});

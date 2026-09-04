import type React from "react";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { page, userEvent } from "vitest/browser";
import { Circle } from "lucide-react";
import { render } from "vitest-browser-react";
import type { ThemeConfig } from "@75neo/core";
import {
  accordion,
  angleSlider,
  container as containerRecipe,
  error as errorRecipe,
  fileUpload as fileUploadRecipe,
  footer as footerRecipe,
  header as headerRecipe,
  main as mainRecipe,
  menu as menuRecipe,
  sidebar,
  combobox,
  numberInput,
  pagination as paginationRecipe,
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
import { Accordion } from "../Accordion";
import { AngleSlider } from "../AngleSlider";
import { App } from "../App";
import { Button } from "../Button";
import { Container } from "../Container";
import { Error as ErrorPage } from "../Error";
import { FileUpload } from "../FileUpload";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Main } from "../Main";
import { Menu } from "../Menu";
import { Combobox } from "../Combobox";
import { DateInput } from "../DateInput";
import { DatePicker } from "../DatePicker";
import { Dialog } from "../Dialog";
import { NumberInput } from "../NumberInput";
import { Pagination } from "../Pagination";
import { PinInput } from "../PinInput";
import { Popover } from "../Popover";
import { Progress } from "../Progress";
import { RadioGroup } from "../RadioGroup";
import { Select } from "../Select";
import { Sidebar } from "../Sidebar";
import { Slider } from "../Slider";
import { Switch } from "../Switch";
import { Tabs } from "../Tabs";
import { TagsInput } from "../TagsInput";
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
 * The Select hands every list decision to Ark, so what is left to this adapter is the
 * control: that the trigger shows the placeholder until there is an answer and the
 * chosen label after, and that the clear button is the one indicator a caller can drop.
 * The popup is portalled, so its parts are found on the document rather than in the
 * container.
 */
/**
 * The rows are worked out from one flat array, so what is worth testing is the grouping
 * rule — a heading starts a group and is not a row — and that a submenu's panel carries
 * the same `base` slot the top one does. The panel is portalled, so its parts are found
 * on the document rather than in the container.
 */
/**
 * Files cannot be dropped from a test, so what is worth testing is the part this adapter
 * decides: which rows get a thumbnail, and that the list can be taken away. The files are
 * handed in directly, which is what a controlled caller does anyway.
 */
describe("FileUpload", () => {
  const picture = new File(["x"], "shot.png", { type: "image/png" });
  const document = new File(["x"], "notes.pdf", { type: "application/pdf" });

  it("renders every slot the recipe declares", async () => {
    const container = await mount(
      <FileUpload label="Attachments" description="Up to 5 MB" acceptedFiles={[picture]} />,
    );

    for (const name of Object.keys(fileUploadRecipe.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("draws a thumbnail for an image and not for anything else", async () => {
    const container = await mount(<FileUpload maxFiles={4} acceptedFiles={[picture, document]} />);

    expect(container.querySelectorAll("[data-slot='item']")).toHaveLength(2);
    expect(container.querySelectorAll("[data-slot='itemPreview']")).toHaveLength(1);
  });

  it("leaves the thumbnails out when they are turned off", async () => {
    const container = await mount(<FileUpload preview={false} acceptedFiles={[picture]} />);

    expect(slot(container, "item")).not.toBeNull();
    expect(slot(container, "itemPreview")).toBeNull();
  });

  it("leaves the list out when it is turned off", async () => {
    const container = await mount(<FileUpload list={false} acceptedFiles={[picture]} />);

    expect(slot(container, "dropzone")).not.toBeNull();
    expect(slot(container, "list")).toBeNull();
  });
});

describe("Menu", () => {
  const rows = [
    { type: "label" as const, label: "File" },
    { label: "New", icon: <Circle />, shortcut: "⌘N" },
    { type: "checkbox" as const, label: "Wrap", checked: true },
    { type: "separator" as const },
    { label: "Docs", href: "https://example.com" },
    { label: "More", children: [{ label: "Deeper" }] },
  ];

  it("renders every slot the recipe declares", async () => {
    await mount(
      <Menu items={rows} arrow defaultOpen>
        <button type="button">Open</button>
      </Menu>,
    );

    for (const name of Object.keys(menuRecipe.slots)) {
      expect(anywhere(name), name).not.toBeNull();
    }
  });

  it("turns a heading into a group rather than a row", async () => {
    await mount(
      <Menu items={rows} defaultOpen>
        <button type="button">Open</button>
      </Menu>,
    );

    // The heading labels its group and is not one of the rows under it.
    expect(anywhere("groupLabel")!.textContent).toBe("File");
    expect(everywhere("item").map((row) => row.textContent)).not.toContain("File");
  });

  it("makes a link row the anchor itself", async () => {
    await mount(
      <Menu items={rows} defaultOpen>
        <button type="button">Open</button>
      </Menu>,
    );

    const link = everywhere("item").find((row) => row.tagName === "A");
    expect(link).toBeDefined();
    expect(link!.getAttribute("href")).toBe("https://example.com");
  });

  it("gives a submenu's panel the same base slot as the one above it", async () => {
    await mount(
      <Menu items={rows} defaultOpen>
        <button type="button">Open</button>
      </Menu>,
    );

    // The nested Menu mounts its own panel, so there are two, styled by one recipe.
    await expect.poll(() => everywhere("base").length).toBe(2);
    const [outer, inner] = everywhere("base");
    expect(inner!.className).toBe(outer!.className);
  });
});

/**
 * Both arrangements come from the same three elements, so what is worth testing is that
 * the recipe moves them rather than the adapter swapping markup, and that the range
 * disables the button that would leave it.
 */
describe("NumberInput", () => {
  it("renders every slot the recipe declares", async () => {
    const container = await mount(<NumberInput label="Guests" defaultValue="2" />);

    for (const name of Object.keys(numberInput.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("renders the same elements in both arrangements", async () => {
    const rowwise = await mount(<NumberInput defaultValue="2" />);
    const columnwise = await mount(<NumberInput orientation="vertical" defaultValue="2" />);

    expect(slot(rowwise, "incrementTrigger")!.className).toContain("order-3");
    expect(slot(columnwise, "incrementTrigger")!.className).toContain("row-start-1");
    expect(slot(columnwise, "incrementTrigger")!.className).not.toContain("order-3");
  });

  it("disables the button that would leave the range", async () => {
    const container = await mount(<NumberInput min={1} max={3} defaultValue="3" />);

    expect((slot(container, "incrementTrigger") as HTMLButtonElement).disabled).toBe(true);
    expect((slot(container, "decrementTrigger") as HTMLButtonElement).disabled).toBe(false);
  });

  it("steps the value by the step it is given", async () => {
    const container = await mount(<NumberInput step={5} defaultValue="10" />);

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
/**
 * Ark works the row out from the count and the page size, so what is worth testing is
 * that this adapter reads pages rather than items, that a gap becomes an ellipsis and
 * not a page, and that `href` is the one prop deciding buttons or anchors.
 */
describe("Pagination", () => {
  it("renders every slot the recipe declares", async () => {
    const container = await mount(<Pagination count={200} defaultPage={10} edges />);

    for (const name of Object.keys(paginationRecipe.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("counts items rather than pages", async () => {
    // Ninety-five items at ten a page is ten pages, so the last number in the row is 10.
    const container = await mount(<Pagination count={95} pageSize={10} defaultPage={10} />);
    const numbers = [...container.querySelectorAll("[data-slot='item']")].map(
      (item) => item.textContent,
    );

    expect(numbers.at(-1)).toBe("10");
  });

  it("marks the current page and no other", async () => {
    const container = await mount(<Pagination count={200} defaultPage={4} />);
    const selected = [...container.querySelectorAll<HTMLElement>("[data-slot='item']")].filter(
      (item) => item.dataset.selected !== undefined,
    );

    expect(selected).toHaveLength(1);
    expect(selected[0]!.textContent).toBe("4");
  });

  it("leaves the gaps out of the pages", async () => {
    const container = await mount(<Pagination count={500} defaultPage={25} />);

    // A window in the middle of fifty pages has a gap on each side of it.
    expect(container.querySelectorAll("[data-slot='ellipsis']")).toHaveLength(2);
    expect(slot(container, "ellipsis")!.tagName).not.toBe("BUTTON");
  });

  it("makes every page an anchor once it is given addresses", async () => {
    const buttons = await mount(<Pagination count={200} defaultPage={4} />);
    expect(slot(buttons, "item")!.tagName).toBe("BUTTON");

    const links = await mount(
      <Pagination count={200} defaultPage={4} href={(page) => `/posts?page=${page}`} />,
    );
    expect(slot(links, "item")!.tagName).toBe("A");
    expect(slot(links, "item")!.getAttribute("href")).toBe("/posts?page=1");
  });
});

describe("PinInput", () => {
  it("renders every slot the recipe declares", async () => {
    const container = await mount(<PinInput label="Code" length={4} />);

    for (const name of Object.keys(pinInput.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("draws a box per character asked for", async () => {
    const four = await mount(<PinInput length={4} />);
    expect(four.querySelectorAll("[data-slot='input']")).toHaveLength(4);

    const fallback = await mount(<PinInput />);
    expect(fallback.querySelectorAll("[data-slot='input']")).toHaveLength(6);
  });

  it("moves the caret to the next box as characters are typed", async () => {
    const container = await mount(<PinInput length={4} />);
    const boxes = [...container.querySelectorAll<HTMLInputElement>("[data-slot='input']")];

    boxes[0].focus();
    await userEvent.keyboard("12");

    expect(boxes[0].value).toBe("1");
    expect(boxes[1].value).toBe("2");
    await expect.poll(() => document.activeElement).toBe(boxes[2]);
  });

  it("keeps the code contiguous when a character is removed", async () => {
    const container = await mount(<PinInput length={4} defaultValue={["1", "2", "3", "4"]} />);
    const boxes = [...container.querySelectorAll<HTMLInputElement>("[data-slot='input']")];

    boxes[1].focus();
    await userEvent.keyboard("{Backspace}");

    // The characters after the deleted one move back rather than leaving a hole, which
    // is what makes the row read as one code rather than four independent fields.
    await expect.poll(() => boxes.map((box) => box.value).join("")).toBe("134");
  });
});

describe("Select", () => {
  it("renders every slot the recipe declares", async () => {
    await mount(<Select items={options} label="Framework" placeholder="Pick one" />);

    for (const name of Object.keys(select.slots)) {
      expect(anywhere(name), name).not.toBeNull();
    }
  });

  it("shows the placeholder until an option is chosen", async () => {
    const empty = await mount(<Select items={options} placeholder="Pick one" />);
    expect(slot(empty, "valueText")!.textContent).toBe("Pick one");

    const chosen = await mount(
      <Select items={options} placeholder="Pick one" defaultValue={["vue"]} />,
    );
    expect(slot(chosen, "valueText")!.textContent).toBe("Vue");
  });

  it("leaves the clear button out when it is turned off", async () => {
    const container = await mount(<Select items={options} clearable={false} />);

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
  it("renders every slot the recipe declares", async () => {
    const container = await mount(
      <Slider label="Volume" showValue marks={sliderMarks} defaultValue={[40]} />,
    );

    for (const name of Object.keys(slider.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("renders a thumb per value", async () => {
    const one = await mount(<Slider defaultValue={[40]} />);
    expect(one.querySelectorAll("[data-slot='thumb']")).toHaveLength(1);

    const two = await mount(<Slider defaultValue={[20, 80]} />);
    expect(two.querySelectorAll("[data-slot='thumb']")).toHaveLength(2);
  });

  it("leaves the marker group out when there are no marks", async () => {
    const container = await mount(<Slider defaultValue={[40]} />);

    expect(slot(container, "markerGroup")).toBeNull();
    expect(slot(container, "track")).not.toBeNull();
  });

  it("measures the value against min and max", async () => {
    const container = await mount(<Slider showValue min={-50} max={50} defaultValue={[-20]} />);

    expect(slot(container, "valueText")!.textContent).toBe("-20");
  });
});

/**
 * The chips come from Ark's own context rather than from the prop, so what is worth
 * testing is that an uncontrolled field draws the tags it actually has, that typing a
 * delimiter makes one, and that a limit is enforced or merely reported.
 */
describe("TagsInput", () => {
  it("renders every slot the recipe declares", async () => {
    const container = await mount(<TagsInput label="Topics" defaultValue={["one"]} />);

    for (const name of Object.keys(tagsInput.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("draws a chip per tag it holds", async () => {
    const container = await mount(<TagsInput defaultValue={["one", "two", "three"]} />);

    expect(container.querySelectorAll("[data-slot='item']")).toHaveLength(3);
    expect(slot(container, "itemText")!.textContent).toBe("one");
  });

  it("turns typed text into a tag at the delimiter", async () => {
    const container = await mount(<TagsInput />);

    slot(container, "input")!.focus();
    await userEvent.keyboard("rust,");

    await expect.poll(() => container.querySelectorAll("[data-slot='item']").length).toBe(1);
  });

  it("refuses a tag past the limit", async () => {
    const container = await mount(<TagsInput max={1} defaultValue={["one"]} />);

    slot(container, "input")!.focus();
    await userEvent.keyboard("two,");

    await expect.poll(() => container.querySelectorAll("[data-slot='item']").length).toBe(1);
  });

  it("takes the tag and marks the field invalid when overflow is allowed", async () => {
    const container = await mount(<TagsInput max={1} allowOverflow defaultValue={["one"]} />);

    slot(container, "input")!.focus();
    await userEvent.keyboard("two,");

    await expect.poll(() => container.querySelectorAll("[data-slot='item']").length).toBe(2);
    expect(slot(container, "control")!.dataset.invalid).toBeDefined();
  });
});

describe("App", () => {
  it("publishes its theme to everything below it", async () => {
    const container = await mount(
      <App theme={{ button: { ui: { base: "rounded-full" } } }}>
        <Button>Send</Button>
      </App>,
    );

    expect(container.querySelector("button")!.className).toContain("rounded-full");
  });

  it("restyles itself through the theme it publishes", async () => {
    const container = await mount(<App theme={{ app: { ui: { base: "contents" } } }} />);

    expect(slot(container, "base")!.className).toContain("contents");
  });

  it("writes the reading direction the locale implies", async () => {
    const ltr = await mount(<App locale="en-US" />);
    expect(slot(ltr, "base")!.dir).toBe("ltr");

    const rtl = await mount(<App locale="ar-EG" />);
    expect(slot(rtl, "base")!.dir).toBe("rtl");
  });

  it("lets an explicit direction beat the locale", async () => {
    const container = await mount(<App locale="ar-EG" dir="ltr" />);

    expect(slot(container, "base")!.dir).toBe("ltr");
  });
});

describe("Container", () => {
  it("renders the recipe's own measure", async () => {
    const container = await mount(<Container>Body</Container>);

    expect(slot(container, "base")!.className).toContain(containerRecipe().base());
  });

  it("lets a call-site class beat the recipe", async () => {
    const container = await mount(<Container className="px-0">Body</Container>);

    expect(slot(container, "base")!.className).toContain("px-0");
    expect(slot(container, "base")!.className).not.toContain("px-5");
  });
});

describe("Main", () => {
  it("renders a main landmark carrying the recipe's height", async () => {
    const container = await mount(<Main>Body</Main>);
    const root = slot(container, "base")!;

    expect(root.tagName).toBe("MAIN");
    expect(root.className).toContain(mainRecipe().base());
  });
});

describe("Footer", () => {
  it("renders every slot the recipe declares", async () => {
    const container = await mount(
      <Footer top="Newsletter" left="© 2026" right="Links" bottom="Legal">
        Navigation
      </Footer>,
    );

    for (const name of Object.keys(footerRecipe.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("leaves the two bands out when nothing is put in them", async () => {
    const container = await mount(<Footer left="© 2026" />);

    expect(slot(container, "top")).toBeNull();
    expect(slot(container, "bottom")).toBeNull();
    expect(slot(container, "container")).not.toBeNull();
  });

  it("writes the row in reverse so a phone stacks the links first", async () => {
    const container = await mount(<Footer left="© 2026" right="Links" />);
    const order = [...slot(container, "container")!.children].map((el) =>
      el.getAttribute("data-slot"),
    );

    expect(order).toEqual(["right", "center", "left"]);
  });
});

describe("Header", () => {
  it("renders every slot the recipe declares", async () => {
    const container = await mount(
      <Header title="75NeoUI" to="/" body="Menu contents" defaultOpen>
        Navigation
      </Header>,
    );

    for (const name of Object.keys(headerRecipe.slots)) {
      expect(anywhere(name), name).not.toBeNull();
    }
    expect(container).not.toBeNull();
  });

  it("draws no toggle when there is nothing to open", async () => {
    const container = await mount(<Header title="75NeoUI">Navigation</Header>);

    expect(slot(container, "toggle")).toBeNull();
    expect(anywhere("menu")).toBeNull();
  });

  it("opens the menu from the toggle", async () => {
    const container = await mount(<Header title="75NeoUI" body="Menu contents" />);

    expect(anywhere("menu")).toBeNull();
    await userEvent.click(slot(container, "toggle")!);

    expect(anywhere("menu")).not.toBeNull();
    expect(anywhere("menuBody")!.textContent).toBe("Menu contents");
  });

  it("makes the wordmark a link only when there is somewhere to go", async () => {
    const plain = await mount(<Header title="75NeoUI" />);
    expect(slot(plain, "title")!.tagName).toBe("SPAN");

    const linked = await mount(<Header title="75NeoUI" to="/" />);
    expect(slot(linked, "title")!.tagName).toBe("A");
  });
});

describe("Error", () => {
  it("renders every slot the recipe declares", async () => {
    const container = await mount(
      <ErrorPage
        icon={<Circle />}
        statusCode={404}
        statusMessage="Page not found"
        message="Nothing answers at that address."
      >
        <Button>Go home</Button>
      </ErrorPage>,
    );

    for (const name of Object.keys(errorRecipe.slots)) {
      expect(slot(container, name), name).not.toBeNull();
    }
  });

  it("prints a message that merely repeats the status once", async () => {
    const container = await mount(
      <ErrorPage statusMessage="Page not found" message="Page not found" />,
    );

    expect(slot(container, "message")).toBeNull();
    expect(slot(container, "statusMessage")!.textContent).toBe("Page not found");
  });

  it("leaves out every row it was given nothing for", async () => {
    const container = await mount(<ErrorPage statusCode={500} />);

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

    const container = await mount(
      <Sidebar open title="Workspace" description="Acme" close rail footer="Account">
        Navigation
      </Sidebar>,
    );

    for (const name of Object.keys(sidebar.slots)) {
      expect(anywhere(name), name).not.toBeNull();
    }
    expect(container).not.toBeNull();
  });

  it("says which state it is in on every element that moves", async () => {
    const container = await mount(<Sidebar defaultOpen={false}>Navigation</Sidebar>);

    for (const name of ["base", "gap", "container"]) {
      expect(slot(container, name)!.dataset.state, name).toBe("collapsed");
    }
  });

  it("collapses from the close button", async () => {
    const container = await mount(
      <Sidebar title="Workspace" close>
        Navigation
      </Sidebar>,
    );

    expect(slot(container, "base")!.dataset.state).toBe("expanded");
    await userEvent.click(slot(container, "close")!);

    expect(slot(container, "base")!.dataset.state).toBe("collapsed");
  });

  it("draws neither rail nor close button when it cannot collapse", async () => {
    const container = await mount(
      <Sidebar collapsible="none" title="Workspace" close rail>
        Navigation
      </Sidebar>,
    );

    expect(slot(container, "rail")).toBeNull();
    expect(slot(container, "close")).toBeNull();
    expect(slot(container, "base")!.dataset.state).toBe("expanded");
  });

  it("toggles from the rail", async () => {
    const container = await mount(<Sidebar rail>Navigation</Sidebar>);

    await userEvent.click(slot(container, "rail")!);
    expect(slot(container, "base")!.dataset.state).toBe("collapsed");

    await userEvent.click(slot(container, "rail")!);
    expect(slot(container, "base")!.dataset.state).toBe("expanded");
  });

  it("closes itself when the viewport can no longer hold it beside the page", async () => {
    const container = await mount(<Sidebar>Navigation</Sidebar>);
    expect(slot(container, "base")!.dataset.state).toBe("expanded");

    await page.viewport(414, 896);
    await expect.poll(() => slot(container, "base")!.dataset.state).toBe("collapsed");

    await page.viewport(1280, 800);
    await expect.poll(() => slot(container, "base")!.dataset.state).toBe("expanded");
  });
});

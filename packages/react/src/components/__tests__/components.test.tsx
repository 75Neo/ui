import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Accordion, AngleSlider, Avatar, Button, Carousel, Theme } from "../../index";

// jsdom has no IntersectionObserver; zag's carousel machine needs one.
globalThis.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
  root = null;
  rootMargin = "";
  thresholds = [];
} as unknown as typeof IntersectionObserver;

const slots = (c: HTMLElement) =>
  [...c.querySelectorAll("[data-slot]")].map((e) => e.getAttribute("data-slot"));

describe("component render smoke", () => {
  it("Button renders every slot and honours the loading state", () => {
    const { container } = render(
      <Button leading={<i data-testid="l" />} trailing={<i />}>
        Go
      </Button>,
    );
    expect(slots(container)).toEqual(["base", "leading", "label", "trailing"]);
    expect(container.textContent).toContain("Go");

    const { container: loadingC } = render(
      <Button loading loadingIcon={<i data-testid="spin" />}>
        Go
      </Button>,
    );
    expect(loadingC.querySelector("button")?.disabled).toBe(true);
    expect(loadingC.querySelector('[data-testid="spin"]')).not.toBeNull();
  });

  it("Accordion renders item data and per-item slots", () => {
    const { container } = render(
      <Accordion
        defaultValue="a"
        items={[
          { value: "a", label: "First", content: "Body A", leading: <i /> },
          { value: "b", label: "Second", content: "Body B" },
        ]}
      />,
    );
    expect(slots(container)).toContain("trigger");
    expect(slots(container)).toContain("leading");
    expect(slots(container)).toContain("trailing");
    expect(container.textContent).toContain("First");
    expect(container.textContent).toContain("Body A");
  });

  it("Accordion render props win over item data", () => {
    const { container } = render(
      <Accordion
        defaultValue="a"
        items={[{ value: "a", label: "First", content: "Body A" }]}
        label={({ item, index }) => `${item.value}-${index}`}
        content={() => "overridden"}
      />,
    );
    expect(container.textContent).toContain("a-0");
    expect(container.textContent).toContain("overridden");
    expect(container.textContent).not.toContain("Body A");
  });

  it("Avatar derives initials from alt and prefers the icon slot", () => {
    const { container } = render(<Avatar alt="Ada Lovelace" />);
    expect(container.textContent).toBe("AL");

    const { container: iconC } = render(<Avatar alt="Ada" icon={<i />} />);
    expect(slots(iconC)).toContain("icon");
  });

  it("AngleSlider renders markers, value text and the hidden input", () => {
    const { container } = render(<AngleSlider label="Angle" defaultValue={90} />);
    expect(slots(container)).toContain("markerGroup");
    expect(slots(container)).toContain("thumb");
    expect(slots(container)).toContain("valueText");
    expect(container.querySelector("input[type=hidden]")).not.toBeNull();
    // Ark supplies the formatted degree string when no valueText slot is given.
    expect(container.querySelector('[data-slot="valueText"]')?.textContent).toBe("90deg");

    const { container: slotC } = render(
      <AngleSlider defaultValue={90} valueText={({ value }) => `${value} deg`} />,
    );
    expect(slotC.querySelector('[data-slot="valueText"]')?.textContent).toBe("90 deg");
  });

  it("Carousel renders items, arrows and dots", () => {
    const { container } = render(<Carousel arrows dots items={["one", "two", "three"]} />);
    expect(slots(container)).toContain("viewport");
    expect(container.querySelectorAll('[data-slot="item"]')).toHaveLength(3);
    expect(container.querySelectorAll('[data-slot="dot"]')).toHaveLength(3);
    expect(container.textContent).toContain("one");
  });

  it("Carousel item render prop receives the bag", () => {
    const { container } = render(
      <Carousel items={[1, 2]} item={({ item, index }) => `${item.content}:${index}`} />,
    );
    expect(container.textContent).toContain("1:0");
    expect(container.textContent).toContain("2:1");
  });

  it("Theme ui overrides reach the right slot via the kebab-case key", () => {
    const { container } = render(
      <Theme ui={{ "angle-slider": { control: "ring-2" } }}>
        <AngleSlider defaultValue={10} />
      </Theme>,
    );
    expect(container.querySelector('[data-slot="control"]')?.className).toContain("ring-2");
  });
});

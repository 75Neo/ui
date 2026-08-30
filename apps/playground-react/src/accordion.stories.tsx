import preview from "../.storybook/preview";
import { Accordion, Theme } from "@75neo/react";
import { Sparkles } from "lucide-react";

const items = [
  {
    label: "What is 75NeoUI?",
    content:
      "75NeoUI harnesses Ark UI, Tailwind CSS and Tailwind Variants to offer a refined set of tools for building sophisticated, accessible and highly performant interfaces.",
    value: "item-1",
  },
  {
    label: "How do I customize the theme?",
    content:
      "Use CSS variables like --ui-primary, --ui-radius and the Theme provider with ui slot overrides per component.",
    value: "item-2",
  },
  {
    label: "Is it accessible?",
    content:
      "Yes — built on top of Ark UI (Zag.js) with correct ARIA, keyboard navigation and focus management.",
    value: "item-3",
  },
];

const meta = preview.meta({
  title: "Accordion",
  component: Accordion,
});

export const Default = meta.story({
  render: () => (
    <div className="w-full max-w-xl">
      <Accordion items={items} defaultValue={["item-1"]} collapsible />
    </div>
  ),
});

export const Multiple = meta.story({
  render: () => (
    <div className="w-full max-w-xl">
      <Accordion items={items} defaultValue={["item-1", "item-2"]} type="multiple" />
    </div>
  ),
});

export const Disabled = meta.story({
  render: () => (
    <div className="w-full max-w-xl">
      <Accordion items={items} defaultValue={["item-1"]} collapsible disabled />
    </div>
  ),
});

export const Slots = meta.story({
  render: () => (
    <div className="w-full max-w-xl">
      <Accordion
        items={items}
        defaultValue={["item-1"]}
        collapsible
        leading={({ index }) => <Sparkles data-index={index} />}
        content={({ item }) => (
          <div className="flex flex-col gap-2">
            <p>{item.content}</p>
            <span className="text-muted text-xs">Rendered through the content slot</span>
          </div>
        )}
      />
      <p className="text-muted mt-2 text-xs">
        <code>leading</code> and <code>content</code> render props — the React counterpart of Vue's{" "}
        <code>#leading</code> / <code>#content</code> slots
      </p>
    </div>
  ),
});

export const Themed = meta.story({
  render: () => (
    <div className="w-full max-w-xl">
      <Theme
        ui={{
          accordion: { root: "rounded-lg border border-default p-2", trigger: "text-primary" },
        }}
      >
        <Accordion items={items} defaultValue={["item-1"]} collapsible />
      </Theme>
      <p className="text-muted mt-2 text-xs">
        Themed via <code>Theme</code> — root border and primary trigger
      </p>
    </div>
  ),
});

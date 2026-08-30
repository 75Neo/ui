import preview from "../.storybook/preview";
import { Button, Theme } from "@75neo/react";
import { ArrowRight, ChevronDown, Download, Mail, Plus, Send } from "lucide-react";

const meta = preview.meta({
  title: "Button",
  component: Button,
  render: (args) => <Button {...args}>Button</Button>,
});

const colors = ["primary", "secondary", "neutral", "success", "info", "warning", "error"] as const;
const variants = ["solid", "soft", "outline", "ghost"] as const;

export const Default = meta.story({
  render: () => <Button>Button</Button>,
});

export const Variants = meta.story({
  render: () => (
    <div className="flex items-center gap-2">
      <Button variant="solid">Solid</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
});

export const Sizes = meta.story({
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="md">MD</Button>
      <Button size="lg">LG</Button>
      <Button size="xl">XL</Button>
    </div>
  ),
});

export const Colors = meta.story({
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {colors.map((c) => (
        <Button key={c} color={c}>
          {c}
        </Button>
      ))}
    </div>
  ),
});

export const Icons = meta.story({
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Button leading={<Plus />}>Add item</Button>
        <Button leading={<Download />} variant="outline">
          Download
        </Button>
        <Button leading={<Mail />} variant="soft">
          Contact
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button trailing={<ArrowRight />}>Continue</Button>
        <Button trailing={<ChevronDown />} variant="outline">
          Options
        </Button>
        <Button leading={<Send />} trailing={<ArrowRight />}>
          Send
        </Button>
      </div>
    </div>
  ),
});

export const States = meta.story({
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Button loading>Saving...</Button>
        <Button loading variant="outline">
          Loading
        </Button>
        <Button disabled>Disabled</Button>
        <Button disabled variant="outline">
          Disabled
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button loading leading={<Plus />}>
          Add item
        </Button>
        <Button loading trailing={<ArrowRight />}>
          Continue
        </Button>
        <Button disabled leading={<Plus />}>
          Disabled
        </Button>
      </div>
    </div>
  ),
});

export const Matrix = meta.story({
  render: () => (
    <div className="flex flex-col gap-6">
      {variants.map((v) => (
        <div key={v} className="flex flex-col gap-2">
          <h3 className="text-toned text-sm font-semibold capitalize">{v}</h3>
          <div className="flex flex-wrap items-center gap-2">
            {colors.map((c) => (
              <Button key={c} variant={v} color={c}>
                {c}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
});

export const Themed = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <Button>Default</Button>
      <Theme ui={{ button: { base: "rounded-full" } }}>
        <Button>Rounded via Theme</Button>
      </Theme>
      <Button ui={{ base: "rounded-full bg-secondary" }}>Rounded via ui</Button>
    </div>
  ),
});

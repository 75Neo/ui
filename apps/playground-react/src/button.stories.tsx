import preview from "../.storybook/preview";
import { Button } from "@75neo/react";
import { ArrowRight, ChevronDown, Download, Mail, Plus, Send, Trash2 } from "lucide-react";

const meta = preview.meta({
  title: "Button",
  component: Button,
  render: (args) => <Button {...args}>Button</Button>,
});

export const Solid = meta.story({
  args: {
    variant: "solid",
  },
});

export const Soft = meta.story({
  args: {
    variant: "soft",
  },
});

export const Outline = meta.story({
  args: {
    variant: "outline",
  },
});

export const Ghost = meta.story({
  args: {
    variant: "ghost",
  },
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

export const Compact = meta.story({
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Button size="xs" compact>
          XS Compact
        </Button>
        <Button size="sm" compact>
          SM Compact
        </Button>
        <Button size="md" compact>
          MD Compact
        </Button>
        <Button size="lg" compact>
          LG Compact
        </Button>
        <Button size="xl" compact>
          XL Compact
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="xs">XS Default</Button>
        <Button size="sm">SM Default</Button>
        <Button size="md">MD Default</Button>
        <Button size="lg">LG Default</Button>
        <Button size="xl">XL Default</Button>
      </div>
    </div>
  ),
});

export const AllColors = meta.story({
  render: () => (
    <div className="flex flex-col gap-3">
      {(["primary", "secondary", "success", "info", "warning", "error"] as const).map((color) => (
        <div key={color} className="flex items-center gap-2">
          <Button color={color} variant="solid">
            {color}
          </Button>
          <Button color={color} variant="soft">
            {color}
          </Button>
          <Button color={color} variant="outline">
            {color}
          </Button>
          <Button color={color} variant="ghost">
            {color}
          </Button>
        </div>
      ))}
    </div>
  ),
});

export const LeadingIcon = meta.story({
  render: () => (
    <div className="flex items-center gap-2">
      <Button leadingIcon={<Plus />}>Add item</Button>
      <Button leadingIcon={<Download />} variant="outline">
        Download
      </Button>
      <Button leadingIcon={<Mail />} variant="soft">
        Contact
      </Button>
    </div>
  ),
});

export const TrailingIcon = meta.story({
  render: () => (
    <div className="flex items-center gap-2">
      <Button trailingIcon={<ArrowRight />}>Continue</Button>
      <Button trailingIcon={<ChevronDown />} variant="outline">
        Options
      </Button>
    </div>
  ),
});

export const BothIcons = meta.story({
  render: () => (
    <div className="flex items-center gap-2">
      <Button leadingIcon={<Send />} trailingIcon={<ArrowRight />}>
        Send
      </Button>
      <Button leadingIcon={<Trash2 />} variant="outline" color="error">
        Delete
      </Button>
    </div>
  ),
});

export const Loading = meta.story({
  render: () => (
    <div className="flex items-center gap-2">
      <Button loading>Saving...</Button>
      <Button loading variant="outline">
        Loading
      </Button>
      <Button loading variant="soft" color="success">
        Processing
      </Button>
    </div>
  ),
});

export const LoadingWithIcon = meta.story({
  render: () => (
    <div className="flex items-center gap-2">
      <Button loading leadingIcon={<Plus />}>
        Add item
      </Button>
      <Button loading trailingIcon={<ArrowRight />}>
        Continue
      </Button>
      <Button loading leadingIcon={<Download />} variant="outline">
        Download
      </Button>
    </div>
  ),
});

export const Disabled = meta.story({
  render: () => (
    <div className="flex items-center gap-2">
      <Button disabled>Disabled</Button>
      <Button disabled variant="outline">
        Disabled
      </Button>
      <Button disabled variant="soft">
        Disabled
      </Button>
      <Button disabled leadingIcon={<Plus />}>
        Disabled
      </Button>
    </div>
  ),
});

export const DenseToolbar = meta.story({
  render: () => (
    <div className="border-border bg-elevated flex items-center gap-1 rounded border p-1">
      <Button variant="ghost" size="sm" compact leadingIcon={<Plus />}>
        Add
      </Button>
      <Button variant="ghost" size="sm" compact>
        Copy
      </Button>
      <Button variant="ghost" size="sm" compact>
        Paste
      </Button>
      <div className="bg-border-accented mx-1 h-4 w-px" />
      <Button variant="ghost" size="sm" compact loading>
        Undo
      </Button>
      <Button variant="ghost" size="sm" compact disabled>
        Redo
      </Button>
    </div>
  ),
});

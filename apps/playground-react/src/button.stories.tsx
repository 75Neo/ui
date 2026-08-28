import preview from "../.storybook/preview";
import { Button } from "@75neo/react";
import { ArrowRight, ChevronDown, Download, Mail, Plus, Send, Trash2 } from "lucide-react";

const meta = preview.meta({
  title: "Button",
  component: Button,
  render: (args) => <Button {...args}>Button</Button>,
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
    <div className="flex items-center gap-2">
      <Button color="primary">Primary</Button>
      <Button color="neutral">Neutral</Button>
      <Button color="success">Success</Button>
      <Button color="info">Info</Button>
      <Button color="warning">Warning</Button>
      <Button color="error">Error</Button>
    </div>
  ),
});

export const Icons = meta.story({
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Button leadingIcon={<Plus />}>Add item</Button>
        <Button leadingIcon={<Download />} variant="outline">
          Download
        </Button>
        <Button leadingIcon={<Mail />} variant="soft">
          Contact
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button trailingIcon={<ArrowRight />}>Continue</Button>
        <Button trailingIcon={<ChevronDown />} variant="outline">
          Options
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button leadingIcon={<Send />} trailingIcon={<ArrowRight />}>
          Send
        </Button>
        <Button leadingIcon={<Trash2 />} variant="outline" color="error">
          Delete
        </Button>
      </div>
    </div>
  ),
});

export const States = meta.story({
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button loading>Saving...</Button>
        <Button loading variant="outline">
          Loading
        </Button>
        <Button loading variant="soft" color="success">
          Processing
        </Button>
      </div>
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
      <div className="flex items-center gap-2">
        <Button disabled>Disabled</Button>
        <Button disabled variant="outline">
          Disabled
        </Button>
        <Button disabled variant="soft">
          Disabled
        </Button>
        <Button disabled variant="ghost">
          Disabled
        </Button>
        <Button disabled leadingIcon={<Plus />}>
          Disabled
        </Button>
      </div>
    </div>
  ),
});

export const Matrix = meta.story({
  render: () => {
    const variants = ["solid", "soft", "outline", "ghost"] as const;
    const colors = ["primary", "neutral", "success", "info", "warning", "error"] as const;

    return (
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
    );
  },
});

import preview from "../.storybook/preview";
import { Button } from "@75neo/vue";
import { ArrowRight, ChevronDown, Download, Mail, Plus, Send, Trash2 } from "@lucide/vue";

const meta = preview.meta({
  title: "Button",
  component: Button,
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args">
        Button
      </Button>
    `,
  }),
});

export const Variants = meta.story({
  render: () => ({
    components: { Button },
    template: `
      <div class="flex items-center gap-2">
        <Button variant="solid">Solid</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    `,
  }),
});

export const Sizes = meta.story({
  render: () => ({
    components: { Button },
    template: `
      <div class="flex items-center gap-2">
        <Button size="xs">XS</Button>
        <Button size="sm">SM</Button>
        <Button size="md">MD</Button>
        <Button size="lg">LG</Button>
        <Button size="xl">XL</Button>
      </div>
    `,
  }),
});

export const Colors = meta.story({
  render: () => ({
    components: { Button },
    template: `
      <div class="flex items-center gap-2">
        <Button color="primary">Primary</Button>
        <Button color="neutral">Neutral</Button>
        <Button color="success">Success</Button>
        <Button color="info">Info</Button>
        <Button color="warning">Warning</Button>
        <Button color="error">Error</Button>
      </div>
    `,
  }),
});

export const Icons = meta.story({
  render: () => ({
    components: {
      Button,
      Plus,
      Download,
      Mail,
      ArrowRight,
      ChevronDown,
      Send,
      Trash2,
    },
    template: `
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <Button>
            <template #leading><Plus /></template>
            Add item
          </Button>
          <Button variant="outline">
            <template #leading><Download /></template>
            Download
          </Button>
          <Button variant="soft">
            <template #leading><Mail /></template>
            Contact
          </Button>
        </div>
        <div class="flex items-center gap-2">
          <Button>
            Continue
            <template #trailing><ArrowRight /></template>
          </Button>
          <Button variant="outline">
            Options
            <template #trailing><ChevronDown /></template>
          </Button>
        </div>
        <div class="flex items-center gap-2">
          <Button>
            <template #leading><Send /></template>
            Send
            <template #trailing><ArrowRight /></template>
          </Button>
          <Button variant="outline" color="error">
            <template #leading><Trash2 /></template>
            Delete
          </Button>
        </div>
      </div>
    `,
  }),
});

export const States = meta.story({
  render: () => ({
    components: { Button, Plus, ArrowRight, Download },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <Button loading>Saving...</Button>
          <Button loading variant="outline">Loading</Button>
          <Button loading variant="soft" color="success">Processing</Button>
        </div>
        <div class="flex items-center gap-2">
          <Button loading>
            <template #leading><Plus /></template>
            Add item
          </Button>
          <Button loading>
            Continue
            <template #trailing><ArrowRight /></template>
          </Button>
          <Button loading variant="outline">
            <template #leading><Download /></template>
            Download
          </Button>
        </div>
        <div class="flex items-center gap-2">
          <Button disabled>Disabled</Button>
          <Button disabled variant="outline">Disabled</Button>
          <Button disabled variant="soft">Disabled</Button>
          <Button disabled variant="ghost">Disabled</Button>
          <Button disabled>
            <template #leading><Plus /></template>
            Disabled
          </Button>
        </div>
      </div>
    `,
  }),
});

export const Matrix = meta.story({
  render: () => ({
    components: { Button },
    setup() {
      const variants = ["solid", "soft", "outline", "ghost"] as const;
      const colors = ["primary", "neutral", "success", "info", "warning", "error"] as const;
      return { variants, colors };
    },
    template: `
      <div class="flex flex-col gap-6">
        <div v-for="v in variants" :key="v" class="flex flex-col gap-2">
          <h3 class="text-sm font-semibold capitalize text-toned">{{ v }}</h3>
          <div class="flex flex-wrap items-center gap-2">
            <Button v-for="c in colors" :key="c" :variant="v" :color="c">{{ c }}</Button>
          </div>
        </div>
      </div>
    `,
  }),
});

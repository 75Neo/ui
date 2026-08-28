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
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; align-items: center; gap: 8px;">
        <Button size="xs">XS</Button>
        <Button size="sm">SM</Button>
        <Button size="md">MD</Button>
        <Button size="lg">LG</Button>
        <Button size="xl">XL</Button>
      </div>
    `,
  }),
});

export const Compact = meta.story({
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <Button size="xs" :compact="true">XS Compact</Button>
          <Button size="sm" :compact="true">SM Compact</Button>
          <Button size="md" :compact="true">MD Compact</Button>
          <Button size="lg" :compact="true">LG Compact</Button>
          <Button size="xl" :compact="true">XL Compact</Button>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <Button size="xs">XS Default</Button>
          <Button size="sm">SM Default</Button>
          <Button size="md">MD Default</Button>
          <Button size="lg">LG Default</Button>
          <Button size="xl">XL Default</Button>
        </div>
      </div>
    `,
  }),
});

export const AllColors = meta.story({
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div v-for="color in ['primary', 'secondary', 'success', 'info', 'warning', 'error']" :key="color" style="display: flex; align-items: center; gap: 8px;">
          <Button :color="color" variant="solid">{{ color }}</Button>
          <Button :color="color" variant="soft">{{ color }}</Button>
          <Button :color="color" variant="outline">{{ color }}</Button>
          <Button :color="color" variant="ghost">{{ color }}</Button>
        </div>
      </div>
    `,
  }),
});

export const LeadingIcon = meta.story({
  render: () => ({
    components: { Button, Plus, Download, Mail },
    template: `
      <div style="display: flex; align-items: center; gap: 8px;">
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
    `,
  }),
});

export const TrailingIcon = meta.story({
  render: () => ({
    components: { Button, ArrowRight, ChevronDown },
    template: `
      <div style="display: flex; align-items: center; gap: 8px;">
        <Button>
          Continue
          <template #trailing><ArrowRight /></template>
        </Button>
        <Button variant="outline">
          Options
          <template #trailing><ChevronDown /></template>
        </Button>
      </div>
    `,
  }),
});

export const BothIcons = meta.story({
  render: () => ({
    components: { Button, Send, ArrowRight, Trash2 },
    template: `
      <div style="display: flex; align-items: center; gap: 8px;">
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
    `,
  }),
});

export const Loading = meta.story({
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; align-items: center; gap: 8px;">
        <Button :loading="true">Saving...</Button>
        <Button :loading="true" variant="outline">Loading</Button>
        <Button :loading="true" variant="soft" color="success">Processing</Button>
      </div>
    `,
  }),
});

export const LoadingWithIcon = meta.story({
  render: () => ({
    components: { Button, Plus, ArrowRight, Download },
    template: `
      <div style="display: flex; align-items: center; gap: 8px;">
        <Button :loading="true">
          <template #leading><Plus /></template>
          Add item
        </Button>
        <Button :loading="true">
          Continue
          <template #trailing><ArrowRight /></template>
        </Button>
        <Button :loading="true" variant="outline">
          <template #leading><Download /></template>
          Download
        </Button>
      </div>
    `,
  }),
});

export const Disabled = meta.story({
  render: () => ({
    components: { Button, Plus },
    template: `
      <div style="display: flex; align-items: center; gap: 8px;">
        <Button :disabled="true">Disabled</Button>
        <Button :disabled="true" variant="outline">Disabled</Button>
        <Button :disabled="true" variant="soft">Disabled</Button>
        <Button :disabled="true">
          <template #leading><Plus /></template>
          Disabled
        </Button>
      </div>
    `,
  }),
});

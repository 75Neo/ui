<script module lang="ts">
  import { Button } from "@75neo/svelte";
  import { defineMeta } from "@storybook/addon-svelte-csf";

  const { Story } = defineMeta({
    title: "Components/Button",
    component: Button,
    argTypes: {
      variant: { control: "select", options: ["solid", "outline", "ghost", "danger"] },
      size: { control: "select", options: ["sm", "md", "lg"] },
    },
  });
</script>

<Story name="Solid">
  <Button>Button</Button>
</Story>

<Story name="Outline">
  <Button variant="outline">Button</Button>
</Story>

<Story name="Ghost">
  <Button variant="ghost">Button</Button>
</Story>

<Story name="Danger">
  <Button variant="danger">Button</Button>
</Story>

<Story name="Large">
  <Button size="lg">Button</Button>
</Story>

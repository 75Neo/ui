<script setup lang="ts">
import {
  Editable,
  EditableArea,
  EditableCancelTrigger,
  EditableControl,
  EditableEditTrigger,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableSubmitTrigger,
} from "@/components/vue";
</script>

<template>
  <div class="max-w-md">
    <Editable default-value="Primary action" placeholder="Name this component">
      <EditableLabel>Component title</EditableLabel>
      <EditableArea>
        <EditablePreview />
        <EditableInput />
      </EditableArea>
      <EditableControl>
        <EditableEditTrigger>Edit</EditableEditTrigger>
        <EditableSubmitTrigger>Save</EditableSubmitTrigger>
        <EditableCancelTrigger>Cancel</EditableCancelTrigger>
      </EditableControl>
    </Editable>
  </div>
</template>

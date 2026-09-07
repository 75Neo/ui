<script setup lang="ts">
import Editable from "@/registry/vue/ui/editable/Editable.vue";
import EditableArea from "@/registry/vue/ui/editable/EditableArea.vue";
import EditableCancelTrigger from "@/registry/vue/ui/editable/EditableCancelTrigger.vue";
import EditableControl from "@/registry/vue/ui/editable/EditableControl.vue";
import EditableEditTrigger from "@/registry/vue/ui/editable/EditableEditTrigger.vue";
import EditableInput from "@/registry/vue/ui/editable/EditableInput.vue";
import EditableLabel from "@/registry/vue/ui/editable/EditableLabel.vue";
import EditablePreviewPart from "@/registry/vue/ui/editable/EditablePreview.vue";
import EditableSubmitTrigger from "@/registry/vue/ui/editable/EditableSubmitTrigger.vue";
</script>

<template>
  <div class="max-w-md">
    <Editable default-value="Primary action" placeholder="Name this component">
      <EditableLabel>Component title</EditableLabel>
      <EditableArea>
        <EditablePreviewPart />
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

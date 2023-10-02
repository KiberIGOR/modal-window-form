<script setup lang="ts">
import APopup from "../a_popup/a_popup.vue";
import AInput from "../a_input/a_input.vue";
import { ref } from "vue";
import { Fields, inputFields } from "../../input-fields";

import "./s_form_popup.scss";

defineProps<{ visible: Boolean }>();
const emit = defineEmits(["close-popup", "sendData"]);

const fields = ref<Fields>(inputFields);

function handleSubmit() {
  if (isValid()) {
    sendUserData();
    clearData();
    emit("close-popup");
  }
}
function isValid(): Boolean {
  let isAllValid = true;
  for (let field of Object.values(fields.value)) {
    let isFieldValid = true;
    for (let errorOgj of Object.values(field.errors)) {
      if (errorOgj.checkFunc(field.value) === false) {
        field.isValid = false;
        field.errorText = errorOgj.text;
        isAllValid = false;
        isFieldValid = false;
      }
    }
    if (isFieldValid) {
      field.isValid = true;
      field.errorText = "";
    }
  }
  return isAllValid;
}
function clearData() {
  for (let field of Object.values(fields.value)) {
    field.value = "";
  }
}
function sendUserData() {
  const valuesObj: Record<string, string> = {};
  for (let key in fields.value) {
    valuesObj[key] = fields.value[key].value;
  }
  emit("sendData", valuesObj);
}
</script>

<template>
  <a-popup
    class="s-form-popup"
    :visible="visible"
    @close="$emit('close-popup')"
  >
    <form
      action="#"
      class="s-form-popup__form"
      id="form"
      @submit.prevent="handleSubmit"
    >
      <h3 class="s-form-popup__title">Форма обратной связи:</h3>
      <a-input
        v-for="field in Object.values(fields)"
        :label="field.label"
        v-model:value="field.value"
        :is-error="!field.isValid"
        :text-error="field.errorText"
        v-bind="field.bind"
        @focus="field.isValid = true"
      />
      <div class="s-form-popup__btns">
        <button
          class="s-form-popup__button button button_2"
          @click="$emit('close-popup')"
        >
          Отмена
        </button>
        <button class="s-form-popup__button button button_3" type="submit">
          Отправить
        </button>
      </div>
    </form>
  </a-popup>
</template>

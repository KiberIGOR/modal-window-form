<script setup lang="ts">
import { VueTelInput } from "vue-tel-input";
import { computed } from "vue";
import "./a_input.scss";
import { FieldTypes } from "../../input-fields.ts";

const props = defineProps<{
  label: string;
  value: number | string;
  disabled?: boolean;
  isError?: boolean;
  textError: string;
  type?: FieldTypes;
  maxLength?: number;
  required?: boolean;
}>();
const emit = defineEmits(["update:value", "focus"]);

const computedValue = computed({
  get() {
    return props.value;
  },
  set(newValue) {
    emit("update:value", newValue);
  },
});
</script>

<template>
  <div class="a-input__container">
    <p class="a-input__label">{{ label }}</p>
    <vue-tel-input
      v-if="type == FieldTypes.phone"
      ref="phone"
      class="a-input a-input--phone"
      :class="{ '--error': isError ?? false }"
      :dropdownOptions="{ disabledDialCode: true, tabindex: 0 }"
      :inputOptions="{
        showDialCode: true,
        tabindex: 0,
        maxlength: maxLength,
        require: required ?? false,
      }"
      :defaultCountry="'RU'"
      :onlyCountries="['RU']"
      :disabled="disabled"
      @focus="$emit('focus')"
      v-model="computedValue"
      :validCharactersOnly="true"
      :autoFormat="true"
    >
    </vue-tel-input>
    <textarea
      v-else-if="type == FieldTypes.textarea"
      class="a-input a-input--textarea"
      :class="{ '--error': isError ?? false }"
      :disabled="disabled"
      v-model="computedValue"
      @focus="$emit('focus')"
      :maxlength="maxLength"
      :required="required ?? false"
    ></textarea>
    <input
      class="a-input__input"
      v-else
      :class="{ '--error': isError ?? false }"
      @focus="$emit('focus')"
      v-model="computedValue"
      :disabled="disabled ?? false"
      :maxlength="maxLength"
      :required="required ?? false"
    />
    <p class="a-input__error" v-if="(isError??false) && textError">{{textError}}</p>
  </div>
</template>

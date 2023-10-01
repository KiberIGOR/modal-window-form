<script setup lang="ts">
import "./a_popup.scss";

defineProps<{ visible: Boolean }>();
const emit = defineEmits(["close"]);

function closePopup() {
  emit("close", false);
}
</script>

<template>
  <div class="a-popup" v-if="visible">
    <div class="a-popup__backdrop" @click="closePopup"></div>
    <div class="a-popup__container">
      <div class="a-popup__close">
        <i class="a-popup__i si-close" @click="closePopup"></i>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

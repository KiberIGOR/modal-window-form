<script setup lang="ts">
import { ref } from "vue";
import sFormPopup from "./components/s-form-popup/s_form_popup.vue";
const isVisiblePopupForm = ref(false);
const sendText = ref("");
</script>

<template>
  <section class="section">
    <div class="container">
      <button class="button button_1" @click="isVisiblePopupForm = true">
        Форма
      </button>
      <p v-html="sendText"></p>
    </div>
  </section>
  <sFormPopup
    :visible="isVisiblePopupForm"
    @close-popup="isVisiblePopupForm = false"
    @sendData="sendText = JSON.stringify($event)"
  />
</template>

<style lang="scss">
@import "./assets/css/fonts.css";
@import "./assets/css/common/_style.scss";
@import "./assets/css/common/responsive.scss";
</style>

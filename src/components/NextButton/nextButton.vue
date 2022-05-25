<template>
  <div class="mt-3">
    <router-link
      :to="route"
    >
      <button :style="`background: ${color}; color: ${textColor}`" class="submit-button" type="submit" @click="submit">{{ title }}</button>
    </router-link>
  </div>
</template>

<script>
import "../NextButton/styles.css"
export default {
  name: "nextButton",
  props:{
    route: { type: String, default() { return "/"}},
    title: { type: String, default() { return "" } },
    color: { type: String, default() { return "" } },
    textColor: { type: String, default() { return "" } },
    submit: { type: Function, default() { return () => {} } }
  }
}
</script>

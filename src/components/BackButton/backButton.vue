<template>
  <div>
    <router-link
      :to="route"
    >
      <button class="back-button">&lt;</button>
    </router-link>
  </div>
</template>

<script>
import "../BackButton/styles.css"
export default {
  name: "nextButton",
  props:{
    route: { type: String, default() { return "/"}}
  }
}
</script>

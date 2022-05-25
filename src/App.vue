<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import '../styles/global.css'

export default {
  name: 'App',
}
</script>
<style>
 #app{
   background: var(--background);
 }
</style>
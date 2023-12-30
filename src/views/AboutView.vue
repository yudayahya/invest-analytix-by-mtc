<script setup lang="ts">
import { invoke } from '@tauri-apps/api'

// now we can call our Command!
// Right-click the application background and open the developer tools.
// You will see "Hello, World!" printed in the console!
invoke('greet', { name: 'World' })
  // `invoke` returns a Promise
  .then((response) => console.log(response))
</script>

<template>
  <div class="about">
    <h1>This is an about page nu</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

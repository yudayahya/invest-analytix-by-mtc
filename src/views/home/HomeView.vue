<script setup lang="ts">
import { invoke } from '@tauri-apps/api'

type MyRes = {
  data: string
}

// now we can call our Command!
// Right-click the application background and open the developer tools.
// You will see "Hello, World!" printed in the console!
invoke<MyRes>('sign_in', { data: { email: 'yuda@amalan.org', password: '1234' } })
  // `invoke` returns a Promise
  .then((r) => console.log(r))
  .catch((e) => console.log(e))
</script>

<template>
  <div>Ini Home</div>
</template>

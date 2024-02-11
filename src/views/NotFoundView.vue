<script setup lang="ts">
import IconUrl from '@/assets/icon.png'
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div
    class="container relative h-full min-h-screen items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div class="absolute inset-0 bg-zinc-900" />
      <div class="relative z-20 flex items-center gap-x-2 text-lg font-medium">
        <img :src="IconUrl" class="w-10" />
        InvestAnalytix by MTC
      </div>
      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            &ldquo;A peak performance trader is totally committed to being the best and doing
            whatever it takes to be the best. He feels totally responsible for whatever happens and
            thus can learn from mistakes. These people typically have a working business plan for
            trading because they treat trading as a business.&rdquo;
          </p>
          <footer class="text-sm">Van K. Tharp</footer>
        </blockquote>
      </div>
    </div>
    <div class="lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <h1 class="text-6xl font-bold tracking-tight text-center">404.</h1>
        <p class="text-sm text-muted-foreground text-center">
          Ooopps... Halaman yang anda tuju tidak ditemukan.
        </p>
        <Button type="button" @click="router.push({ name: 'home' })">Kembali ke Dashboard</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginFormComponent from './LoginFormComponent.vue'
import IconUrl from '@/assets/icon.png'
</script>

<template>
  <div
    class="container relative hidden h-full min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
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
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">Sign In</h1>
          <p class="text-sm text-muted-foreground">Enter your email & password below to sign in</p>
        </div>
        <LoginFormComponent />
      </div>
    </div>
  </div>
</template>

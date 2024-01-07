<script setup lang="ts">
import IconUrl from '@/assets/icon.png'
import { ref } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useUserStore()

const isLoading = ref(false)

async function onSubmit(event: Event) {
  event.preventDefault()
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
    userStore.setLogin()
    return router.push({ name: 'home' })
  }, 1000)
}
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
        <div class="grid gap-6">
          <form @submit="onSubmit">
            <div class="grid gap-2">
              <div class="grid gap-1">
                <Label class="sr-only" for="email"> Email </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  auto-capitalize="none"
                  auto-complete="email"
                  auto-correct="off"
                  autofocus
                />
              </div>
              <div class="grid gap-1">
                <Label class="sr-only" for="password"> Password </Label>
                <Input placeholder="password" type="password" />
              </div>
              <Button :disabled="isLoading">
                <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

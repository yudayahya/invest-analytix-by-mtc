<script setup lang="ts">
import IconUrl from '@/assets/icon.png'
import { ref } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import loginCommand, { formData, validationZodSchema } from '@/commands/login-command'
import { useToast } from '@/components/ui/toast'

const router = useRouter()
const userStore = useUserStore()
const { toast } = useToast()

const isLoading = ref(false)

const validationSchema = toTypedSchema(validationZodSchema)

const onSubmit = async () => {
  isLoading.value = true

  try {
    isLoading.value = false
    const result = await loginCommand.formSubmit()
    userStore.setLogin(result.data.email, result.data.created_at)
    loginCommand.formDataReset()

    return router.push({ name: 'home' })
  } catch (error: any) {
    isLoading.value = false
    loginCommand.formDataReset()

    return toast({
      title: 'Ooopps...',
      description: error.message || 'an uncaught error occurred',
      duration: 3000
    })
  }
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
          <Form :validation-schema="validationSchema" @submit="onSubmit">
            <div class="grid gap-2">
              <div class="grid gap-px">
                <Field
                  name="email"
                  type="email"
                  class="hidden"
                  v-model="formData.email"
                  :validate-on-input="true"
                />
                <Input
                  placeholder="name@example.com"
                  type="email"
                  v-model="formData.email"
                  auto-capitalize="none"
                  auto-complete="email"
                  auto-correct="off"
                  autofocus
                />
                <ErrorMessage name="email" as="p" class="text-red-500 text-xs" />
              </div>
              <div class="grid gap-px">
                <Field name="password" type="password" class="hidden" v-model="formData.password" />
                <Input placeholder="password" type="password" v-model="formData.password" />
                <ErrorMessage name="password" as="p" class="text-red-500 text-xs" />
              </div>
              <Button :disabled="isLoading" type="submit">
                <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                Sign In
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

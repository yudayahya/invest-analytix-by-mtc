<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { HomeIcon } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const breadcrumbs = ref<string[]>([])

const createBreadcrumb = () => {
  const routeSplit = route.path.split('/')
  return (breadcrumbs.value = routeSplit)
}

const goto = (index: number) => {
  const newPath = breadcrumbs.value.slice(0, index + 1).join('/')
  return router.push(newPath === '' ? '/' : newPath)
}

watch(route, () => createBreadcrumb())
onMounted(() => createBreadcrumb())
</script>

<template>
  <div class="w-full flex justify-start items-center gap-x-2 text-sm py-2 text-muted-foreground">
    <span
      v-for="(breadcrumb, index) in breadcrumbs"
      :key="index"
      class="flex justify-start items-center gap-x-2"
    >
      <span v-if="index !== 0">></span>
      <HomeIcon v-if="index === 0" class="w-4 cursor-pointer" @click="goto(index)" />
      <span v-else class="cursor-pointer" @click="goto(index)">{{ breadcrumb }}</span>
    </span>
  </div>
</template>

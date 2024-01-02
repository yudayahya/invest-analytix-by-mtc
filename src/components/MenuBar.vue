<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger
} from '@/components/ui/menubar'
import {
  User,
  UserPlus,
  FileDown,
  CandlestickChart,
  LineChart,
  Book,
  BookPlus,
  Scale
} from 'lucide-vue-next'
import ButtonComponent from './ui/button/ButtonComponent.vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()

const signOut = () => {
  const userStore = useUserStore()
  userStore.setLogout()
  return router.push({ name: 'login' })
}
</script>

<template>
  <div class="rounded-none border-b px-2 py-1 flex justify-between items-center">
    <Menubar class="border-none">
      <MenubarMenu>
        <MenubarTrigger class="font-bold" @click="console.log('goto Home')">Home</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Akun</MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            >Lihat<MenubarShortcut><User class="w-4" /></MenubarShortcut
          ></MenubarItem>
          <MenubarItem
            >Tambah<MenubarShortcut><UserPlus class="w-4" /></MenubarShortcut
          ></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Report Trading</MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            >Tambah<MenubarShortcut><CandlestickChart class="w-4" /></MenubarShortcut
          ></MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            >Statistik<MenubarShortcut><LineChart class="w-4" /></MenubarShortcut
          ></MenubarItem>
          <MenubarItem
            >Ekspor Statistik<MenubarShortcut><FileDown class="w-4" /></MenubarShortcut
          ></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Jurnal Umum</MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled
            >Lihat<MenubarShortcut><Book class="w-4" /></MenubarShortcut
          ></MenubarItem>
          <MenubarItem disabled
            >Tambah<MenubarShortcut><BookPlus class="w-4" /></MenubarShortcut
          ></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Jurnal Transaksi</MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled
            >Lihat<MenubarShortcut><Book class="w-4" /></MenubarShortcut
          ></MenubarItem>
          <MenubarItem disabled
            >Tambah<MenubarShortcut><BookPlus class="w-4" /></MenubarShortcut
          ></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Neraca</MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled
            >Lihat<MenubarShortcut><Scale class="w-4" /></MenubarShortcut
          ></MenubarItem>
          <MenubarItem disabled
            >Tambah<MenubarShortcut><BookPlus class="w-4" /></MenubarShortcut
          ></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
    <ButtonComponent :variant="'secondary'" @click="signOut">Sign Out</ButtonComponent>
  </div>
</template>

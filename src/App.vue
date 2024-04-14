<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
import PageFooter from '@/components/PageFooter.vue'
</script>

<template>
  <header>
    <NavBar />
  </header>

  <RouterView />
  <PageFooter />
  <Toaster />
</template>

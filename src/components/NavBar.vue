<script setup lang="ts">
import { Button } from './ui/button'
</script>

<template>
  <nav class="flex items-center justify-between px-4 py-4 shadow-sm sm:px-16 lg:px-32">
    <RouterLink to="/">
      <img src="@/assets/logo.png" width="128" height="32" />
    </RouterLink>
    <div class="flex gap-2">
      <Button>Plan a Trip</Button>
      <Button variant="ghost">Sign in / Sign up</Button>
    </div>
  </nav>
</template>

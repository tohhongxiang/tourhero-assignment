<script setup lang="ts">
import { LoaderCircle } from 'lucide-vue-next'
</script>

<template>
  <div class="flex items-center justify-center gap-2">
    <LoaderCircle class="animate-spin stroke-muted-foreground" />
    <p class="text-lg italic text-muted-foreground">Loading...</p>
  </div>
</template>

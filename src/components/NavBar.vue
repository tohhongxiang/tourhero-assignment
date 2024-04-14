<script setup lang="ts">
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Menu } from 'lucide-vue-next'
</script>

<template>
  <nav class="flex items-center justify-between px-4 py-4 shadow-sm sm:px-16 lg:px-32">
    <RouterLink to="/">
      <img src="@/assets/logo.png" width="128" height="32" />
    </RouterLink>
    <div>
      <div class="hidden gap-2 sm:flex">
        <Button>Plan a Trip</Button>
        <Button variant="ghost">Sign in / Sign up</Button>
      </div>
      <Sheet>
        <SheetTrigger as-child>
          <Button class="shrink-0 sm:hidden" variant="outline">
            <Menu class="h-5 w-5" />
          </Button>
          <span class="sr-only">Toggle navigation menu</span>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetTitle><span class="sr-only">Tourhero</span></SheetTitle>
          <SheetDescription
            ><span class="sr-only">Tourhero collapsible navigation menu</span></SheetDescription
          >
          <div class="mr-16 flex flex-col items-start justify-start">
            <RouterLink to="/">
              <img src="@/assets/logo.png" width="128" height="32" />
            </RouterLink>
            <div class="m-4" />
            <RouterLink
              to="/sign-in"
              class="w-full rounded-md px-4 py-2 text-lg font-bold hover:bg-muted-foreground/10"
              >Sign in / Sign up</RouterLink
            >
            <RouterLink
              to="/explore"
              class="w-full rounded-md px-4 py-2 text-lg font-bold hover:bg-muted-foreground/10"
              >Explore</RouterLink
            >
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </nav>
</template>

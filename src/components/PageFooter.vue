<script setup lang="ts"></script>

<template>
  <footer class="border-t">
    <div
      class="mx-auto flex w-full flex-col flex-wrap justify-between gap-8 p-8 sm:w-2/3 sm:flex-row"
    >
      <div>
        <p class="mb-4 text-sm font-bold uppercase text-muted-foreground">About</p>
        <ul>
          <li><a href="#" class="cursor-pointer font-semibold hover:underline">About Us</a></li>
          <li>
            <a href="#" class="cursor-pointer font-semibold hover:underline">Tourhero Blog</a>
          </li>
          <li>
            <a href="#" class="cursor-pointer font-semibold hover:underline">Life at TourHero</a>
          </li>
          <li><a href="#" class="cursor-pointer font-semibold hover:underline">Careers</a></li>
        </ul>
      </div>
      <div>
        <p class="mb-4 text-sm font-bold uppercase text-muted-foreground">Terms</p>
        <ul>
          <li><a href="#" class="cursor-pointer font-semibold hover:underline">Terms</a></li>
        </ul>
      </div>
      <div>
        <p class="mb-4 text-sm font-bold uppercase text-muted-foreground">Follow Us</p>
        <ul class="flex flex-row flex-wrap items-center gap-8">
          <li>
            <a href="#" class="cursor-pointer" aria-label="Tourhero's Instagram">
              <img src="@/assets/icons/Instagram.svg" alt="Instagram logo" width="24" height="24" />
            </a>
          </li>
          <li>
            <a href="#" class="cursor-pointer" aria-label="Tourhero's Facebook">
              <img src="@/assets/icons/Facebook.svg" alt="Facebook Logo" width="24" height="24" />
            </a>
          </li>
          <li>
            <a href="#" class="cursor-pointer" aria-label="Tourhero's LinkedIn">
              <img src="@/assets/icons/LinkedIn.svg" alt="LinkedIn Logo" width="24" height="24" />
            </a>
          </li>
          <li>
            <a
              href="#"
              class="cursor-pointer"
              aria-label="Tourhero's X (formerly known as Twitter)"
            >
              <img src="@/assets/icons/X.svg" alt="X logo" width="24" height="24" />
            </a>
          </li>
          <li>
            <a href="#" class="cursor-pointer" aria-label="Tourhero's Youtube">
              <img src="@/assets/icons/Youtube.svg" alt="Youtube logo" width="24" height="24" />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="mx-auto w-full border-t px-8 pb-8 pt-4 sm:w-2/3 sm:px-0">
      <p class="text-muted-foreground">© 2024 Toh Hong Xiang</p>
    </div>
  </footer>
</template>

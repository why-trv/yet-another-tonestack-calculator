<template>
  <div class="min-w-[356px] 2xl:container mx-auto px-4 py-3 overflow-x-hidden">
    <nav>
      <div class="mb-3 flex items-center justify-between border-b border-black">
        <div class="mb-1.5 md:flex-1 flex items-center">
          <NuxtLink to="/" class="ring-focus">
            <!-- This may cause "[Vue warn]: Hydration attribute mismatch", haven't figured it out yet -->
            <picture class="h-8 w-auto opacity-85 hover:opacity-100">
              <source srcset="~/assets/images/logo-abbrev.svg" media="(max-width: 500px)">
              <source srcset="~/assets/images/logo-narrow.svg" media="(max-width: 1024px)">
              <source srcset="~/assets/images/logo.svg">
              <img src="~/assets/images/logo-narrow.svg" alt="Yet Another Tonestack Calculator">
            </picture>
            <!-- So here's an alternative if anything goes wrong: -->
            <!-- <img src="~/assets/images/logo.svg"
                 alt="Yet Another Tonestack Calculator"
                 class="hidden lg:block h-8 w-auto opacity-85 hover:opacity-100">
            <img src="~/assets/images/logo-narrow.svg"
                 alt="Yet Another Tonestack Calculator"
                 class="hidden xs:block lg:hidden h-8 w-auto opacity-85 hover:opacity-100">
            <img src="~/assets/images/logo-abbrev.svg"
                 alt="Yet Another Tonestack Calculator"
                 class="block xs:hidden h-8 w-auto opacity-85 hover:opacity-100"> -->
          </NuxtLink>
        </div>
        <div id="nav-slot" class="flex justify-center"></div>
        <div class="md:flex-1 flex justify-end gap-3 sm:gap-4 items-center">
          <NuxtLink to="/about" activeClass="text-blue-700"
            class="px-1 text-gray-800 stroke-gray-800 hover:text-black ring-focus">
              About
          </NuxtLink>
          <NuxtLink 
            to="https://ko-fi.com/yuriturov" 
            target="_blank" 
            class="p-1 text-gray-800 hover:text-black ring-focus">
            <img src="~/assets/images/kofi-logo.svg" alt="Ko-fi" class="mb-0.5 h-5 w-auto inline-block">
            <span class="ml-1 hidden sm:inline">Support me on Ko-fi</span>
          </NuxtLink>
        </div>
      </div>
    </nav>
    <ErrorBar v-if="errorMessage" :message="errorMessage" @close="clearError" />
    <NuxtPage @error="handleError" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ErrorBar from '~/components/ErrorBar.vue';

const description = 'Guitar amp and pedal tonestack (tone stack) calculator web app. Tweak controls and component values and compare frequency responses in real time. Inspired by TSC in the web and Duncan Amps TSC.';

useHead({
  titleTemplate: (titleChunk) => {
    const title = 'Yet Another Tonestack Calculator';
    return titleChunk ? `${titleChunk} | ${title}` : title;
  },
  meta: [
    {name: 'description', content: description},
    {property: 'og:description', content: description},
  ],
  htmlAttrs: {
    lang: 'en'
  },
});

const errorMessage = ref('');

const handleError = (message) => {
  errorMessage.value = message;
};

const clearError = () => {
  errorMessage.value = '';
};
</script>
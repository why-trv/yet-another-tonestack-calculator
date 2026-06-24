<template>
  <div class="min-w-[356px] 2xl:container mx-auto px-4 pb-12 min-[530px]:pb-3 py-3 overflow-x-hidden">
    <!-- Mobile logo row: scrolls with page -->
    <div class="min-[530px]:hidden mb-1.5 pb-1.5 flex items-center border-b border-black">
      <NuxtLink to="/" class="ring-focus">
        <img src="~/assets/images/logo-narrow.svg" alt="Yet Another Tonestack Calculator" class="h-8 w-auto opacity-85 hover:opacity-100">
      </NuxtLink>
      <div class="ml-auto flex items-center gap-3">
        <NuxtLink to="/about" activeClass="text-blue-700"
          class="px-1 font-medium text-gray-800 stroke-gray-800 hover:text-black ring-focus">
            About
        </NuxtLink>
        <NuxtLink to="https://yuriturov.com" target="_blank"
          class="px-1 font-medium text-gray-800 hover:text-black ring-focus">
            Projects
        </NuxtLink>
        <NuxtLink
          to="https://ko-fi.com/yuriturov"
          target="_blank" rel="noopener"
          class="p-1 font-medium text-gray-800 hover:text-black ring-focus whitespace-nowrap">
          <img src="~/assets/images/kofi-logo.svg" alt="Ko-fi" class="mb-0.5 h-5 w-auto inline-block">
          <span class="ml-1">Tip</span>
        </NuxtLink>
      </div>
    </div>
    <!-- Toolbar: fixed bottom on mobile, inline on desktop -->
    <nav class="fixed bottom-0 left-0 right-0 min-[530px]:static z-50 bg-[#fbfbfb] border-t min-[530px]:border-t-0 border-black">
      <div class="py-1.5 min-[530px]:py-0 min-[530px]:mb-3 min-[530px]:border-b min-[530px]:border-black min-[530px]:pb-1 flex items-center justify-center min-[530px]:justify-between">
        <div class="hidden min-[530px]:flex mb-1.5 md:flex-1 items-center">
          <NuxtLink to="/" class="ring-focus">
            <picture class="h-8 w-auto opacity-85 hover:opacity-100">
              <source srcset="~/assets/images/logo-narrow.svg" media="(max-width: 1024px)">
              <source srcset="~/assets/images/logo.svg">
              <img src="~/assets/images/logo-narrow.svg" alt="Yet Another Tonestack Calculator">
            </picture>
          </NuxtLink>
        </div>
        <div id="nav-slot" class="flex-1 min-[530px]:flex-none flex justify-center"></div>
        <div class="hidden min-[530px]:flex md:flex-1 justify-end gap-3 sm:gap-4 items-center">
          <NuxtLink to="/about" activeClass="text-blue-700"
            class="px-1 font-medium text-gray-800 stroke-gray-800 hover:text-black ring-focus">
              About
          </NuxtLink>
          <NuxtLink to="https://yuriturov.com" target="_blank"
            class="px-1 font-medium text-gray-800 hover:text-black ring-focus">
              Projects
          </NuxtLink>
          <NuxtLink
            to="https://ko-fi.com/yuriturov"
            target="_blank" rel="noopener"
            class="p-1 font-medium text-gray-800 hover:text-black ring-focus whitespace-nowrap">
            <img src="~/assets/images/kofi-logo.svg" alt="Ko-fi" class="mb-0.5 h-5 w-auto inline-block">
            <span class="ml-1">Tip</span>
          </NuxtLink>
        </div>
      </div>
    </nav>
    <InfoBar v-if="showTaperUpdate" variant="warning" @close="dismissTaperUpdate">
      <strong class="font-bold">Heads-up:</strong> Pot taper models and naming have changed — existing responses may look slightly different. If you are a new user, feel free to skip this. <NuxtLink to="/posts/2026-06-20-taper-update" class="underline font-medium hover:text-orange-950">Read more</NuxtLink>
    </InfoBar>
    <InfoBar v-if="showInfo" @close="dismissInfo">
      <a href="https://guitar.yuriturov.com" target="_blank" class="underline font-medium hover:text-blue-950">Electric Guitar Response Calculator</a> public alpha is now available — see and compare the effects of pickups, their placement and combinations, wiring, cables, pluck position, and more!
    </InfoBar>
    <InfoBar v-if="errorMessage" variant="error" @close="clearError">{{ errorMessage }}</InfoBar>
    <NuxtPage @error="handleError" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import InfoBar from '~/components/InfoBar.vue';

const description = 'Guitar amp and pedal tonestack (tone stack) calculator web app. Tweak controls and component values and compare frequency responses in real time. Inspired by TSC in the web and Duncan Amps TSC.';

useHead({
  titleTemplate: (titleChunk) => {
    const title = 'Yet Another Tonestack Calculator';
    return titleChunk ? `${titleChunk} | ${title}` : title;
  },
  meta: [
    {name: 'description', content: description},
    {property: 'og:description', content: description},
    {property: 'og:image', content: '/og-image.png'},
    {property: 'og:image:width', content: '1200'},
    {property: 'og:image:height', content: '630'},
    {property: 'og:type', content: 'website'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:image', content: '/og-image.png'},
  ],
  htmlAttrs: {
    lang: 'en'
  },
});

const TAPER_UPDATE_KEY = 'taperUpdateDismissed';
const showTaperUpdate = ref(false);

const EGRC_ANNOUNCEMENT_KEY = 'egrcAlphaDismissed';
const showInfo = ref(false);

onMounted(() => {
  showTaperUpdate.value = !localStorage.getItem(TAPER_UPDATE_KEY);
  showInfo.value = !localStorage.getItem(EGRC_ANNOUNCEMENT_KEY);
});

const dismissTaperUpdate = () => {
  showTaperUpdate.value = false;
  localStorage.setItem(TAPER_UPDATE_KEY, '1');
};

const dismissInfo = () => {
  showInfo.value = false;
  localStorage.setItem(EGRC_ANNOUNCEMENT_KEY, '1');
};

const errorMessage = ref('');

const handleError = (message) => {
  errorMessage.value = message;
};

const clearError = () => {
  errorMessage.value = '';
};
</script>
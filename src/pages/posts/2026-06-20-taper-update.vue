<template>
  <div class="max-w-screen-md mx-auto text-justify text-lg">
    <h2 class="text-2xl font-bold mt-6 mb-4">Potentiometer Taper Models Update</h2>

    <div class="mb-6">
      <p class="mb-3">
        As you may have noticed, as of June 20, 2026, the list of available pot taper models and their names
        has changed. The old models were inherited from
        <NuxtLink to="https://www.guitarscience.net/tsc/info.htm" target="_blank">TSC in the Web</NuxtLink> and
        <NuxtLink to="https://www.duncanamps.com/tsc/" target="_blank">Duncan Amps TSC</NuxtLink> and had some drawbacks
        that I wanted to address. Here's what has changed:
      </p>
      <ul class="list-disc list-outside ml-4 mb-3 space-y-2">
        <li>The new models now include dead zones at both ends of travel, much closer to how real-world pots
          behave — their resistance doesn't change until about 5-10% into the travel.
        </li>
        <li>The old model names (LogA, LogB, LogC) were cryptic and ambiguous. When I see LogA, I think of
          a typical log pot with 10% at midpoint, yet in TSC it was actually a 30% log taper. And the 10% taper was
          named LogB. All taper models now have unambiguous names, e.g., 10A means log taper with 10% resistance
          at midpoint, and 20C means 20% reverse log.
        </li>
        <li>Some default tonestack tapers have been corrected based on original schematics:
          pots labeled <em>2-35</em> are kept as 30A, while the Bass pot — which lacks this designation — has been changed to 10A.
          (Those <em>2-35</em> pots
          <NuxtLink to="https://ampgarage.com/forum/viewtopic.php?t=25740" target="_blank">seem to be 35A</NuxtLink>,
          but this taper isn't something you can get nowadays, so 30A feels like the best compromise.)
        </li>
        <li>I haven't been able to find the info on the exact log taper used for other old amps. If
          you happen to know this, please <a href="mailto:tonestack@yuriturov.com">get in touch</a>.
        </li>
        <li>Saved configurations and shared links still load correctly — old taper IDs are mapped
          automatically (LogA → 30A, LogB → 10A, LogC → 30C).
        </li>
      </ul>
      <p class="mb-3">
        As a result of these changes, the response curves may look different from what they were, but they
        should be closer to real-world behavior.
      </p>
      <p class="mt-6 text-center">
        <NuxtLink to="/" class="font-medium text-indigo-600 hover:text-indigo-800">← Back to calculator</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Updated Pot Taper Models'
})
</script>

<style scoped>
a {
  @apply font-medium text-indigo-600 hover:text-indigo-800;
}
</style>

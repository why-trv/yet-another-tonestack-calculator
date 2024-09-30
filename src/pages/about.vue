<template>
  <div class="max-w-screen-md mx-auto text-justify text-lg">
    <h2 class="text-2xl font-bold mt-6 mb-4">About</h2>
    <div class="mb-6">
      <h3>TL;DR</h3>
      <p>
        <strong>Yet Another Tonestack Calculator</strong> (<em>YATSC? </em>&#x1f914;) is a web app based on the legendary <a href="https://www.duncanamps.com/tsc/">Duncan Amps TSC</a> and its web counterpart <a href="https://www.guitarscience.net/tsc/info.htm">TSC in the Web</a>.
        The current tonestack models have been adapted from <a href="https://github.com/jatalahd/tsc">TSC in the Web repo</a> with some modifications, including optimized calculations of the transfer function coefficients. The source code is available in the <a href="https://github.com/why-trv/yet-another-tonestack-calculator">GitHub repo</a>.
      </p>
    </div>    

    <div class="mb-6">
      <h3>A Little Backstory</h3>
      <p class="mb-3">
        Hi, I'm Yuri Turov and I'm the developer behind <a href="https://phonolyth.com">Phonolyth</a> audio plugins. I also play electric guitar.
        For many years, I've been using <strong>TSC in the Web</strong> on and off as an incredible resource for a deeper understanding of tone controls without having to reach out for heavy-duty tools like SPICE.
      </p>
      <p class="mb-3">
        One day I found myself repeatedly overlaying screenshots of different tonestack responses and clicking too many buttons to edit component values. Thinking "this could be a bit smoother", I looked through the original code. 
        Realizing that the changes I had in mind would probably be too much to ask, I thought it would be a fun little project to hack together my own implementation in a couple of days. As usual, it went a <em>little</em> bit further and took a <em>little</em> bit longer, but here it is.
      </p>
    </div>
    <div class="mb-6">
      <h3>Key Features</h3>
      <p class="mb-1">
        I hope that most of the features are intuitive enough, but here's a quick rundown:
      </p>
      <ul class="list-disc list-outside ml-4 mb-6">
        <li><strong>Multiple tonestack instances</strong> whose magnitude and phase responses are visualized on a single plot.
          Unlike static snapshots, component and control values can be edited at any time.</li>
        <li>Enter component values manually using shorthand (250k, 1M, 1.5u) 
          or RKM notation (2K2, R47), <strong>or cycle through</strong> standard values
          using the +/- buttons or mouse scroll wheel.</li>
        <li>Tonestack controls can be tweaked individually, or simultaneously using the <strong>Global</strong>
          mode where controls of the same name are linked together.</li>
        <li>Your current list of tonestacks and their settings is saved automatically. You can also save and load configurations from a JSON file.</li>
        <li>Generate a link to the current configuration for sharing or note-taking.</li>
        <li>The whole thing is statically hosted, so all calculations, saving and even the link recognition happens on your local machine.</li>
      </ul>
    </div>
    
    <div class="mb-6">
      <h3>Supporting YATSC</h3>
      <p>If you find the app useful or fun, you might want to consider:</p>
      <ul class="list-disc list-inside mb-4">
        <li>Asking the authors of the original software about supporting <strong>them</strong></li>
        <li>Checking out my audio plugins and apps at <a href="https://phonolyth.com">phonolyth.com</a></li>
        <li><a href="https://ko-fi.com/yuriturov">Tipping me on Ko-fi</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'About'
})
</script>

<style>
a {
  @apply font-medium text-indigo-600 hover:text-indigo-800;
}

h3 {
  @apply text-xl font-bold my-1;
}
</style>
<template>
  <div id="app">
    <TheHeader />
    <div id="mainSheet">
      <nuxt />
    </div>
  </div>
</template>

<script>
import TheHeader from "~/components/Navigation/TheHeader";
export default {
  components: { TheHeader },
  created() {}
};
</script>
<style>
</style>

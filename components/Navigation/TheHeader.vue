<template>
  <div class="header-container">
    <header class="the-header">
      <div>
        <span>{{getBreadCrumbs || "Главная"}}</span>
      </div>
      <div>
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Главная" icon="home" to="/" />
          <q-breadcrumbs-el v-if="getBreadCrumbs" :label="getBreadCrumbs" icon="widgets" />
        </q-breadcrumbs>
      </div>
    </header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TheHeader",
  computed: {
    ...mapGetters("main", ["getBreadCrumbs"])
  }
};
</script>
<style scoped>
.header-container {
  padding: 1rem;
  height: 86px;
}

.the-header {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  justify-content: space-between;
}
</style>

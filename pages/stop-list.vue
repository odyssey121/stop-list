<template>
  <div class="bg-grey-2 stop-list__layout">
    <div class="table-layout">
      <top-panel />
      <nuxt-child />
      <pagination />
    </div>
  </div>
</template>

<script>
import TopPanel from "~/components/Table/TopPanel";
import Pagination from "~/components/Table/Pagination";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { TopPanel, Pagination },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case "main/SET_PER_PAGE":
          this.$router.push("/stop-list/page/1");
          break;
        default:
          break;
      }
    });
  },
  middleware: "table-current-page",
  created() {
    this.fetchPhones();
  },
  methods: {
    ...mapActions("main", ["fetchPhones"])
  }
};
</script>

<style>
.stop-list__layout {
  height: inherit;
}
.table-layout {
  height: 100%;
  width: 100%;
  padding: 0 1rem;
  border-radius: 4%;
}
</style>

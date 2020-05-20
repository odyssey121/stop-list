<template>
  <div class="table-pagination">
    <div class="pagination-control">
      <div class="table-pagination__title">Records per page:</div>
      <v-select
        class="select"
        :value="getPerPage"
        :clearable="false"
        :options="[5,10,15,20,25]"
        @input="setPerPage"
      />
      <div>{{getCurrentPage}} из {{getTotalPage}}</div>
      <div class="table-pagination__arrows">
        <nuxt-link :to="genPrevUrl">
          <left-arrow :style="getCurrentPage <= 1 ? disableArrowStyle : ''" />
        </nuxt-link>
        <nuxt-link :to="genNextUrl">
          <right-arrow :style="getCurrentPage >= getTotalPage ? disableArrowStyle : ''" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Pagination",
  data() {
    return {
      disableArrowStyle: {
        color: "tomato",
        cursor: "not-allowed"
      }
    };
  },
  computed: {
    ...mapGetters("main", ["getPerPage", "getTotalPage", "getCurrentPage"]),
    genNextUrl() {
      return this.getCurrentPage >= this.getTotalPage
        ? `/stop-list/page/${this.getCurrentPage}`
        : `/stop-list/page/${this.getCurrentPage + 1}`;
    },
    genPrevUrl() {
      return this.getCurrentPage <= 1
        ? `/stop-list/page/${this.getCurrentPage}`
        : `/stop-list/page/${this.getCurrentPage - 1}`;
    }
  },
  methods: {
    ...mapActions("main", ["setPerPage"])
  }
};
</script>
<style scoped>
.table-pagination {
  display: flex;
  justify-content: flex-end;
}
.table-pagination {
  height: 48px;
  background: #fff;
  border-bottom: 2px solid rgba(0, 0, 0, 0.12);
  border-left: 1px solid rgba(0, 0, 0, 0.12);
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}

.pagination-control {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.pagination-control > div {
  margin: 0 1rem;
}
.table-pagination__arrows {
  cursor: pointer;
  font-size: 1.5rem;
}
.table-pagination__arrows svg :hover {
  color: lightseagreen;
}
.table-pagination__arrows {
  display: flex;
  justify-content: space-between;
  width: 36px;
}
@media (max-width: 768px) {
  .pagination-control {
    width: 100%;
    padding: 0.5rem;
  }
  .pagination-control > div {
    margin: 0 0.4rem;
  }
}
</style>

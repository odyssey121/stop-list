<template>
  <div class="table-controls">
    <div class="table-controls__search">
      <div class="control-search__left">
        <q-input
          lavel="search"
          placeholder="Искать"
          class="search-input"
          v-model="searchStr"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <div class="q-pa-md q-gutter-sm">
          <q-btn
            class="glossy"
            rounded
            color="secondary"
            label="Найти"
            style="max-width:128px;"
            @click="applySearch"
          />
          <q-btn class="glossy" round color="negative" icon="delete_forever" @click="resetSearch" />
        </div>
      </div>

      <div class="q-pa-md q-gutter-sm text-right">
        <q-btn
          class="glossy"
          rounded
          color="positive"
          label="Добавить"
          style="max-width:128px;"
          @click="showModal = true"
        />
        <q-btn class="glossy" round color="primary" icon="description" />
        <q-btn class="glossy" round color="indigo" icon="description" />
      </div>
    </div>
    <app-modal v-if="showModal" @close="showModal = false">
      <template #header>
        <h3>Добавление телефона:</h3>
      </template>
      <template #body>
        <q-form @submit.prevent="onSubmit">
          <q-input
            filled
            v-model="addingNumber"
            label="Телефон"
            mask="(###) ### - ####"
            hint="Формат: (###) ### - ####"
            :rules="[ val => val.length > 6 || 'Извините но номер должен состоять как минимум из 6 цифр']"
          />
          <div class="modal-btn">
            <q-btn
              class="glossy"
              rounded
              type="submit"
              color="primary"
              label="Добавить"
              style="max-width:128px;"
            />
            <q-btn
              @click="closeModal"
              class="glossy"
              rounded
              color="negative"
              label="Отмена"
              style="max-width:128px;"
            />
          </div>
        </q-form>
      </template>
    </app-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "TopPanel",
  computed: {},
  data() {
    return {
      showModal: false,
      addingNumber: "",
      searchStr: ""
    };
  },
  methods: {
    ...mapActions("main", ["addPhone", "setSearch", "removeSearch"]),
    closeModal() {
      this.addingNumber = "";
      this.showModal = false;
    },
    applySearch() {
      this.setSearch(this.searchStr);
    },
    resetSearch() {
      this.removeSearch();
      this.searchStr = "";
    },
    onSubmit(e) {
      const data = {
        number: this.addingNumber,
        created_at: new Date()
      };
      this.addPhone(data).then(this.$router.push("/stop-list/page/1"));
      this.closeModal();
    }
  }
};
</script>
<style scoped>
.search-input {
  width: 40%;
  max-width: 40%;
}
.table-controls__search {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.control-search__left {
  display: flex;
  flex-wrap: nowrap;
  flex-grow: 1;
}
.modal-btn {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
}
@media (max-width: 768px) {
  .table-controls__search {
    flex-direction: column;
  }
  .control-search__left {
    justify-content: space-between;
  }
}
</style>

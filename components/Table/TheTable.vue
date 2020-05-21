<template>
  <div>
    <table class="table">
      <app-modal v-if="showModal" @close="showModal = false">
        <template #header>
          <h3>Редактирование телефона:</h3>
        </template>
        <template #body>
          <q-form @submit.prevent="onSubmit">
            <q-input
              filled
              v-model="recordEdited.number"
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
                label="Редактировать"
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
      <tr class="table__header">
        <th class="text-left">Телефон</th>
        <th class="text-center">Действие</th>
      </tr>
      <template v-if="!getLoading">
        <tr v-for="(record,index) in getPhones" :key="index">
          <td>{{record.number}}</td>
          <td>
            <div class="table__icon">
              <font-awesome-icon
                @click="getEdit(record)"
                style="margin-right:8px;"
                :icon="['fas', 'file-signature']"
              />

              <span @click="deletePhone(record.id)">
                <font-awesome-icon style="margin-right:8px;" :icon="['fas', 'trash-alt']" />
              </span>
            </div>
          </td>
        </tr>
      </template>
      <template v-else>
        <div class="loader"></div>
      </template>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "TheTable",
  props: ["currentPage"],

  computed: {
    ...mapGetters("main", ["getCurrentPage", "getSearchStr", "getLoading"]),
    getPhones() {
      if (this.getSearchStr !== "") {
        let reg = new RegExp(this.getSearchStr.replace(/[^\d]/gi, ""), "gi");
        return this.$store.getters["main/getPhones"](this.getCurrentPage)
          .map(record => {
            const match = record.number.replace(/[^\d]/gi, "").match(reg);
            if (!match) {
              return null;
            }
            return {
              ...record
            };
          })
          .filter(record => !!record);
      } else {
        return this.$store.getters["main/getPhones"](this.getCurrentPage);
      }
    }
  },
  data() {
    return {
      showModal: false,
      recordEdited: {}
    };
  },

  methods: {
    ...mapActions("main", ["deletePhone", "editPhone"]),
    onSubmit(e) {
      this.editPhone(this.recordEdited);
      this.closeModal();
    },
    getEdit(record) {
      this.recordEdited.number = record.number;
      this.recordEdited.id = record.id;
      this.showModal = true;
    },
    closeModal() {
      this.recordEdited = {};
      this.showModal = false;
    }
  }
};
</script>
<style scoped>
.table__icon svg:last-child {
  color: red;
}
.table__icon svg :hover {
  cursor: pointer;
}
.table__icon {
  display: flex;
  justify-content: space-around;
}

.table {
  width: 100%;
  background: #fff;
  border-color: grey;
  border-collapse: collapse;
  border-spacing: 0;
  border-right: 1px solid var(--border-color);
  border-left: 1px solid var(--border-color);
}
.table > tr:not(.table__header):hover {
  background: #fafafa;
}
.table > tr > td {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}
.table > tr > th {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  border-top: 1px solid var(--border-color);
}
.table > tr > th:last-child {
  width: 13%;
}

.table__header th {
  font-weight: normal;
}
.modal-btn {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
}
</style>

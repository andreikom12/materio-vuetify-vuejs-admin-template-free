<template>
<v-card flat class="pa-3 mt-2">
  <v-card-text>
    <v-form class="multi-col-validation mt-6" ref="form" v-model="valid" lazy-validation>
      <v-row>
          <v-subheader>Usuários</v-subheader>
          <v-col md="12" cols="12">
            <UserTable :usersData="usersData"></UserTable>
          </v-col>
      </v-row>
    </v-form>
  </v-card-text>
</v-card>
</template>

<script>
import UserTable from '@/components/tables/UserTable.vue'
export default {
  components: {
    UserTable,
  },
  setup() {
    return {
      usersData: {},
      valid: true
    }
  },
}
</script>

<style>

</style>

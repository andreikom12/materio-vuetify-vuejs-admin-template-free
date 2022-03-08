<template>
  <v-card flat class="pa-3 mt-2">
    <v-card-text>
      <v-row>
        <v-col md="12" cols="12">
          <AnimalsTable></AnimalsTable>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import AnimalsTable from '@/components/tables/AnimalsTable.vue'

export default {
  components: {
    AnimalsTable,
  },
}
</script>

<style></style>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          Usuário confirmado!
        </v-card-title>
        <v-card-text align="center">
          <v-img
              :src="require('@/assets/images/pages/checkmark.gif')"
              max-height="300px"
              max-width="300px"
              alt="logo"
              contain
              class="me-3 "
            ></v-img>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false" :to="{ name: 'login' }">
            Ir para login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
    }
  },
}
</script>

<style></style>

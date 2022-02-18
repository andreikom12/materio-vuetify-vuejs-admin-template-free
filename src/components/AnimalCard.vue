<template>
  <v-flex xs12 md3 align-center>
    <v-card min-width="100%">
      <v-carousel hide-delimiters height="300" hide-delimiter-background>
        <v-carousel-item v-for="(item, i) in petData.imagens" :key="i" :src="item.path" contain max-height="300">
          <!-- <v-sheet :color="white" height="100%" tile>
            <v-row class="fill-height" align="center" justify="center">
              <img
                alt="user"
                src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
                height="100%"
              >
            </v-row>
          </v-sheet> -->
        </v-carousel-item>
      </v-carousel>
      <v-card-title> {{ petData.nomePet }} </v-card-title>
      <v-card-text> {{ petData.raca }} - {{ petData.cor }} - {{ petData.statusCadastro }} </v-card-text>
      <v-card-actions class="dense">
        <AnimalDetails :petData="petData"></AnimalDetails>
        <v-spacer></v-spacer>
        <v-btn color="deep-purple lighten-2" text :href="petData.linkMaisInfo" target="_blank">
          {{petData.site}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import { ref } from '@vue/composition-api'
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import AnimalDetails from '@/components/AnimalDetails.vue'

export default {
  props: {
    petData: {
      type: Object,
      default: () => {},
    }, // or any other constructor
  },
  components: {
    AnimalDetails,
  },
  setup() {
    const isCardDetailsVisible = false
    const rating = ref(5)

    return {
      isCardDetailsVisible,
      rating,

      // icons
      icons: {
        mdiChevronUp,
        mdiChevronDown,
      },
    }
  },
}
</script>

<style></style>

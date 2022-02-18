<template>
  <div>
    <section>
      <v-parallax :src="require('@/assets/images/pages/background_1.jpg')" height="600">
        <v-layout column align-center justify-center class="white--text">
          <h1 class="white--text mb-2 display-1 text-xs-center" style="font-weight: 900; text-shadow: 3px 2px #000000">
            Tudo sobre seu melhor amigo
          </h1>
          <div
            class="white--text subheading mb-3 text-xs-center"
            style="font-weight: 900; text-shadow: 2px 2px #000000"
          >
            Pesquise em diversas bases de dados
          </div>
        </v-layout>
        <v-flex align-self-center style="width:50%">
          <v-text-field
            v-model="codChip"
            background-color="white"
            placeholder="Digite o número do chip"
            outlined
            full-width
            v-on:keyup.enter="onEnter"
          ></v-text-field>
        </v-flex>
      </v-parallax>
    </section>
    <section>
      <v-layout column wrap align-center>
        <v-container grid-list-xl align-center>
          <div class="text-center" v-if="showSpinner">
            <v-progress-circular indeterminate :size="70" color="primary"></v-progress-circular>
          </div>
          <v-layout row wrap align-center>
            <animal-card :petData="item" v-for="item in search" :key="item.site"></animal-card>
          </v-layout>
        </v-container>
      </v-layout>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import AnimalCard from '@/components/AnimalCard.vue'
import { mapActions } from 'vuex'

export default {
  setup() {
    return {
      codChip: '',
      showSpinner: false,
      // icons
      icons: {
        mdiChevronUp,
        mdiChevronDown,
      },
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('search', ['search']),
  },
  components: {
    AnimalCard,
  },
  methods: {
    ...mapActions('search', ['ActionFind']),
    async onEnter() {
      try {
        this.showSpinner = !this.showSpinner
        await this.ActionFind({ id: this.codChip })
      } catch (err) {
        console.log(err)
        //this.error = err.data ? err.data.message : 'Não foi possível realizar essa operação!'
        //this.alert = !this.alert
      }finally{
        this.showSpinner = !this.showSpinner
      }
    },
  },
}
</script>

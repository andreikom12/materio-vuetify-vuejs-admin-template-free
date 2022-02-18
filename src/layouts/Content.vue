<template>
  <v-app>
    <v-app-bar app flat elevate-on-scroll color="#5c4f64">
      <div class="boxed-container w-full">
        <div class="d-flex align-center mx-6">
          <!-- Left Content -->
          <v-img
            :src="require('@/assets/images/logos/logo2.png')"
            max-height="30px"
            max-width="150px"
            alt="logo"
            contain
            eager
            class="app-logo me-3"
          ></v-img>

          <v-spacer></v-spacer>
          <v-btn icon :to="{ name: 'search' }">
            <v-icon color="white">{{ icons.mdiMagnify }}</v-icon>
          </v-btn>
          <app-bar-user-menu v-if="this.user.email !== undefined"></app-bar-user-menu>
          <v-btn color="primary" v-else class="me-2" :to="{ name: 'login' }">
            Entrar
          </v-btn>
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <div class="v-content boxed-container">
        <slot></slot>
      </div>
    </v-main>

    <v-footer app inset color="transparent" absolute height="56" class="px-0">
      <div class="boxed-container w-full">
        <div class="mx-6 d-flex justify-space-between">
          <span>
            &copy; 2021
            <a href="https://www.fc.unesp.br/" class="text-decoration-none" target="_blank"
              >Faculdade de Ciências - Câmpus de Bauru</a
            ></span
          >
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { ref } from '@vue/composition-api'
import { mdiMagnify } from '@mdi/js'
import AppBarUserMenu from './components/AppBarUserMenu.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    AppBarUserMenu,
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  setup() {
    const isDrawerOpen = ref(null)
    return {
      isDrawerOpen,
      isLogged: false,

      // Icons
      icons: {
        mdiMagnify,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.v-app-bar ::v-deep {
  .v-toolbar__content {
    padding: 0;

    .app-bar-search {
      .v-input__slot {
        padding-left: 18px;
      }
    }
  }
}

.boxed-container {
  padding-top: 0px 0px 0px !important;
  max-width: 3840px;
  margin-left: auto;
  margin-right: auto;
}
</style>

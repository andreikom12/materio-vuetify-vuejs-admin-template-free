<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="2"></v-col>
      <v-col cols="12" md="8">
        <v-card id="account-setting-card">
          <v-tabs v-model="tab" centered icons-and-text>
            <v-tab v-for="tab in tabs" :key="tab.icon">
              {{ tab.title }}
              <v-icon>
                {{ tab.icon }}
              </v-icon>
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
          <v-tab-item>
            <AccountSettings :accountData="user"></AccountSettings>
          </v-tab-item>

          <v-tab-item>
            <Animal></Animal>
          </v-tab-item>

          <v-tab-item>
            <Adm></Adm>
          </v-tab-item>
        </v-tabs-items>
        </v-card>
      </v-col>
      <v-col cols="12" md="2"></v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mdiAccountOutline, mdiPaw, mdiInformationOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import { mapState, mapActions } from 'vuex'

import AccountSettings from './accountSettings.vue'
import Animal from './animal.vue'
import Adm from './adm.vue'

export default {
  components: {
    AccountSettings,
    Animal,
    Adm,
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  setup() {
    const tab = ref('')

    // tabs
    const tabs = [
      { title: 'Perfil', icon: mdiAccountOutline },
      { title: 'Animais', icon: mdiPaw },
      { title: 'Adm', icon: mdiInformationOutline },
    ]

    return {
      tab,
      tabs,
      icons: {
        mdiAccountOutline,
        mdiPaw,
        mdiInformationOutline,
      },
    }
  },
}
</script>

<style></style>

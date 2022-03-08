<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link to="/" class="d-flex align-center">
            <v-img
              :src="require('@/assets/images/logos/cat-logo.png')"
              max-height="100px"
              max-width="100px"
              alt="logo"
              contain
              class="me-3 "
            ></v-img>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Bem vindo ao Wheres's Pet ! 👋🏻
          </p>
          <p class="mb-2">
            Por favor, faça login para continuar
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form class="multi-col-validation mt-6" ref="form" v-model="valid" lazy-validation>
            <v-alert :type="status" :value="alert" transition="slide-y-reverse-transition" dismissible>
              {{ statusMessage }}
            </v-alert>
            <v-text-field
              v-model="form.usuario"
              outlined
              label="Email"
              placeholder="john@example.com"
              class="mb-3"
              :rules="emailRules"
              v-on:keyup.enter="validate"
            ></v-text-field>

            <v-text-field
              v-model="form.senha"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Senha"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              @click:append="isPasswordVisible = !isPasswordVisible"
              :rules="requiredRule"
              v-on:keyup.enter="validate"
            ></v-text-field>
            <v-btn block color="primary" :loading="loading" class="mt-6" @click="validate">
              Login
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">
            Novo na plataforma?
          </span>
          <router-link :to="{ name: 'register' }">
            Criar uma conta
          </router-link>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img class="auth-mask-bg" height="173" :src="require(`@/assets/images/misc/mask-dark.png`)" />

    <!-- tree -->
    <v-img class="auth-tree" width="247" height="185" src="@/assets/images/misc/tree.png"></v-img>

    <!-- tree  -->
    <v-img class="auth-tree-3" width="377" height="289" src="@/assets/images/misc/tree-3.png"></v-img>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('auth', ['ActionDoLogin']),
    validate() {
      if (this.$refs.form.validate()) {
        this.submit()
      }
    },
    async submit() {
      try {
        this.loading = true

        var formData = new FormData()
        formData.append('usuario', this.form.usuario)
        formData.append('senha', this.form.senha)
        await this.ActionDoLogin(formData)

        this.alert = !this.alert
        this.status = 'success'
        this.statusMessage = 'Login efetuado com sucesso!'
        setTimeout(() => {
          this.$router.push({ name: 'search' })
        }, 1000)
      } catch (err) {
        console.log(err)
        this.status = 'error'
        this.statusMessage = err.data ? err.data.message : 'Não foi possível realizar essa operação!'
        this.alert = !this.alert
        this.loading = false
        setTimeout(() => {
          this.alert = !this.alert
        }, 8000)
      }
    },
  },
  setup() {
    const isPasswordVisible = ref(false)
    const socialLink = [
      {
        icon: mdiFacebook,
        color: '#4267b2',
        colorInDark: '#4267b2',
      },
      {
        icon: mdiTwitter,
        color: '#1da1f2',
        colorInDark: '#1da1f2',
      },
      {
        icon: mdiGithub,
        color: '#272727',
        colorInDark: '#fff',
      },
      {
        icon: mdiGoogle,
        color: '#db4437',
        colorInDark: '#db4437',
      },
    ]

    return {
      statusMessage: '',
      alert: false,
      status: 'success',
      isPasswordVisible,
      form: {
        usuario: '',
        senha: '',
      },
      socialLink,

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
      requiredRule: [v => !!v || 'Obrigatório'],
      emailRules: [
        v => !!v || 'Obrigatório',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Email inválido'
        },
      ],
      valid: true,
      loading: false
    }
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>

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

            <h2 class="text-2xl font-weight-semibold">
              Where's Pet?
            </h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Sua busca começa aqui 🚀
          </p>
          <p class="mb-2">
            Fique conectado com seu melhor amigo!
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form class="multi-col-validation mt-6" ref="form" v-model="valid" lazy-validation>
            <v-alert :type="status" :value="alert" transition="slide-y-reverse-transition" dismissible>
              {{ statusMessage }}
            </v-alert>
            <v-text-field
              v-model="user.email"
              outlined
              label="Email"
              :rules="emailRules"
              placeholder="john@example.com"
              class="mb-3"
              v-on:keyup.enter="validate"
            ></v-text-field>
            <v-text-field v-model="user.nome" outlined label="Nome" :rules="requiredRule" placeholder="" class="mb-3">
            </v-text-field>
            <v-text-field
              v-model="user.sobrenome"
              outlined
              label="Sobrenome"
              :rules="requiredRule"
              placeholder=""
              class="mb-3"
              v-on:keyup.enter="validate"
            ></v-text-field>
            <v-text-field
              :rules="requiredRule"
              v-model="user.senha"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Senha"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              @click:append="isPasswordVisible = !isPasswordVisible"
              class="mb-3"
              v-on:keyup.enter="validate"
            ></v-text-field>
            <v-text-field
              :rules="[user.senha === user.confirmacaoSenha || 'Senhas não conferem']"
              v-model="user.confirmacaoSenha"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Confirmar Senha"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              @click:append="isPasswordVisible = !isPasswordVisible"
              v-on:keyup.enter="validate"
            ></v-text-field>

            <v-btn block color="primary" :loading="loading" class="mt-6" @click="validate">
              Sign Up
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">
            Já possui uma conta?
          </span>
          <router-link :to="{ name: 'login' }">
            Entrar
          </router-link>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img class="auth-mask-bg" height="190" :src="require(`@/assets/images/misc/mask-dark.png`)" />

    <!-- tree -->
    <v-img class="auth-tree" width="247" height="185" src="@/assets/images/misc/tree.png"></v-img>

    <!-- tree  -->
    <v-img class="auth-tree-3" width="377" height="289" src="@/assets/images/misc/tree-3.png"></v-img>
  </div>
</template>

<script>
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { mapActions } from 'vuex'

export default {
  data: () => ({
    isPasswordVisible: false,
    icons: {
      mdiEyeOutline,
      mdiEyeOffOutline,
    },
    valid: true,
    requiredRule: [v => !!v || 'Obrigatório'],
    emailRules: [
      v => !!v || 'Obrigatório',
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Email inválido'
      },
    ],
    user: {
      nome: '',
      sobrenome: '',
      email: '',
      senha: '',
      confirmacaoSenha: '',
    },
    statusMessage: '',
    alert: false,
    status: 'success',
    loading: false
  }),
  methods: {
    ...mapActions('auth', ['ActionDoRegister']),
    validate() {
      if (this.$refs.form.validate()) {
        this.submit()
      }
    },
    async submit() {
      try {
        this.loading = true
        await this.ActionDoRegister(this.user)
        this.alert = !this.alert
        this.status = 'success'
        this.statusMessage = 'Email de confirmação enviado!'
        setTimeout(() => {
          this.$router.push({ name: 'login' })
        }, 4000)
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
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>

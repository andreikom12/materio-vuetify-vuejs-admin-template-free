<template>
  <v-card flat class="pa-3 mt-2">
    <v-card-text class="d-flex">
      <!-- <v-avatar rounded size="120" class="me-6">
        <v-img :src="require('@/assets/images/avatars/1.png')"></v-img>
      </v-avatar>
      <div>
        <v-btn color="primary" class="me-3 mt-5" @click="$refs.refInputEl.click()">
          <v-icon class="d-sm-none">
            {{ icons.mdiCloudUploadOutline }}
          </v-icon>
          <span class="d-none d-sm-block">FAZER UPLOAD DE NOVA PHOTO</span>
        </v-btn>

        <input ref="refInputEl" type="file" accept=".jpeg,.png,.jpg,GIF" :hidden="true" />

        <v-btn color="error" outlined class="mt-5">
          LIMPAR
        </v-btn>
        <p class="text-sm mt-5">
          Permitido JPG, GIF or PNG. Max size of 800K
        </p>
      </div> -->
    </v-card-text>
    <v-card-text>
      <v-form class="multi-col-validation mt-6" ref="form" v-model="valid" lazy-validation>
        <v-row>
          <!-- Informações Gerais -->
          <v-subheader>Informações Gerais</v-subheader>
          <v-col md="12" cols="12">
            <v-text-field
              v-model="userArray.nome"
              :rules="nameRules"
              required
              label="Nome"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col md="12" cols="12">
            <v-text-field
              v-model="userArray.sobrenome"
              :rules="nameRules"
              label="Sobrenome"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col md="12" cols="12">
            <v-text-field v-model="password" label="Senha" dense outlined></v-text-field>
          </v-col>
          <v-col md="12" cols="12">
            <v-text-field
              v-model="confirmPassword"
              :rules="[password === confirmPassword || 'Senhas não conferem']"
              label="Confirmar Senha"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col md="12" cols="12">
            <v-combobox
              v-model="userArray.telefones"
              label="Telefones"
              :multiple="true"
              chips
              deletable-chips
            ></v-combobox>
          </v-col>
          <v-col md="12" cols="12">
            <v-combobox v-model="userArray.emails" label="Emails" :multiple="true" chips deletable-chips></v-combobox>
          </v-col>
          <v-subheader>Endereços</v-subheader>
          <v-col md="12" cols="12">
            <v-text-field v-model="endereco.logradouro" label="Logradouro" dense outlined></v-text-field>
          </v-col>
          <v-col md="4" cols="12">
            <v-text-field v-model="endereco.bairro" label="Bairro" dense outlined></v-text-field>
          </v-col>
          <v-col md="4" cols="12">
            <v-text-field v-model="endereco.numero" label="Numero" dense outlined></v-text-field>
          </v-col>
          <v-col md="4" cols="12">
            <v-text-field v-model="endereco.complemento" label="Complemento" dense outlined></v-text-field>
          </v-col>
          <v-col md="4" cols="12">
            <v-text-field v-model="endereco.cep" label="Cep" dense outlined></v-text-field>
          </v-col>
          <v-col md="4" cols="12">
            <v-text-field v-model="endereco.cidade" label="Cidade" dense outlined></v-text-field>
          </v-col>
          <v-col md="4" cols="12">
            <v-text-field v-model="endereco.estado" label="Estado" dense outlined></v-text-field>
          </v-col>
          <v-col md="12" cols="12">
            <v-spacer></v-spacer>
            <v-btn color="primary" class="me-3 mt-4">
                Adicionar
              </v-btn>
          </v-col>

          <v-col md="12" cols="12">
            <AddressTable :adressData="userArray.enderecos"></AddressTable>
          </v-col>

          <v-subheader>Relacionamentos</v-subheader>
          <v-col md="12" cols="12">
            <v-text-field v-model="relacionamento.logradouro" label="Logradouro" dense outlined></v-text-field>
          </v-col>

          <v-col cols="2">
            <v-btn color="primary" :loading="loading" class="me-3 mt-4" @click="validate">
              Salvar
            </v-btn>
          </v-col>
          <v-col cols="10">
            <v-alert outlined :value="showAlert" :type="status" text>
              {{ statusMessage }}
            </v-alert>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiAlertOutline, mdiCloudUploadOutline } from '@mdi/js'
import { mapActions } from 'vuex'
import AddressTable from '@/components/tables/AdressTable.vue'

export default {
  props: {
    accountData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    AddressTable,
  },
  mounted() {
    this.userArray = this.accountData
    this.$forceUpdate()
  },
  methods: {
    ...mapActions('profile', ['ActionDoUpdate']),
    ...mapActions('auth', ['ActionLoadSession']),
    validate() {
      if (this.$refs.form.validate()) {
        this.submit()
      }
    },
    async submit() {
      try {
        this.loading = true
        this.userArray.senha = this.password
        this.userArray.confirmacaoSenha = this.confirmPassword
        await this.ActionDoUpdate(this.userArray)
        this.ActionLoadSession()
        this.statusMessage = 'Usuário alterado com sucesso!'
        this.status = 'success'
        this.showAlert = !this.showAlert
      } catch (err) {
        console.log(err)
        this.status = 'error'
        this.error = err.data ? err.data.message : 'Não foi possível realizar essa operação!'
        this.showAlert = !this.showAlert
      } finally {
        this.loading = false
      }
    },
  },
  setup() {
    return {
      endereco: {
        logradouro: '',
        bairro: '',
        numero: '',
        complemento: '',
        cep: '',
        cidade: '',
        estado: '',
      },
      relacionamento:{
        tipo:'',
        nome:'',
        email:'',
        dddTelefone:'',
        telefone:'',
        dddCelular:'',
        celular:''
      },
      showAlert: false,
      statusMessage: '',
      status: 'error',
      loading: false,
      valid: true,
      password: '',
      confirmPassword: '',
      nameRules: [v => !!v || 'Name is required'],
      userArray: {},
      icons: {
        mdiAlertOutline,
        mdiCloudUploadOutline,
      },
    }
  },
}
</script>

<style></style>

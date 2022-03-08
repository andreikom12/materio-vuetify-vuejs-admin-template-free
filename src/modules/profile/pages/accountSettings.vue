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
          <v-subheader>Endereço</v-subheader>
          <v-col md="12" cols="12">
            <v-text-field
              v-model="userArray.endereco.logradouro"
              label="Logradouro"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col md="2" cols="2">
            <v-text-field
              v-model="userArray.endereco.numero"
              label="Numero"
              dense
              type="number"
              min="0"
              outlined
            ></v-text-field>
          </v-col>
          <v-col md="6" cols="6">
            <v-text-field
              v-model="userArray.endereco.complemento"
              label="Complemento"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col md="4" cols="4">
            <v-text-field
              v-model="userArray.endereco.bairro"
              label="Bairro"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col md="6" cols="6">
            <v-text-field
              v-model="userArray.endereco.cidade"
              label="Cidade"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col md="3" cols="3">
            <v-text-field
              v-model="userArray.endereco.estado"
              label="Estado"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col md="3" cols="3">
            <v-text-field
              v-model="userArray.endereco.cep"
              label="CEP"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col md="12" cols="12">
            <EmailsTable :emailsData="emails" @update-email="updateMail"></EmailsTable>
          </v-col>
          <v-col md="12" cols="12">
            <PhonesTable :phonesData="telefones" @update-phones="updatePhone"></PhonesTable>
          </v-col>
          <v-col md="12" cols="12">
            <RelationsTable :relationsData="relacionamentos" @update-relations="updateRelations"></RelationsTable>
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
import { mapActions, mapState } from 'vuex'
import RelationsTable from '@/components/tables/RelationsTable.vue'
import PhonesTable from '@/components/tables/PhonesTable.vue'
import EmailsTable from '@/components/tables/EmailsTable.vue'

export default {
  components: {
    RelationsTable,
    PhonesTable,
    EmailsTable,
  },
  beforeMount() {
    this.userArray = this.user
    this.telefones = this.userArray.telefones
    this.relacionamentos = this.userArray.relacionamanentos
    this.emails = this.userArray.emails
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapActions('profile', ['ActionDoUpdate']),
    ...mapActions('auth', ['ActionLoadSession']),
    updateMail(item){
      this.emails = item
    },
    updatePhone(item){
      this.telefones = item
    },
    updateRelations(item){
      this.relacionamentos = item
    },
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

        this.userArray.emails = this.emails
        this.userArray.telefones = this.telefones
        this.userArray.relacionamanentos = this.relacionamentos
        console.log(this.emails)
        await this.ActionDoUpdate(this.userArray)
        this.ActionLoadSession()

        this.statusMessage = 'Usuário alterado com sucesso!'
        this.status = 'success'
        this.showAlert = !this.showAlert
      } catch (err) {
        console.log(err)
        this.status = 'error'
        this.statusMessage = err.body.message ? err.body.message : 'Não foi possível realizar essa operação!'
        this.showAlert = !this.showAlert
      } finally {
        setTimeout(() => {
          this.showAlert = !this.showAlert
        }, 4000)
        this.loading = false
      }
    },
  },
  data: () => ({
    enderecos: [],
    relacionamentos: [],
    telefones: [],
    emails: [],
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
  }),
}
</script>

<style></style>

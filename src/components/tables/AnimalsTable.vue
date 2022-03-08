<template>
  <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Animais Cadastrados</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Novo Animal
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-form class="multi-col-validation mt-6" ref="form" v-model="valid" lazy-validation>
                <v-container>
                  <v-row>
                    <v-subheader>Informações Gerais</v-subheader>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.microchip" :rules="nameRules" label="Microship"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.nome" :rules="nameRules" label="Nome"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.sexo" :rules="nameRules" label="Sexo"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.especie" :rules="nameRules" label="Espécie"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.raca" :rules="nameRules" label="Raça"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.situacao" :rules="nameRules" label="Situação"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.dataNascimento"
                        :rules="nameRules"
                        label="Data Nasci."
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.cor" :rules="nameRules" label="Cor"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.alimentacao" label="Alimentacao"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-file-input
                        v-model="files"
                        accept=".jpeg,.png,.jpg"
                        label="Imagens"
                        multiple
                        :prepend-icon="icons.mdiCamera"
                      >
                        <template v-slot:selection="{ text }">
                          <v-chip small label color="primary">
                            {{ text }}
                          </v-chip>
                        </template>
                      </v-file-input>
                    </v-col>
                    <v-subheader>Veterinário</v-subheader>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.veterinario.nome"
                        :rules="nameRules"
                        label="Nome"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.veterinario.clinica" label="Clinica"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.veterinario.endereco" label="Endereco"></v-text-field>
                    </v-col>
                    <v-col cols="2" sm="2" md="2">
                      <v-text-field
                        v-model="editedItem.veterinario.ddd"
                        min="10"
                        type="number"
                        :rules="dddRules"
                        label="DDD"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="10" sm="10" md="10">
                      <v-text-field
                        v-model="editedItem.veterinario.telefone"
                        min="0"
                        type="number"
                        :rules="telRules"
                        label="Telefone"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.veterinario.email"
                        :rules="emailRules"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.veterinario.site" label="Site"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-alert outlined :value="showAlert" :type="status" text>
                        {{ statusMessage }}
                      </v-alert>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancelar
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Tem certeza que deseja deletar este animal?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        {{ icons.mdiPencil }}
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        {{ icons.mdiDelete }}
      </v-icon>
    </template>
    <template v-slot:no-data>
      Sem Animais Cadastrados
    </template>
  </v-data-table>
</template>

<script>
import { mdiDelete, mdiPencil, mdiCamera } from '@mdi/js'
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Microship', value: 'microchip', sortable: false },
      { text: 'Nome', value: 'nome', sortable: false },
      { text: 'Sexo', value: 'sexo', sortable: false },
      { text: 'Raça', value: 'raca', sortable: false },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    files: [],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      microchip: '',
      nome: '',
      sexo: '',
      especie: '',
      raca: '',
      situacao: '',
      dataNascimento: '',
      cor: '',
      alimentacao: '',
      veterinario: {
        nome: '',
        clinica: '',
        endereco: '',
        ddd: '',
        telefone: '',
        email: '',
        site: '',
      },
    },
    defaultItem: {
      microchip: '',
      nome: '',
      sexo: '',
      especie: '',
      raca: '',
      situacao: '',
      dataNascimento: '',
      cor: '',
      alimentacao: '',
      veterinario: {
        nome: '',
        clinica: '',
        endereco: '',
        ddd: '',
        telefone: '',
        email: '',
        site: '',
      },
    },
    icons: {
      mdiDelete,
      mdiPencil,
      mdiCamera,
    },
    nameRules: [v => !!v || 'Obrigatório'],
    telRules: [
      v => !!v || 'Obrigatório',
      v => (v && v.length >= 8) || 'Precisa de pelo menos 8 caracteres',
      v => (v && v.length <= 10) || 'Máximo de 10 caracteres',
    ],
    emailRules: [
      v => !!v || 'Obrigatório',
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Email inválido'
      },
    ],
    dddRules: [
      v => !!v || 'Obrigatório',
      v => (v && v.length >= 2) || 'DDD inválido',
      v => (v && v.length <= 2) || 'DDD inválido',
    ],
    valid: true,
    showAlert: false,
    statusMessage: '',
    status: 'error',
    loading: false,
  }),
  computed: {
    ...mapState('profile', ['animalDetails']),
    ...mapState('profile', ['animals']),
    formTitle() {
      return this.editedIndex === -1 ? 'Novo Animal' : 'Editar animal'
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  created() {
    this.getAnimals()
  },
  methods: {
    ...mapActions('profile', ['ActionFindAnimals']),
    ...mapActions('profile', ['ActionFindAnimalDetail']),
    ...mapActions('profile', ['ActionInsertAnimal']),
    ...mapActions('profile', ['ActionDoUpdateAnimal']),
    ...mapActions('profile', ['ActionDeleteAnimal']),
    async getDetails(item) {
      try {
        await this.ActionFindAnimalDetail({ id: item.microchip })
      } catch (err) {
        console.log(err)
        this.status = 'error'
        this.statusMessage = err.body.message ? err.body.message : 'Não foi possível realizar essa operação!'
        this.showAlert = !this.showAlert
      } finally {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, this.animalDetails)
        this.dialog = true
      }
    },

    async getAnimals() {
      try {
        await this.ActionFindAnimals()
      } catch (err) {
        console.log(err)
        this.status = 'error'
        this.statusMessage = err.body.message ? err.body.message : 'Não foi possível realizar essa operação!'
        this.showAlert = !this.showAlert
      } finally {
        if (this.animals.length > 0) {
          this.desserts = this.animals
        } else {
          this.desserts = []
        }
      }
    },

    async insertAnimal(item) {
      try {
        var formData = new FormData()
        formData.append('informacoes', JSON.stringify(item))
        this.files.forEach(elemt => {
          formData.append('imagens', elemt)
        })

        console.log(this.files)

        await this.ActionInsertAnimal(formData)

        this.desserts.push(item)
      } catch (err) {
        console.log(err)
        this.status = 'error'
        this.statusMessage = err.body.message ? err.body.message : 'Não foi possível realizar essa operação!'
        this.showAlert = !this.showAlert
      }
    },

    async updateAnimal(item, index) {
      try {
        var formData = new FormData()
        formData.append('informacoes', JSON.stringify(item))
        this.files.forEach(elemt => {
          formData.append('imagens', elemt)
        })

        await this.ActionDoUpdateAnimal(formData)

        Object.assign(this.desserts[index], item)
      } catch (err) {
        console.log(err)
        this.status = 'error'
        this.statusMessage = err.body.message ? err.body.message : 'Não foi possível realizar essa operação!'
        this.showAlert = !this.showAlert
      }
    },

    async deleteAnimal(item, index) {
      try {
        await this.ActionDeleteAnimal({ id: item.microchip })

        this.desserts.splice(index, 1)
        this.closeDelete()
      } catch (err) {
        console.log(err)
        this.status = 'error'
        this.statusMessage = err.body.message ? err.body.message : 'Não foi possível realizar essa operação!'
        this.showAlert = !this.showAlert
      }
    },

    editItem(item) {
      this.getDetails(item)
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem.microchip = item.microchip
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.deleteAnimal(this.editedItem, this.editedIndex)
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          this.updateAnimal(this.editedItem, this.editedIndex)
        } else {
          this.insertAnimal(this.editedItem)
        }
        this.close()
      }
    },
  },
}
</script>

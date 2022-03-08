<template>
  <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Relacionamentos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Novo relacionamento
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
                    <v-col cols="12" sm="3" md="3">
                      <v-combobox v-model="editedItem.tipo"
                      :items="items"
                      label="Tipo"
                      :rules="nameRules"></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="9" md="9">
                      <v-text-field v-model="editedItem.nome" :rules="nameRules" label="Nome"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.email" :rules="emailRules" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <v-text-field
                        v-model="editedItem.dddTelefone"
                        :rules="dddRules"
                        min="10"
                        type="number"
                        label="DDD"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="9" md="9">
                      <v-text-field
                        v-model="editedItem.telefone"
                        min="0"
                        type="number"
                        :rules="telRules"
                        label="Telefone"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <v-text-field
                        v-model="editedItem.dddCelular"
                        :rules="dddRules"
                        min="10"
                        type="number"
                        label="DDD"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="9" md="9">
                      <v-text-field
                        v-model="editedItem.celular"
                        min="0"
                        type="number"
                        :rules="telRules"
                        label="Celular"
                      ></v-text-field>
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
            <v-card-title class="text-h5">Tem certeza que deseja deletar este relacionamento?</v-card-title>
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
      Sem relacionamentos
    </template>
  </v-data-table>
</template>

<script>
import { mdiDelete, mdiPencil } from '@mdi/js'

export default {
  props: {
    relationsData: {
      type: Array,
      default: () => {},
    },
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Tipo', value: 'tipo', sortable: false },
      { text: 'Nome', value: 'nome', sortable: false },
      { text: 'Email', value: 'email', sortable: false },
      { text: 'DDD Tel', value: 'dddTelefone', sortable: false },
      { text: 'Telefone', value: 'telefone', sortable: false },
      { text: 'DDD Cel', value: 'dddCelular', sortable: false },
      { text: 'Celular', value: 'celular', sortable: false },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      tipo: '',
      nome: '',
      email: '',
      dddTelefone: '',
      telefone: '',
      dddCelular: '',
      celular: '',
    },
    defaultItem: {
      tipo: '',
      nome: '',
      email: '',
      dddTelefone: '',
      telefone: '',
      dddCelular: '',
      celular: '',
    },
    icons: {
      mdiDelete,
      mdiPencil,
    },
    items: ['ESPOSA', 'ESPOSO', 'PAI', 'MAE', 'VÓ', 'VÔ', 'OUTROS'],
    valid: true,
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
    nameRules: [v => !!v || 'Obrigatório'],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo relacionamento' : 'Editar relacionamento'
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
    this.initialize()
  },
  methods: {
    initialize() {
      if (this.relationsData.length > 0) {
        this.desserts = this.relationsData
      } else {
        this.desserts = []
      }
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
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
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.$emit('update-relations', this.desserts)
        this.close()
      }
    },
  },
}
</script>

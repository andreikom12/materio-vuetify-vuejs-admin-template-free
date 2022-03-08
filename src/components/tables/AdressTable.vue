<template>
  <v-container>
    <v-row>
      <v-col md="12" cols="12">
        <v-text-field v-model="logradouro" label="Logradouro" dense outlined></v-text-field>
      </v-col>
      <v-col md="4" cols="12">
        <v-text-field v-model="bairro" label="Bairro" dense outlined></v-text-field>
      </v-col>
      <v-col md="4" cols="12">
        <v-text-field v-model="numero" label="Numero" dense outlined></v-text-field>
      </v-col>
      <v-col md="4" cols="12">
        <v-text-field v-model="complemento" label="Complemento" dense outlined></v-text-field>
      </v-col>
      <v-col md="4" cols="12">
        <v-text-field v-model="cep" label="Cep" dense outlined></v-text-field>
      </v-col>
      <v-col md="4" cols="12">
        <v-text-field v-model="cidade" label="Cidade" dense outlined></v-text-field>
      </v-col>
      <v-col md="4" cols="12">
        <v-text-field v-model="estado" label="Estado" dense outlined></v-text-field>
      </v-col>
      <v-col md="12" cols="12">
        <v-spacer></v-spacer>
        <v-btn color="primary" class="me-3 mt-4" @click="addAdress">
          Adicionar
        </v-btn>
      </v-col>
    </v-row>
    <v-simple-table height="250" fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-uppercase">
              Logradouro
            </th>
            <th class="text-center text-uppercase">
              Bairro
            </th>
            <th class="text-center text-uppercase">
              Número
            </th>
            <th class="text-center text-uppercase">
              Complemento
            </th>
            <th class="text-center text-uppercase">
              CEP
            </th>
            <th class="text-center text-uppercase">
              Cidade
            </th>
            <th class="text-center text-uppercase">
              Estado
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in enderecos" :key="item.logradouro">
            <td class="text-center">
              {{ item.logradouro }}
            </td>
            <td class="text-center">
              {{ item.bairro }}
            </td>
            <td class="text-center">
              {{ item.numero }}
            </td>
            <td class="text-center">
              {{ item.complemento }}
            </td>
            <td class="text-center">
              {{ item.cep }}
            </td>
            <td class="text-center">
              {{ item.cidade }}
            </td>
            <td class="text-center">
              {{ item.estado }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  props: {
    adressData: {
      type: Array,
      default: () => {},
    },
  },
  mounted() {
    //this.enderecos = this.adressData
  },
  methods: {
    clearAdress() {
      this.logradouro = ''
      this.bairro = ''
      this.numero = ''
      this.complemento = ''
      this.cep = ''
      this.cidade = ''
      this.estado = ''
    },
    addAdress() {
      let adressArray = {
        logradouro: this.logradouro,
        bairro: this.bairro,
        numero: this.numero,
        complemento: this.complemento,
        cep: this.cep,
        cidade: this.cidade,
        estado: this.estado,
      }

      //this.enderecos.push(JSON.parse(JSON.stringify(adressArray)))
      this.$set(this.enderecos, this.enderecos.length, JSON.parse(JSON.stringify(adressArray)))
      this.clearAdress()
    },
  },
  setup() {
    return {
      enderecos: [],
      logradouro: '',
      bairro: '',
      numero: '',
      complemento: '',
      cep: '',
      cidade: '',
      estado: '',
    }
  },
}
</script>

<template>
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
        <tr v-for="item in desserts" :key="item.dessert">
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
</template>

<script>
export default {
  props: {
    adressData: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const desserts = [
      {
        logradouro: 'Rua 13 de maio',
        bairro: "Geisel",
        numero: "891",
        complemento: "apto 54 bloco f",
        cep: "17033610",
        cidade: "Bauru",
        estado: "Sp",
      },
    ]

    return {
      desserts,
    }
  },
}
</script>

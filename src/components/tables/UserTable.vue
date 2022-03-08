<template>
  <v-simple-table height="250" fixed-header>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-uppercase">
            Email
          </th>
          <th class="text-uppercase">
            Nome
          </th>
          <th class="text-uppercase">
            Sobrenome
          </th>
          <th class="text-uppercase">
            Permissão
          </th>
          <th class="text-uppercase">
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.dessert">
          <td class="text-justify">
            {{ item.email }}
          </td>
          <td class="text-justify">
            {{ item.nome }}
          </td>
          <td class="text-justify">
            {{ item.sobrenome }}
          </td>
          <td class="text-justify">
            {{ item.roles[0].name }}
          </td>
          <td class="text-justify">
            {{ item.logradouro }}
          </td>
          <td class="text-justify">

          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mdiAlertOutline, mdiCloudUploadOutline } from '@mdi/js'
export default {
  props: {
    usersData: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const desserts = [
      {
        email: 'william.abr95@gmail.com',
        nome: "João 1",
        sobrenome: "silva",
        roles: [
          {
            "name":'ROLE_ADMIN'
          }
        ],
      },
    ]

    return {
      desserts,
    }
  },
}
</script>

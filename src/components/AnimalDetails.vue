<template>
  <v-dialog transition="dialog-top-transition" max-width="900">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" text v-bind="attrs" v-on="on">Detalhes</v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-carousel>
          <v-carousel-item
            v-for="(item, i) in petData.imagens"
            :key="i"
            :src="item.path"
            reverse-transition="fade-transition"
            transition="fade-transition"
            contain
            hide-delimiters
            hide-delimiter-background
          ></v-carousel-item>
        </v-carousel>
        <v-card-title>
          <span class="text-h5">{{ petData.nomePet }}</span>
        </v-card-title>
        <v-container>
          <v-subheader>Informações Gerais</v-subheader>
          <v-row style="padding: 3%">
            <v-col cols="12" sm="6">
              <v-text-field v-model="petData.microchip" label="Microchip" readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="petData.raca" label="Raça" readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="petData.cor" label="Cor" readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="petData.idade" label="Idade" readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="petData.statusCadastro" label="Situação" readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="petData.infoStatus" label="Detalhes Situação" readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="petData.sexo" label="Sexo" readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="petData.especie" label="Espécie" readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="petData.endereco" label="Endereco" readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="petData.cidade" label="Cidade" readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field v-model="petData.infoAdicionais" label="Informações Adicionais" readonly></v-text-field>
            </v-col>
          </v-row>
          <v-subheader>Contatos</v-subheader>
          <v-row style="padding: 3%">
            <v-col cols="12" sm="12">
              <v-expansion-panels>
                <v-expansion-panel v-for="(item, i) in 1" :key="i">
                  <v-expansion-panel-header>
                    {{ petData.nomeProp !== '' ? petData.nomeProp : 'Sem nome' }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row style="padding: 3%">
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="petData.nomeProp" label="Nome" readonly></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-subheader>Emails</v-subheader>
                        <v-list-item v-for="(item, i) in petData.emails" :key="i">
                          <v-list-item-icon>
                            <v-icon color="indigo">{{ icons.mdiEmail }}</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-list-item-title>{{ item.email }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-subheader>Telefones</v-subheader>
                        <v-list-item v-for="(item, i) in petData.telefones" :key="i">
                          <v-list-item-icon>
                            <v-icon color="indigo">{{ icons.mdiPhone }}</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-list-item-title>{{ item.telefone }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog.value = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { mdiEmail, mdiPhone } from '@mdi/js'
export default {
  props: {
    petData: {
      type: Object,
      default: () => {},
    }, // or any other constructor
  },
  setup() {
    return {
      icons: {
        mdiEmail,
        mdiPhone,
      },
      fones: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }
  },
}
</script>

<style></style>

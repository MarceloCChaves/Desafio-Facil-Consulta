<template>
  <div class="container">
    <div class="box">
      <div class="grid">
        <div>
          <header class="header">
            <h3>Sobre o profissional</h3>
            <strong>Dados do profissional</strong>
          </header>
          <div class="form-data">
            <div>
              <label>Nome completo*</label>
              <b-form-input
                placeholder="Digite o nome completo"
                :style="!nameState ? 'border: 1px solid #DC3545' : ''"
                v-model="name"
                trim
                autofocus
              ></b-form-input>
              <small v-if="!nameState" class="text-danger">
                O nome deve ter entre 3 e 48 caracteres
              </small>
            </div>
            <div class="mt-3">
              <label>CPF*</label>
              <b-form-input
                placeholder="Digite um CPF"
                :style="!cpfState ? 'border: 1px solid #DC3545' : ''"
                v-model="cpf"
                trim
                v-mask="'###########'"
              ></b-form-input>
              <small v-if="!cpfState" class="text-danger">
                Insira um CPF válido
              </small>
              <small v-if="cpfs.includes(cpf)" class="text-danger">
                CPF já cadastrado
              </small>
            </div>
            <div class="mt-3">
              <label>Número de celular*</label>
              <b-form-input
                placeholder="(00) 0 0000-0000"
                :style="!phoneState ? 'border: 1px solid #DC3545' : ''"
                v-model="phone"
                v-mask="'(##) # ####-####'"
                trim
              ></b-form-input>
              <small v-if="!phoneState" class="text-danger">
                Insira um telefone válido
              </small>
            </div>
            <div class="d-flex mt-3">
              <div class="d-flex flex-column">
                <label>Estado*</label>
                <select
                  v-model="selectedState"
                  :style="!selectedState ? 'border: 1px solid #DC3545' : ''"
                  style="width: 90%"
                  class="form-select"
                >
                  <option
                    v-for="item in states"
                    :key="item.id"
                    :value="item.nome"
                  >
                    {{ item.nome }}
                  </option>
                </select>
              </div>
              <div class="d-flex flex-column">
                <label>Cidade*</label>
                <select
                  v-if="selectedState === 'Rio Grande do Sul'"
                  v-model="selectedCity"
                  style="width: 100%"
                  :style="!selectedCity ? 'border: 1px solid #DC3545' : ''"
                  class="form-select"
                >
                  <option
                    v-for="item in rioGrandeCities"
                    :key="item.id"
                    :value="item.nome"
                  >
                    {{ item.nome }}
                  </option>
                </select>
                <select
                  v-if="selectedState === 'Santa Catarina'"
                  v-model="selectedCity"
                  :style="!selectedCity ? 'border: 1px solid #DC3545' : ''"
                  style="width: 100%"
                  class="form-select"
                >
                  <option
                    v-for="item in santaCatarinaCities"
                    :key="item.id"
                    :value="item.nome"
                  >
                    {{ item.nome }}
                  </option>
                </select>
                <select
                  v-if="selectedState === 'Paraná'"
                  v-model="selectedCity"
                  :style="!selectedCity ? 'border: 1px solid #DC3545' : ''"
                  style="width: 100%"
                  class="form-select"
                >
                  <option
                    v-for="item in paranaCities"
                    :key="item.id"
                    :value="item.nome"
                  >
                    {{ item.nome }}
                  </option>
                </select>
                <select
                  v-if="selectedState === 'Goiás'"
                  v-model="selectedCity"
                  :style="!selectedCity ? 'border: 1px solid #DC3545' : ''"
                  style="width: 100%"
                  class="form-select"
                >
                  <option
                    v-for="item in goiasCities"
                    :key="item.id"
                    :value="item.nome"
                  >
                    {{ item.nome }}
                  </option>
                </select>
                <select
                  v-if="selectedState === 'Mato Grosso'"
                  v-model="selectedCity"
                  :style="!selectedCity ? 'border: 1px solid #DC3545' : ''"
                  style="width: 100%"
                  class="form-select"
                >
                  <option
                    v-for="item in matoGrossoCities"
                    :key="item.id"
                    :value="item.nome"
                  >
                    {{ item.nome }}
                  </option>
                </select>
                <select
                  v-if="selectedState === 'Mato Grosso do Sul'"
                  v-model="selectedCity"
                  :style="!selectedCity ? 'border: 1px solid #DC3545' : ''"
                  style="width: 100%"
                  class="form-select"
                >
                  <option
                    v-for="item in matoGrossoDoSulCities"
                    :key="item.id"
                    :value="item.nome"
                  >
                    {{ item.nome }}
                  </option>
                </select>
              </div>
            </div>
            <div>
              <small v-if="!selectedState || !selectedCity" class="text-danger">
                Selecione uma opção
              </small>
            </div>
            <div class="myProgress">
              <div class="myBar"></div>
            </div>
            <span>1 de 2</span>
            <div>
              <next-button
                :route="'/attendance'"
                :title="'PRÓXIMO'"
                :color="'#483698'"
                :text-color="`#fff`"
                :submit="createProfissional"
              />
            </div>
          </div>
        </div>
        <img src="../../assets/desktop-pagina-1.png" alt="pesquisa" />
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
import "../Professional/styles.css";
import nextButton from "../../components/NextButton/nextButton";
export default {
  components: { nextButton },
  name: "professional",
  data() {
    return {
      name: "",
      cpf: "",
      phone: "",
      selectedState: "",
      selectedCity: "",
      minimal: 2,
      maximum: 48,
      cpfCharacters: 11,
      phoneCaracters: 15,
      cpfs: [],
      users: [],
      cities: [],
      states: [],
      rioGrandeCities: [],
      santaCatarinaCities: [],
      paranaCities: [],
      goiasCities: [],
      matoGrossoCities: [],
      matoGrossoDoSulCities: [],
      value: 50,
      max: 100,
    };
  },
  async created() {
    const responseUsers = await api.get("/profissionais");
    const responseCities = await api.get("/cidades");
    const responseStates = await api.get("/estados");
    const responseRScities = await api.get(`/estados/1/cidades`);
    const responseSCcities = await api.get(`/estados/2/cidades`);
    const responsePRcities = await api.get(`/estados/3/cidades`);
    const responseGOcities = await api.get(`/estados/4/cidades`);
    const responseMTcities = await api.get(`/estados/5/cidades`);
    const responseMScities = await api.get(`/estados/6/cidades`);
    this.users = responseUsers.data;
    this.cpfs = this.users.map((el) => {
      return el.cpf;
    });
    this.cities = responseCities.data;
    this.states = responseStates.data;
    this.rioGrandeCities = responseRScities.data;
    this.santaCatarinaCities = responseSCcities.data;
    this.paranaCities = responsePRcities.data;
    this.goiasCities = responseGOcities.data;
    this.matoGrossoCities = responseMTcities.data;
    this.matoGrossoDoSulCities = responseMScities.data;
  },
  computed: {
    nameState() {
      if (this.minimal >= this.name.length) {
        return this.name.length > this.minimal ? true : false;
      }
      if (this.maximum >= this.name.length) {
        return this.name.length > this.minimal ? true : false;
      }
      return "";
    },
    cpfState() {
      if (this.cpfCharacters >= this.cpf.length) {
        return this.cpf.length >= this.cpfCharacters ? true : false;
      }
      return "";
    },
    phoneState() {
      if (!this.phoneCaracters <= this.phone.length) {
        return this.phone.length > this.phoneCaracters ? true : false;
      }
      return "";
    },
  },
  methods: {
    async createProfissional() {
      const data = {
        nome: this.name,
        cpf: this.cpf,
        celular: this.phone,
        cidade: this.selectedCity,
        estado: this.selectedState,
      };
      const dataJson = JSON.stringify(data);

      await fetch("http://localhost:3000/medico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });

    },
  },
};
</script>

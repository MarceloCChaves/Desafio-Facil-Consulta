<template>
  <div>
    <div>
      <back-button route="/" />
    </div>
    <div class="container">
      <div class="box">
        <div class="grid">
          <div>
            <header class="header">
              <h3>Sobre o atendimento</h3>
              <strong>Detalhes do atendimento</strong>
            </header>
            <div class="form-data">
              <div>
                <label class="mb-1">Especialidade principal*</label>
                <b-form-select
                  :style="!specialty ? 'border: 1px solid #d9534f' : ''"
                  v-model="specialty"
                  style="width: 90%"
                >
                  <b-form-select-option
                    v-for="item in specialties"
                    :key="item.id"
                    :value="item.nome"
                    >{{ item.nome }}</b-form-select-option
                  >
                </b-form-select>
              </div>
              <div>
                <small v-if="!specialty" class="text-danger">
                  Selecione uma especialidade
                </small>
              </div>
              <div class="mt-3">
                <label class="mb-1">Informe o preço da consulta*</label>
                <b-input-group>
                  <b-input-group-prepend class="input-icon">
                    <div>R$</div>
                  </b-input-group-prepend>
                  <b-form-input
                    placeholder="Valor"
                    :style="!amount ? 'border: 1px solid #d9534f' : ''"
                    v-model="amount"
                    type="number"
                  />
                </b-input-group>
                <small
                  v-if="amount < minimal || amount > maximum"
                  class="text-danger"
                >
                  O valor deve ser entre 30,00 e 350,00
                </small>
              </div>
              <div class="mt-3">
                <label class="mb-3">Formas de pagamento da consulta*</label>
                <b-card
                  :style="!checked ? 'border: 1px solid #d9534f' : ''"
                  class="mb-3"
                >
                  <b-form-checkbox
                    v-model="checked"
                    id="checkbox-1"
                    name="checkbox-1"
                    value="Pix"
                  >
                    <span class="m-5">Pix</span>
                  </b-form-checkbox>
                </b-card>
                <b-card
                  :style="!checked ? 'border: 1px solid #d9534f' : ''"
                  class="mb-3"
                >
                  <b-form-checkbox
                    v-model="checked"
                    id="checkbox-2"
                    name="checkbox-2"
                    value="Dinheiro"
                  >
                    <span class="m-5">Em dinheiro</span>
                  </b-form-checkbox>
                </b-card>
                <b-card
                  :style="!checked ? 'border: 1px solid #d9534f' : ''"
                  class="mb-3"
                >
                  <b-form-checkbox
                    v-model="checked"
                    id="checkbox-3"
                    name="checkbox-3"
                    value="Cartão de crédito"
                  >
                    <span class="m-5">Cartão de crédito</span>
                  </b-form-checkbox>
                  <b-form-group
                    v-if="checked.includes('Cartão de crédito')"
                    v-slot="{ ariaDescribedby }"
                  >
                    <label class="my-3">Parcelamento em</label>
                    <b-form-radio-group
                      id="radio-group-1"
                      v-model="selected"
                      :options="installment"
                      :aria-describedby="ariaDescribedby"
                      name="radio-options"
                    />
                    <small v-if="!selected.length" class="text-danger">
                      Selecione um meio de parcelamento
                    </small>
                  </b-form-group>
                </b-card>
              </div>
              <small v-if="!checked.length" class="text-danger">
                Selecione as formas de pagamento
              </small>
              <div class="mt-3 bar">
                <b-progress :value="value" :max="max"></b-progress>
                <span>2 de 2</span>
              </div>
              <div>
                <next-button
                  :route="'/register'"
                  :title="'PRÓXIMO'"
                  :color="'#483698'"
                  :text-color="`#fff`"
                  :submit="createProfissional"
                />
              </div>
            </div>
          </div>
          <img src="../../assets/desktop-pagina-2.png" alt="atendimento" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
import "../Attendance/styles.css";
import backButton from "../../components/BackButton/backButton";
import nextButton from "../../components/NextButton/nextButton";
export default {
  components: { nextButton, backButton },
  name: "attendance",
  data() {
    return {
      amount: null,
      checked: [],
      value: 100,
      max: 100,
      minimal: 30.0,
      maximum: 350.0,
      selected: "",
      specialty: "",
      specialties: [],
      installment: [
        { text: "1x, sem juros", value: "1x, sem juros" },
        { text: "2x, sem juros", value: "2x, sem juros" },
        { text: "3x, sem juros", value: "3x, sem juros" },
      ],
    };
  },
  async created() {
    const response = await api.get("/especialidades");
    this.specialties = response.data;
  },
  methods: {
    async createProfissional() {
      const data = {
        preco: this.amount,
        especialidade: this.specialty,
        pagamento: this.checked,
        parcelamento: this.selected
      };
      const dataJson = JSON.stringify(data);
      const req = await fetch("http://localhost:3000/especialidadeMedica", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });
      const res = await req.json();
      console.log(res);
    },
  },
};
</script>

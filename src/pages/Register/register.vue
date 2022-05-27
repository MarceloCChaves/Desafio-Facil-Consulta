<template>
  <div>
    <div>
      <back-button route="/attendance" />
    </div>
    <div class="container">
      <div class="box">
        <div class="grid">
          <div>
            <header class="header">
              <h3>Revisão do cadastro</h3>
            </header>
            <div class="form-data">
              <div>
                <strong>Nome completo</strong>
                <p>{{ name }}</p>
              </div>
              <div>
                <strong>CPF</strong>
                <p>{{ cpf }}</p>
              </div>
              <div>
                <strong>Número de celular ou telefone</strong>
                <p>{{ phone }}</p>
              </div>
              <div>
                <strong>Estado/cidade</strong>
                <p>{{ state }}/{{ city }}</p>
              </div>
              <div>
                <strong>Especialidade principal</strong>
                <p>{{specialty}}</p>
              </div>
              <div>
                <strong>Preço da consulta</strong>
                <p>R${{price}}</p>
              </div>
              <div>
                <strong>Formas de pagamento da consulta</strong>
                <p>{{ payment }} {{ installment }}</p>
              </div>
              <div>
                <next-button
                  :route="'/final'"
                  :title="'CADASTRAR PROFISSIONAL'"
                  :color="'#fbde40'"
                  :text-color="`#483698`"
                />
              </div>
              <div class="text-center">
                <router-link to="/">
                  <button class="edit-register">Editar cadastro</button>
                </router-link>
              </div>
            </div>
          </div>
          <img src="../../assets/desktop-pagina-3.png" alt="register" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../Register/styles.css";
import backButton from "../../components/BackButton/backButton";
import nextButton from "../../components/NextButton/nextButton";
export default {
  components: { nextButton, backButton },
  name: "register",
  data() {
    return {
      specialty: null,
      name: null,
      cpf: null,
      phone: null,
      state: null,
      city: null,
      price: null,
      payment: null,
      installment: null
    };
  },
  methods: {
    async getCadastro() {
      const req = await fetch("http://localhost:3000/medico");
      const data = await req.json();
      this.name = data.nome
      this.cpf = data.cpf
      this.phone = data.celular
      this.city = data.cidade
      this.state = data.estado
    },
    async getEsp() {
      const req = await fetch("http://localhost:3000/especialidadeMedica");
      const data = await req.json();
      this.specialty = data.especialidade
      this.price = data.preco
      this.payment = data.pagamento
      this.installment = data.parcelamento
    },
  },
  mounted(){
    this.getCadastro();
    this.getEsp()
  }
};
</script>

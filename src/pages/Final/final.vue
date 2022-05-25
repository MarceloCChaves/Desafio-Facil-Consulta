<template>
  <div>
    <div class="container">
      <div class="box">
        <div class="grid">
          <div>
            <header class="header">
              <h3>Profissinal cadastrado!!!</h3>
            </header>
            <strong>Parabéns, você se juntou a:</strong>
            <b-card class="my-2">
              <div v-for="user in doctors" :key="user.id">
                <strong>{{ user.nome }}</strong>
              </div>
            </b-card>
            <div class="d-flex flex-column">
              <strong
                >e muitos outros médicos cadastrados, ficamos felizes pela
                escolha, e agradecemos a preferência</strong
              >
              <a href="https://www.linkedin.com/company/facilconsulta/" target="_blank">
                <button>
                  Saiba mais
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
import "../Register/styles.css";
export default {
  name: "attendance",
  data() {
    return {
      doctors: [],
    };
  },
  async created() {
    const responseUsers = await api.get("/profissionais");
    this.doctors = responseUsers.data.slice(0, 3);
    console.log(this.users);
  },
};
</script>

<style>
  button{
    padding: 5px 20px;
    color: var(--white);
    background: var(--blue);
    border: none;
    border-radius: 8px;
    margin-top: 20px;
    transition: .5s linear;
  }

  button:hover{
    filter: brightness(90%);
  }
</style>

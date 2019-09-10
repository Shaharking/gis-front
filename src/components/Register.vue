<template>
  <div>
    <div class="wrapper">
      <h1>Registeration</h1>

      <v-ons-list class="user-type-select">
        <v-ons-list-item v-for="(type, $index) in userTypes" :key="type.value" tappable>
          <label class="left">
            <v-ons-radio :input-id="'radio-' + $index" :value="type.value" v-model="form.userType"></v-ons-radio>
          </label>
          <label :for="'radio-' + $index" class="center">{{ type.label }}</label>
        </v-ons-list-item>
      </v-ons-list>

      <div>
        <input
          id="input"
          v-model="form.firstName"
          class="form-control"
          type="text"
          placeholder="First Name "
        />
      </div>

      <div>
        <input
          id="input"
          v-model="form.lastName"
          class="form-control"
          type="text"
          placeholder="Last Name"
        />
      </div>

      <div>
        <input id="input" v-model="form.email" class="form-control" type="text" placeholder="Email" />
      </div>

      <div>
        <input
          id="input"
          v-model="form.password"
          class="form-control"
          type="password"
          placeholder="Password"
        />
      </div>

      <div class="backFromRegister">
        <button class="btn btn-secondary btn-lg" @click="backToMenu" style="margin-right:8px;">Back</button>

        <v-ons-button class="btn btn-primary btn-lg" @click="register">Register</v-ons-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userTypes: [
        {
          label: "Company/Private contractor",
          value: 0
        },
        {
          label: "Tourist",
          value: 1
        }
      ],
      form: {
        userType: undefined,
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined
      }
    };
  },
  computed: {
    user() {
      const user = this.$store.getters["user"];
      return user;
    },
    isLogged() {
      return this.user && !!this.user.token;
    }
  },
  methods: {
    backToMenu() {
      this.$store.dispatch("setMenuState", "main_menu");
    },

    register() {
      this.$store.dispatch("userRegister", this.form).then(res => {
        this.$router.push({ path: "/" });
      });
    }
  }
};
</script>

<style scoped>
.user-type-select {
  width: 400px;
  margin-bottom: 10px;
}

.textInput {
  padding: 8px;
  display: flex;
  width: 380px;
  height: 20px;
  margin: 0px 0px 5px 0px;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.backFromRegister {
  margin-top: 8px;
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>

<template>
  <div class="full-height">
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
          class="textInput"
          type="text"
          placeholder="First Name "
        >
      </div>

      <div>
        <input
          id="input"
          v-model="form.lastName"
          class="textInput"
          type="text"
          placeholder="Last Name"
        >
      </div>

      <div>
        <input id="input" v-model="form.email" class="textInput" type="text" placeholder="Email">
      </div>

      <div>
        <input
          id="input"
          v-model="form.password"
          class="textInput"
          type="password"
          placeholder="Password"
        >
      </div>
      <div>
        <v-ons-button modifier="small" style="margin-top: 10px" @click="register">Register</v-ons-button>
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
</style>

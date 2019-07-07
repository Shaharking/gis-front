<template>
  <div class="full-height">
    <div id="Login" v-if="!isLogged">
      <div class="Username">
        <h1>LOGIN:</h1>
      </div>
      <div>
        <h2>
          <input class="textInput" placeholder="Username" v-model="form.username">
        </h2>
      </div>
      <div>
        <h2>
          <input class="textInput" placeholder="Password" v-model="form.password">
        </h2>
      </div>
      <v-ons-button modifier="large" style="margin: 6px 0" @click="login">LOGIN</v-ons-button>
      <div class="Username">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/600px-Facebook_logo_%28square%29.png"
          width="25px"
          height="25px"
          align="left"
        >
        <button width="100px">
          <h5>Login with Facebook</h5>
        </button>
      </div>
      <div class="Username">
        <img
          src="https://herevde.net/wp-content/uploads/2018/06/google-g-logo.jpg"
          width="25px"
          height="25px"
          align="left"
        >
        <button width="100px">
          <h5>Login with Google</h5>
        </button>
      </div>
    </div>
    <div class="already-loged" v-else>
      <div>You are already logged in as</div>
      <div>{{ user.email }}</div>
      <div>
        <v-ons-button modifier="large" style="margin: 6px 0" @click="logout">Logout</v-ons-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      form: {
        username: undefined,
        password: undefined
      }
    };
  },
  computed: {
    // ...mapGetters(["center", "cityName", "cities", "getMap", "attractions"]) //
    user() {
      const user = this.$store.getters["user"];
      return user;
    },
    isLogged() {
      return this.user && !!this.user.token;
    }
  },
  methods: {
    login() {
      const { username, password } = this.form;
      this.$store.dispatch("userLogin", { email: username, password });
    },
    logout() {
      this.$store.dispatch("userLogout");
    }
  },
  watch: {
    user() {
      console.log(this.user);
    }
  }
};
</script>

<style scoped>
#Login {
  color: #251d1d;
  width: 400px;
  margin: 0 auto;
  margin-top: 250px;
}

.Username {
  padding: 8px;
  display: flex;
  margin-left: 80px;
}

.textInput {
  padding: 8px;
  display: flex;
  width: 380px;
  height: 20px;
  margin: 0px 0px 5px 0px;
}

p {
  font-family: Arial, Helvetica, sans-serif;
}

.already-loged {
  text-align: center;
  font-size: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
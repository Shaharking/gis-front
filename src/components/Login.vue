
<template>
  <div>
    <div id="Login" v-if="!isLogged">
      <div class="Username"></div>
      <div class="signIn">Sign in</div>
      <div>
        <h4>
          <input class="form-control" placeholder="Username" v-model="form.username" />
        </h4>
      </div>
      <div>
        <h4>
          <input class="form-control" placeholder="Password" v-model="form.password" />
        </h4>
      </div>

      <div>
        <button class="btn btn-secondary btn-lg" @click="backToMenu">Back</button>
        <v-ons-button class="btn btn-primary btn-lg" @click="login">LOGIN</v-ons-button>
      </div>
    </div>
    <div class="already-loged" v-else>
      <div>You are already logged in as</div>
      <div>{{ user.email }}</div>
      <div>
        <button class="btn btn-secondary btn-lg" @click="backToMenu" style="margin-right:8px;">Back</button>
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
    },

    backToMenu() {
      this.$store.dispatch("setMenuState", "main_menu");
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
}

.signIn {
  color: black;
  font-size: 200%;
  text-decoration: underline;
  font-family: "Hepta Slab", serif;
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

.BackFromLogin {
  width: 100%;
  text-align: left;
}
</style>
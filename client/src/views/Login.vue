<template>
    <div class="login-page">
  <div class="form">
    <form @submit.prevent="login()" class="login-form">
      <div v-if="errorMsg" class="alert alert-danger" role="alert">
            {{errorMsg}}
      </div>
      <div v-if="successMsg" class="alert alert-success" role="alert">
            {{successMsg}}
      </div>
      <input v-model="user.username"
        type="text" placeholder="username" required/>
      <input v-model="user.password"
        type="password" placeholder="password" required/>
      <button type="submit">login</button>
      <p class="message">Not registered?
          <router-link :to="{name: 'Signup'}">Create an account</router-link></p>
    </form>
  </div>
</div>
</template>

<script>

import EventBus from '@/event-bus';

const LOGIN_URL = 'http://localhost:5000/auth/login';


export default {
  data: () => ({
    errorMsg: '',
    successMsg: '',
    user: {
      username: '',
      password: '',
    },

  }),
  methods: {
    login() {
      this.errorMsg = '';
      this.successMsg = '';
      const body = {
        username: this.user.username,
        password: this.user.password,
      };
      fetch(LOGIN_URL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      }).then((user) => {
        // successfull logged in // create token in the browser
        localStorage.token = user.token;
        console.log(user);
        EventBus.$emit('loggedIn', 'Is Logged In');
        this.successMsg = 'Successfull, Logging in...';
        this.$router.push('/library');
      }).catch((error) => {
        this.errorMsg = error.message;
      });
    },
  },

};
</script>

<style scoped>
* {
    overflow: hidden;
}

.login-page {
  padding: 2% 0 0;
  margin: auto;
  width: 100%;
    height: 90.5vh;
    background-color: green;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  height: 360px;
  width: 460px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
  font-size: 20px;
}
.form .message {
  font-size: 15px;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}


html, body {
  background: #76b852; /* fallback for old browsers */
  background: -webkit-linear-gradient(right, #76b852, #8DC26F);
  background: -moz-linear-gradient(right, #76b852, #8DC26F);
  background: -o-linear-gradient(right, #76b852, #8DC26F);
  background: linear-gradient(to left, #76b852, #8DC26F);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

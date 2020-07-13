<template>
    <div class="login-page">
     <div class="form">
        <form @submit.prevent="signup" class="register-form">
        <div v-if="errorMsg" class="alert alert-danger" role="alert">
            {{errorMsg}}
        </div>
        <div v-if="successMsg" class="alert alert-success" role="alert">
            {{successMsg}}
        </div>
        <input v-model="user.username"
        type="text" id="username" placeholder="name" required/>
        <input v-model="user.password"
        type="password" id="password" placeholder="password" required/>
        <input v-model="user.email"
        type="email" id="email" placeholder="email address" required/>
        <input v-model="user.age"
        type="number" id="age" placeholder="age" required/>
        <input v-model="user.adress"
        type="text" id="adress" placeholder="adress" required/>
        <input v-model="user.balance"
        type="number" id="balance" placeholder="balance" required/>
        <button type="submit">create</button>
        <p class="message">Already registered?
            <router-link :to="{name: 'Login'}">Login</router-link></p>
        </form>
     </div>
    </div>
</template>

<script>

import Joi from 'joi';

const SIGNUP_URL = 'http://localhost:5000/auth/signup';

const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30)
    .required(),
  // password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  password: Joi.string().trim().min(5).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  age: Joi.number().integer().min(0).max(100)
    .required(),
  adress: Joi.string().min(1).trim().required(),
  balance: Joi.number().min(1).max(500000).required(),
});

export default {
  data: () => ({
    errorMsg: '',
    successMsg: '',
    user: {
      username: '',
      password: '',
      email: '',
      age: '',
      adress: '',
      balance: '',
    },
  }),
  watch: {
    user: {
      handler() {
        this.errorMsg = '';
        this.successMsg = '';
      },
      deep: true,
    },
  },
  methods: {
    signup() {
      this.errorMsg = '';
      this.successMsg = '';
      if (this.validUser()) {
        const body = {
          username: this.user.username,
          password: this.user.password,
          email: this.user.email,
          age: this.user.age,
          adress: this.user.adress,
          balance: this.user.balance,
        };
        // Send data to the server
        fetch(SIGNUP_URL, {
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
          if (user.message) {
            this.errorMsg = user.message;
          } else {
            this.successMsg = 'Registration Successfull! Redirecting to the Login page!';
            setTimeout(() => {
              this.$router.push('/login');
            }, 3000);
          }
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    validUser() {
      const result = Joi.validate(this.user, schema);
      if (result.error === null) {
        return true;
      }
      const fullErrorMessage = result.error.details[0].message;
      const errorSplit = fullErrorMessage.split(' ')[0];
      const errorMessage = errorSplit.substring(1, errorSplit.length - 1);

      switch (errorMessage) {
        case 'username':
          this.errorMsg = 'Invalid username';
          break;
        case 'password':
          this.errorMsg = 'Invalid password';
          break;
        case 'email':
          this.errorMsg = 'Invalid email';
          break;
        case 'age':
          this.errorMsg = 'Invalid age';
          break;
        case 'adress':
          this.errorMsg = 'Invalid adress';
          break;
        case 'balance':
          this.errorMsg = 'Invalid balance';
          break;
        default:
      }

      return false;
    },
  },
};
</script>


<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

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
  height: 610px;
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

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <button class="navbar-toggler" type="button"
        data-toggle="collapse" data-target="#navbarColor01"
        aria-controls="navbarColor01" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item ">
                <router-link class="nav-link" :to="{name: 'Home'}">Home</router-link>
            </li>
            <li v-if="isLogged === false" class="nav-item">
                <router-link class="nav-link" :to="{name: 'Signup'}">SignUp</router-link>
            </li>
            <li v-if="isLogged === false" class="nav-item">
                <router-link class="nav-link" :to="{name: 'Login'}">Login</router-link>
            </li>
            <li v-if="isLogged === true" class="nav-item">
                <router-link class="nav-link" :to="{name: 'Library'}">Library</router-link>
            </li>
             <li v-if="isLogged === true" class="nav-item">
               <button type="button" class="btn btn-secondary" id="logOut" @click="logOut()">
                 LogOut
               </button>
            </li>
            </ul>
        </div>
        <span class="nav-span">Welcome!</span>
    </nav>
</template>

<script>

import EventBus from '@/event-bus';

export default {
  data: () => ({
    isLogged: false,
  }),
  created() {
    EventBus.$on('loggedIn', () => {
      this.isLogged = true;
    });
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem('token');
      this.isLogged = false;
      this.$router.push('/login');
    },
  },


};
</script>

<style>
li a{
    font-size: 25px;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.nav-span{
    position: relative;
    float: left;
    font-size: 25px;
    color:white;
}
#logOut{
  position: relative;
  margin-top: 5px;
  left: 100vh;
  color: white;

}


</style>

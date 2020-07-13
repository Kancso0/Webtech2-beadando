<template>
    <section v-if="showLastBuyForm">
       <div id="modal">
           <div id="modal-content">
               <div class="buyForm">
                   <div class="summary">Summary Document</div>
                   <hr class="hr">
                   <hr class="hr">
                   <div class="summary-1">Selected Books</div>
                    <table>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                        </tr>
                        <tr v-for="(selectedBook,index) in selectedBooks" :key="index">
                            <td class="imgTd">
                            <img style="height: 100px; width: 100px;
                            position: relative;"
                            :src="selectedBook.image"></td>
                            <td>{{selectedBook.title}}</td>
                            <td>{{selectedBook.price}}</td>
                        </tr>
                    </table>
                    <div class="container">
                    <div class="row justify-content-center my-2">
                    <table class="sumTable">
                      <tr class="sumTr">
                          <td>Összeg</td>
                          <td>{{sumBooksPrice}}</td>
                      </tr>
                    </table>
                    </div>
                    </div>
                    <hr class="hr">
                    <div class="container">
                    <div class="row justify-content-center my-2">
                      <button @click="buyAndSendEmail()"
                      class="btn btn-success btn-lg mr-3">Buy Now</button>
                      <button @click="closeSummaryDoc()"
                      class="btn btn-dark btn-lg">Cancel</button>
                    </div>
                    </div>
                </div>
           </div>
      </div>
    </section>


</template>

<script>

import EventBus from '@/event-bus';

const BUYBOOK_URL = 'http://localhost:5000/library/buyBook';

export default {
  props: {
    selectedBooks: {
      type: Array,
    },
    sumBooksPrice: {
      type: Number,
    },
    showLastBuyForm: {
      type: Boolean,
    },
    user: {
      type: Object,
    },
  },
  methods: {
    closeSummaryDoc() {
      EventBus.$emit('summaryDoc', 'Close');
    },
    buyAndSendEmail() {
      const datas = {
        email: this.user.email,
        summ: this.sumBooksPrice,
      };
      fetch(BUYBOOK_URL, {
        method: 'POST',
        body: JSON.stringify(datas),
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.token}`,
        },
      }).then((res) => res.json())
        .then((resp) => {
          console.log(resp);
          if (resp) {
            alert('Email Sent!');
            this.$router.go({ name: this.$route.name });
          }
        });
    },
  },
};
</script>

<style scoped>
#modal { /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */ /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
#modal-content {
  position: relative;
  margin: auto;
  top:50px;
  padding: 0;
  border: 1px solid #888;
  width:  70%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
  background:slategrey;
}
@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:20px; opacity:1}
}

table, td, th {
  border: 1px solid black;
  background:rgb(107, 195, 221);
}
table tr {
  background:rgb(107, 195, 221);
  border: 2px solid black;
}
table th {
  border: 3px solid black;
  text-align: center;
}
table {
  border-collapse: collapse;
  width: 100%;
  height: 100%;
}
table td {
  text-align: center;
}
.imgTd {
  width: 20%;
}
.summary {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin:10px;
  color: yellow;
}
.hr {
    border-top: 3px solid green;
}
.summary-1{
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin:10px;
  color:navy
}
.sum {
  border: 1px solid black;
  text-align: center;
  background:rgb(107, 195, 221);
  padding: 10px;
  font-weight: bold;
}
.sumTable {
  width: 500px;
  height: 50px;
  margin-top: 20px;
  font-weight: bold;
}
</style>>

<template>
<!-- Profile -->
    <section>
      <div class="container">
        <div class="row align-items-center" id="row">
          <span class="pr-md-3 pl-md-3 item-name">User:</span>
          <div class="pr-md-3 pl-md-3 col item">{{user.username}}</div>
          <span class="pr-md-3 pl-md-3 item-name">Balance:</span>
          <div class="col item">{{user.balance}}</div>
          <span class="pr-md-3 pl-md-3 item-name">Adress:</span>
          <div class="col item">{{user.adress}}</div>
          <span class="pr-md-3 pl-md-3 item-name">Email:</span>
          <div class="col item">{{user.email}}</div>
          <span class="pr-md-3 pl-md-3 item-name">Age:</span>
          <div class="col item">{{user.age}}</div><span class="pr-lg-5"></span>
          <span><img @click="showBasket = !showBasket" class="shoppingCart"
          src="../assets/shopping_cart.png"></span>
          <span class="counter">{{bookCounter}}</span>
        </div>
      </div>
      <hr>
      <!-- Searching field -->
      <section>
      <div class="container searchAndBox">
      <form class="form-inline active-purple-3 active-purple-4 searchForm">
          <i class="fas fa-search" aria-hidden="true"></i>
          <input v-model="search" class="form-control form-control-sm ml-3 w-75"
          type="text" placeholder="Search"
            aria-label="Search">
      </form>
      <div class="checkBox">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="exampleRadios"
          id="exampleRadios1" value="title" v-model="checkedBox" >
          <label class="form-check-label" for="exampleRadios1">
            Title search
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="exampleRadios"
          id="exampleRadios2" value="author" v-model="checkedBox">
          <label class="form-check-label" for="exampleRadios2">
            Author search
          </label>
        </div>
      </div>
      <button @click="showForm = !showForm" class="btn btn-info px-5 "
      id="showForm">AddBook</button>
      </div>
      </section>
      <!-- Books -->
      <section class="container books">
              <div class="row mt-3">
                <div class="col-6"
                v-for="book in filteredBooks" :key="book.isbn">
            <div class="card mb-3" align="center">
            <h3 class="card-header">{{book.title}}</h3>
            <div class="card-body">
              <h5 class="card-title">{{book.Author}}</h5>
            </div>
            <img style="height: 400px; width: 100%; display: block;"
            :src="book.image">
            <ul class="list-group list-group-flush" align="center">
              <li class="list-group-item">ISBN: {{book.isbn}}</li>
              <li class="list-group-item">Publication: {{book.yearOfPublication}}</li>
              <li class="list-group-item">Price: {{book.price}} Ft</li>
              <li class="list-group-item">Stock: {{book.stock}} db</li>
              <li @click="clickeddBook(book)" class="list-group-item buyNow">Buy now!</li>
            </ul>
            <div class="card">
            <div class="card-body" id="descriptionField">
              <h4 class="card-title">Description</h4>
              <p class="card-text">{{book.description}}</p>
            </div>
          </div>
          </div>
          </div>
          </div>
      </section>
      <!-- Add book form -->
      <section v-if="showForm">
        <div id="modal">
           <div id="modal-content">
        <form @submit.prevent="addBook()">
          <fieldset>
            <div align="center" class="formTitle">
              Add new book</div>
            <div v-if="errorMsg" class="alert alert-danger" align="center" role="alert">
              {{errorMsg}}
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1" class="font-weight-bold">Title</label>
              <input v-model="newBook.title"
              type="text" class="form-control" placeholder="Enter title">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1" class="font-weight-bold">Author</label>
              <input v-model="newBook.Author"
              type="text" class="form-control" placeholder="Enter Author">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1" class="font-weight-bold">ImageURL</label>
              <input v-model="newBook.image"
              type="text" class="form-control" placeholder="Enter image URL">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1" class="font-weight-bold">ISBN</label>
              <input v-model="newBook.isbn"
              type="text" class="form-control" placeholder="Enter ISBN">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1" class="font-weight-bold">Publication Date</label>
              <input v-model="newBook.yearOfPublication"
              type="text" class="form-control" placeholder="Enter Publication date">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1" class="font-weight-bold">Price</label>
              <input v-model="newBook.price"
              type="text" class="form-control" placeholder="Enter price">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1" class="font-weight-bold">Stock</label>
              <input v-model="newBook.stock"
              type="text" class="form-control" placeholder="Enter stock">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1" class="font-weight-bold">Description</label>
              <input v-model="newBook.description"
              type="text" class="form-control" placeholder="Enter description">
            </div>
            <div class="text-center my-3">
            <button type="submit" class="btn btn-primary mx-3">Submit</button>
            <button @click="showForm=false" class="btn btn-dark">Cancel</button>
            </div>
          </fieldset>
        </form>
        </div>
        </div>
      </section>
      <!-- basket content table -->
      <section v-if="showBasket">
        <div id="baskerModal">
          <div id="basketModalContent">
            <span class="basket">Basket</span>
            <table>
              <tr>
                <th>Title</th>
                <th>Price</th>
              </tr>
              <tr v-for="(basketBook,index) in selectedBooks" :key="index">
                <td>{{basketBook.title}}</td>
                <td>{{basketBook.price}}</td>
                <div v-if="selectedBooks.length>0" id="divX">
                <span @click="deleteBook(index)" id="x">X</span>
                </div>
              </tr>
              <tr class="lastRow">
                <td>Összeg</td>
                <td>{{sumBooksPrice}}</td>
              </tr>
            </table>
            <div class="basketButton">
              <button @click="buyNow()" class="btn btn-success mr-3 my-1">Buy Now</button>
              <button @click="showBasket=false" class="btn btn-dark">Cancel</button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <buy v-bind:selectedBooks="selectedBooks" v-bind:sumBooksPrice="sumBooksPrice"
        v-bind:showLastBuyForm="showLastBuyForm" v-bind:user="user"/>
      </section>

    </section>
</template>

<script>

import Joi from 'joi';
import EventBus from '@/event-bus';
import Buy from './Buy.vue';


const schema = Joi.object().keys({
  title: Joi.string().trim().min(3)
    .max(30)
    .required(),
  isbn: Joi.number().integer().min(1111111111111).max(9999999999999)
    .required(),
  Author: Joi.string().min(3).required(),
  yearOfPublication: Joi.number().integer().min(1000).max(2020)
    .required(),
  price: Joi.number().integer().required(),
  stock: Joi.number().integer().max(100).required(),
  image: Joi.string().required(),
  description: Joi.string().min(10).max(90000).required(),
});


const API_URL = 'http://localhost:5000/';
const BOOKS_URL = 'http://localhost:5000/library';
const ADDBOOK_URL = 'http://localhost:5000/library/addBook';


export default {
  components: { Buy },
  data: () => ({
    user: {},
    books: [],
    search: '',
    checkedBox: 'title',
    showForm: false,
    showBasket: false,
    showLastBuyForm: false,
    errorMsg: '',
    bookCounter: 0,
    selectedBooks: [],
    sumBooksPrice: 0,
    newBook: {
      title: '',
      isbn: '',
      Author: '',
      yearOfPublication: '',
      price: '',
      stock: '',
      image: '',
      description: '',
    },
  }),
  watch: {
    newBook: {
      handler() {
        this.errorMsg = '';
      },
      deep: true,
    },
  },

  computed: {
    filteredBooks() {
      if (this.checkedBox === 'title') {
        return this.books.filter((book) => book.title.toLowerCase().trim().match(this.search));
      }
      return this.books.filter((book) => book.Author.toLowerCase().trim().match(this.search));
    },

  },
  mounted() {
    fetch(API_URL, {
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      },
    }).then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.user) {
          this.user = result.user;
          this.getBooks();
        } else {
          localStorage.removeItem('token');
          this.$router.push('/login');
        }
      });
    EventBus.$on('summaryDoc', () => {
      this.showLastBuyForm = false;
    });
  },
  methods: {
    getBooks() {
      fetch(BOOKS_URL, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      }).then((res) => res.json())
        .then((books) => {
          this.books = books;
          console.log(this.books);
        });
    },
    addBook() {
      if (this.validAddBookForm()) {
        fetch(ADDBOOK_URL, {
          method: 'POST',
          body: JSON.stringify(this.newBook),
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.token}`,
          },
        }).then((res) => res.json())
          .then((note) => {
            console.log(note);
          });
        this.showForm = false;
        this.$router.go({ name: this.$route.name });
      }
    },
    validAddBookForm() {
      const result = Joi.validate(this.newBook, schema);

      if (result.error === null) {
        return true;
      }
      const fullErrorMessage = result.error.details[0].message;
      const errorSplit = fullErrorMessage.split(' ')[0];
      const errorMessage = errorSplit.substring(1, errorSplit.length - 1);

      switch (errorMessage) {
        case 'title':
          this.errorMsg = 'Invalid title! Minimum 3 maximum 30 character.';
          break;
        case 'isbn':
          this.errorMsg = 'Invalid isbn! Must be equal to 13 character.';
          break;
        case 'Author':
          this.errorMsg = 'Invalid author! Minimum 3 character.';
          break;
        case 'yearOfPublication':
          this.errorMsg = 'Invalid Publication Date! Must be between 1000 and 2020.';
          break;
        case 'price':
          this.errorMsg = 'Invalid price!';
          break;
        case 'stock':
          this.errorMsg = 'Invalid stock! Maximum 100 allowed.';
          break;
        case 'image':
          this.errorMsg = 'Invalid Image!';
          break;
        case 'description':
          this.errorMsg = 'Invalid description! Minimum 10 maximum 90000 character.';
          break;
        default:
      }


      return false;
    },
    clickeddBook(book) {
      const selectedBook = {
        isbn: book.isbn,
        title: book.title,
        price: book.price,
        image: book.image,
      };
      this.selectedBooks.push(selectedBook);
      this.bookCounter = this.selectedBooks.length;
      this.total();
      alert('Book has been successfully added to your cart!');
    },
    deleteBook(index) {
      this.selectedBooks.splice(index, 1);
      this.bookCounter = this.selectedBooks.length;
      this.total();
    },
    total() {
      this.sumBooksPrice = this.selectedBooks.reduce((prev, cur) => parseInt(prev, 10)
      + parseInt(cur.price, 10), 0);
    },
    buyNow() {
      /* if (this.selectedBooks.length <= 0) {
        alert('Failed Purchase! No book selected!');
      } else if (this.sumBooksPrice >= this.user.balance) {
        alert('Failed Purchase! Not enough balance.');
      } else {
        alert('Successful Purchase!');
      } */
      this.showLastBuyForm = true;
    },
  },


};
</script>

<style scoped>
* {
  background-color: grey;
}
#row {
  width: 100%;
  height: 50px;
  border: 2px solid;
}
.item {
  background:rgb(116, 112, 112);
  color:rgb(107, 195, 221);
  border: 2px solid black;
  border-radius: 5px;
  width:100vh;
  height: 100%;
  text-align: center;
  padding-top:9px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}
.item-name {
  margin: auto;
  font-weight: bold;
}
hr {
  border: 1.5px dashed black;
}
.searchForm {
  padding-left: 200px;
}
.searchAndBox{
  position: relative;
  padding-top: 15px;
}
.checkBox {
  position: absolute;
  top:3px;
  padding-left: 15px;
}
.buyNow {
  background: indianred;
  font-weight: bold;
  cursor: pointer;
}
.formTitle{
  font-size: 30px;
  font-weight: bold;
}
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
  top:20px;
  padding: 0;
  border: 1px solid #888;
  width: 60%;
  height: 60%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
}
@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:20px; opacity:1}
}
#showForm {
  position: absolute;
  left: 84%;
  bottom: 0%;
}
#descriptionField {
  height: 300px;
  width:100%;
}
.shoppingCart {
  width: 30px;
  height: 30px;
  background-color: grey;
  cursor: pointer;
}
.counter {
  position: relative;
  top:-7px;
  left: -5px;
  z-index: 1;
  padding-left: 5px;
  padding-right: 5px;
  font-size:20px;
  font-weight: bold;
  color: yellow;
  border: 2px solid rgb(107, 195, 221);
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
}
table td {
  width: 180px;
  height: 30px;
  text-align: center;
}
.lastRow {
  border: 4px solid;
  font-weight: bold;
}
.basket {
  text-align: center;
  font-weight: bold;
  color:darkkhaki;
  background: dodgerblue;
  color: black;

}
#basketModal {
  position: fixed;
  z-index: 1; /* Sit on top */ /* Location of the box */
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  background: dodgerblue;
}
#basketModalContent {
  position: absolute;
  margin: auto;
  z-index: 1;
  top:8%;
  right: 0%;
  padding: 0;
  text-align: center;
  background: dodgerblue;
  border: 1px solid #888;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animtop;
  animation-duration: 0.4s
}
@keyframes animtop {
  from {top:-300px; opacity:0}
  to {top:8%; opacity:1}
}
#x {
  background: dodgerblue;
  color: red;
  font-family: 'Helvetica', 'Arial', sans-serif;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  cursor: pointer;
}
#divX{
  background-color: rgb(107, 195, 221);
}
.basketButton {
  background-color: dodgerblue;
}

</style>

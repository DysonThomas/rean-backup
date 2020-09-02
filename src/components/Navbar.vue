<template>
  <div class="hello">
  
    <nav class="navbar custom-nav  navbar-expand-lg navbar-light ">
      <div class="container">
        <router-link class="navbar-brand" to="/">Vue Shop</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <b-button variant="success" v-if="status==0" v-b-modal.modal-1>Get Start</b-button>
            
            <router-link to="/cart"  v-if="status==1" class="btn btn-outline-success border-0 mx-2 my-2 my-sm-0" data-toggle="modal" data-target="#miniCart">
              <i class="fas fa-cart-plus"></i>
            </router-link>
           <router-link to="/profile" v-if="status==1" class="btn btn-outline-success border-0  my-2 my-sm-0" data-toggle="modal" data-target="#miniCart">
              <i class="fa fa-users" aria-hidden="true"></i>
            </router-link>
          </form>
        </div>

        <!-- Modal -->
        <b-modal id="modal-1" title="Welcome To Vue Shop" :hide-footer="true">
          <div>
            
            <b-tabs content-class="mt-3" align="center">
              <b-tab title="Login" active>
                <!-- <img class="modal-img" src="../assets/Images/2.jpg"> -->
              
                  <form>
                    <div class="form-group">
                      <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        placeholder="Enter email"  required>
                    </div>
                    <div class="form-group">
                      <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required>
                    </div>
                    <p>Forgot Pasword?<span   @click="forgotpassword" class="frg"> Click Here</span></p>
                    <button type="submit" @click="login" class="btn btn-primary mr-2">Sign In</button>
                    <button type="submit" @click="close" class="btn btn-primary">Close</button>
                  </form>
                
              </b-tab>
              <b-tab title="Sign Up">
                  <form>
                         <div class="form-group">
                    <input type="text" v-model="name" class="form-control" placeholder="Enter Your Name" required>  
                         </div>
                    <div class="form-group"> 
                      
                      <input type="email" v-model="email1" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        placeholder="Enter email" required>
                    </div>
                    <div class="form-group">
                      <input type="password" v-model="password1" class="form-control" id="exampleInputPassword1" placeholder="Password" required>
                    </div>
                    
                    
                    <button type="submit" @click="register" class="btn btn-primary mr-2">Sign Up</button>
                    <button type="submit" @click="close"  class="btn btn-primary">Close</button>
                  </form>
             
              </b-tab>
            </b-tabs>
          </div>
        </b-modal>
      </div>

    </nav>


  </div>
</template>

<script>
import {fb,db} from '../firebase'

import firebase from '../firebase'
  export default {
    name: "Navbar",
    props: {
      msg: String
    },
      data(){
      return {
          name:"",
          email:"",
          password:"",
          email1:"",
          password1:"",
          status:"0"
      }
  },
   created(){
     fb.auth().onAuthStateChanged((user)=>{
     if (user) {
      //  console.log(user)
      this.status=1
     } else {
    
  }
});


  },
    methods:{
      cart(){
              this.$bvModal.hide('Addtocart-1')
      },
      close(){
        this.$bvModal.hide('modal-1')
      },
      
      forgotpassword(){
        var auth = fb.auth();
        // console.log(auth)
        // var emailAddress = this.email;
        auth.sendPasswordResetEmail(this.email).then(function() {
        alert("There is a reset link in your email address");
        }).catch(function(error) {
         console.log(error)
        })
      },
        login(){
       fb.auth().signInWithEmailAndPassword(this.email, this.password)
                        .then(() => {
                          alert("Sucess")   
                               this.close();                  
                        })
                        .catch(function(error) {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            if (errorCode === 'auth/wrong-password') {
                                alert('Wrong password.');
                            } else {
                                alert(errorMessage);
                            }
                            console.log(error);
                    });

      },
      register(){
            fb.auth().createUserWithEmailAndPassword(this.email1, this.password1)
                .then((user) => {
                  alert("Sucess")
                      this.close();
                    db.collection("profiles").doc(user.user.uid).set({
                        name: this.name,
                        type:"customer"
                    })
                    .then(function() {
                        console.log("Document successfully written!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });

                    // this.$router.replace('admin');
                })
                .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @media (min-width: 992px) {

    .navbar.custom-nav {
      padding-top: 16px;
      padding-bottom: 16px;
      background-color: #0000000f !important;
    }
    form{
      text-align: center;
    }
    .modal-img{
      width: 20%;
    }
    .frg{
      color: blue;
      cursor: pointer;
    }

  }
</style>
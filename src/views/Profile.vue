<template>
  <div class="products">
    <navbar></navbar>

    <div class="card">
      <div class="profile-tab">
        <b-tabs content-class="mt-2" align="center">
          <b-tab title="Profiles" active>
            <!-- <img class="modal-img" src="../assets/Images/2.jpg"> -->
            <form>
              <div class="container mt-5">
                <div class="row">

                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" name="" v-model="profile.name" placeholder="Full name" class="form-control">
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="mobile" v-model="profile.phone" placeholder="Phone" class="form-control">
                    </div>
                  </div>
                   <div class="col-md-12">
                    <div class="form-group">
                      <input type="text" v-model="profile.address" placeholder="housename" class="form-control">
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" @keyup.space="pinsearch" v-model="profile.postCode"
                        placeholder="Pincode (Press Space Key For Auto Fill)" class="form-control">

                    </div>
                  </div>
                 
                  <div class="col-md-6 col-lg-6">
                    <div class="form-group">
                      <input type="text" v-model="profile.Block" placeholder="City" class="form-control">
                    </div>
                  </div>
                   <div class="col-md-12 col-lg-4">
                    <div class="form-group">
                      <input type="text" v-model="profile.PostOffice" placeholder="PostOffice" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-12 col-lg-4">
                    <div class="form-group">
                      <input type="text" v-model="profile.District" placeholder="District" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-12 col-lg-4">
                    <div class="form-group">
                      <input type="text" v-model="profile.State" placeholder="State" class="form-control">
                    </div>
                  </div>



                  <div class="col-md-12">
                  
                      <button class="btn btn-primary" @click="updateProfile">
                        Save Changes
                      </button>
                       <button class="btn btn-danger ml-5" @click="logout">
                        Logout
                      </button>
            
                    
                  </div>

                </div>
              </div>

            </form>

          </b-tab>
          <b-tab title="Orders">
              <div class="border-bottom mt-3" v-for="(order,index) in orders"  :key="index">
                <div  class="row" v-for="(item, index) in order.order_items" :key="index">

                  {{ log(order)}}
                     <div class="col-lg-2">
                        <img class="item-img" :src=item.images[0]>
                   </div> 
                   <div class="col-lg-4">
                  
                      <!-- <img :src='images[1]' class="mt-5" alt="..." width="250px"> -->
               
                     <p>{{item.name}}</p>
                   </div>
                   <div class="col-lg-2">
                      <p>size: {{item.size}}</p>
                   
                   </div>
                     <div class="col-lg-2">
                          <p>qty: {{item.quantity}}</p>
                   </div>
                     <div class="col-lg-2">
                          <p>Status: {{order.status}}</p>
                   </div>
                
                 
                 
                  
                 
                </div>
              </div>
          </b-tab>
          <!-- <b-tab title="Orders">
          <div class="table-responsive">
          <table class="table" align=center>
          <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Type</th>          
          <th>Quantity</th>
          <th>Size</th>
          </tr>
        <template v-for="order in orders">
        <tr v-for="item in order">
        <td>
        {{item.name}}
        
        </td>

        <td>
         {{item.price}}
         </td>

         <td>
         {{item.type}}
         </td>

         <td>
         {{item.quantity}}
         </td>
         <td>
         {{item.size}}
         </td>
         </tr>
         </template>
         </table>
         </div>
      

          </b-tab>-->
        </b-tabs>
      </div>
      


    </div>
  </div>
</template>

<script>
  import {fb,db} from '../firebase';
  import axios from 'axios';

  export default {
    name: "Profile",
    props: {
      msg: String
    },

    data() {
      return {
        user: "",
        info: {
          sname: null,
          phone: null,
          address: null,
          postcode: null,
        },
        profile: {},
        orders:[],
      }
    },

    firestore() {
      const user = fb.auth().currentUser;
      return {
        profile: db.collection('profiles').doc(user.uid),
      }
    },
    created(){
      const user = fb.auth().currentUser;
     db.collection("orders").where("id", "==", user.uid)
    .get()
    .then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            this.orders.push(doc.data())
            // console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    }); 
    },
    methods: {

      log(){

        console.log({...arguments})
      },

      updateProfile() {
        const user = fb.auth().currentUser;
        db.collection("profiles").doc(user.uid).set(this.profile
          )
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
        alert("Sucess")
      },
      logout() {
        fb.auth().signOut()
          .then(() => {
            this.$router.replace('/');
          })
          .catch((err) => {
            console.log(err);
          });
      },
       async pinsearch() {
        
         await axios.get(`https://api.postalpincode.in/pincode/${this.profile.postCode}`).then(response =>
         (this.info = response.data[0].PostOffice[0]
          ))
          this.profile.District=this.info.District
          this.profile.State=this.info.State
          this.profile.PostOffice=this.info.Name
          this.profile.Block=this.info.Block
                   
     },
    
    }

      // created(){
      //   const user = fb.auth().currentUser;
      //   console.log(user);
      //   this.profile.name=user.displayName;

      // }

    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .profile-tab {
    padding-top: 10%;
  }

  .card {
    padding-top: 5%;
    padding-bottom: 5%;
    padding-right: 10%;
    padding-left: 10%;
  }
  .item-img{
    width:200px;
  }


.border-bottom {

  border-bottom: 1px solid red;
}

</style>
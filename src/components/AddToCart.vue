<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <div class="row">
        <div class="col-lg-7 ml-5 item-bag">
          <div class="card">
          <div class="card-header mt-5">
           My Cart
          </div>
         <div class="card-body">
           <div class="row">
             <div v-for="item in this.$store.state.cart">
             <div class="col">
               <img :src=item.images[0] class="mt-5" alt="..." width="241px">
             </div>
             <div class="col">
              <h5 class="mt-0">{{item.name}}</h5>
               <p class="mt-0">{{item.price}} ₹</p>
                        <p class="mt-0">Size: {{item.size}}</p>
                        <p class="mt-0">Qty: {{item.quantity}}</p>
                         <button class="btn" @click="$store.commit('removeFromCart',item)">Remove Item</button>
             </div>
             </div>
           </div>
           </div>
          </div>
        </div>
     <div class="col-lg-4">
          <div class="card border-light" style="max-width: 18rem;">
  <div class="card-header mt-5">
    Price Details
  </div>
  <div class="card-body">
   <div class="container">
     <div class="row">
       <div class="col">
         <p>Price</p>
       </div>
         <div class="col">
         <p> {{ this.$store.getters.totalPrice }} ₹</p>
       </div>
     </div>
     <hr>
     <div class="row">
       <div class="col">
         <p>Total Amount</p>
       </div>
         <div class="col">
           <p> {{ this.$store.getters.totalPrice }} ₹</p>
       </div>
     </div>
     <button @click="Checkout" class="btn btn-primary">Place Order</button>
   </div>
  </div>
</div>
        </div>
        
         
        </div>
     
   
    </div>
     <b-modal id="Addtocart" :hide-footer="true" title="Address">
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
                      <input type="text" @keyup.enter="pinsearch" v-model="profile.postCode"
                        placeholder="Pincode (Press Enter Key For Auto Fill)" class="form-control">

                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <input type="text" v-model="profile.address" placeholder="housename" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-12 col-lg-4">
                    <div class="form-group">
                      <input type="text" v-model="profile.City" placeholder="City" class="form-control">
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
                    <div class="form-group">
                      <button @click="makeorder" class="btn btn-primary mt-2 w-100">Pay {{  this.$store.getters.totalPrice }} ₹</button>
                      
                    </div>
                   
                  </div>

                </div>
              </div>

            </form>
     </b-modal>
  </div>
 
</template>

<script>
const axios = require('axios').default;
  import {fb,db} from '../firebase';
export default {
  name: 'add-to-cart',
  data(){
      return{
        profile:"",
        docId:""
      }
  },
   firestore() {
      const user = fb.auth().currentUser;

      return {
        profile: db.collection('profiles').doc(user.uid),
      }
    },
  methods:{
    Checkout(){
      this.$bvModal.show('Addtocart')
    },
     successPay(){
       this.updatepay();
      },
      failPay(e){
        alert("Payment Pending")
      },
        updatepay()
             {
                  db.collection("orders").doc(this.docId).update({
                  docId:this.docId,
                  paid: "true"
                  })
                .then(function() {
                 console.log("Document successfully updated!");
                  })
                    .catch(function(error) {
                  // The document probably doesn't exist.
                   console.error("Error updating document: ", error);
              });

             },
    deleteData(){
                   this.$store.commit('deleteCart',{...this.$store.state.cart})
             },
       makePayment(amount,order_id){
         
      // 1. GENERATE ORDER_ID using razorpay/order api
      axios.post('https://shop-pay.herokuapp.com/pay/${order_id}',{
        amount:amount
      })
      .then((res)=>{
        var rzp1 = new Razorpay({...options,order_id:res.id},this.successPay,this.failPay);
        rzp1.open();
      })
      .catch((err)=>{console.log("ERR",err)});
      
      
      //  create options object when creating order
      var options = {
        key: 'rzp_test_2xaeEqdN4H55Ut',
        amount: amount*100, /// The amount is shown in currency subunits. Actual amount is ₹599.
        name: 'Vue',
        currency: "INR", // Optional. Same as the Order currency
        description: "കുർബാന പണം",
        // image: this.parishDetails.image,
        handler:  (response) =>{
          this.verifySignature(response);
        },
        prefill: {
            name: "",
            email: ""
        },
        notes: {
            address: ""
        },
        theme: {
            color: "#00ffff"
        }
      }
      },
       verifySignature(response){
      axios.post('https://shop-pay.herokuapp.com/pay/${order_id}'
      ,response
      )
      .then((res)=>{console.log("PAYMENT RESPONSE",res)
        this.deleteData();
      this.updatepay();})
      .catch((err)=>{console.log(err)})
    
    },
    makeorder(){
      let amount=this.$store.getters.totalPrice
      db.collection('orders').add({
        order_items:this.$store.state.cart,
        created_at: new Date(),
       cname:this.profile.name,
        hname:this.profile.address,
      city:this.profile.City,
       district:this.profile.District,
        id:this.profile.id,
        phone:this.profile.phone,
        postcode:this.profile.postCode,
        state:this.profile.State,
        status:"orderd",
        paid:"false"}).then((docRef)=> {
                           
                    
                    // this.$buefy.toast.open('Redirecting to payment')
                    console.log("Document written with ID: ", docRef.id);
                    alert("Success")            
                    this.docId=docRef.id
                    this.makePayment(amount,this.docId)
                  
                    })
                  .catch(function(error) {
                  console.error("Error adding document: ", error);
                });

    }
  },
}
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.cart-hearder{
  text-align: left;
  width: 100%;
  height: 50px;
  margin-left:10%;
  
}
.img-cart{
  width:150px;
}
.price{
  height: 100%;
  background-color: gray;
}

</style>

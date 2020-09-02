<template>  
<div>
      <div class="row mt-4">
          <div class="col">
               <img @click="men" class="mg " src="../assets/Images/man.png" alt="">
              <p  @click="men" class=" mt-2 cate"><i class="fas fa-male"></i> Men</p>
          </div>
            <div class="col">
                <img @click="women" class="mg " src="../assets/Images/woman.png" alt="">
              <p @click="women" class=" mt-2 cate " > <i class="fas fa-female"></i> Women</p>
          </div>
           <div class="col">
                <img class="mg " src="../assets/Images/microchip.png" alt="">
              <p  class=" mt-2  cate " > <i class="fas fa-microchip"></i> Electronics</p>
          </div>
         
      </div>
      <div class="container ">
        <div v-if="gender=='m'" class="row pt-3">
          <div class="col">
            <p @click="tees" class="Sub-categories">T-Shirt</p>
          </div>
           <div class="col">
            <p @click="shirt" class="Sub-categories">Formal Shirt</p>
          </div>
            <div class="col">
            <p @click="casuals" class="Sub-categories">Casual Shirt</p>
          </div>
          <div class="col">
            <p @click="jeans" class="Sub-categories">Jeans</p>
          </div>
          <div class="col">
            <p @click="trackpant" class="Sub-categories">Track Pant</p>
          </div>
          <div class="col">
            <p @click="formals" class="Sub-categories">Formal Pant</p>
          </div>
        </div>
      </div>
      <div class="container">
        <div v-if="gender=='f'" class="row  pt-3">
          <div class="col">
            <p @click="top" class="Sub-categories">Topwear</p>
          </div>
           <div class="col">
            <p @click="ljeans"  class="Sub-categories">Jeans</p>
          </div>
            <div class="col">
            <p @click="lskirt"  class="Sub-categories">Skirt</p>
          </div>
          <div class="col">
            <p  @click="ljeggins"  class="Sub-categories">Jeggins</p>
          </div>
          <div class="col">
            <p @click="sarees"  class="Sub-categories">Sarees</p>
          </div>
          <div class="col">
            <p @click="dupata"  class="Sub-categories">Dupattas</p>
          </div>
        </div>
      </div>
    <div class="container">
      
      <div class="row mt-5 mb-3">
            
            <div class="col-lg-3" v-for="product in products">
                  <div class="card">
                       

                        <img :src=product.images[0] class="mt-5" alt="..." width="250px">
                        <div class="card-body">
                          <div class=" card-name justify-content-between">
                            <h5  @click="showDetails(product)" class="card-title">{{ product.name }}</h5>
                          </div>
                          <h5 class="card-price">{{ product.price }}₹</h5>
                          
                        </div>
                    </div>
                </div>
             
      </div>
    </div>
     <b-modal id="Desc" size="xl" :hide-footer="true" title="View Product">
       <div class="container">
         <div class="row">
           <div class="col-lg-6">
             <carousel :perPage="1">
                          <slide v-for="(image, index) in items.images">
                                <img :src="image" class="card-img-top" alt="..." width="150px">
                          </slide>
                        </carousel>
           </div>
           <div class="col lg-6">
                    <h1>{{items.name}}</h1>
                     <p>{{items.price}} ₹</p>
                     <p>{{items.description}}</p>
                     <h6 class="formlabel">Size:*</h6>
                      <p v-if="items.sizetype=='c'" >One Size</p>
                       <div v-if="items.sizetype=='b'"  class="form-group">
                     <b-form-select placeholder="Gender" v-model="items.size" :options="option"></b-form-select>
                       </div>
                      <div  v-if="items.sizetype=='a'" class="form-group">
                      <b-form-select v-model="items.size" :options="sizeoptions"></b-form-select>
                      </div> 
                      <b-form-input    v-model="items.quantity" placeholder="Qty"></b-form-input>  
                      
                       <button @click="addToCart" class="btn btn-primary">Add To Cart</button>
           </div>
          
         </div>
         
       </div>
     </b-modal>
     <!-- Cart -->
     <!-- <b-modal id="Addtocart" :hide-footer="true" title="View Product">
       <div class="container">
          <ul>
                    <li v-for="item in this.$store.state.cart" class="media">
                      <img :src="item.productImage" width="80px" class="align-self-center mr-3" alt="">
                      <div class="media-body">
                        <h5 class="mt-0">{{item.name}}

                          <span class='float-right' @click="$store.commit('removeFromCart',item)">X</span>
                        </h5>
                        <p class="mt-0">{{item.price}} ₹</p>
                        <p class="mt-0">Size: {{item.size}}</p>
                        <p class="mt-0">Qty: {{item.quantity}}</p>
                        <p class="mt-0">Quantity : {{item.productQuantity }}</p>
                      </div>
                    </li>

                  </ul>
         
       </div>
     </b-modal> -->

</div>
     
 
</template>

<script>
import {db} from '../firebase';

export default {
name:"categories",
 firestore(){
      return {
        products: db.collection('products'),
      }
  },
  data(){
    return {
      option: [
          { value: null, text: 'Please select an option' },
          { value: '32', text: '32' },
          { value: '34', text: '34' },
          { value: '36', text: '36' },
          { value: '38', text: '38' },
        ],
        sizeoptions:[
           { value: null, text: 'Please select an option' },
          { value: 's', text: 'S' },
          { value: 'l', text: 'l' },
          { value: 'xl', text: 'xl' },
          { value: 'xxl', text: 'xxl' },
          { value: 'xxxl', text: 'xxxl' },
        ],
        products: [],
        selectedCategories:"",
        subcategories:"",
        gender:"",
        
        items:{
          size:"",
          sizetype:"",
          quantity:""
        }

    }
  },
  methods:{
    addToCart(){
      this.$store.commit('addToCart', this.items)
       this.$bvModal.hide('Desc')
           this.$router.push('/cart')
       
      this.$bvModal.show('Addtocart')
    },
    showDetails(product){
      this.items=product
      this.$bvModal.show('Desc')
      if(this.items.categories=='top'||this.items.categories=='fshirt'||this.items.categories=='cshirt'||this.items.categories=='tees'||this.items.categories=='skirt'||this.items.categories=='jeggins'){
        this.items.sizetype="a"
      }
      else if(this.items.categories=='fpant'||this.items.categories=='jeggins'||this.items.categories=='jeans'||this.items.categories=='tpant'||this.items.categories=='jeggins'){
        this.items.sizetype="b"
      }
      else{
        this.items.sizetype="c"
      }
    },
    // getImage(images)
    // {
    // console.log(images[0]);
    // },
    men(){
      this.gender="m";
      this.selectedCategories="002"
      this.showProduct();
    },
    women(){
       this.gender="f";
      this.selectedCategories="001"
      this.showProduct();
    },
    tees(){
      this.subcategories="tees"
      this.showSubProduct();
    },
    shirt(){
       this.subcategories="fshirt"
       this.showSubProduct();
    },
    casuals(){
      this.subcategories="cshirt"
      this.showSubProduct();
    },
    jeans(){
      this.subcategories="jeans"
      this.showSubProduct();
    },
    trackpant(){
      this.subcategories="tpant"
      this.showSubProduct();
    },
    formals(){
      this.subcategories="fpant"
      this.showSubProduct();
    },
    top(){
      this.subcategories="top"
      this.showSubProduct();
    },
    ljeans(){
      this.subcategories="jeans"
      this.showSubProduct();
    },
    lskirt(){
      this.subcategories="skirt"
      this.showSubProduct();
    },
    ljeggins(){
      this.subcategories="jeggins"
      this.showSubProduct();
    },
    sarees(){
      this.subcategories="sarees"
      this.showSubProduct();
    },
    dupata(){
      this.subcategories="dupatas"
      this.showSubProduct();
    },
      showSubProduct(){
      this.products.splice(0,this.products.length)
      db.collection("products").where("selected", "==", this.selectedCategories).where("categories","==",this.subcategories).get()
    .then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{ 
            this.products.push(doc.data())
            if(this.products.length==0){
              alert("Out Of Stock")
            }
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    },

    showProduct(){
      this.products.splice(0,this.products.length)
      db.collection("products").where("selected", "==", this.selectedCategories).get()
    .then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{ 
            this.products.push(doc.data())
            if(this.products==""){
              alert("Out Of Stock")
            }
            // console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    }
  }
}
</script>

<style>
.mg{
    width: 70px;
}
.mg{
    cursor:pointer;
}
.cate{
      cursor:pointer;
}
/* .product-item{
    width: 100%;
} */
.card{
     border:none; 
    height: 100%;
   
    
}
.card-img-top{
    width: 50%;
} 
.card-title{
  cursor: pointer;
  text-decoration: underline;
  font-size: 1rem;
}
.card-name{
  text-align: center;
}
.subcategories{
  background-color: whitesmoke;
}
.Sub-categories{
  cursor: pointer;
  color:black
}
.Sub-categories:hover {
    font-size: 1.2rem;
   color:red;
}
</style>
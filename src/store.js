import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
let cart = window.localStorage.getItem('cart');
export default  new Vuex.Store({
    state: {
        cart: cart ? JSON.parse(cart) : [],
      },
      getters: {
       
        totalPrice: state => {
          let total = 0;
        
          state.cart.filter((item) => {
              total+=(item.price*item.quantity);
          });
  
          return total;
        }
      },
      mutations:{
          addToCart(state,items){

            let found = state.cart.find(product => product.id == items.id );
            
            if(found){
              let found1 = state.cart.find(product => product.size == items.size );
              if(found1){
                found.quantity= parseInt(found.quantity)
                items.quantity= parseInt(items.quantity)
                found.quantity=found.quantity + items.quantity;
              }
              else{
                state.cart.push(items)
              } 
            }
            else{
              state.cart.push(items)
            }
            this.commit('saveData');
          },
          deleteCart(state,item){
            state.cart.splice(0, state.cart.length)
          },
          removeFromCart(state, item){

            let index = state.cart.indexOf(item);
            state.cart.splice(index,1);
  
          this.commit('saveData');
  
        },
        saveData(state){
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
          },
      }
})
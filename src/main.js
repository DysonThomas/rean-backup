import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './assets/app.scss';
import VueFirestore from 'vue-firestore' 
import jQuery from 'jquery';
require('firebase/firestore')

window.$ = window.jQuery = jQuery;

import {fb} from './firebase'

Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import VueCarousel from 'vue-carousel'; 
Vue.use(VueCarousel);
Vue.component('add-to-cart', require('./components/AddToCart.vue').default); 
Vue.component('Navbar', require('./components/Navbar.vue').default);
Vue.component('Profile', require('./views/Profile.vue').default);
Vue.component('categories', require('./views/categories.vue').default);


import store from './store.js'


Vue.config.productionTip = false

let app='';
fb.auth().onAuthStateChanged((user)=>{
  if(!app){
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
});



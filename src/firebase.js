import firebase from 'firebase';
import 'firebase/firebase-auth'
import 'firebase/firestore'


const config = {
  apiKey: "AIzaSyD0ZIBwsThSkR6dhgoQY1FWmoHzf3ENUMw",
  authDomain: "vue-shop-c4d3d.firebaseapp.com",
  databaseURL: "https://vue-shop-c4d3d.firebaseio.com",
  projectId: "vue-shop-c4d3d",
  storageBucket: "vue-shop-c4d3d.appspot.com",
  messagingSenderId: "787551510888",
  appId: "1:787551510888:web:d258e8bf0eb87aa5b676dd"

  };
  
  const fb = firebase.initializeApp(config);
  const db = firebase.firestore();

  export {fb,db}

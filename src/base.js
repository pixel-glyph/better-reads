import Rebase from 're-base';
import firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: "AIzaSyDRse_6bBnYjeVxLe9wNDeLDR7SNMIivQc",
  authDomain: "better-reads-44894.firebaseapp.com",
  databaseURL: "https://better-reads-44894.firebaseio.com"
});

const base = Rebase.createClass(app.database());

export default base;

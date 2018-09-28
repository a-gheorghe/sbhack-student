import * as firebase from "firebase";

import { FirebaseConfig } from "./keys.js";
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const valsRef = databaseRef.child("test_vals");

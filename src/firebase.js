import * as firebase from "firebase";

import { FirebaseConfig } from "./keys.js";
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const attemptsRef = databaseRef.child("users").child("user1").child("exercise1").child("attempts");
export const errorsRef = databaseRef.child("users").child("user1").child("exercise1").child("errors");

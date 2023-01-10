//just testing page
import { auth } from "./firebaseConfig.js";
import { db } from "./firebaseConfig.js";
// console.log(db);
// console.log(auth);
// import { addDoc,collection,serverTimestamp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'

//add data
const savePost = async () => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      text: "testing db",
      createdOn: serverTimestamp(),
    });
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
// savePost();

const createUserr = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      "shehzad@tezeract.ai",
      "secratePassword"
    );
    // Signed in
    console.log(userCredential.user);
  } catch (err) {
    console.log(err);
    const errorCode = err.code;
    const errorMessage = err.message;
    // ..
  }
};
// createUserr()
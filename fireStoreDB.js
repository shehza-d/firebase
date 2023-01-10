// Import the functions you need from the SDKs you need
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy,
  deleteDoc,
  updateDoc,
  limit,
} from "firebase/firestore"; //npm
// import { getFirestore } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";//CDN

import { db } from "./path_to_firebaseConfig";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

//get all data
useEffect(() => {
  // (async () => {
  //   const querySnapshot = await getDocs(collection(db, "posts"));
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} =>`, doc.data());
  //     setPosts((perviousValue)=>[...perviousValue, doc.data()]);
  //   });
  // })();

  let unsubscribe;
  (() => {
    const q = query(
      collection(db, "posts"),
      orderBy("createdOn", "desc"),
      limit(60)
    );
    unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
        // console.log({ id: doc.id, ...doc.data() })
      });
      console.log("posts", posts);
    });
  })();

  //this is useEffect cleanup and is called when i leave this useEffect
  return () => {
    unsubscribe();
  };
}, []);

//add data
const savePost = async (e) => {
  e.preventDefault();
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      text: postText,
      createdOn: serverTimestamp(),
    });
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return;
};

//Delete data fun
const deletePost = async () => await deleteDoc(doc(db, "posts", props.id));
// console.log("postId: ", props.id);

const updatePost1 = async (e) => {
  await updateDoc(doc(db, "posts", editing.editingId), {
    text: editing.editingText,
  });
};

const updatePost2 = async (e) => {
  setDropDown(false);
  e.preventDefault();
  await updateDoc(doc(db, "posts", editing.editingId), {
    text: editing.editingText,
  });
  setEditing({
    editingId: null,
    editingText: "",
  });
  setDropDown(false);
};

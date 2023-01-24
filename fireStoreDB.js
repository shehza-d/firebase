// Import the functions you need from the SDKs you need
import {
  getFirestore,
  collection, //get reference to a collection
  addDoc,
  getDocs, //get all docs
  getDoc, //get one doc
  doc, //get reference to a document
  onSnapshot,
  query,
  where,
  serverTimestamp,
  orderBy,
  deleteDoc,
  updateDoc,
  limit,
} from "firebase/firestore"; //npm
// import { getFirestore } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";//CDN

import { db } from "./path_to_firebaseConfig";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

//Working code
const colRef = collection(db, "collectionName"); // collection ref

//
const q = query(
  colRef,
  where("author", "==", "Shehzad"),
  orderBy("userName", "desc")
); //orderBy("createdAt")
//

// get all collection data
getDocs(colRef) //this is not real time
  .then((myDataSnapShot) => {
    // console.log(myDataSnapShot.docs)
    let myData = [];
    myDataSnapShot.docs.forEach((doc) => {
      myData.push({ ...doc.data(), id: doc.id });
    });
    console.log(myData);
  })
  .catch((err) => {
    console.log(err.message);
  });
//
//get/fetching one single document
const docRef = doc(db, "books", "gGu4P9x0ZHK9SspA1d9j");
// const docRef = doc(db, 'userUID', 'documentID=saving')//my
//1 way
getDoc(docRef) //not real time//not recommended
  .then((doc) => {
    console.log(doc.data(), doc.id);
  });
//2 way
onSnapshot(docRef, (doc) => {//recommended
  //RealTime //now we are subscribing to changes to a particular doc
  console.log(doc.data(), doc.id);
});

//
// get all collection data Realtime
await onSnapshot(collection(db, "collectionName"), (myDataSnapShot) => {
  //this call back function is going to fire every time there is a change in collection and send us back the a new snapshot
  //we can also pass in query reference here instead of collection reference to only bring queried items
  let myData = [];
  myDataSnapShot.docs.forEach((doc) => {
    myData.push({ ...doc.data(), id: doc.id });
  });
  console.log(myData);
});

//
//sending data
addDoc(collection(db, "collectionName"), {
  title: "addBookForm.title.value",
  author: "addBookForm.author.value",
}).then(() => {
  // something
  // addBookForm.reset()
});
//

//updating
  updateDoc(docRef, {//this will only update the title and leave rest as it is  
    title: 'updated title'
  })
  .then(() => {
    updateForm.reset()
  })
   setDoc(doc(db, "collectionName", "DocumentID"), {
      amount: 0,
      category: "default",
      createdOn: serverTimestamp(),
    });



//


//deleteFunction
await deleteDoc(doc(db, "collectionName", "idOfDocument"));
//

//Working code




//old
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

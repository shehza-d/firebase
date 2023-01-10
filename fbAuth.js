import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// creating user
const auth = getAuth();
try {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Signed in
  const user = userCredential.user;
  console.log(user);
  // ...
} catch (err) {
  console.log(err);
  const errorCode = err.code;
  const errorMessage = err.message;
  // ..
}

//Sign-In  //LOG-IN
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// const auth = getAuth();
try {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  // Signed in
  const user = userCredential.user;
  console.log(user);
  // ...
} catch (err) {
  console.log(err);
  const errorCode = err.code;
  const errorMessage = err.message;
}

//LOG-OUT
import { getAuth, signOut } from "firebase/auth";
try {
  // const auth = getAuth();
  await signOut(auth);
  // Sign-out successful.
} catch (err) {
  // An error happened.
  console.log(err);
  const errorCode = err.code;
  const errorMessage = err.message;
}

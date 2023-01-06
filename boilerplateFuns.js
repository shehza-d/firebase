try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      "mail@test.com",
      "password"
    );
    // Signed in
    const user = userCredential.user;
  } catch (err) {
    console.log(err);
    const errorCode = err.code;
    const errorMessage = err.message;
  }
  
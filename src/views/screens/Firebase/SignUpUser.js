import Firebase from "./firebaseConfig";

export const SignUpUser = (email, password) => {
  try {
    return Firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    return error;
  }
};



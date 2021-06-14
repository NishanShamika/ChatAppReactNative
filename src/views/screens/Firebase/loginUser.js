import Firebase from "./firebaseConfig";

export const LoginUpUser = (email, password) => {
  try {
    return  Firebase.auth().signInWithEmailAndPassword(email,password);
  } catch (error) {
    return error;
  }
};

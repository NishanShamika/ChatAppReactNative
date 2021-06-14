import firebase from "./firebaseConfig";

export const Parent = async(firstName, secondName, guardian,pAddress,cAddress,telephoneNumber, uid) => {
  try {
    return await firebase.database().
    ref("player/" + uid ).
    set({
      firstName: firstName,
      secondName: secondName,
      guardian: guardian,
      pAddress: pAddress,
      cAddress: cAddress,
      telephoneNumber: telephoneNumber,
      uuid: uid,
    })
  } catch (error) {
    return error;
  }
};
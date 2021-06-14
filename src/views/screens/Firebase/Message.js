import moment from "moment";
import firebase from "./firebaseConfig";

export const SendMessage = async(currentUserId, guestUserId, msgValue, imgSource) => {
  var todayDate = moment();
  console.log('dd', currentUserId)
  console.log('dd', guestUserId)  
  console.log('dd', msgValue)    
  try {
      return await firebase
      .database()
      .ref('messages/' + currentUserId )
      .child( guestUserId )
      .push({
        message: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          image: imgSource,
          date: todayDate.format('YYYY-MM-DD'),
          time: todayDate.format('hh:mm A')
        },
      });
    } catch (error) {
      return error;
    }
  };

  export const RecieveMessage = async(currentUserId, guestUserId, msgValue, imgSource) => {  
    try {
      var todayDate = moment();
      return await firebase
      .database()
      .ref('messages/' + guestUserId )
      .child( currentUserId )
      .push({
        message: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          image : imgSource,
          date: todayDate.format('YYYY-MM-DD'),
          time: todayDate.format('hh:mm A')
        },
      });
    } catch (error) {
      return error;
    }
  };
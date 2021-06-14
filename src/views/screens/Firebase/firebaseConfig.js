import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyC3c8FTuZwllSMNRp2fhw_pjlolTn2EIyg',
  databaseURL: 'https://pro02-8dece-default-rtdb.firebaseio.com/',
  projectId: 'pro02-8dece',
  appId: '1:797818312102:android:880854f3f58f4e28f2ab6',
};

export default Firebase.initializeApp(firebaseConfig);

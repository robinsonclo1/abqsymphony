import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoz0NigBydqMzNJwdJyeDcOfgs8YvIDss",
  authDomain: "symphonyofabq.firebaseapp.com",
  projectId: "symphonyofabq",
  storageBucket: "symphonyofabq.firebasestorage.app",
  messagingSenderId: "34397812389",
  appId: "1:34397812389:web:1131ffa0f89d9c501aff4c",
  measurementId: "G-K5DQFMBXQE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };
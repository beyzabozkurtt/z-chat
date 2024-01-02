import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDcUJmLHpFt77Fq9Sr3_ive9yaa4P7sQ3o",
  authDomain: "z-chat-fcb10.firebaseapp.com",
  projectId: "z-chat-fcb10",
  storageBucket: "z-chat-fcb10.appspot.com",
  messagingSenderId: "436962560741",
  appId: "1:436962560741:web:955bfce5bea8946bfe620c",
  measurementId: "G-LL9RNSFQ9N"
};


// Firebase uygulamasını başlatın
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const setLoading = (loading) => {
  console.log("Loading: ", loading);
};

export { auth, db, storage, setLoading };
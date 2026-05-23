import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfmDoyrC-UqIRgSiiAXa6hDFjFMi078pI",
  authDomain: "sellsights-8b22b.firebase.com",
  projectId: "sellsights-8b22b",
  storageBucket: "sellsights-8b22b.firebasestorage.app",
  messagingSenderId: "796044481882",
  appId: "1:796044481882:web:1cd116de1c5bd1df458f63"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export {
  db,
  auth,
};

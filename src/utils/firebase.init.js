import { initializeApp } from "firebase/app";
const info = import.meta.env;

const firebaseConfig = {
  apiKey: info.VITE_apiKey,
  authDomain: info.VITE_authDomain,
  projectId: info.VITE_projectId,
  storageBucket: info.VITE_storageBucket,
  messagingSenderId: info.VITE_messagingSenderId,
  appId: info.VITE_appId,
};

const app = initializeApp(firebaseConfig);
export default app;

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Validar que las variables de entorno existan
const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_DATABASE_URL',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(v => !process.env[v]);
if (missingVars.length > 0) {
  console.warn(`⚠️ Faltan variables de entorno: ${missingVars.join(', ')}`);
}

const firebaseConfig = {
  apiKey: "AIzaSyDhOJ4Skge7-DAchjCQg02tpmCVDyXeodg",
  authDomain: "rifa-ct-eventos.firebaseapp.com",
  databaseURL: "https://rifa-ct-eventos-default-rtdb.firebaseio.com",
  projectId: "rifa-ct-eventos",
  storageBucket: "rifa-ct-eventos.firebasestorage.app",
  messagingSenderId: "1001992073702",
  appId: "1:1001992073702:web:35cecc60d697e3ada62627"
};

// Inicializar Firebase
let app;
let database;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
} catch (error) {
  console.error('Error inicializando Firebase:', error);
}

export { app, database };
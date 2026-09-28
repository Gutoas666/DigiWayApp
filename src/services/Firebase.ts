import { initializeApp, FirebaseError, getApps, getApp } from 'firebase/app'
import { initializeAuth, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
// A função existe no build React Native do Firebase, mas os tipos do pacote
// não a expõem em 'firebase/auth' (erro TS2305) — por isso o @ts-ignore.
// @ts-ignore
import { getReactNativePersistence } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
}

// Evita duplicidade no Fast Refresh do Expo
const conexao = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

// Persistência em AsyncStorage: o usuário permanece logado entre sessões.
// O initializeAuth só pode ser chamado uma vez por app; se o Fast Refresh
// reexecutar este arquivo, cai no getAuth e reaproveita a instância existente.
function criarAutenticacao() {
  try {
    return initializeAuth(conexao, {
      persistence: getReactNativePersistence(AsyncStorage)
    })
  } catch {
    return getAuth(conexao)
  }
}

const autenticacao = criarAutenticacao()

export { autenticacao, FirebaseError, signInWithEmailAndPassword }

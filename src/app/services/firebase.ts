import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDAQMc8WSn1IVVYg7_u-84u0QShlvf1Ask',
  authDomain: 'secret-santa-f6665.firebaseapp.com',
  projectId: 'secret-santa-f6665',
  storageBucket: 'secret-santa-f6665.firebasestorage.app',
  messagingSenderId: '473580335234',
  appId: '1:473580335234:web:1dbbbeef0bfd71711e049b',
  measurementId: 'G-9CMLNH15ZF',
}
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

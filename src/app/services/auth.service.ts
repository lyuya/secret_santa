import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from './firebase'

const login = async () => {
  const provider = new GoogleAuthProvider()
  await signInWithPopup(auth, provider)
}

const logout = async () => {
  auth.signOut()
}

const isUserConnected = (): boolean => {
  return !!auth.currentUser
}

export { login, logout, isUserConnected }

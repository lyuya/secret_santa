'use client'

import { logout } from '@/app/services/auth.service'
import { auth } from '@/app/services/firebase'
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LogoutIcon from '@mui/icons-material/Logout';
export default function Header() {
  const [user, setUser] = useState<User>()
  const connect = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);  }

  const disconnect = async () => {
    await logout()

  }

  useEffect(() => {
    const _user = auth.currentUser
    console.log('_user', _user)
    if (_user) setUser(_user)
  }, [])
  return (
    <header className="float-right p-5">
      {user && (
        <>
            <span>Hi ! {user.displayName}</span>
            <button
                className="text-red-900 hover:text-red-700"
                onClick={() => disconnect()}
            >
                <LogoutIcon></LogoutIcon>
            </button>
        </>
        )}
      {!user && (
        <button
          className="text-red-900 hover:text-red-700"
          onClick={() => connect()}
        >
          <PersonOutlineIcon></PersonOutlineIcon>
        </button>
      )}
    </header>
  )
}

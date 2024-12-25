'use client'

import { login, logout } from '@/app/services/auth.service'
import { auth } from '@/app/services/firebase'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LogoutIcon from '@mui/icons-material/Logout';
export default function Header() {
  const [user, setUser] = useState<User | null>()
  const connect = async () => {
    await login()
    const user = auth.currentUser
    if (user) setUser(user)
  }

  const disconnect = async () => {
    await logout()

  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, [])
  return (
    <header className="float-right p-5">
      {user && (
        <>
            <div>Hi ! {user.displayName}</div>
            <div className='justify-self-center'>
              <button
                  className="text-red-900 hover:text-red-700"
                  onClick={() => disconnect()}
              >
                  <LogoutIcon></LogoutIcon>
              </button>
            </div>

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

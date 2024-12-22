'use client'

import { login } from '@/app/services/auth.service'
import { auth } from '@/app/services/firebase'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

export default function Header() {
  const [user, setUser] = useState<User>()
  const connect = async () => {
    await login()
  }

  useEffect(() => {
    const _user = auth.currentUser
    console.log('_user', _user)
    if (_user) setUser(_user)
  }, [])
  return (
    <header className="float-right p-5">
      {user && <div>Hi ! {user.displayName}</div>}
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

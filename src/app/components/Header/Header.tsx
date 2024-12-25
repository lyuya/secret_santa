'use client'

import { login, logout } from '@/app/services/auth.service'
import { auth } from '@/app/services/firebase'
import { User } from 'firebase/auth'
import { useContext, useEffect, useState } from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import UserModal from '../UserModal/UserModal'
import { UserContext } from '@/app/layout'

export default function Header() {
  const [user, setUser] = useState<User | null>()
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>();
  const context = useContext(UserContext)

  const connect = async () => {
    await login()
    const user = auth.currentUser
    if (user) setUser(user)
  }

  const openUserModal = () => {
    setIsUserModalOpen(true);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
      context?.setUser(user);
  });
  }, [])
  return (
    <header className="float-right p-5">
      {user && (
        <>
            <div>Hi ! 
              <button className="p-2 hover:underline" onClick={openUserModal}>
              {user.displayName}
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

      {isUserModalOpen && (<UserModal onClose={() => setIsUserModalOpen(false)}></UserModal>)}
    </header>
  )
}

import { User } from 'firebase/auth'
import { createContext, Dispatch, SetStateAction } from 'react'

export const UserContext = createContext<{
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
} | null>(null)

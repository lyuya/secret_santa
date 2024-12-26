'use client'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../services/firebase'
import { Secret } from '../model/secret'
import { useContext, useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import { UserContext } from '../context/context'

export default function SecretList() {
  const [secrets, setSecrets] = useState<Secret[]>([])
  const context = useContext(UserContext)

  const loadHistory = async () => {
    const currentUser = context?.user
    if (!currentUser) {
      console.log('User not connected.')
      setSecrets([])
      return
    }
    const users = collection(db, 'secretList')
    const q = query(users, where('userId', '==', currentUser.uid))

    const secrets: Secret[] = (await getDocs(q)).docs.map((doc) => ({
      name: doc.data().name,
      giftValue: doc.data().giftValue,
      userId: doc.data().userId,
      emails: doc.data().emails,
      date: doc.data().date,
      id: doc.id,
    }))
    setSecrets(secrets)
  }

  useEffect(() => {
    loadHistory()
  }, [context])
  return (
    <>
      <Header></Header>
      <div className="w-4/5 justify-self-center pt-10">
        <div className="grid grid-cols-3 gap-4">
          {secrets &&
            secrets.map((secret) => (
              <div className="min-w-64 rounded-md border p-5" key={secret.id}>
                <div className="text-xs flex items-center justify-between pb-2">
                  <span>{new Date(secret.date).toLocaleString()}</span>
                  <button className="rounded border p-2 hover:bg-gray-100">
                    Resend
                  </button>
                </div>
                <div className="flex items-center flex justify-between">
                  <div className="font-bold text-xl">{secret.name}</div>
                  <div>{secret.giftValue} €</div>
                </div>

                <ul>
                  {secret.emails &&
                    secret.emails.map((email) => (
                      <li className="text-xs" key={secret.id + email}>
                        {email}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

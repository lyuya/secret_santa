'use client'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../services/firebase'
import { Secret } from '../model/secret'
import { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { UserContext } from '../context/context'
import { sendMailFromSecret } from '../services/sendMailService'

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

  const resendEmail = async (secret: Secret) => {
    await sendMailFromSecret(
      secret.name,
      secret.giftValue,
      secret.emails,
      secret.userId
    )
    alert('Resent!')
    loadHistory()
  }

  useEffect(() => {
    loadHistory()
  }, [context])
  return (
    <>
      <Header></Header>
      <div className="w-4/5 justify-self-center justify-items-center py-20">
        <div className="rounded-lg border border-red-50 p-1 grid md:grid-cols-2 lg:grid-cols-3  gap-4 justify-items-center w-fit">
          {secrets &&
            secrets.map((secret) => (
              <div
                className="box-content min-w-64 max-w-80 rounded bg-red-50 p-5 text-red-900 border border-red-50 hover:bg-white"
                key={secret.id}
              >
                <div className="text-xs flex items-center justify-between pb-2">
                  <span>{new Date(secret.date).toLocaleString()}</span>
                  <button
                    onClick={() => resendEmail(secret)}
                    className="rounded border border-red-50 p-2 bg-white hover:bg-red-50"
                  >
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

'use client'
import { useState } from 'react'
import styles from './SecretForm.module.css'
import Link from 'next/link'
import { EmailField } from '../EmailFIeld'
export default function SecretForm() {
  const [name, setName] = useState('')
  const [nbPers, setNbPers] = useState(0)
  const [receivers, setReceivers] = useState<string[]>([
    'm@gmail.com',
    'm1@gmail.com',
    'm12@gmail.com',
  ])
  const [newReceiver, setNewReceiver] = useState('')
  const addNewReceiver = () => {
    if (receivers.includes(newReceiver)) {
      console.error('This receiver is already in the list !')
    } else {
      const receiversCopy = [...receivers]
      receiversCopy.push(newReceiver)
      setReceivers(receiversCopy)
      setNewReceiver('')
    }
  }

  return (
    <>
      <div className="bg-red-200 h-screen content-center">
        <div className="w-2/6 justify-self-center grid gap-y-3">
          <div className="w-full">
            <div className="text-xl font-bold text-red-900">Name of secret</div>
            <input
              className="w-full rounded-md h-10 p-2 text-xl shadow-md"
              value={name}
              onChange={($event) => setName($event.target.value)}
            />
          </div>
          <div>
            <div className="text-xl font-bold text-red-900">
              How many person will join this secret ?
            </div>
            <input
              className="w-full rounded-md h-10 p-2 text-xl shadow-md"
              type="number"
              value={nbPers}
              onChange={($event) => setNbPers(parseInt($event.target.value))}
            />
          </div>
          <div className="pb-10">
            <div className="text-xl font-bold text-red-900">
              Who are they ? (please type their email to let them know)
            </div>
            <div className="w-full rounded-md h-10 text-xl shadow-md bg-white justify-between relative">
              <EmailField
                value={newReceiver}
                onchange={setNewReceiver}
              ></EmailField>
              <button
                disabled={newReceiver.length === 0}
                className="absolute top-[2px] right-0 px-[9px] m-1	right-2 self-center text-red-900 rounded-full hover:bg-red-100"
                onClick={() => addNewReceiver()}
              >
                +
              </button>
            </div>
            <div className="pt-5">
              <ul>
                {receivers &&
                  receivers.map((mail) => (
                    <li className={styles.emoji} key={mail}>
                      <Link
                        href={'mailto:' + mail}
                        className="text-red-900 font-bold"
                      >
                        {mail}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <button className="justify-self-center rounded-full bg-red-700 p-2 w-60 text-white font-bold hover:bg-red-600">
            Create the secret !
          </button>
        </div>
      </div>
    </>
  )
}

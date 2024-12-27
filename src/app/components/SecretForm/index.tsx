'use client'
import { useContext, useState } from 'react'
import styles from './SecretForm.module.css'
import Link from 'next/link'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { sendMailFromSecret } from '@/app/services/sendMailService'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/app/context/context'
import { EmailField } from '../EmailAutoComplete'

export default function SecretForm() {
  const [name, setName] = useState('')
  const [giftValue, setGiftValue] = useState(0)
  const [receivers, setReceivers] = useState<string[]>([])
  const [newReceiver, setNewReceiver] = useState('')
  const context = useContext(UserContext)
  const router = useRouter()
  const addNewReceiver = () => {
    if (receivers.includes(newReceiver)) {
      console.error('This receiver is already in the list !')
    } else {
      setReceivers([...receivers, newReceiver])
    }
    setNewReceiver('')
  }

  const deleteReceiver = (mail: string) => {
    const receiversCopy = receivers.filter((m) => m !== mail)
    setReceivers(receiversCopy)
  }

  const createSecret = async () => {
    await sendMailFromSecret(name, giftValue, receivers, context?.user?.uid)
    router.push('/created')
  }

  return (
    <>
      <div className="bg-red-50 h-screen">
        <header className="absolute top-0 w-full py-2 px-5">
          <Link className="block w-fit" href="/">
            <img height={100} width={75} src="logo.png" />
          </Link>
        </header>
        <div className="content-center px-5 h-full">
          <div className="grid lg:w-1/2 justify-self-center justify-items-center gap-y-3 min-w-80">
            <div className="w-full">
              <div className="text-xl font-bold text-red-900">
                Name of secret
              </div>
              <input
                className="w-full rounded-md h-10 p-2 text-xl shadow-md"
                value={name}
                onChange={($event) => setName($event.target.value)}
              />
            </div>
            <div className="w-full">
              <div className="text-xl font-bold text-red-900">
                How much will the gift be approximately ? (euros)
              </div>
              <input
                className="w-full rounded-md h-10 p-2 text-xl shadow-md"
                type="number"
                value={giftValue}
                onChange={($event) =>
                  setGiftValue(parseInt($event.target.value))
                }
              />
            </div>
            <div className="w-full pb-10">
              <div className="text-xl font-bold text-red-900">
                Who are they ? (please type their email to let them know)
              </div>
              <div className="w-full rounded-md h-10 text-xl shadow-md bg-white justify-between relative">
                <EmailField
                  email={newReceiver}
                  setEmail={setNewReceiver}
                ></EmailField>
                <button
                  disabled={newReceiver.length === 0}
                  className="absolute top-[2px] px-[9px] m-1 right-1 self-center text-red-900 rounded-full hover:bg-red-100"
                  onClick={() => addNewReceiver()}
                >
                  +
                </button>
              </div>
              <div className="pt-5">
                <ul>
                  {receivers &&
                    receivers.map((mail) => (
                      <li
                        className={' flex justify-between w-full mb-2'}
                        key={mail}
                      >
                        <Link
                          href={'mailto:' + mail}
                          className={styles.emoji + ' text-red-900 font-bold'}
                        >
                          {mail}
                        </Link>
                        <button
                          className=" justify-self-center"
                          onClick={() => deleteReceiver(mail)}
                        >
                          <DeleteOutlineIcon className="text-md text-red-900 hover:text-red-700"></DeleteOutlineIcon>
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <button
              onClick={() => {
                createSecret()
              }}
              className="justify-self-center rounded-full bg-red-700 p-2 w-60 text-white font-bold hover:bg-red-600"
            >
              Create the secret !
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

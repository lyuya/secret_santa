'use client'
import { useState } from 'react'
import styles from './SecretForm.module.css'
import Link from 'next/link'
import { EmailField } from '../EmailFIeld'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { db } from '@/app/services/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { organiseReceivers, sendMail } from '@/app/services/sendMailService'
import { useRouter } from 'next/navigation'

export default function SecretForm() {
    const [name, setName] = useState('')
    const [giftValue, setGiftValue] = useState(0)
    const [receivers, setReceivers] = useState<string[]>([])
    const [newReceiver, setNewReceiver] = useState('')
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
        const receiversCopy = receivers.filter(m => m !== mail)
        setReceivers(receiversCopy)
    }

    const createSecret = async () => {
        try {
            const docRef = await addDoc(collection(db, "secretList"), {
                name,
                giftValue,
                emails: receivers
            });
            if(docRef.id) {
                const emailRequest = organiseReceivers(receivers, giftValue, name);
                await sendMail(emailRequest);
            }
            router.push('/created')
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <>
            <div className="bg-red-200 h-screen grid items-baseline">
                <header className="py-2 px-20">
                    <Link href="/">
                        <img height={200} width={150} src="logo.png" />
                    </Link>
                </header>
                <div className="content-center">
                    <div className="w-2/6 content-center justify-self-center grid gap-y-3">
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
                        <div>
                            <div className="text-xl font-bold text-red-900">
                            How much will the gift be approximately ? (euros)
                            </div>
                            <input
                                className="w-full rounded-md h-10 p-2 text-xl shadow-md"
                                type="number"
                                value={giftValue}
                                onChange={($event) => setGiftValue(parseInt($event.target.value))}
                            />
                        </div>
                        <div className="pb-10">
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
                                    className="absolute top-[2px] right-0 px-[9px] m-1 right-2 self-center text-red-900 rounded-full hover:bg-red-100"
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
                                                <button className=" justify-self-center" onClick={() => deleteReceiver(mail)}>
                                                    <DeleteOutlineIcon className="text-md text-red-900 hover:text-red-700"></DeleteOutlineIcon>
                                                </button>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <button onClick={() => { createSecret() }} className="justify-self-center rounded-full bg-red-700 p-2 w-60 text-white font-bold hover:bg-red-600">
                            Create the secret !
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

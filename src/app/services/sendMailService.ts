import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from 'firebase/firestore'
import { MailRequest } from '../model/mailRequest'
import { auth, db } from './firebase'
const collectionName = 'secretList'
export async function sendMailFromSecret(
  name: string,
  giftValue: number,
  emails: string[],
  userId?: string
) {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      name,
      giftValue,
      emails,
      userId,
      date: new Date().getTime(),
    })
    if (docRef.id) {
      const emailRequest = organiseReceivers(emails, giftValue, name)
      await sendMail(emailRequest)
    }
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export async function sendMail(mails: MailRequest[]) {
  return await fetch('/api/mailJet', {
    method: 'POST',
    body: JSON.stringify({ recipients: mails }),
  })
}

export function organiseReceivers(
  receivers: string[],
  giftValue: number,
  name: string
): MailRequest[] {
  const toBeSent = [...receivers]

  return receivers.map((from) => {
    const canBeSent = toBeSent.filter((mail) => mail !== from)
    let indexOfReceiver
    // when only 2 mail address remaining, if one of addresses is equal to last one,
    // choose this address to avoid the last from and to address be the same.
    if (toBeSent.length === 2) {
      const indexOfLastOne = canBeSent.findIndex(
        (mail) => mail === toBeSent[toBeSent.length - 1]
      )
      if (indexOfLastOne >= 0) indexOfReceiver = indexOfLastOne
    }

    if (indexOfReceiver === undefined) {
      indexOfReceiver = Math.floor(Math.random() * (canBeSent.length - 1)) + 0
    }

    const receiver = canBeSent[indexOfReceiver]
    toBeSent.splice(toBeSent.indexOf(receiver), 1)
    return {
      name,
      from,
      to: receiver,
      value: giftValue,
    }
  })
}

export async function getSecretListByCurrentUser(): Promise<
  QueryDocumentSnapshot<DocumentData, DocumentData>[]
> {
  try {
    const currentUser = auth.currentUser
    if (!currentUser) {
      console.warn('No authenticated user.')
      return []
    }

    const users = collection(db, 'user')
    const q = query(users, where('userId', '==', currentUser.uid))
    const secrets: QueryDocumentSnapshot<DocumentData, DocumentData>[] = (
      await getDocs(q)
    ).docs

    if (secrets.length > 0) {
      return secrets
    }
  } catch (error) {
    console.error('Error fetching user settings:', error)
  }

  return []
}

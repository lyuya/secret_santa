import { collection, getDocs, query, where } from 'firebase/firestore'
import { MailRequest } from '../model/mailRequest'
import { auth, db } from './firebase'

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
      let indexOfLastOne = canBeSent.findIndex(
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

export async function getSecretListByCurrentUser(): Promise<{}[]> {
  try {
    const currentUser = auth.currentUser
    if (!currentUser) {
      console.warn('No authenticated user.')
      return []
    }

    const users = collection(db, 'user')
    const q = query(users, where('userId', '==', currentUser.uid))
    const userSettings: {}[] = (await getDocs(q)).docs

    if (userSettings.length > 0) {
      return userSettings
    }
  } catch (error) {
    console.error('Error fetching user settings:', error)
  }

  return []
}

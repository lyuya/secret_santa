'use client'

import { useMemo, useRef } from 'react'
import styles from './emailField.module.css'

const EMAILS_SUFFIX = [
  '@gmail.com',
  '@yahoo.com',
  '@hotmail.com',
  '@outlook.com',
  '@icloud.com',
]
export interface EmailFieldProps {
  email: string
  setEmail: (value: string) => void
}

export const EmailField = ({ email, setEmail }: EmailFieldProps) => {
  const inputRef = useRef(null)
  const chooseEmail = (email: string) => {
    setEmail(email)
  }
  const autoCompletionList = useMemo(() => {
    if (email.length < 3) {
      return []
    }

    if (email.includes('@')) {
      const splittedEmail = email.split('@')

      if (splittedEmail.length !== 2) {
        return []
      }

      const [prefix, suffix] = splittedEmail

      return EMAILS_SUFFIX.filter(
        (emailSuffix) =>
          emailSuffix.startsWith(`@${suffix}`) && !email.includes(emailSuffix)
      ).map((suffix) => `${prefix}${suffix}`)
    }

    return EMAILS_SUFFIX.map((suffix) => `${email}${suffix}`)
  }, [email])

  return (
    <div className="w-full relative self-center">
      <input
        ref={inputRef}
        value={email}
        type="email"
        className={'m-[6px] text-ellipsis ' + styles.input}
        placeholder="example: abc@mail.com"
        onChange={(event) => setEmail(event.target.value)}
      />

      <ul className="absolute rounded-md max-h-[260px] overflow-x-hidden overflow-y-auto w-full mt-1 bg-white shadow-md">
        {autoCompletionList.length > 0 &&
          autoCompletionList.map((item, index) => (
            <li
              className={
                `flex items-center h-[40px] hover:bg-red-50 w-full ` +
                (100 === index && 'bg-slate-300')
              }
              key={index}
            >
              <button
                className="flex items-center space-x-1 w-full h-full p-2 text-red-900 font-bold"
                onClick={() => chooseEmail(item)}
              >
                {item}
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}

'use client';

import { useMemo, useRef, useState } from "react"

const EMAILS_SUFFIX = [
    '@gmail.com',
    '@yahoo.com',
    '@hotmail.com',
    '@outlook.com',
    '@icloud.com',
]

export const EmailField = () => {
    const [email, setEmail] = useState('')
    const inputRef = useRef(null);
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

            return EMAILS_SUFFIX.filter(emailSuffix => emailSuffix.startsWith(`@${suffix}`) && !email.includes(emailSuffix)).map(suffix => `${prefix}${suffix}`)
        }

        return EMAILS_SUFFIX.map(suffix => `${email}${suffix}`)
    }, [email])

    return (
        <div className="border w-full relative" >
            <div className="flex items-center w-full">
                <input ref={inputRef} value={email} type="email" className="font-bold p-2 w-full" placeholder="Enter your email" onChange={(event) => setEmail(event.target.value)}/>
            </div>
            
            <ul className="absolute max-h-[260px] overflow-x-hidden overflow-y-auto w-full mt-1" >
                {
                    autoCompletionList.map((item, index) => (
                        <li
                            className={`flex items-center h-[40px] hover:bg-slate-300 w-full ` + (100 === index && "bg-slate-300")}
                            key={index}
                        >
                            <button className="flex items-center space-x-1 w-full h-full" onClick={(event) => setEmail((event.target as HTMLButtonElement).innerText)}>
                                {item}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

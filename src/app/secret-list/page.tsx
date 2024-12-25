'use client'
import { collection, getDocs, query, where } from "firebase/firestore"
import { auth, db } from "../services/firebase";
import { Secret } from "../model/secret";
import { useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { UserContext } from "../layout";

export default function SecretList() {
    const [secrets, setSecrets] = useState<Secret[]>([]);
    const context = useContext(UserContext)

    const loadHistory = async () => {
        const currentUser = context?.user
        console.log('context', context)
        if (!currentUser) {
            console.error('User not connected.')
            return
        }
        const users = collection(db, 'secretList');
        const q = query(users, where("userId", "==", currentUser.uid));

        const secrets: Secret[] = (await getDocs(q)).docs.map((doc) => ({
            name: doc.data().name,
            giftValue: doc.data().giftValue,
            userId: doc.data().userId,
            emails: doc.data().emails,
            id: doc.id
        }));
        console.log('secrets', secrets)

        setSecrets(secrets);
    }

    useEffect(() => {
        loadHistory()
    }, []);
    return (
        <>
            <Header></Header>
            {secrets && secrets.map((secret) => (
                <div key={secret.id}>
                    <div>{secret.name}</div>
                    <div>{secret.giftValue}</div>
                    <ul>
                        {secret.emails && secret.emails.map((email) => (
                            <li key={secret.id + email}>{email}</li>
                        ))}
                    </ul>

                </div>
            ))}
        </>
    )
}
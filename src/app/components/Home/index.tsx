'use client'
import Link from 'next/link'
import styles from './startSecret.module.css'
import Header from '../Header'
export default function StartSecret() {
  return (
    <>
      <Header></Header>
      <div className={styles.homeContainer}>
        <div className="flex justify-center align-middle self-center h-full">
          <Link
            href="/secret"
            className="hover:bg-red-700 self-center rounded-full bg-red-800 text-white font-bold p-5 text-xl"
          >
            Let&apos;s make a secret !
          </Link>
        </div>
      </div>
    </>
  )
}

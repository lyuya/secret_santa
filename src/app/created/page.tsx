'use client'

import { RefObject, useEffect, useRef } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Link from 'next/link'
import styles from './created.module.css'

type Confetti = {
  x: number
  y: number
  r: number
  color: string
  tilt: number
  speed: number
}

function createConfetti(confettiCanvas: HTMLCanvasElement): Confetti[] {
  const confetti = []
  for (let i = 0; i < 200; i++) {
    confetti.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      tilt: Math.random() * 10 - 5,
      speed: Math.random() * 2 + 1,
    })
  }

  return confetti
}

function drawConfetti(confettiCanvas: HTMLCanvasElement, confetti: Confetti[]) {
  const confettiCtx = confettiCanvas.getContext('2d')
  confettiCtx?.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height)

  return confetti.map((c) => {
    if (confettiCtx) {
      confettiCtx.beginPath()
      confettiCtx.arc(c.x, c.y, c.r, 0, Math.PI * 2)
      confettiCtx.fillStyle = c.color
      confettiCtx.fill()
      c.y += c.speed
      c.tilt += Math.random() * 0.1 - 0.05
      if (c.y > confettiCanvas.height) c.y = -c.r
    }

    return c
  })
}

function animate(confettiCanvas: HTMLCanvasElement, confetti: Confetti[]) {
  const newConfetti = drawConfetti(confettiCanvas, confetti)
  requestAnimationFrame(() => animate(confettiCanvas, newConfetti))
}

export default function Created() {
  const confettiCanvas: RefObject<HTMLCanvasElement | null> = useRef(null)

  useEffect(() => {
    if (!confettiCanvas.current) {
      return
    }

    confettiCanvas.current.width = window.innerWidth
    confettiCanvas.current.height = window.innerHeight

    let confetti: Confetti[] = []

    confetti = createConfetti(confettiCanvas.current)
    animate(confettiCanvas.current, confetti)
  })

  return (
    <>
      <div className="h-screen">
        <div className={'absolute top-1/2 ' + styles.rightCenter}>
          <Link href="/">
            <span className="p-5 text-3xl text-red-900 hover:text-red-700">
              <ArrowBackIcon></ArrowBackIcon>
            </span>
          </Link>
          <button className="rounded-xl bg-red-100/30 shadow p-5 text-red-900 font-bold text-xl backdrop-blur-md ">
            Check your mail box ! 🎁
          </button>
        </div>

        <canvas ref={confettiCanvas}></canvas>
      </div>
    </>
  )
}

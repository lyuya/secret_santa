'use client'

import { useEffect } from "react"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";

export default function Created() {
    useEffect(() => {
        const confettiCanvas = document.getElementById('confettiCanvas') as HTMLCanvasElement
        const confettiCtx = confettiCanvas.getContext('2d')
        confettiCanvas.width = window.innerWidth
        confettiCanvas.height = window.innerHeight

        let confetti: {
            x: number,
            y: number,
            r: number,
            color: string,
            tilt: number,
            speed: number
        }[] = []

        function createConfetti() {
            confetti = []
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
        }

        function drawConfetti() {
            confettiCtx?.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height)
            confetti.forEach((c) => {
                if (confettiCtx) {
                    confettiCtx.beginPath()
                    confettiCtx.arc(c.x, c.y, c.r, 0, Math.PI * 2)
                    confettiCtx.fillStyle = c.color
                    confettiCtx.fill()
                    c.y += c.speed
                    c.tilt += Math.random() * 0.1 - 0.05
                    if (c.y > confettiCanvas.height) c.y = -c.r
                }
            })
        }

        function animate() {
            drawConfetti()
            requestAnimationFrame(animate)
        }

        createConfetti()
        animate()
    })
    return (
        <>
        <div className="h-screen">
            <div className="absolute right-1/2 top-1/2 ">
            <Link href="/">
                <span className="p-5 text-3xl text-red-900 hover:text-red-700">
                    <ArrowBackIcon></ArrowBackIcon>                
                </span> 
            </Link>
            <button className="rounded-xl bg-red-100/30 shadow p-5 text-red-900 font-bold text-xl backdrop-blur-md ">
                Check your mail box ! 🎁
            </button>                
            </div>

            <canvas id="confettiCanvas"></canvas>            
        </div>

        </>
    )
}
'use client'

import { useEffect, useRef } from 'react'

export default function HighwayCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    let animId: number
    let W = 0, H = 0, dpr = 1
    let roadY = 0, roadHeight = 0
    let isVisible = true
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function resize() {
      dpr = window.devicePixelRatio || 1
      const rect = c!.getBoundingClientRect()
      W = rect.width
      H = rect.height
      c!.width = W * dpr
      c!.height = H * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      computeRoad()
    }

    function computeRoad() {
      roadY = H * 0.18
      roadHeight = Math.max(60, H * 0.14)
    }

    type Car = {
      x: number; y: number; speed: number; length: number
      color: string; laneIdx: number; depth: number; gap: number
    }

    const NUM_LANES = 5
    const cars: Car[] = []

    function laneY(i: number) {
      const laneH = roadHeight / NUM_LANES
      return roadY - roadHeight / 2 + laneH * (i + 0.5)
    }

    function makeColor(isRed: boolean) {
      if (isRed) return `hsl(0,${70 + Math.random()*20}%,${45 + Math.random()*15}%)`
      const h = [180,210,220,240][Math.floor(Math.random()*4)]
      return `hsl(${h},${30+Math.random()*20}%,${55+Math.random()*15}%)`
    }

    function spawnCar(laneIdx: number): Car {
      const right = laneIdx < 3
      const depth = 0.3 + Math.random() * 0.7
      return {
        x: right ? -100 : W + 100,
        y: laneY(laneIdx),
        speed: (right ? 1 : -1) * (1.5 + Math.random() * 3) * depth,
        length: (35 + Math.random() * 50) * depth,
        color: makeColor(false),
        laneIdx,
        depth,
        gap: 80 + Math.random() * 120,
      }
    }

    function spawnInitialCars() {
      for (let i = 0; i < NUM_LANES; i++) {
        for (let j = 0; j < 3; j++) {
          const car = spawnCar(i)
          car.x = Math.random() * W
          cars.push(car)
        }
      }
    }

    function drawRoad() {
      const grad = ctx!.createLinearGradient(0, roadY - roadHeight, 0, roadY + roadHeight)
      grad.addColorStop(0, 'rgba(0,0,0,0)')
      grad.addColorStop(0.3, 'rgba(46,44,40,0.9)')
      grad.addColorStop(0.7, 'rgba(46,44,40,0.9)')
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx!.fillStyle = grad
      ctx!.fillRect(0, roadY - roadHeight, W, roadHeight * 2)

      // Road edge lines
      ctx!.save()
      ctx!.globalAlpha = 0.25
      ctx!.strokeStyle = '#fff'
      ctx!.lineWidth = 1.5
      ctx!.beginPath()
      ctx!.moveTo(0, roadY - roadHeight / 2)
      ctx!.lineTo(W, roadY - roadHeight / 2)
      ctx!.moveTo(0, roadY + roadHeight / 2)
      ctx!.lineTo(W, roadY + roadHeight / 2)
      ctx!.stroke()
      ctx!.restore()
    }

    function drawCar(car: Car) {
      const alpha = 0.5 + car.depth * 0.5
      const w = car.length
      const h = 8 * car.depth
      ctx!.save()
      ctx!.globalAlpha = alpha * 0.85
      ctx!.fillStyle = car.color
      ctx!.beginPath()
      ctx!.roundRect(car.x - w / 2, car.y - h / 2, w, h, 2)
      ctx!.fill()
      // headlights / taillights
      const isRight = car.speed > 0
      ctx!.globalAlpha = alpha
      ctx!.fillStyle = isRight ? 'rgba(255,240,180,0.9)' : 'rgba(255,60,60,0.9)'
      const lx = isRight ? car.x + w / 2 - 2 : car.x - w / 2
      ctx!.fillRect(lx, car.y - h / 2, 3, h)
      ctx!.globalAlpha = 0.2 * alpha
      const glowGrad = ctx!.createRadialGradient(lx + 1, car.y, 0, lx + 1, car.y, 18)
      glowGrad.addColorStop(0, isRight ? 'rgba(255,240,180,0.6)' : 'rgba(255,60,60,0.5)')
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx!.fillStyle = glowGrad
      ctx!.fillRect(lx - 18, car.y - 18, 36, 36)
      ctx!.restore()
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H)
      drawRoad()

      // Road markings
      ctx!.save()
      ctx!.globalAlpha = 0.15
      for (let i = 1; i < NUM_LANES; i++) {
        const y = laneY(i) - roadHeight / (NUM_LANES * 2)
        ctx!.setLineDash([30, 20])
        ctx!.strokeStyle = '#fff'
        ctx!.lineWidth = 0.5
        ctx!.beginPath()
        ctx!.moveTo(0, y)
        ctx!.lineTo(W, y)
        ctx!.stroke()
      }
      ctx!.restore()

      cars.sort((a, b) => a.depth - b.depth)
      cars.forEach(car => {
        car.x += car.speed
        if (car.speed > 0 && car.x > W + 150) {
          const nc = spawnCar(car.laneIdx)
          Object.assign(car, nc)
        } else if (car.speed < 0 && car.x < -150) {
          const nc = spawnCar(car.laneIdx)
          Object.assign(car, nc)
        }
        drawCar(car)
      })

      if (isVisible && !reduceMotion) {
        animId = requestAnimationFrame(draw)
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = isVisible
      isVisible = entry.isIntersecting
      if (isVisible && !wasVisible && !reduceMotion) {
        cancelAnimationFrame(animId)
        draw()
      }
    }, { threshold: 0 })
    observer.observe(c)

    resize()
    spawnInitialCars()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 1 }}
    />
  )
}

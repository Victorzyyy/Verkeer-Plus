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

    type Kind = 'car' | 'truck'
    type Car = {
      x: number; y: number; speed: number; length: number
      color: string; laneIdx: number; depth: number; gap: number; kind: Kind
    }

    const NUM_LANES = 5
    const cars: Car[] = []

    function laneY(i: number) {
      const laneH = roadHeight / NUM_LANES
      return roadY - roadHeight / 2 + laneH * (i + 0.5)
    }

    function makeCarColor() {
      const h = [180, 210, 220, 240][Math.floor(Math.random() * 4)]
      return `hsl(${h},${30 + Math.random() * 20}%,${55 + Math.random() * 15}%)`
    }

    function makeTruckColor() {
      const opts = ['hsl(0,0%,88%)', 'hsl(210,12%,72%)', 'hsl(0,0%,58%)', 'hsl(215,25%,42%)']
      return opts[Math.floor(Math.random() * opts.length)]
    }

    function spawnCar(laneIdx: number): Car {
      const right = laneIdx < 3
      const depth = 0.3 + Math.random() * 0.7
      const kind: Kind = Math.random() < 0.18 ? 'truck' : 'car'
      const baseLength = kind === 'truck' ? 60 + Math.random() * 40 : 35 + Math.random() * 45
      const baseSpeed = kind === 'truck' ? 1 + Math.random() * 1.6 : 1.5 + Math.random() * 3
      return {
        x: right ? -140 : W + 140,
        y: laneY(laneIdx),
        speed: (right ? 1 : -1) * baseSpeed * depth,
        length: baseLength * depth,
        color: kind === 'truck' ? makeTruckColor() : makeCarColor(),
        laneIdx,
        depth,
        gap: 80 + Math.random() * 120,
        kind,
      }
    }

    // Minimum gap (in CSS px) between two vehicles on the same lane before another may respawn there.
    const LANE_MIN_GAP = 220

    function spawnInitialCars() {
      // One vehicle per lane, spaced across the visible width — cuts the previous crowd (15) to 5.
      for (let i = 0; i < NUM_LANES; i++) {
        const car = spawnCar(i)
        car.x = ((i + 0.5) / NUM_LANES) * W + (Math.random() - 0.5) * (W / NUM_LANES) * 0.5
        cars.push(car)
      }
    }

    // Returns true if respawning a car in this lane moving in this direction would visually collide
    // with an existing one still on-screen (or just entering) at the spawn side.
    function laneEntryBlocked(laneIdx: number, movingRight: boolean): boolean {
      for (const other of cars) {
        if (other.laneIdx !== laneIdx) continue
        if ((other.speed > 0) !== movingRight) continue
        if (movingRight && other.x < LANE_MIN_GAP) return true
        if (!movingRight && other.x > W - LANE_MIN_GAP) return true
      }
      return false
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

    // Draws in local space with the vehicle centered at the origin and "front" at +x;
    // the caller flips the axis for left-moving traffic so we only need one shape per kind.
    function drawCarShape(w: number, h: number) {
      const frontX = w / 2
      const rearX = -w / 2
      const roofFrontX = w * 0.10
      const roofRearX = -w * 0.22
      const roofY = -h / 2
      const beltY = -h * 0.05
      const bottomY = h * 0.4

      ctx!.beginPath()
      ctx!.moveTo(frontX - w * 0.04, bottomY)
      ctx!.lineTo(frontX, beltY)
      ctx!.lineTo(roofFrontX, roofY)
      ctx!.lineTo(roofRearX, roofY)
      ctx!.lineTo(rearX + w * 0.1, beltY)
      ctx!.lineTo(rearX, bottomY)
      ctx!.closePath()
      ctx!.fill()
    }

    function drawTruckShape(w: number, h: number) {
      const cabW = w * 0.26
      const bodyTop = -h / 2
      const bodyBottom = h * 0.4

      // Trailer (rear), slightly shorter than the cab
      ctx!.beginPath()
      ctx!.roundRect(-w / 2, bodyTop * 0.75, w - cabW, bodyBottom - bodyTop * 0.75, 1)
      ctx!.fill()

      // Cab (front), full height
      ctx!.beginPath()
      ctx!.roundRect(w / 2 - cabW, bodyTop, cabW, bodyBottom - bodyTop, 1.5)
      ctx!.fill()
    }

    function drawCar(car: Car) {
      const isRight = car.speed > 0
      const isTruck = car.kind === 'truck'
      const alpha = 0.5 + car.depth * 0.5
      const w = car.length
      const h = Math.max(7, (isTruck ? 13 : 10) * car.depth)

      ctx!.save()
      ctx!.translate(car.x, car.y)
      if (!isRight) ctx!.scale(-1, 1)

      // Body
      ctx!.globalAlpha = alpha * 0.92
      ctx!.fillStyle = car.color
      if (isTruck) drawTruckShape(w, h)
      else drawCarShape(w, h)

      // Wheels
      ctx!.globalAlpha = alpha * 0.9
      ctx!.fillStyle = 'rgba(6,6,6,0.9)'
      const wheelY = h * 0.4
      const wheelR = Math.max(1, h * 0.16)
      const wheelXs = isTruck ? [-w * 0.34, -w * 0.02, w * 0.32] : [-w * 0.26, w * 0.26]
      wheelXs.forEach(wx => {
        ctx!.beginPath()
        ctx!.arc(wx, wheelY, wheelR, 0, Math.PI * 2)
        ctx!.fill()
      })

      // Headlight (front) / taillight (rear) — always at local +x/-x since the axis is flipped above
      ctx!.globalAlpha = alpha
      ctx!.fillStyle = 'rgba(255,240,180,0.95)'
      ctx!.fillRect(w / 2 - 2.2, -h * 0.15, 2.2, h * 0.35)
      ctx!.fillStyle = 'rgba(255,60,60,0.95)'
      ctx!.fillRect(-w / 2, -h * 0.15, 2.2, h * 0.35)

      // Headlight glow (direction of travel only)
      ctx!.globalAlpha = 0.16 * alpha
      const glow = ctx!.createRadialGradient(w / 2, 0, 0, w / 2, 0, 15)
      glow.addColorStop(0, 'rgba(255,240,180,0.6)')
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx!.fillStyle = glow
      ctx!.fillRect(w / 2 - 15, -15, 30, 30)

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
        const goingRight = car.speed > 0
        const offRight = goingRight && car.x > W + 150
        const offLeft = !goingRight && car.x < -150
        if (offRight || offLeft) {
          // Only respawn once the lane's spawn side has cleared, otherwise this vehicle just waits
          // one frame off-screen — prevents cars piling on top of each other in the same lane.
          if (!laneEntryBlocked(car.laneIdx, goingRight)) {
            const nc = spawnCar(car.laneIdx)
            Object.assign(car, nc)
          }
        } else {
          drawCar(car)
        }
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

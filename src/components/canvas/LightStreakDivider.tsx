'use client'

import { useEffect, useRef } from 'react'

export default function LightStreakDivider() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    let animId: number
    let W = 0, H = 0, dpr = 1
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
    }

    type Streak = {
      x: number; y: number; speed: number; length: number
      alpha: number; hue: number; lane: number; laneIdx: number; gap: number
    }

    const NUM_LANES = 2
    const streaks: Streak[] = []

    function laneY(i: number) {
      return (H / (NUM_LANES + 1)) * (i + 1)
    }

    function spawnStreak(laneIdx: number): Streak {
      const right = laneIdx === 0
      return {
        x: right ? -200 : W + 200,
        y: laneY(laneIdx),
        speed: (right ? 1 : -1) * (3 + Math.random() * 5),
        length: 40 + Math.random() * 120,
        alpha: 0.5 + Math.random() * 0.5,
        hue: right ? 45 : 0,
        lane: laneY(laneIdx),
        laneIdx,
        gap: 60 + Math.random() * 100,
      }
    }

    for (let i = 0; i < NUM_LANES; i++) {
      for (let j = 0; j < 4; j++) {
        const s = spawnStreak(i)
        s.x = Math.random() * W
        streaks.push(s)
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H)

      // Faint road background band
      const grad = ctx!.createLinearGradient(0, 0, 0, H)
      grad.addColorStop(0, 'rgba(0,0,0,0)')
      grad.addColorStop(0.5, 'rgba(12,11,9,0.6)')
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx!.fillStyle = grad
      ctx!.fillRect(0, 0, W, H)

      // Dashed center line
      ctx!.save()
      ctx!.globalAlpha = 0.08
      ctx!.setLineDash([28, 18])
      ctx!.strokeStyle = '#fff'
      ctx!.lineWidth = 1
      ctx!.beginPath()
      ctx!.moveTo(0, H / 2)
      ctx!.lineTo(W, H / 2)
      ctx!.stroke()
      ctx!.restore()

      streaks.forEach(s => {
        s.x += s.speed

        const right = s.speed > 0
        if (right && s.x > W + 250) {
          Object.assign(s, { ...spawnStreak(s.laneIdx), y: s.lane })
        } else if (!right && s.x < -250) {
          Object.assign(s, { ...spawnStreak(s.laneIdx), y: s.lane })
        }

        ctx!.save()
        ctx!.globalAlpha = s.alpha

        // Streak gradient
        const sx = right ? s.x - s.length : s.x
        const ex = right ? s.x : s.x + s.length
        const g = ctx!.createLinearGradient(sx, 0, ex, 0)
        const col = right
          ? `hsla(${s.hue},90%,70%,`
          : `hsla(0,85%,55%,`
        g.addColorStop(0, col + '0)')
        g.addColorStop(right ? 0.7 : 0.3, col + '1)')
        g.addColorStop(1, col + (right ? '1)' : '0)'))

        ctx!.fillStyle = g
        ctx!.fillRect(sx, s.y - 1.5, s.length, 3)

        // Glow
        ctx!.globalAlpha = s.alpha * 0.15
        const glowG = ctx!.createLinearGradient(sx, 0, ex, 0)
        glowG.addColorStop(0, col + '0)')
        glowG.addColorStop(0.5, col + '0.8)')
        glowG.addColorStop(1, col + '0)')
        ctx!.fillStyle = glowG
        ctx!.fillRect(sx, s.y - 6, s.length, 12)

        ctx!.restore()
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
    window.addEventListener('resize', resize)
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="relative h-20 overflow-hidden border-t border-b border-concrete bg-bg">
      <canvas ref={ref} className="absolute inset-0 w-full h-full" />
    </div>
  )
}

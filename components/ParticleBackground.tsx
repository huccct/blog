// https://www.sliderrevolution.com/resources/css-animated-background/
import { useEffect, useRef } from "react"



export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    const particles: any[] = []
    const grid: any[] = []
    const gridSize = 8
    const gridSteps = Math.floor(1000 / gridSize)
    const maxPop = 150
    const lifespan = 800
    const birthFreq = 3
    
    let i = 0
    for (let xx = -500; xx < 500; xx += gridSize) {
      for (let yy = -500; yy < 500; yy += gridSize) {
        const r = Math.sqrt(xx*xx+yy*yy)
        const r0 = 100
        let field
        
        if (r < r0) field = 255 / r0 * r
        else if (r > r0) field = 255 - Math.min(255, (r - r0)/2)
        
        grid.push({
          x: xx,
          y: yy,
          busyAge: 0,
          spotIndex: i,
          isEdge: (xx == -500 ? 'left' : 
                   (xx == (-500 + gridSize * (gridSteps-1)) ? 'right' : 
                    (yy == -500 ? 'top' : 
                     (yy == (-500 + gridSize *(gridSteps-1)) ? 'bottom' : 
                      false
                     )
                    )
                   )
                  ),
          field: field
        })
        i++
      }
    }
    const gridMaxIndex = i
    
    const birth = () => {
      const gridSpotIndex = Math.floor(Math.random() * gridMaxIndex)
      const gridSpot = grid[gridSpotIndex]
      const x = gridSpot.x, y = gridSpot.y
      
              const particle = {
          hue: 0,
          sat: 0,
          lum: 0,
        x: x, y: y,
        xLast: x, yLast: y,
        xSpeed: 0, ySpeed: 0,
        age: 0,
        ageSinceStuck: 0,
        attractor: {
          oldIndex: gridSpotIndex,
          gridSpotIndex: gridSpotIndex,
        },
        name: 'seed-' + Math.ceil(10000000 * Math.random())
      }
      particles.push(particle)
    }
    
    const kill = (particleName: string) => {
      const index = particles.findIndex(p => p.name === particleName)
      if (index > -1) {
        particles.splice(index, 1)
      }
    }
    
    const move = () => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        
        p.xLast = p.x
        p.yLast = p.y
        
        const index = p.attractor.gridSpotIndex
        const gridSpot = grid[index]
        
        if (Math.random() < 0.5) {
          if (!gridSpot.isEdge) {
            const topIndex = index - 1
            const bottomIndex = index + 1
            const leftIndex = index - gridSteps
            const rightIndex = index + gridSteps
            const topSpot = grid[topIndex]
            const bottomSpot = grid[bottomIndex]
            const leftSpot = grid[leftIndex]
            const rightSpot = grid[rightIndex]
            
            const chaos = 30
            const maxFieldSpot = [topSpot, bottomSpot, leftSpot, rightSpot].reduce((max, spot) => 
              spot.field + chaos * Math.random() > max.field + chaos * Math.random() ? spot : max
            )
            
            if (maxFieldSpot.busyAge == 0 || maxFieldSpot.busyAge > 15) {
              p.ageSinceStuck = 0
              p.attractor.oldIndex = index
              p.attractor.gridSpotIndex = maxFieldSpot.spotIndex
              maxFieldSpot.busyAge = 1
            } else {
              p.ageSinceStuck++
            }
          } else {
            p.ageSinceStuck++
          }
          
          if (p.ageSinceStuck == 10) kill(p.name)
        }
        
        const k = 8, visc = 0.4
        const dx = p.x - gridSpot.x
        const dy = p.y - gridSpot.y
        
        const xAcc = -k * dx
        const yAcc = -k * dy
        
        p.xSpeed += xAcc
        p.ySpeed += yAcc
        p.xSpeed *= visc
        p.ySpeed *= visc
        
        p.x += 0.1 * p.xSpeed
        p.y += 0.1 * p.ySpeed
        
        p.age++
        
        if (p.age > lifespan) {
          kill(p.name)
        }
      }
    }
    
    const dataXYtoCanvasXY = (x: number, y: number) => {
      const zoom = 1.6
      const xx = canvas.width / 2 + x * zoom
      const yy = canvas.height / 2 + y * zoom
      return { x: xx, y: yy }
    }
    
    const draw = () => {
      const isDark = document.documentElement.classList.contains('dark')
      ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        
        const isDarkMode = document.documentElement.classList.contains('dark')
        const h = isDarkMode ? 0 : 0
        const s = isDarkMode ? 0 : 0
        const l = isDarkMode ? 90 + Math.random() * 10 : 10 + Math.random() * 15
        const a = 0.9
        
        const last = dataXYtoCanvasXY(p.xLast, p.yLast)
        const now = dataXYtoCanvasXY(p.x, p.y)
        const attracSpot = grid[p.attractor.gridSpotIndex]
        const attracXY = dataXYtoCanvasXY(attracSpot.x, attracSpot.y)

        ctx.beginPath()
        ctx.strokeStyle = `hsla(${h}, ${s}%, ${l}%, ${a})`
        ctx.lineWidth = 2
        ctx.moveTo(last.x, last.y)
        ctx.lineTo(now.x, now.y)
        ctx.stroke()
        
        ctx.beginPath()
        ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${a})`
        ctx.arc(attracXY.x, attracXY.y, 3, 0, 2 * Math.PI)
        ctx.fill()
      }
    }
    
    let stepCount = 0
    const animate = () => {
      stepCount++
      
      grid.forEach(e => {
        if (e.busyAge > 0) e.busyAge++
      })
      
      if (stepCount % birthFreq == 0 && particles.length < maxPop) {
        birth()
      }
      
      move()
      draw()
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-40 dark:opacity-30 z-0"
      style={{ background: 'transparent' }}
    />
  )
}
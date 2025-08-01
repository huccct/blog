import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const AnimatedLogo = ({ className = "w-10 h-10" }) => {
  const { resolvedTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={className} style={{ opacity: 0 }}>
        <svg viewBox="0 0 787 207" xmlns="http://www.w3.org/2000/svg" fill="none">
        </svg>
      </div>
    )
  }

  const strokeColor = resolvedTheme === 'dark' || (resolvedTheme === 'system' && systemTheme === 'dark') ? '#ffffff' : '#000000'
  
  return (
    <svg 
      className={className} 
      viewBox="0 0 787 207" 
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <style>{`
        @media (prefers-reduced-motion) {
          .handwriting-path {
            animation: none !important;
            stroke-dasharray: 450px 450px !important;
            stroke-dashoffset: 0px !important;
          }
        }
        
        @keyframes draw {
          0% {
            stroke-dashoffset: 450px;
            stroke-dasharray: 450px 450px;
          }
          45% {
            stroke-dashoffset: 0px;
            stroke-dasharray: 450px 450px;
          }
          55% {
            stroke-dashoffset: 0px;
            stroke-dasharray: 450px 450px;
          }
          100% {
            stroke-dashoffset: 450px;
            stroke-dasharray: 450px 450px;
          }
        }
        
        .handwriting-path {
          stroke-dashoffset: 450px;
          stroke-dasharray: 450px 450px;
          animation: draw 6s linear infinite;
          transform-origin: center;
          stroke-width: 13;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
          pathLength: 450;
        }
      `}</style>
      
      <g>
        <path 
          className="handwriting-path"
          stroke={strokeColor}
          d="M51.5 141C73.9562 130.387 77.7908 105.518 73 98C68.2092 90.4822 32.839 78.2659 11.5 105C-2.93045 128.531 -2.83656 140.3 11.5 153C30.6368 152.603 40.5725 151.413 51.5 141ZM51.5 141C46 164 98.9162 141.01 109 105C119.778 115.722 129.007 115.44 150.5 105C124.767 126.053 118.546 134.218 125 141C155.779 147.828 174.759 133.757 203 105M203 105C217.552 90.1236 237.345 63.382 225.5 51.5C215.821 80.4825 211.002 91.2242 203 105ZM203 105L180 126.364V141C202.023 152.41 214.402 143.199 236.5 117M236.5 117C243.597 103.185 254.665 92.214 259 98M236.5 117C226.233 143.119 228.144 148.755 236.5 153C258.305 145.185 266.486 136.72 276.5 117C274.548 100.642 269.437 97.7904 259 98M259 98C280.373 104.927 293.015 106.075 318 98C314.07 115.369 308.362 123.548 290 134.5C321.431 109.417 337.76 98.6179 359.5 98C340.61 123.413 335.843 133.495 342 141C357.252 150.485 519 73 484 89C449 105 426.975 125.689 449 134.5C471.787 139.018 484.463 129.887 507 105C551.296 75.9305 575.824 60.0758 634 11C629.582 -1.17555 625.394 -4.76088 602 19C541.573 71.5946 530.611 92.5872 499 134.5C529.017 114.25 545.542 103.347 565.5 98C587.264 87.6792 581.957 98.9159 556.5 134.5C579.667 145 599.321 126.051 640.5 102C637.601 94.0116 633.841 91.2402 612.5 98C585.639 109.557 585.248 123.857 594 141C615.604 144.155 637.955 132.746 689 98C671.373 127.111 664.048 130.687 651.5 134.5C681.302 109.225 697.646 97.4383 723.5 98C696.292 121.604 694.209 130.348 705 141C755.374 130.902 774.389 128.924 785.5 134.5C670.091 171.112 605.931 185.769 492 206.5" 
          pathLength="450"
        />
      </g>
    </svg>
  )
}

export default AnimatedLogo
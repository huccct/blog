import React from 'react'
import { useTheme } from 'next-themes'

const AnimatedLogo = ({ className = "w-10 h-10" }) => {
  const { resolvedTheme } = useTheme()
  const strokeColor = resolvedTheme === 'dark' ? '#ffffff' : '#000000'
  
  return (
    <svg 
      className={className} 
      viewBox="0 0 710 113" 
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <style>{`
        @media (prefers-reduced-motion) {
          .handwriting-path {
            animation: none !important;
            stroke-dasharray: 350px 350px !important;
            stroke-dashoffset: 0px !important;
          }
        }
        
        @keyframes draw {
          0% {
            stroke-dashoffset: 350px;
            stroke-dasharray: 350px 350px;
          }
          45% {
            stroke-dashoffset: 0px;
            stroke-dasharray: 350px 350px;
          }
          55% {
            stroke-dashoffset: 0px;
            stroke-dasharray: 350px 350px;
          }
          100% {
            stroke-dashoffset: 350px;
            stroke-dasharray: 350px 350px;
          }
        }
        
        .handwriting-path {
          stroke-dashoffset: 350px;
          stroke-dasharray: 350px 350px;
          animation: draw 6s linear infinite;
          transform-origin: center;
          stroke-width: 10;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
          pathLength: 350;
        }
      `}</style>
      
      <g>
        <path 
          className="handwriting-path"
          stroke={strokeColor}
          d="M47.5 55L41.5 77C26.6905 97.706 18.4998 107.459 4.99996 106.5C-0.116957 101.934 -1.37154 98.0113 13 77C27.0608 62.4956 34.5461 58.3699 47.5 55ZM47.5 55C60.4541 83.6023 69.6454 81.0963 86 77C79.7516 88.5205 63.7315 127.039 70 106.5C76.2684 85.9611 102.997 51.1317 116.5 55C127.234 52.5323 134.231 47.405 149 29.5C122.732 103.183 124.243 106.338 130 97.5C124.991 117.089 140.709 109.156 180.5 83M180.5 83C188.574 72.9531 197.052 66.6706 215 55M180.5 83C176.359 96.1424 176.412 101.236 180.5 106.5C195.497 101.683 202.811 95.8512 215 83C221.344 73.3775 221.341 67.2467 215 55M215 55C224.336 73.93 231.858 80.5309 254 77C246.831 88.5893 243.401 94.163 241.5 97.5C230.615 118.651 250.369 97.9974 290.5 55C298.044 63.6155 296.312 74.992 283 106.5C299.34 108.022 316.703 96.1045 349.5 72M422.5 77C442.271 54.3494 433.144 53.114 409 61C388.56 74.2256 387.16 85.7705 385 106.5C413.248 108.126 427.422 100.41 452 83C470.532 78.9356 476.099 45.1381 488.5 1C470.161 51.7472 460.743 77.437 452 97.5C457.707 83.7323 462.637 75.4404 488.5 55C502.975 45.3999 508.082 48.8214 488.5 106.5C503.17 102.793 513.056 93.7131 532 72C536.51 65.5156 538.328 61.8935 564.5 55C584.794 59.1516 584.718 65.8074 570.5 83C543.369 84.9297 536.718 76.9082 532 55C530.671 93.6179 531.826 109.019 543 106.5C572.582 110.322 589.642 100.455 620.5 72C611.76 85.5636 607.574 92.2091 605 97.5C624.916 75.497 636.729 66.1312 659 55C662.358 62.9126 657.954 76.8141 651 106.5C673.307 102.242 686.044 93.6736 709 72" 
          pathLength="350"
        />
      </g>
    </svg>
  )
}

export default AnimatedLogo
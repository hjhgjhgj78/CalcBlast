"use client"

import React from "react"

interface MathDisplayProps {
  math: string
  display?: boolean
  size?: "normal" | "large" | "small"
}

export default function MathDisplay({ math, display = false, size = "normal" }: MathDisplayProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    let isMounted = true

    if (typeof window !== "undefined" && containerRef.current) {
      // Check if katex is already loaded
      if (typeof window.katex !== "undefined") {
        try {
          // Clean the math string
          const cleanMath = math

          window.katex.render(cleanMath, containerRef.current, {
            throwOnError: false,
            displayMode: display,
            fleqn: false,
            leqno: false,
            strict: false,
            trust: true,
          })

          // Apply size styling after rendering
          if (isMounted && containerRef.current) {
            if (size === "large") {
              containerRef.current.style.fontSize = "1.5em"
            } else if (size === "small") {
              containerRef.current.style.fontSize = "0.9em"
            }

            // Add appropriate class
            if (display) {
              containerRef.current.classList.add("math-display-container")
            } else {
              containerRef.current.classList.add("katex-inline")
            }
          }
        } catch (error) {
          console.error("KaTeX rendering error:", error)
          if (isMounted && containerRef.current) {
            containerRef.current.textContent = math.replace(/\\$$|\\$$|\\\\|\$\$/g, "")
          }
        }
      } else {
        // If KaTeX isn't loaded, just display the text
        if (isMounted && containerRef.current) {
          containerRef.current.textContent = math.replace(/\\$$|\\$$|\\\\|\$\$/g, "")
        }
      }
    }

    // Cleanup function
    return () => {
      isMounted = false
    }
  }, [math, display, size])

  return <div ref={containerRef} className={display ? "my-3" : "inline-block"} />
}

// Add this to make TypeScript happy
declare global {
  interface Window {
    katex: {
      render: (math: string, element: HTMLElement, options: any) => void
    }
  }
} 
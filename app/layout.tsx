import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
          integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn"
          crossOrigin="anonymous"
        />
        <style>
          {\`
            /* Custom styles for KaTeX */
            .katex { font-size: 1.1em; }
            .katex-display { margin: 1em 0; overflow-x: auto; overflow-y: hidden; }
            .katex-display > .katex { font-size: 1.4em; }
            
            /* Fix alignment and spacing */
            .math-display-container {
              display: flex;
              justify-content: center;
              margin: 1rem 0;
              width: 100%;
            }
            
            /* Ensure proper spacing in inline math */
            .katex-inline {
              margin: 0 0.2em;
            }
            
            /* Improve readability of math expressions */
            .katex-html {
              white-space: normal;
            }
            
            /* Make sure fractions and other complex expressions display properly */
            .katex .mfrac .frac-line {
              border-bottom-width: 1px;
            }
            
            /* Ensure proper spacing in operators */
            .katex .mbin {
              margin: 0 0.1em;
            }
            
            .katex .mrel {
              margin: 0 0.1em;
            }
          \`}
        </style>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Script
          src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"
          integrity="sha384-cpW21h6RZv/phavutF+AuVYrr+dA8xD9zs6FwLpaCct6O9ctzYFfFr4dgmgccOTx"
          crossOrigin="anonymous"
          strategy="afterInteractive"
          onError={(e) => {
            console.error("KaTeX script failed to load:", e)
          }}
        />
      </body>
    </html>
  )
} 
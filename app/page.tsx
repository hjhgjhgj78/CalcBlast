import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-primary to-primary-foreground text-primary-foreground p-4">
      <h1 className="text-5xl font-bold mb-6 text-center">Calculus Blast</h1>
      <p className="text-xl mb-8 text-center max-w-md">
        Test your calculus skills by answering questions and strategically placing blocks on the game board!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mb-8">
        <div className="bg-white/10 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Game Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>15+ different block shapes and sizes</li>
            <li>Rotate blocks to fit them perfectly</li>
            <li>Clear rows and columns for points</li>
            <li>Adaptive difficulty based on performance</li>
            <li>Learn calculus concepts while having fun</li>
          </ul>
        </div>

        <div className="bg-white/10 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Calculus Topics</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Derivatives and integrals</li>
            <li>Limits and continuity</li>
            <li>Applications of differentiation</li>
            <li>Integration techniques</li>
            <li>Series and sequences</li>
          </ul>
        </div>
      </div>

      <Link href="/game" className="block w-full max-w-xs">
        <Button size="lg" className="w-full">
          Start Game
        </Button>
      </Link>
    </div>
  )
} 
"use client"

import * as React from 'react'
import { Question } from '@/lib/questions'
import { BlockGrid } from '@/components/block-grid'

export default function GamePage() {
  const [questions, setQuestions] = React.useState<Question[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  async function fetchQuestion() {
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch question')
      }

      const data = await response.json()
      setQuestions(data)
      setError(null)
    } catch (err) {
      setError('Failed to load question')
      console.error('Error fetching question:', err)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchQuestion()
  }, [])

  const handleQuestionComplete = async (questionId: string) => {
    await fetchQuestion()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchQuestion}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">CalcBlast</h1>
      <BlockGrid
        questions={questions}
        onQuestionComplete={handleQuestionComplete}
      />
    </div>
  )
} 
import * as React from 'react'
import { Question } from '@/lib/questions'

interface UseQuestionsOptions {
  initialQuestions?: Question[]
  batchSize?: number
  topics?: string[]
  difficulties?: ('easy' | 'medium' | 'hard')[]
}

export function useQuestions({
  initialQuestions = [],
  batchSize = 5,
  topics = ['derivatives', 'integrals', 'limits'],
  difficulties = ['easy', 'medium', 'hard']
}: UseQuestionsOptions = {}) {
  const [questions, setQuestions] = React.useState<Question[]>(initialQuestions)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const fetchMoreQuestions = React.useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          count: batchSize,
          topics,
          difficulties
        })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch questions')
      }

      const data = await response.json()
      setQuestions((prev: Question[]) => [...prev, ...data.questions])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching questions:', err)
    } finally {
      setIsLoading(false)
    }
  }, [batchSize, topics, difficulties])

  const removeQuestion = React.useCallback((questionId: string) => {
    setQuestions((prev: Question[]) => prev.filter((q: Question) => q.id !== questionId))
  }, [])

  return {
    questions,
    isLoading,
    error,
    fetchMoreQuestions,
    removeQuestion
  }
} 
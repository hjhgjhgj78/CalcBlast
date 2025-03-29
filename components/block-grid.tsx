"use client"

import React from 'react'
import { Question } from '@/lib/questions'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

interface BlockGridProps {
  questions: Question[]
  onQuestionComplete: (questionId: string) => void
}

export function BlockGrid({ questions, onQuestionComplete }: BlockGridProps) {
  const { toast } = useToast()
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null)
  const [showExplanation, setShowExplanation] = React.useState(false)
  const currentQuestion = questions[0] // Only show the first question

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    setShowExplanation(true)

    if (currentQuestion && answer === currentQuestion.answer) {
      toast({
        title: "Correct!",
        description: "Well done! Get ready for the next question.",
        variant: "default",
      })
      // Delay removing the question to show the explanation
      setTimeout(() => {
        onQuestionComplete(currentQuestion.id)
        setSelectedAnswer(null)
        setShowExplanation(false)
      }, 2000)
    } else {
      toast({
        title: "Incorrect",
        description: "Try again!",
        variant: "destructive",
      })
    }
  }

  if (!currentQuestion) {
    return (
      <div className="text-center">
        <p>No questions available</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="min-h-[100px]">
            <p className="text-lg font-medium mb-2">{currentQuestion.text}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === option ? "default" : "outline"}
                className={cn(
                  "h-auto py-2 px-4",
                  selectedAnswer === option && (
                    option === currentQuestion.answer
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  )
                )}
                onClick={() => handleAnswerSelect(option)}
                disabled={!!selectedAnswer}
              >
                {option}
              </Button>
            ))}
          </div>

          {showExplanation && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="font-medium mb-1">Explanation:</p>
              <p className="text-sm">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
} 
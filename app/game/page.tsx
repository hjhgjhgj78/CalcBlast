"use client"

import React from "react"
import GameBoard from "@/components/game-board"
import MathDisplay from "@/components/math-display"
import { questions } from "@/lib/questions"

export default function GamePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null)
  const [isAnswerCorrect, setIsAnswerCorrect] = React.useState<boolean | null>(null)

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    const isCorrect = answer === currentQuestion.answer
    setIsAnswerCorrect(isCorrect)
  }

  const handleBlockPlaced = () => {
    // Move to next question
    setCurrentQuestionIndex((prevIndex: number) => (prevIndex + 1) % questions.length)
    setSelectedAnswer(null)
    setIsAnswerCorrect(null)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Question Section */}
          <div className="bg-card rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Question {currentQuestionIndex + 1}</h2>
            <div className="mb-6">
              <MathDisplay math={currentQuestion.text} display={true} size="large" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    selectedAnswer === option
                      ? isAnswerCorrect
                        ? "border-green-500 bg-green-100"
                        : "border-red-500 bg-red-100"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <MathDisplay math={option} />
                </button>
              ))}
            </div>
            {selectedAnswer && (
              <div className="mt-6 p-4 rounded-lg bg-muted">
                <h3 className="font-semibold mb-2">Explanation:</h3>
                <MathDisplay math={currentQuestion.explanation} />
              </div>
            )}
          </div>

          {/* Game Board Section */}
          <div className="bg-card rounded-lg p-6 shadow-lg">
            <GameBoard isAnswerCorrect={isAnswerCorrect} onPlaceBlock={handleBlockPlaced} />
          </div>
        </div>
      </div>
    </div>
  )
} 
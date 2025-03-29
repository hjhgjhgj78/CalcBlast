import { NextResponse } from 'next/server'
import { generateQuestionBatch } from '@/lib/questions-service'

export async function POST(request: Request) {
  try {
    const questions = await generateQuestionBatch(1)
    return NextResponse.json(questions)
  } catch (error) {
    console.error('Error generating questions:', error)
    return NextResponse.json(
      { error: 'Failed to generate questions' },
      { status: 500 }
    )
  }
} 
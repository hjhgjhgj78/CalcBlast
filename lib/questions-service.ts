import { Question, questions as staticQuestions } from './questions'

let currentQuestions = [...staticQuestions]

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export async function generateQuestionBatch(count: number = 1): Promise<Question[]> {
  if (currentQuestions.length < count) {
    // Reset questions if we run out
    currentQuestions = [...staticQuestions]
  }
  
  // Get the next batch of questions
  const batch = currentQuestions.slice(0, count)
  
  // Remove the used questions from the pool
  currentQuestions = currentQuestions.slice(count)
  
  return batch
}

// Initialize with shuffled questions
currentQuestions = shuffleArray(currentQuestions) 
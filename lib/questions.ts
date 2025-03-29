export interface Question {
  id: string
  text: string
  options: string[]
  answer: string
  explanation: string
}

export const questions: Question[] = [
  {
    id: '1',
    text: 'What is the derivative of x²?',
    options: ['x', '2x', '2', 'x²'],
    answer: '2x',
    explanation: 'Using the power rule, the derivative of x² is 2x¹, which simplifies to 2x.'
  },
  {
    id: '2',
    text: 'What is ∫ 2x dx?',
    options: ['x²', 'x² + C', '2x² + C', 'x'],
    answer: 'x² + C',
    explanation: 'When integrating 2x, we increase the power by 1 and divide by the new power. So, ∫ 2x dx = x² + C.'
  },
  {
    id: '3',
    text: 'What is the limit of sin(x)/x as x approaches 0?',
    options: ['0', '1', '∞', 'undefined'],
    answer: '1',
    explanation: 'This is a famous limit. Although 0/0 is undefined, the limit exists and equals 1.'
  },
  {
    id: '4',
    text: 'What is the derivative of e^x?',
    options: ['e^x', 'xe^x', '1/e^x', 'e^(x-1)'],
    answer: 'e^x',
    explanation: 'e^x is its own derivative, making it a unique and important function in calculus.'
  },
  {
    id: '5',
    text: 'What is the derivative of ln(x)?',
    options: ['1/x', 'x', 'ln(x)', '1'],
    answer: '1/x',
    explanation: 'The derivative of ln(x) is 1/x, which is why ln and exponential functions are inverses.'
  }
] 
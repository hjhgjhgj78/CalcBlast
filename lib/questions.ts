export interface Question {
  id: string
  text: string
  options: string[]
  answer: string
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export const questions: Question[] = [
  {
    id: "q1",
    text: "\\frac{d}{dx}(x^2)",
    options: ["2x", "x^2", "\\frac{1}{2}x", "x"],
    answer: "2x",
    explanation: "The derivative of x^2 is 2x using the power rule: \\frac{d}{dx}(x^n) = nx^{n-1}",
    difficulty: "easy"
  },
  {
    id: "q2",
    text: "\\lim_{x \\to 0} \\frac{\\sin(x)}{x}",
    options: ["0", "1", "\\infty", "\\text{DNE}"],
    answer: "1",
    explanation: "This is a famous limit that equals 1. It can be proven using L'Hôpital's rule or the squeeze theorem.",
    difficulty: "medium"
  },
  {
    id: "q3",
    text: "\\int x^3 dx",
    options: ["\\frac{x^4}{4} + C", "3x^2", "\\frac{x^3}{3}", "x^4"],
    answer: "\\frac{x^4}{4} + C",
    explanation: "Integrate using the power rule: \\int x^n dx = \\frac{x^{n+1}}{n+1} + C",
    difficulty: "easy"
  },
  {
    id: "q4",
    text: "\\frac{d}{dx}(\\sin(x))",
    options: ["\\cos(x)", "-\\sin(x)", "\\tan(x)", "-\\cos(x)"],
    answer: "\\cos(x)",
    explanation: "The derivative of sine is cosine: \\frac{d}{dx}\\sin(x) = \\cos(x)",
    difficulty: "easy"
  },
  {
    id: "q5",
    text: "\\int_0^1 x^2 dx",
    options: ["\\frac{1}{2}", "\\frac{1}{3}", "\\frac{1}{4}", "1"],
    answer: "\\frac{1}{3}",
    explanation: "First find the antiderivative \\frac{x^3}{3}, then evaluate from 0 to 1: \\frac{1^3}{3} - \\frac{0^3}{3} = \\frac{1}{3}",
    difficulty: "medium"
  },
  {
    id: "q6",
    text: "\\frac{d}{dx}(e^x)",
    options: ["e^x", "xe^{x-1}", "\\ln(x)", "1"],
    answer: "e^x",
    explanation: "The exponential function e^x is its own derivative: \\frac{d}{dx}e^x = e^x",
    difficulty: "easy"
  },
  {
    id: "q7",
    text: "\\lim_{x \\to \\infty} (1 + \\frac{1}{x})^x",
    options: ["0", "1", "e", "\\infty"],
    answer: "e",
    explanation: "This is the definition of e: \\lim_{x \\to \\infty} (1 + \\frac{1}{x})^x = e",
    difficulty: "hard"
  },
  {
    id: "q8",
    text: "\\frac{d}{dx}(\\ln(x))",
    options: ["\\frac{1}{x}", "x", "e^x", "\\ln(x)"],
    answer: "\\frac{1}{x}",
    explanation: "The derivative of natural log is \\frac{1}{x}: \\frac{d}{dx}\\ln(x) = \\frac{1}{x}",
    difficulty: "medium"
  },
  {
    id: "q9",
    text: "\\int e^x dx",
    options: ["e^x + C", "\\ln(x) + C", "xe^x", "\\frac{e^x}{x} + C"],
    answer: "e^x + C",
    explanation: "The integral of e^x is itself plus C: \\int e^x dx = e^x + C",
    difficulty: "easy"
  },
  {
    id: "q10",
    text: "\\frac{d}{dx}(\\tan(x))",
    options: ["\\sec^2(x)", "\\cos(x)", "-\\sin(x)", "\\cot(x)"],
    answer: "\\sec^2(x)",
    explanation: "The derivative of tangent is secant squared: \\frac{d}{dx}\\tan(x) = \\sec^2(x)",
    difficulty: "medium"
  }
] 
"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BLOCK_TYPES, type BlockType, type BlockCell, getBlockDimensions } from "@/lib/block-types"

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 15
const CELL_SIZE = 30

type PlacedBlock = {
  id: string
  blockType: BlockType
  x: number
  y: number
  rotation: 0 | 90 | 180 | 270
}

type GameBoardProps = {
  isAnswerCorrect: boolean | null
  onPlaceBlock: () => void
}

export default function GameBoard({ isAnswerCorrect, onPlaceBlock }: GameBoardProps) {
  const [board, setBoard] = React.useState<(string | null)[][]>(
    Array(BOARD_HEIGHT)
      .fill(null)
      .map(() => Array(BOARD_WIDTH).fill(null)),
  )
  const [placedBlocks, setPlacedBlocks] = React.useState<PlacedBlock[]>([])
  const [selectedBlockType, setSelectedBlockType] = React.useState<BlockType | null>(null)
  const [blockRotation, setBlockRotation] = React.useState<0 | 90 | 180 | 270>(0)
  const [hoverPosition, setHoverPosition] = React.useState<{ x: number; y: number } | null>(null)
  const [gameOver, setGameOver] = React.useState(false)
  const [score, setScore] = React.useState(0)
  const [blockOptions, setBlockOptions] = React.useState<BlockType[]>([])
  const [blastingBlocks, setBlastingBlocks] = React.useState<PlacedBlock[]>([])
  const boardRef = React.useRef<HTMLDivElement>(null)

  // Initialize block options
  React.useEffect(() => {
    generateBlockOptions()
  }, [])

  // Handle answer correctness
  React.useEffect(() => {
    if (isAnswerCorrect === true) {
      // Enable block selection
    } else if (isAnswerCorrect === false) {
      // Reset selection
      setSelectedBlockType(null)
    }
  }, [isAnswerCorrect])

  // Generate 3 random block options
  const generateBlockOptions = () => {
    const options: BlockType[] = []
    const usedIndices = new Set<number>()

    while (options.length < 3) {
      const index = Math.floor(Math.random() * BLOCK_TYPES.length)
      if (!usedIndices.has(index)) {
        usedIndices.add(index)
        options.push(BLOCK_TYPES[index])
      }
    }

    setBlockOptions(options)
  }

  const handleCellHover = (x: number, y: number) => {
    if (selectedBlockType && isAnswerCorrect === true) {
      setHoverPosition({ x, y })
    }
  }

  const handleCellClick = (x: number, y: number) => {
    if (selectedBlockType && isAnswerCorrect === true && isValidPlacement(x, y)) {
      const newBlock: PlacedBlock = {
        id: `block-${Date.now()}`,
        blockType: selectedBlockType,
        x,
        y,
        rotation: blockRotation,
      }

      // Update the board state
      const newBoard = updateBoardWithBlock(board, newBlock)
      setBoard(newBoard)
      setPlacedBlocks([...placedBlocks, newBlock])
      setSelectedBlockType(null)
      setBlockRotation(0)

      // Check for completed rows/columns
      checkForCompletedLines(newBoard)

      // Check for game over
      if (isGameOver(newBoard)) {
        setGameOver(true)
      } else {
        onPlaceBlock()
      }
    }
  }

  const rotateBlock = () => {
    if (selectedBlockType) {
      setBlockRotation((prevRotation: 0 | 90 | 180 | 270) => {
        const newRotation = ((prevRotation + 90) % 360) as 0 | 90 | 180 | 270
        return newRotation
      })
    }
  }

  const getRotatedShape = (blockType: BlockType, rotation: 0 | 90 | 180 | 270) => {
    const shape = blockType.shape
    let rotatedShape = [...shape.map((row) => [...row])]

    if (rotation === 0) return rotatedShape

    const height = shape.length
    const width = shape[0].length

    if (rotation === 90) {
      rotatedShape = Array(width)
        .fill(0)
        .map(() => Array(height).fill(0))
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          rotatedShape[x][height - 1 - y] = shape[y][x]
        }
      }
    } else if (rotation === 180) {
      rotatedShape = Array(height)
        .fill(0)
        .map(() => Array(width).fill(0))
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          rotatedShape[height - 1 - y][width - 1 - x] = shape[y][x]
        }
      }
    } else if (rotation === 270) {
      rotatedShape = Array(width)
        .fill(0)
        .map(() => Array(height).fill(0))
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          rotatedShape[width - 1 - x][y] = shape[y][x]
        }
      }
    }

    return rotatedShape
  }

  const isValidPlacement = (x: number, y: number) => {
    if (!selectedBlockType) return false

    const rotatedShape = getRotatedShape(selectedBlockType, blockRotation)
    const height = rotatedShape.length
    const width = rotatedShape[0].length

    // Check if the block is within the board boundaries
    if (x < 0 || x + width > BOARD_WIDTH || y < 0 || y + height > BOARD_HEIGHT) {
      return false
    }

    // Check if the cells are empty
    for (let dy = 0; dy < height; dy++) {
      for (let dx = 0; dx < width; dx++) {
        if (rotatedShape[dy][dx] === 1 && board[y + dy][x + dx] !== null) {
          return false
        }
      }
    }

    return true
  }

  const updateBoardWithBlock = (currentBoard: (string | null)[][], block: PlacedBlock) => {
    const newBoard = currentBoard.map((row) => [...row])
    const rotatedShape = getRotatedShape(block.blockType, block.rotation)
    const height = rotatedShape.length
    const width = rotatedShape[0].length

    for (let dy = 0; dy < height; dy++) {
      for (let dx = 0; dx < width; dx++) {
        if (rotatedShape[dy][dx] === 1) {
          newBoard[block.y + dy][block.x + dx] = block.blockType.color
        }
      }
    }

    return newBoard
  }

  const checkForCompletedLines = (currentBoard: (string | null)[][]) => {
    const completedRows: number[] = []
    const completedCols: number[] = []

    // Check rows
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      if (currentBoard[y].every((cell) => cell !== null)) {
        completedRows.push(y)
      }
    }

    // Check columns
    for (let x = 0; x < BOARD_WIDTH; x++) {
      let isComplete = true
      for (let y = 0; y < BOARD_HEIGHT; y++) {
        if (currentBoard[y][x] === null) {
          isComplete = false
          break
        }
      }
      if (isComplete) {
        completedCols.push(x)
      }
    }

    if (completedRows.length > 0 || completedCols.length > 0) {
      // Find blocks to blast
      const blocksToBlast = placedBlocks.filter((block: PlacedBlock) => {
        const rotatedShape = getRotatedShape(block.blockType, block.rotation)
        const height = rotatedShape.length
        const width = rotatedShape[0].length

        for (let dy = 0; dy < height; dy++) {
          for (let dx = 0; dx < width; dx++) {
            if (rotatedShape[dy][dx] === 1) {
              const y = block.y + dy
              const x = block.x + dx
              if (completedRows.includes(y) || completedCols.includes(x)) {
                return true
              }
            }
          }
        }
        return false
      })

      // Animate blasting blocks
      setBlastingBlocks(blocksToBlast)

      // Update score
      const linesCleared = completedRows.length + completedCols.length
      setScore((prevScore: number) => prevScore + linesCleared * 100)

      // Clear the lines after animation
      setTimeout(() => {
        const newBoard = currentBoard.map((row) => [...row])

        // Clear completed rows
        completedRows.forEach((y) => {
          for (let x = 0; x < BOARD_WIDTH; x++) {
            newBoard[y][x] = null
          }
        })

        // Clear completed columns
        completedCols.forEach((x) => {
          for (let y = 0; y < BOARD_HEIGHT; y++) {
            newBoard[y][x] = null
          }
        })

        setBoard(newBoard)
        setPlacedBlocks((prevBlocks: PlacedBlock[]) => prevBlocks.filter((block: PlacedBlock) => !blocksToBlast.includes(block)))
        setBlastingBlocks([])
      }, 500)
    }
  }

  const isGameOver = (currentBoard: (string | null)[][]) => {
    // Game is over if the top row has any filled cells
    return currentBoard[0].some((cell) => cell !== null)
  }

  const resetGame = () => {
    setBoard(
      Array(BOARD_HEIGHT)
        .fill(null)
        .map(() => Array(BOARD_WIDTH).fill(null)),
    )
    setPlacedBlocks([])
    setSelectedBlockType(null)
    setBlockRotation(0)
    setGameOver(false)
    setScore(0)
    generateBlockOptions()
  }

  const renderGrid = () => {
    return (
      <div
        className="grid gap-px bg-gray-800 border-2 border-gray-900"
        style={{
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${BOARD_HEIGHT}, ${CELL_SIZE}px)`,
          width: BOARD_WIDTH * CELL_SIZE + 2,
          height: BOARD_HEIGHT * CELL_SIZE + 2,
        }}
        ref={boardRef}
      >
        {Array.from({ length: BOARD_HEIGHT * BOARD_WIDTH }).map((_, index) => {
          const x = index % BOARD_WIDTH
          const y = Math.floor(index / BOARD_WIDTH)
          const cellColor = board[y][x]

          return (
            <div
              key={index}
              className={`${cellColor ? "" : "bg-gray-700 hover:bg-gray-600"} transition-colors border border-gray-800`}
              style={{
                backgroundColor: cellColor || undefined,
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
              onMouseEnter={() => handleCellHover(x, y)}
              onClick={() => handleCellClick(x, y)}
            />
          )
        })}

        {/* Render hover preview */}
        {selectedBlockType && hoverPosition && isAnswerCorrect === true && (
          <div
            className={`absolute pointer-events-none ${isValidPlacement(hoverPosition.x, hoverPosition.y) ? "opacity-60" : "opacity-30"}`}
            style={{
              left: hoverPosition.x * CELL_SIZE,
              top: hoverPosition.y * CELL_SIZE,
            }}
          >
            {renderBlockPreview(selectedBlockType, blockRotation, hoverPosition.x, hoverPosition.y)}
          </div>
        )}

        {/* Render blasting animation */}
        <AnimatePresence>
          {blastingBlocks.map((block: PlacedBlock) => (
            <motion.div
              key={block.id}
              className="absolute"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                left: block.x * CELL_SIZE,
                top: block.y * CELL_SIZE,
              }}
            >
              {renderBlock(block)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    )
  }

  const renderBlock = (block: PlacedBlock) => {
    const rotatedShape = getRotatedShape(block.blockType, block.rotation)
    const height = rotatedShape.length
    const width = rotatedShape[0].length

    return (
      <div
        className="absolute"
        style={{
          width: width * CELL_SIZE,
          height: height * CELL_SIZE,
        }}
      >
        {rotatedShape.map((row, dy) =>
          row.map(
            (cell, dx) =>
              cell === 1 && (
                <div
                  key={`${dy}-${dx}`}
                  className="absolute border border-white border-opacity-30"
                  style={{
                    left: dx * CELL_SIZE,
                    top: dy * CELL_SIZE,
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    backgroundColor: block.blockType.color,
                  }}
                />
              ),
          ),
        )}
      </div>
    )
  }

  const renderBlockPreview = (blockType: BlockType, rotation: 0 | 90 | 180 | 270, x: number, y: number) => {
    const rotatedShape = getRotatedShape(blockType, rotation)
    const isValid = isValidPlacement(x, y)

    return (
      <div>
        {rotatedShape.map((row, dy) =>
          row.map(
            (cell, dx) =>
              cell === 1 && (
                <div
                  key={`${dy}-${dx}`}
                  className="absolute border-2"
                  style={{
                    left: dx * CELL_SIZE,
                    top: dy * CELL_SIZE,
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    backgroundColor: blockType.color,
                    borderColor: isValid ? "white" : "red",
                  }}
                />
              ),
          ),
        )}
      </div>
    )
  }

  const renderBlockOptions = () => {
    return (
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Select a block:</h3>
          {selectedBlockType && (
            <Button onClick={rotateBlock} variant="outline" size="sm" className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
              Rotate
            </Button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {blockOptions.map((blockType: BlockType) => {
            const { width, height } = getBlockDimensions(blockType.shape)
            const maxDimension = Math.max(width, height)
            const cellSize = Math.min(40, 120 / maxDimension)

            return (
              <Button
                key={blockType.id}
                onClick={() => isAnswerCorrect === true && setSelectedBlockType(blockType)}
                variant={selectedBlockType === blockType ? "default" : "outline"}
                disabled={isAnswerCorrect !== true}
                className={`p-2 h-auto flex flex-col items-center justify-center ${
                  selectedBlockType === blockType ? "ring-2 ring-white" : ""
                }`}
              >
                <div
                  className="grid gap-px"
                  style={{
                    gridTemplateColumns: `repeat(${width}, ${cellSize}px)`,
                    gridTemplateRows: `repeat(${height}, ${cellSize}px)`,
                  }}
                >
                  {blockType.shape.flatMap((row: BlockCell[], y: number) =>
                    row.map((cell: BlockCell, x: number) => (
                      <div
                        key={`${y}-${x}`}
                        className={`border ${cell ? "" : "opacity-0"}`}
                        style={{
                          width: cellSize,
                          height: cellSize,
                          backgroundColor: cell ? blockType.color : "transparent",
                        }}
                      />
                    )),
                  )}
                </div>
              </Button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Score: {score}</h2>
      </div>

      {renderGrid()}

      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-20">
          <div className="bg-card p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Game Over</h2>
            <p className="text-xl mb-4">Final Score: {score}</p>
            <Button onClick={resetGame}>Play Again</Button>
          </div>
        </div>
      )}

      {renderBlockOptions()}
    </div>
  )
} 
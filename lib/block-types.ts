// Define all block types with their shapes and colors
export type BlockCell = 0 | 1 // 0 = empty, 1 = filled
export type BlockShape = BlockCell[][]

export interface BlockType {
  id: string
  name: string
  shape: BlockShape
  color: string
}

export const BLOCK_TYPES: BlockType[] = [
  // Regular blocks
  {
    id: "1x1",
    name: "1×1 Block",
    shape: [[1]],
    color: "#3b82f6", // blue
  },
  {
    id: "2x1",
    name: "2×1 Block",
    shape: [[1, 1]],
    color: "#10b981", // green
  },
  {
    id: "1x2",
    name: "1×2 Block",
    shape: [[1], [1]],
    color: "#ef4444", // red
  },
  {
    id: "3x1",
    name: "3×1 Block",
    shape: [[1, 1, 1]],
    color: "#f59e0b", // amber
  },
  {
    id: "1x3",
    name: "1×3 Block",
    shape: [[1], [1], [1]],
    color: "#8b5cf6", // purple
  },
  {
    id: "4x1",
    name: "4×1 Block",
    shape: [[1, 1, 1, 1]],
    color: "#ec4899", // pink
  },
  {
    id: "1x4",
    name: "1×4 Block",
    shape: [[1], [1], [1], [1]],
    color: "#06b6d4", // cyan
  },
  {
    id: "2x2",
    name: "2×2 Block",
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "#f97316", // orange
  },
  {
    id: "3x3",
    name: "3×3 Block",
    shape: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    color: "#84cc16", // lime
  },

  // Non-rectangular (shaped) blocks
  {
    id: "l3",
    name: "3-Cell L-Block",
    shape: [
      [1, 0],
      [1, 1],
    ],
    color: "#14b8a6", // teal
  },
  {
    id: "l4",
    name: "4-Cell L-Block",
    shape: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
    ],
    color: "#a855f7", // purple
  },
  {
    id: "t4",
    name: "T-Shaped Block",
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "#f43f5e", // rose
  },
  {
    id: "s4",
    name: "S-Shaped Block",
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "#0ea5e9", // sky
  },
  {
    id: "z4",
    name: "Z-Shaped Block",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "#d946ef", // fuchsia
  },
  {
    id: "plus",
    name: "Plus-Shaped Block",
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: "#eab308", // yellow
  },
]

// Helper function to get a random block type
export function getRandomBlockType(): BlockType {
  const index = Math.floor(Math.random() * BLOCK_TYPES.length)
  return BLOCK_TYPES[index]
}

// Helper function to get a block type by ID
export function getBlockTypeById(id: string): BlockType | undefined {
  return BLOCK_TYPES.find((block) => block.id === id)
}

// Helper function to get block dimensions
export function getBlockDimensions(shape: BlockShape): { width: number; height: number } {
  return {
    height: shape.length,
    width: shape[0].length,
  }
} 
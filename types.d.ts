declare module "react" {
  import * as React from "react"
  export = React
  export as namespace React
}

declare module "framer-motion" {
  export const motion: any
  export const AnimatePresence: any
}

declare module "next/link" {
  import { LinkProps } from "next/dist/client/link"
  export default LinkProps
}

declare module "@radix-ui/react-slot" {
  export const Slot: any
}

declare module "class-variance-authority" {
  export const cva: any
  export type VariantProps<T> = any
}

declare module "clsx" {
  export type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | boolean
  export interface ClassDictionary {
    [id: string]: any
  }
  export interface ClassArray extends Array<ClassValue> {}
  export function clsx(...inputs: ClassValue[]): string
}

declare module "tailwind-merge" {
  export function twMerge(...inputs: string[]): string
}

declare module "@/lib/utils" {
  import { ClassValue } from "clsx"
  export function cn(...inputs: ClassValue[]): string
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
} 
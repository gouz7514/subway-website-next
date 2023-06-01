import prisma from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"

export async function GET() {
  const combinations = await prisma.combination.findMany({
    include: {
      menu: true,
      ingredients: true
    }
  })
  
  return NextResponse.json(combinations)
}

export async function POST(request: NextRequest) {
  const lastCombination = await prisma.combination.findFirst({
    orderBy: {
      id: 'desc'
    }
  })
  
  const lastId = lastCombination?.id || 0

  const res = await request.json()
  const { menu, ingredients } = res
  try {
    const combination = await prisma.combination.create({
      data: {
        id: lastId + 1,
        menu: {
          connect: {
            id: menu
          }
        },
        ingredients: {
          connect: ingredients.map((ingredient: any) => {
            return {
              id: ingredient
            }
          })
        }
      }
    })
    console.log(combination)
  } catch (err) {
    console.log(err)
  } finally {
    await prisma.$disconnect()
  }

  return NextResponse.json({ message: 'OK' })
}
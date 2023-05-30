import prisma from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"
import { parse } from "url"

export async function GET(req: NextRequest, res: NextResponse) {
  const { query } = parse(req.url!, true)
  const { type } = query

  let ingredients

  if (type) {
    ingredients = await prisma.ingredient.findMany({
      where: {
        type: {
          equals: type as string
        }
      }
    })
  } else {
    ingredients = await prisma.ingredient.findMany()
  }


  return NextResponse.json(ingredients)
}
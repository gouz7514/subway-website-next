import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const combinations = await prisma.combination.findMany({
    include: {
      menu: true,
      ingredients: true
    }
  })
  
  return NextResponse.json(combinations)
}
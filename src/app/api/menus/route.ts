import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { NextApiRequest, NextApiResponse } from 'next'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const menus = await prisma.menu.findMany()
  
  return NextResponse.json(menus)
}
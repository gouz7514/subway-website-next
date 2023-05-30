import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const menus = await prisma.menu.findMany()
  
  return NextResponse.json(menus)
}
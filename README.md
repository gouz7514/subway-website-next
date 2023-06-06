# subway-website-next

### About
써브웨이의 사용법을 알려주는 서비스입니다.<br />
NextJS, Typescript, prisma, Vercel postgres를 활용했으며 vercel을 통해 배포했습니다.<br />
실제 서비스는 [여기](https://subway-website-next.vercel.app/)서 확인하실 수 있습니다.<br />
기존 써브웨이 웹사이트를 분석하고 부족한 점을 보완했으며 보완된 점은 아래와 같습니다.<br />

- 이용 방법과 메뉴, 재료를 동시에 확인하기 힘들다.
- 다양한 조합을 쉽게 확인할 수 있다.
- 누구나 원하는 조합을 추가할 수 있다.

[react와 Javascript로 만든 기존의 프로젝트](https://github.com/gouz7514/subway-website)를 Next, Typescript, Vercel을 활용해 리팩토링 및 발전시킨 서비스입니다.

### Stack
[![Tech stacks](https://skillicons.dev/icons?i=ts,nextjs,vercel,prisma)](https://skillicons.dev)

### Detail
#### `styled-components`
스타일링 적용을 위해 styled-components를 사용했습니다.<br />
server component가 기본이 된 Next 13.4를 사용하게 됨에 따라 styled-components의 적용을 위해 아래와 같은 코드를 적용했습니다.

```typescript
// lib/registry.tsx
'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    // @ts-ignore
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
```

또한, styled-components가 적용된 컴포넌트 상단에 `use-client` 를 선언했습니다.

#### `vercel postgres`
지난 5월 1일 (23.05.01) [vercel은 storage 기능을 정식 출시](https://vercel.com/blog/vercel-storage)했습니다. vercel에 연동된 프로젝트에 데이터베이스를 연결할 수 있는 기능으로 KV, Postgres, Blob, Edge Config 총 4가지를 지원합니다.

해당 프로젝트에는 `vercel psotgres`와 `prisma`를 사용해 데이터베이스를 구성했습니다.

```typescript
// lib/prisma.ts
import { PrismaClient } from "@prisma/client"

let globalWithPrisma = global as typeof globalThis & {
  prisma: PrismaClient
}

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient()
  }
  prisma = globalWithPrisma.prisma
}

export default prisma
```

`prisma.ts` 에 선언된 prismaClient를 import해서 api route에서 호출하는 방식으로 데이터를 가져옵니다.

```typescript
// api/ingredients/route.ts
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
```

api route를 호출하기 위해 `lib/util` 디렉토리 하에 `api.ts` 를 사용합니다.

```typescript
// lib/util/api.ts
export const getMenus = async () => {
  const response = await fetch('/api/menus')
  const data = await response.json()
  return data
}

export const getIngredients = async () => {
  const response = await fetch('/api/ingredients')
  const data = await response.json()
  return data
}

export const getCombinations = async () => {
  const response = await fetch('/api/combinations')
  const data = await response.json()
  return data
}
```

#### `react-query`
자주 사용하는 api 요청에 react-query를 사용했습니다.

```typescript
// app/usage/UsageList.tsx
import { getMenus, getIngredients } from '@/lib/util/api'
import { useQuery } from '@tanstack/react-query'

export const UsageMenu = () => {
  const [menus, setMenus] = useState([])

  const { data: menuData, isLoading } = useQuery({
    queryKey: ['menus'],
    queryFn: getMenus,
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    if (menuData) {
      setMenus(menuData)
    }
  }, [menuData])

  return (
    ...
  )
}
```
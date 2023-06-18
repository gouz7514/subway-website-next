# subway-website-next
## `README_TECHNICAL`

### About
프로젝트의 기술적인 디테일을 기록한 문서입니다.
프로젝트의 간단한 내용 및 기능 설명은 [README](../README.md)를 참고해주세요

#### `styled-components`
스타일링 적용을 위해 styled-components를 사용했습니다.<br />
server component가 기본이 된 Next 13.4를 사용하게 됨에 따라 styled-components의 적용을 위해 아래와 같은 [코드](../src/lib/registry.tsx)를 적용했습니다.

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

해당 프로젝트에는 `vercel psotgres`와 `prisma`를 사용해 [아래](../src/lib/prisma.ts)와 같이 데이터베이스를 구성했습니다.

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

api route를 호출하기 위해 [api.ts](../src/lib/util/api.ts) 를 사용합니다.

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

### `jest`
jest를 사용해 테스트 환경을 구축했습니다.
테스트 코드를 도입하며 리팩토링도 동시에 진행했으며 현재 테스트 목록은 아래와 같습니다.
- [index.test.js](../__tests__/index.test.js) : 메인 페이지 렌더링 테스트
- [combination.test.js](../__tests__/combination.test.js) : 조합 추가하기 버튼 동작 테스트
- [api.test.js](../__tests__/api.test.js) : api 테스트


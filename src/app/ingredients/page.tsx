import Link from 'next/link'

export default function PageIngredients() {
  return (
    <>
      <div>Ingredients</div>
      <ul>
        <li>
          <Link href="/ingredients/bread">
            빵
          </Link>
        </li>
        <li>
          <Link href="/ingredients/cheese">
            치즈
          </Link>
        </li>
        <li>
          <Link href="/ingredients/sauce">
            소스
          </Link>
        </li>
        <li>
          <Link href="/ingredients/vegetable">
            야채
          </Link>
        </li>
      </ul>
    </>
  )
}
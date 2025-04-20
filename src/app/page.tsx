import Link from 'next/link'
import { Button } from '~/components/shadcn/button'

export default function HomePage() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <Button type="button" variant="outline" asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button type="button" variant="outline" asChild>
        <Link href="/develop">Developer&apos;s page</Link>
      </Button>
    </main>
  )
}

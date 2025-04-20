import type { ComponentProps } from 'react'

import { cn } from '~/utils/utils'
import { Button } from '~/components/shadcn/button'
import { Input } from '~/components/shadcn/input'
import { Label } from '~/components/shadcn/label'

import { google, github, microsoft, discord } from './assets/oAuthIcons'

export const LoginForm = ({ className, ...props }: ComponentProps<'form'>) => {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <h1 className="text-center text-2xl font-bold">Sign in</h1>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="text" placeholder="mail@example.com" />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Button variant="outline" className="w-full">
            {google}
            Login with Google
          </Button>
          <Button variant="outline" className="w-full">
            {microsoft}
            Login with Microsoft
          </Button>
          <Button variant="outline" className="w-full">
            {discord}
            Login with Discord
          </Button>
          <Button variant="outline" className="w-full">
            {github}
            Login with GitHub
          </Button>
        </div>
      </div>
    </form>
  )
}

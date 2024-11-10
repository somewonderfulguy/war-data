'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { UserIcon } from 'lucide-react'

import { TooltipGroup } from '@/components/ui/tooltip'
import { getFirstTwoCapitalLetters } from '@/utils/getFirstTwoCapitalLetters'

import AppControlButton from '../AppControlButton'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function UserButton() {
  const { data: session, status } = useSession()
  // status === "authenticated"
  // status === "unauthenticated"
  // session?.user?.image
  // session?.user?.name

  return (
    <>
      {status === 'unauthenticated' && (
        // TODO: Localize
        <TooltipGroup tooltipContent={<p>Log in</p>}>
          <AppControlButton onClick={() => signIn()}>
            <UserIcon className="h-4 w-4" />
          </AppControlButton>
        </TooltipGroup>
      )}
      {status === 'authenticated' && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={session?.user?.image!} className="rounded" />
              <AvatarFallback>{getFirstTwoCapitalLetters(session?.user?.name)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* TODO: Localize */}
            <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}

// <TooltipGroup tooltipContent={<p>User menu</p>}>
// </TooltipGroup>

//  <DropdownMenu>
//    <DropdownMenuTrigger asChild>
//      <Avatar>
//        <AvatarImage src={session?.user?.image!} />
//        <AvatarFallback>{getFirstTwoCapitalLetters(session?.user?.name)}</AvatarFallback>
//      </Avatar>
//    </DropdownMenuTrigger>
//    <DropdownMenuContent>
//      <DropdownMenuItem
//        onClick={() => {
//          onSignOut()
//        }}
//      >
//        Sign Out
//      </DropdownMenuItem>
//    </DropdownMenuContent>
//  </DropdownMenu>

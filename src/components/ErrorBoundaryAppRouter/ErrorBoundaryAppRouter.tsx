'use client'

import { useState } from 'react'
import { AlertCircle, ChevronDown } from 'lucide-react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { useScopedI18n } from '@/locales/client'
import { isDevelopment } from '@/constants/common'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
  title?: string
  description?: string
}

export default function ErrorBoundaryAppRouter({ error, reset, title }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const t = useScopedI18n('app')

  return (
    <div className="flex h-full min-h-full items-center justify-center">
      <div className="max-w-[90%] px-4 py-8 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-semibold">{title || t('somethingWentWrong')}</h2>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
        <div className="mt-6">
          <Button onClick={reset} variant="default">
            {t('tryAgain')}
          </Button>
        </div>
        {isDevelopment && (
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4 w-full">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="flex w-full items-center justify-start gap-1">
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${isOpen ? '' : '-rotate-90 transform'}`}
                />
                <span>View error details</span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <pre className="overflow-auto rounded-md bg-muted p-4 text-left text-sm">
                <code>{error.stack}</code>
              </pre>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    </div>
  )
}

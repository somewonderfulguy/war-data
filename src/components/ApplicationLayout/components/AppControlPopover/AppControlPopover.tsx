'use client'

import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type MutableRefObject,
  forwardRef,
  useEffect,
  useId,
  useRef
} from 'react'
import * as Popover from '@radix-ui/react-popover'

import { cn } from '@/utils/cn'
import createContextStore from '@/utils/createContextStore'
import mergeRefs from '@/utils/mergeRefs'

type InternalStore = {
  isOpen: boolean
  timeoutRef: MutableRefObject<number | null>
  triggerId: string
}

const {
  Provider: AppControlPopoverStoreProvider,
  useStoreValue: useAppControlPopoverStore,
  useStoreDispatch: useAppControlPopoverDispatch
} = createContextStore<InternalStore>(
  {
    isOpen: false,
    timeoutRef: { current: null },
    triggerId: ''
  },
  'AppControlPopoverStoreProvider'
)

type RootProps = ComponentPropsWithoutRef<typeof Popover.Root>
const RootImpl = (props: RootProps) => {
  const isOpen = useAppControlPopoverStore((state) => state.isOpen)
  const timeoutRef = useAppControlPopoverStore((state) => state.timeoutRef)
  const updateStore = useAppControlPopoverDispatch()

  const triggerId = useId()
  useEffect(() => updateStore({ triggerId }), [triggerId, updateStore])

  useEffect(() => () => void (timeoutRef.current && clearTimeout(timeoutRef.current)), [timeoutRef])

  return (
    <Popover.Root
      {...props}
      open={props.open ?? isOpen}
      onOpenChange={(open) => {
        updateStore({ isOpen: open })
        props.onOpenChange?.(open)
      }}
    />
  )
}
const Root = (props: RootProps) => (
  <AppControlPopoverStoreProvider>
    <RootImpl {...props} />
  </AppControlPopoverStoreProvider>
)

type TriggerProps = ComponentPropsWithoutRef<typeof Popover.Trigger>
const Trigger = forwardRef<ElementRef<typeof Popover.Trigger>, TriggerProps>(
  ({ className, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const timeoutRef = useAppControlPopoverStore((state) => state.timeoutRef)
    const triggerId = useAppControlPopoverStore((state) => state.triggerId)
    const updateStore = useAppControlPopoverDispatch()

    return (
      <Popover.Trigger
        ref={ref}
        className={className}
        {...props}
        id={triggerId}
        aria-haspopup="menu"
        onMouseEnter={(event) => {
          timeoutRef.current && clearTimeout(timeoutRef.current)
          updateStore({ isOpen: true })
          onMouseEnter?.(event)
        }}
        onMouseLeave={(event) => {
          timeoutRef.current = window.setTimeout(() => {
            updateStore({ isOpen: false })
          }, 300)
          onMouseLeave?.(event)
        }}
      />
    )
  }
)
Trigger.displayName = Popover.Trigger.displayName

type ContentProps = ComponentPropsWithoutRef<typeof Popover.Content>
const Content = forwardRef<ElementRef<typeof Popover.Content>, ContentProps>(
  ({ className, align = 'center', sideOffset = 0, onMouseLeave, onMouseEnter, ...props }, extRef) => {
    const timeoutRef = useAppControlPopoverStore((state) => state.timeoutRef)
    const triggerId = useAppControlPopoverStore((state) => state.triggerId)
    const updateStore = useAppControlPopoverDispatch()

    const popoverRef = useRef<HTMLDivElement>()

    /** Focus on aria-selected="true" element if exists, otherwise focus on the first element (also, if exists) */
    const onOpenAutoFocus = (event: Event) => {
      event.preventDefault() // prevent Radix default behavior (always focus on the first element)
      const popover = popoverRef.current
      if (!popover) return
      const selectedElement = popover.querySelector('[aria-selected="true"]') as HTMLElement | null
      if (selectedElement) {
        selectedElement?.focus()
      } else {
        ;(popover.querySelectorAll('li > *')[0] as HTMLElement | null)?.focus()
      }
    }

    return (
      <Popover.Portal>
        <Popover.Content
          ref={mergeRefs(extRef, popoverRef)}
          align={align}
          sideOffset={sideOffset}
          onMouseEnter={(event) => {
            timeoutRef.current && clearTimeout(timeoutRef.current)
            updateStore({ isOpen: true })
            onMouseEnter?.(event)
          }}
          onMouseLeave={(event) => {
            timeoutRef.current = window.setTimeout(() => {
              updateStore({ isOpen: false })
            }, 300)
            onMouseLeave?.(event)
          }}
          className={cn(
            // TODO: check all these classes
            'z-50 min-w-[100px] rounded-md border bg-background p-1 text-primary shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className
          )}
          tabIndex={-1}
          aria-labelledby={triggerId}
          onOpenAutoFocus={onOpenAutoFocus}
          {...props}
        ></Popover.Content>
      </Popover.Portal>
    )
  }
)
Content.displayName = Popover.Content.displayName

const AppControlPopover = Object.assign(Root, { Trigger, Content })

export { useAppControlPopoverDispatch }
export default AppControlPopover

import { type HTMLAttributes, type KeyboardEvent, type RefObject, forwardRef, useEffect, useRef } from 'react'

import { cn } from '@/utils/cn'
import createContextStore from '@/utils/createContextStore'
import mergeRefs from '@/utils/mergeRefs'

import { useAppControlPopoverDispatch } from '../AppControlPopover'

import styles from './AppControlList.module.css'

type RegisteredItems = RefObject<HTMLLIElement>[]

const {
  Provider: AppControlListStoreProvider,
  useStoreValue: useAppControlListStore,
  useStoreDispatch: useAppControlListDispatch
} = createContextStore<RegisteredItems>([], 'AppControlListStoreProvider')

const AppControlList = forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <AppControlListStoreProvider>
      <ul ref={ref} role="menu" {...props} className={cn('flex flex-col', className)} />
    </AppControlListStoreProvider>
  )
)
AppControlList.displayName = 'AppControlList'

type AppControlListItemProps = HTMLAttributes<HTMLLIElement> & {
  isActive?: boolean
}

const AppControlListItem = forwardRef<HTMLLIElement, AppControlListItemProps>(
  ({ className, isActive, ...props }, extRef) => {
    const updatePopover = useAppControlPopoverDispatch()
    const items = useAppControlListStore((state) => state)
    const updateItems = useAppControlListDispatch()

    const ref = useRef<HTMLLIElement>(null)

    useEffect(() => {
      updateItems((items) => [...items, ref])
      return () => {
        updateItems((items) => items.filter((item) => item !== ref))
      }
    }, [updateItems])

    useEffect(() => {
      ref.current?.querySelector('a')?.setAttribute('tabindex', '-1')
      ref.current?.querySelector('button')?.setAttribute('tabindex', '-1')
    }, [])

    const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
      const currentIndex = items.findIndex((itemRef) => itemRef === ref)

      let nextIndex: number | null = null
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        nextIndex = (currentIndex + 1) % items.length
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        nextIndex = (currentIndex - 1 + items.length) % items.length
      } else if (event.key === 'Home') {
        event.preventDefault()
        nextIndex = 0
      } else if (event.key === 'End') {
        event.preventDefault()
        nextIndex = items.length - 1
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        type OnClickEvent = Parameters<NonNullable<HTMLAttributes<HTMLLIElement>['onClick']>>[0]
        const ev = event as unknown as OnClickEvent
        props.onClick?.(ev)
        ref.current?.querySelector('a')?.click()
        ref.current?.querySelector('button')?.click()
        updatePopover({ isOpen: false })
        return
      } else if (event.key === 'Escape') {
        event.preventDefault()
        updatePopover({ isOpen: false })
        return
      } else if (event.key === 'Tab') {
        event.preventDefault()
        event.stopPropagation()
      }

      if (nextIndex !== null && items[nextIndex]?.current) {
        const nextItem = items[nextIndex].current
        nextItem?.focus()
      }
    }

    return (
      <li
        ref={mergeRefs(ref, extRef)}
        className={cn(
          'rounded-sm text-sm outline-none',
          isActive && 'bg-secondary font-semibold',
          styles.listItem,
          className
        )}
        role="option"
        tabIndex={0}
        aria-selected={isActive}
        {...props}
        onClick={(event) => {
          updatePopover({ isOpen: false })
          props.onClick?.(event)
        }}
        onKeyDown={(event) => {
          handleKeyDown(event)
          props.onKeyDown?.(event)
        }}
      />
    )
  }
)
AppControlListItem.displayName = 'AppControlListItem'

export default Object.assign(AppControlList, { Item: AppControlListItem })

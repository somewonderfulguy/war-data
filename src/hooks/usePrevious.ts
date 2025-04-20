import { useRef, useEffect, type RefObject } from 'react'

export const usePrevious = <TValue>(value: TValue): TValue | null => {
  const ref: RefObject<TValue | null> = useRef(null)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

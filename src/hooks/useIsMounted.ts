import { useEffect, useState } from 'react'

// TODO: add test

/** Use for  bypass hydration issues */
export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])
  return isMounted
}

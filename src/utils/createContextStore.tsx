'use client'

import { useRef, createContext, useContext, useCallback, useSyncExternalStore, type ReactNode } from 'react'

export default function createContextStore<TStore>(initialState: TStore, displayName?: string) {
  type PrevStateFnUpdate = (prevValue: TStore) => TStore
  const useStoreData = (): {
    get: () => TStore
    set: (value: Partial<TStore> | PrevStateFnUpdate) => void
    subscribe: (callback: () => void) => () => void
  } => {
    const store = useRef(initialState)

    const get = useCallback(() => store.current, [])

    const subscribers = useRef(new Set<() => void>())

    const set = useCallback((value: Partial<TStore> | PrevStateFnUpdate) => {
      if (typeof value === 'function') {
        store.current = value(store.current)
      } else if (typeof value !== 'object') {
        store.current = value as TStore
      } else {
        store.current = { ...store.current, ...value }
      }
      subscribers.current.forEach((callback) => callback())
    }, [])

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback)
      return () => subscribers.current.delete(callback)
    }, [])

    return {
      get,
      set,
      subscribe
    }
  }

  type UseStoreDataReturnType = ReturnType<typeof useStoreData>

  const StoreValueContext = createContext<Omit<UseStoreDataReturnType, 'set'> | undefined>(undefined)
  const StoreDispatchContext = createContext<UseStoreDataReturnType['set'] | undefined>(undefined)

  const Provider = ({ children }: { children: ReactNode }) => {
    const { get, set, subscribe } = useStoreData()
    return (
      <StoreDispatchContext.Provider value={set}>
        <StoreValueContext.Provider value={{ get, subscribe }}>{children}</StoreValueContext.Provider>
      </StoreDispatchContext.Provider>
    )
  }
  if (displayName) Provider.displayName = displayName

  const useStoreValue = <SelectorOutput,>(
    // TODO: test it out, that passing no selector works as expected with type safety
    selector: (store: TStore) => SelectorOutput = (store: TStore) => store as unknown as SelectorOutput
  ): SelectorOutput => {
    const store = useContext(StoreValueContext)
    if (store === undefined) {
      throw new Error('useStoreValue must be used inside a Provider with a value')
    }

    return useSyncExternalStore(
      store.subscribe,
      () => selector(store.get()),
      () => selector(initialState)
    )
  }

  const useStoreDispatch = () => {
    const set = useContext(StoreDispatchContext)
    if (set === undefined) {
      throw new Error('useStoreDispatch must be used inside a Provider with a value')
    }
    return set
  }

  return {
    Provider,
    useStoreValue,
    useStoreDispatch,
    StoreValueContext,
    StoreDispatchContext
  }
}

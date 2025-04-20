import { renderHook } from '@testing-library/react'

import { usePrevious } from '../usePrevious'

test('returns null on initial render', () => {
  const { result } = renderHook(() => usePrevious('hello'))
  expect(result.current).toBeNull()
})

test('returns previous value after update', () => {
  const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
    initialProps: { value: 'first' }
  })

  expect(result.current).toBeNull()

  rerender({ value: 'second' })
  expect(result.current).toBe('first')

  rerender({ value: 'third' })
  expect(result.current).toBe('second')
})

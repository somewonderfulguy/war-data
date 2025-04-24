import { renderHook, waitFor } from '@testing-library/react'

import { useIsMounted } from '../useIsMounted'

test('useIsMounted returns true after component mounts', async () => {
  const { result } = renderHook(() => useIsMounted())

  await waitFor(() => {
    expect(result.current).toBe(true)
  })
})

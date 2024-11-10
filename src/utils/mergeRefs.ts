import type { LegacyRef, MutableRefObject, RefCallback } from 'react'

const mergeRefs =
  <TRefValue>(
    ...refs: Array<MutableRefObject<TRefValue> | LegacyRef<TRefValue> | undefined | null>
  ): RefCallback<TRefValue> =>
  (value) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ;(ref as MutableRefObject<TRefValue | null>).current = value
      }
    }
  }

export default mergeRefs

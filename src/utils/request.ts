import { RequestInit } from 'next/dist/server/web/spec-extension/request'

export type RequestConfig<TReturnValue> = Omit<Request, 'body'> & {
  body?: unknown
  headers?: Headers & { Authorization?: string }
  onSuccess?: (response: Response, data: TReturnValue) => void
  onError?: (response: Response, data: unknown) => void
}

/**
 * Method to improve `fetch` and get better developer experience. Must be application agnostic.
 * Has the same signature as `fetch` but with some improvements:
 * - Automatically sets the `Content-Type` header to `application/json` if the body is an object.
 * - Automatically parses the response as JSON if the response headers contain `application/json`.
 * - Automatically parses the response as text if the response headers contain `text/plain` or `text/html`.
 * - Automatically parses the response as a Blob if the response headers contain `application/octet-stream`.
 * - Automatically handles empty success responses.
 * - Calls `onSuccess` callback if the response is successful.
 * - Calls `onError` callback if the response is unsuccessful.
 */
export const request = <TReturnValue>(
  endpoint: string,
  { body, onSuccess, onError, method, ...customConfig }: RequestConfig<TReturnValue> = {} as RequestConfig<TReturnValue>
): Promise<TReturnValue> => {
  const isFormData = body instanceof FormData

  const config: RequestInit = {
    method: method ?? 'GET',
    ...customConfig,
    headers: {
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...customConfig.headers
    }
  }

  if (body) {
    config.body = isFormData ? body : JSON.stringify(body)
  }

  return fetch(endpoint, config).then(async (response) => {
    let data: TReturnValue

    try {
      // handle empty success response
      if (response.ok && response.headers.get('Content-Type') == null) {
        return Promise.resolve() as Promise<TReturnValue>
      }

      if (response.headers.get('Content-Type')?.includes('application/octet-stream')) {
        const blob = await response.blob()
        const contentDisposition = response.headers.get('Content-Disposition')

        if (contentDisposition?.includes('filename=')) {
          const fileName = contentDisposition.split('filename=')[1].split(';')[0]
          data = new File([blob], fileName) as TReturnValue
        } else {
          data = blob as TReturnValue
        }
      } else if (
        response.headers.get('Content-Type')?.includes('text/plain') ||
        response.headers.get('Content-Type')?.includes('text/html')
      ) {
        data = (await response.text()) as TReturnValue
      } else {
        data = await response.json()
      }
    } catch (e) {
      data = e as TReturnValue
      console.error(e)
    }

    if (response.ok) {
      onSuccess?.(response, data)
      return data
    }

    onError?.(response, data)
    return Promise.reject(data)
  })
}

import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

// @ts-ignore
export const Route = createFileRoute('/demo/tanstack-query')({
  component: TanStackQueryDemo,
})

function TanStackQueryDemo() {
  const { data } = useQuery({
    queryKey: ['people'],
    queryFn: () => Promise.resolve([{ name: 'John Doe' }, { name: 'Jane Doe' }]),
    initialData: [],
  })

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl">People list from Swapi</h1>
      <ul>
        {data.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

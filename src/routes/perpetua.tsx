import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/perpetua')({
  component: PerpetuaPage,
})

function PerpetuaPage() {
  return <div>Perpetua</div>
}

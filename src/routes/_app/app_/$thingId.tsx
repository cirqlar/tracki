import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/app_/$thingId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/app_/$thingId"!</div>
}
